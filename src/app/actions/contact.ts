"use server";

import { headers } from "next/headers";
import { contactFormSchema } from "@/lib/types/forms";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { isValidOrigin } from "@/lib/utils/csrf";
import { createClient } from "@/lib/api/supabase-server";

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

  // CSRF: Require Origin header and validate against SITE_URL (www-tolerant)
  const origin = headersList.get("origin");
  if (!isValidOrigin(origin)) {
    return { status: "error", message: "Invalid request origin." };
  }

  // Rate limiting: 3 submissions per hour per IP
  // Use x-real-ip (set by Nginx from $remote_addr, not spoofable) over x-forwarded-for
  const ip =
    headersList.get("x-real-ip") ??
    headersList.get("x-forwarded-for")?.split(",").pop()?.trim() ??
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

  // Insert into Supabase
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_submissions")
    .insert({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });

  if (error) {
    console.error("Contact insert error:", error.code, error.message);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  return { status: "success" };
}
