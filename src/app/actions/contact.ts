"use server";

import { contactFormSchema } from "@/lib/types/forms";

type ContactResult =
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitContactForm(
  formData: FormData,
): Promise<ContactResult> {
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
  // For now, simulate a successful submission
  console.log("[Contact] New submission from:", parsed.data.email);

  return { status: "success" };
}
