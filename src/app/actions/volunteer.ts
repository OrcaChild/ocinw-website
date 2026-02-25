"use server";

import { headers } from "next/headers";
import { volunteerFormSchema } from "@/lib/types/forms";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { isValidOrigin } from "@/lib/utils/csrf";
import { createClient } from "@/lib/api/supabase-server";

type VolunteerResult =
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "duplicate" }
  | { status: "rate_limited"; message: string };

// 10 requests per minute per IP (form submissions)
const VOLUNTEER_RATE_LIMIT = 10;
const VOLUNTEER_RATE_WINDOW_MS = 60 * 1000; // 1 minute

export async function submitVolunteerForm(
  formData: FormData,
): Promise<VolunteerResult> {
  const headersList = await headers();

  // CSRF: Require Origin header and validate against SITE_URL (www-tolerant)
  const origin = headersList.get("origin");
  if (!isValidOrigin(origin)) {
    return { status: "error", message: "Invalid request origin." };
  }

  // Rate limiting: 10 submissions per minute per IP
  // Use x-real-ip (set by Nginx from $remote_addr, not spoofable) over x-forwarded-for
  const ip =
    headersList.get("x-real-ip") ??
    headersList.get("x-forwarded-for")?.split(",").pop()?.trim() ??
    "unknown";

  const rateCheck = checkRateLimit(ip, VOLUNTEER_RATE_LIMIT, VOLUNTEER_RATE_WINDOW_MS);
  if (!rateCheck.allowed) {
    return {
      status: "rate_limited",
      message: "Too many submissions. Please try again later.",
    };
  }

  // Parse multi-value fields (interests, availability come as repeated form entries)
  const interests = formData.getAll("interests").map(String);
  const availability = formData.getAll("availability").map(String);

  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    ageRange: formData.get("ageRange"),
    zipCode: formData.get("zipCode"),
    interests,
    availability,
    parentGuardianName: formData.get("parentGuardianName") || undefined,
    parentGuardianEmail: formData.get("parentGuardianEmail") || undefined,
    parentGuardianPhone: formData.get("parentGuardianPhone") || undefined,
    howHeard: formData.get("howHeard") || undefined,
    skills: formData.get("skills") || undefined,
    message: formData.get("message") || undefined,
    agreeToCodeOfConduct: formData.get("agreeToCodeOfConduct") === "true",
    agreeToPrivacy: formData.get("agreeToPrivacy") === "true",
    receiveUpdates: formData.get("receiveUpdates") === "true",
  };

  const parsed = volunteerFormSchema.safeParse(rawData);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return {
      status: "error",
      message: firstError?.message ?? "Invalid form data.",
    };
  }

  const data = parsed.data;
  const isMinor = data.ageRange === "under-13" || data.ageRange === "13-17";

  // Build the row to insert — map camelCase form fields to snake_case DB columns
  const row: Record<string, unknown> = {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email.toLowerCase(),
    phone: data.phone ?? null,
    age_range: data.ageRange,
    zip_code: data.zipCode,
    interests: data.interests,
    availability: data.availability,
    how_heard: data.howHeard ?? null,
    skills: data.skills ?? null,
    message: data.message ?? null,
    agreed_to_terms: data.agreeToCodeOfConduct && data.agreeToPrivacy,
  };

  // Parent/guardian fields for minors
  if (isMinor) {
    row.parent_guardian_name = data.parentGuardianName ?? null;
    row.parent_guardian_email = data.parentGuardianEmail ?? null;
    row.parent_guardian_phone = data.parentGuardianPhone ?? null;
    row.parent_consent_status = "pending";
    row.parent_consent_token = crypto.randomUUID();
  }

  // Insert into Supabase — UNIQUE constraint on email handles duplicates
  const supabase = await createClient();
  const { error } = await supabase
    .from("volunteers")
    .insert(row);

  if (error) {
    if (error.code === "23505") {
      return { status: "duplicate" };
    }
    console.error("Volunteer insert error:", error.code, error.message);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  // TODO: Send confirmation email to volunteer via Resend
  // TODO: Send notification email to OCINW admin team
  // TODO: If minor, send parental consent email with token link

  return { status: "success" };
}
