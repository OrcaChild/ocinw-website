"use server";

import { headers } from "next/headers";
import { newsletterFormSchema } from "@/lib/types/forms";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { isValidOrigin } from "@/lib/utils/csrf";
import { createClient } from "@/lib/api/supabase-server";

type NewsletterResult =
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "duplicate" }
  | { status: "rate_limited"; message: string };

// 5 attempts per hour per IP
const NEWSLETTER_RATE_LIMIT = 5;
const NEWSLETTER_RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function subscribeNewsletter(
  formData: FormData,
): Promise<NewsletterResult> {
  const headersList = await headers();

  // CSRF: Require Origin header and validate against SITE_URL (www-tolerant)
  const origin = headersList.get("origin");
  if (!isValidOrigin(origin)) {
    return { status: "error", message: "Invalid request origin." };
  }

  // Rate limiting: 5 attempts per hour per IP
  // Use x-real-ip (set by Nginx from $remote_addr, not spoofable) over x-forwarded-for
  const ip =
    headersList.get("x-real-ip") ??
    headersList.get("x-forwarded-for")?.split(",").pop()?.trim() ??
    "unknown";

  const rateCheck = checkRateLimit(ip, NEWSLETTER_RATE_LIMIT, NEWSLETTER_RATE_WINDOW_MS);
  if (!rateCheck.allowed) {
    return {
      status: "rate_limited",
      message: "Too many attempts. Please try again later.",
    };
  }

  const rawData = {
    email: formData.get("email"),
    firstName: formData.get("firstName") || undefined,
  };

  const parsed = newsletterFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const normalizedEmail = parsed.data.email.toLowerCase();

  // Insert into Supabase — UNIQUE constraint on email handles duplicates
  const supabase = await createClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({
      email: normalizedEmail,
      first_name: parsed.data.firstName ?? null,
    });

  if (error) {
    // Supabase returns code "23505" for unique constraint violation
    if (error.code === "23505") {
      return { status: "duplicate" };
    }
    console.error("Newsletter insert error:", error.code, error.message);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  return { status: "success" };
}
