"use server";

import { newsletterFormSchema } from "@/lib/types/forms";

type NewsletterResult =
  | { status: "success" }
  | { status: "error"; message: string }
  | { status: "duplicate" };

export async function subscribeNewsletter(
  formData: FormData,
): Promise<NewsletterResult> {
  const rawData = {
    email: formData.get("email"),
    firstName: formData.get("firstName") || undefined,
  };

  const parsed = newsletterFormSchema.safeParse(rawData);

  if (!parsed.success) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // TODO: Insert into Supabase newsletter_subscribers table
  // TODO: Check for duplicates (UNIQUE constraint on email)
  // TODO: Send confirmation email via Resend
  // For now, simulate a successful subscription
  console.log("[Newsletter] New subscriber:", parsed.data.email);

  return { status: "success" };
}
