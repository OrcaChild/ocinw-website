"use server";

import { headers } from "next/headers";
import { parentConsentRequestSchema, consentCodeSchema } from "@/lib/types/forms";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { isValidOrigin } from "@/lib/utils/csrf";
import { createClient } from "@/lib/api/supabase-server";

type ConsentRequestResult =
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "rate_limited"; message: string };

type CodeValidationResult =
  | { status: "valid" }
  | { status: "invalid"; message: string }
  | { status: "expired"; message: string }
  | { status: "error"; message: string }
  | { status: "rate_limited"; message: string };

// 5 consent requests per hour per IP
const CONSENT_RATE_LIMIT = 5;
const CONSENT_RATE_WINDOW_MS = 60 * 60 * 1000;

// 10 code validation attempts per minute per IP
const CODE_RATE_LIMIT = 10;
const CODE_RATE_WINDOW_MS = 60 * 1000;

/**
 * Phase 1: Submit parent contact info for consent verification.
 * Stores ONLY parent data — zero child PII is collected at this stage.
 */
export async function submitParentConsentRequest(
  formData: FormData,
): Promise<ConsentRequestResult> {
  const headersList = await headers();

  // CSRF
  const origin = headersList.get("origin");
  if (!isValidOrigin(origin)) {
    return { status: "error", message: "Invalid request origin." };
  }

  // Rate limiting
  const ip =
    headersList.get("x-real-ip") ??
    headersList.get("x-forwarded-for")?.split(",").pop()?.trim() ??
    "unknown";

  const rateCheck = checkRateLimit(
    `parent-consent-${ip}`,
    CONSENT_RATE_LIMIT,
    CONSENT_RATE_WINDOW_MS,
  );
  if (!rateCheck.allowed) {
    return {
      status: "rate_limited",
      message: "Too many submissions. Please try again later.",
    };
  }

  // Parse and validate
  const rawData = {
    parentName: formData.get("parentName"),
    parentEmail: formData.get("parentEmail"),
    parentPhone: formData.get("parentPhone"),
    ageRange: formData.get("ageRange"),
  };

  const parsed = parentConsentRequestSchema.safeParse(rawData);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return {
      status: "error",
      message: firstError?.message ?? "Invalid form data.",
    };
  }

  const data = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.from("parent_consent_requests").insert({
    parent_name: data.parentName,
    parent_email: data.parentEmail.toLowerCase(),
    parent_phone: data.parentPhone,
    minor_age_range: data.ageRange,
    status: "pending",
  });

  if (error) {
    console.error("Consent request error:", error.code, error.message);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  return { status: "success" };
}

/**
 * Validate a consent code without consuming it.
 * Used to unlock the full volunteer form before submission.
 */
export async function validateConsentCode(
  rawCode: string,
): Promise<CodeValidationResult> {
  const headersList = await headers();

  // Rate limiting
  const ip =
    headersList.get("x-real-ip") ??
    headersList.get("x-forwarded-for")?.split(",").pop()?.trim() ??
    "unknown";

  const rateCheck = checkRateLimit(
    `code-validate-${ip}`,
    CODE_RATE_LIMIT,
    CODE_RATE_WINDOW_MS,
  );
  if (!rateCheck.allowed) {
    return {
      status: "rate_limited",
      message: "Too many attempts. Please try again later.",
    };
  }

  // Normalize and validate format
  const normalized = rawCode.toUpperCase().trim();
  const formatResult = consentCodeSchema.safeParse(normalized);
  if (!formatResult.success) {
    return { status: "invalid", message: "Invalid code format." };
  }

  const supabase = await createClient();

  const { data: codeRow, error } = await supabase
    .from("consent_codes")
    .select("id, used_at, expires_at")
    .eq("code", normalized)
    .single();

  if (error || !codeRow) {
    return { status: "invalid", message: "Invalid code. Please check and try again." };
  }

  if (codeRow.used_at !== null) {
    return { status: "invalid", message: "This code has already been used." };
  }

  if (new Date(codeRow.expires_at) < new Date()) {
    return { status: "expired", message: "This code has expired. Please contact us for a new one." };
  }

  return { status: "valid" };
}
