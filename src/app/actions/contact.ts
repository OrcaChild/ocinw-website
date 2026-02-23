"use server";

import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/types/forms";
import { checkRateLimit } from "@/lib/utils/rate-limit";

type ContactResult =
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "rate_limited"; message: string };

// 3 submissions per hour per IP
const CONTACT_RATE_LIMIT = 3;
const CONTACT_RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function submitContactForm(
  formData: FormData,
): Promise<ContactResult> {
  const headersList = await headers();

  // CSRF: Verify Origin header matches expected site
  const origin = headersList.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const expectedOrigin = new URL(siteUrl).origin;

  if (origin && origin !== expectedOrigin) {
    return { status: "error", message: "Invalid request origin." };
  }

  // Rate limiting: 3 submissions per hour per IP
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const rateCheck = checkRateLimit(ip, CONTACT_RATE_LIMIT, CONTACT_RATE_WINDOW_MS);
  if (!rateCheck.allowed) {
    return {
      status: "rate_limited",
      message: "Too many submissions. Please try again later.",
    };
  }

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const parsed = contactFormSchema.safeParse(rawData);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return {
      status: "error",
      message: firstError?.message ?? "Invalid form data.",
    };
  }

  // TODO: Insert into Supabase contact_submissions table
  // TODO: Send notification email to admin via Resend

  return { status: "success" };
}
