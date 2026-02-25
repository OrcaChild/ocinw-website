"use server";

import { headers } from "next/headers";
import { newsletterFormSchema } from "@/lib/types/forms";
import { checkRateLimit } from "@/lib/utils/rate-limit";

type NewsletterResult =
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "duplicate" }
  | { status: "rate_limited"; message: string };

// 5 attempts per hour per IP
const NEWSLETTER_RATE_LIMIT = 5;
const NEWSLETTER_RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// In-memory set to track subscribed emails (until Supabase is connected)
// In production, this will be replaced by a UNIQUE constraint on the email column.
const subscribedEmails = new Set<string>();

export async function subscribeNewsletter(
  formData: FormData,
): Promise<NewsletterResult> {
  const headersList = await headers();

  // CSRF: Require and verify Origin header matches expected site
  const origin = headersList.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const expectedOrigin = new URL(siteUrl).origin;

  if (!origin || origin !== expectedOrigin) {
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

  // Check for duplicate subscription
  const normalizedEmail = parsed.data.email.toLowerCase();
  if (subscribedEmails.has(normalizedEmail)) {
    return { status: "duplicate" };
  }

  // TODO: Insert into Supabase newsletter_subscribers table
  // TODO: Check for duplicates via UNIQUE constraint on email column
  // TODO: Send confirmation email via Resend

  // Track this email as subscribed (in-memory until Supabase)
  subscribedEmails.add(normalizedEmail);

  return { status: "success" };
}
