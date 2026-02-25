"use server";

import { headers } from "next/headers";
import { volunteerFormSchema } from "@/lib/types/forms";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { isValidOrigin } from "@/lib/utils/csrf";

type VolunteerResult =
  | { status: "success" }
  | { status: "error"; message: string }
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

  // TODO: Insert into Supabase volunteers table
  // TODO: Send confirmation email to volunteer via Resend
  // TODO: Send notification email to OCINW admin team
  // TODO: If under 18, trigger parental consent workflow (generate token, send consent email)

  return { status: "success" };
}
