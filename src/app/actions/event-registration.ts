"use server";

import { headers } from "next/headers";
import { eventRegistrationSchema } from "@/lib/types/forms";
import { checkRateLimit } from "@/lib/utils/rate-limit";
import { isValidOrigin } from "@/lib/utils/csrf";
import { createClient } from "@/lib/api/supabase-server";

type EventRegistrationResult =
  | { status: "success" }
  | { status: "waitlisted" }
  | { status: "event_full" }
  | { status: "event_closed" }
  | { status: "error"; message: string }
  | { status: "rate_limited"; message: string };

// 10 requests per minute per IP
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 1000;

export async function submitEventRegistration(
  formData: FormData,
): Promise<EventRegistrationResult> {
  const headersList = await headers();

  // CSRF: Require Origin header and validate
  const origin = headersList.get("origin");
  if (!isValidOrigin(origin)) {
    return { status: "error", message: "Invalid request origin." };
  }

  // Rate limiting
  const ip =
    headersList.get("x-real-ip") ??
    headersList.get("x-forwarded-for")?.split(",").pop()?.trim() ??
    "unknown";

  const rateCheck = checkRateLimit(ip, RATE_LIMIT, RATE_WINDOW_MS);
  if (!rateCheck.allowed) {
    return {
      status: "rate_limited",
      message: "Too many submissions. Please try again later.",
    };
  }

  // Parse FormData
  const ageRaw = formData.get("age");
  const rawData = {
    eventId: formData.get("eventId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    age: ageRaw ? Number(ageRaw) : undefined,
    parentEmail: formData.get("parentEmail") || undefined,
    emergencyContact: formData.get("emergencyContact"),
    emergencyPhone: formData.get("emergencyPhone"),
    waiverAccepted: formData.get("waiverAccepted") === "true",
  };

  const parsed = eventRegistrationSchema.safeParse(rawData);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return {
      status: "error",
      message: firstError?.message ?? "Invalid form data.",
    };
  }

  const data = parsed.data;
  const supabase = await createClient();

  // Verify the event exists and is open for registration
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, status, max_participants")
    .eq("id", data.eventId)
    .single();

  if (eventError || !event) {
    return { status: "error", message: "Event not found." };
  }

  if (event.status !== "upcoming" && event.status !== "active") {
    return { status: "event_closed" };
  }

  // Check capacity
  let registrationStatus: "confirmed" | "waitlisted" = "confirmed";

  if (event.max_participants !== null) {
    const { data: countResult } = await supabase.rpc(
      "get_event_registration_count",
      { p_event_id: data.eventId },
    );
    const currentCount = (countResult as number) ?? 0;

    if (currentCount >= event.max_participants) {
      registrationStatus = "waitlisted";
    }
  }

  // Build the row — camelCase form fields to snake_case DB columns
  const row: Record<string, unknown> = {
    event_id: data.eventId,
    name: `${data.firstName} ${data.lastName}`,
    email: data.email.toLowerCase(),
    phone: data.phone ?? null,
    age: data.age,
    emergency_contact: data.emergencyContact,
    emergency_phone: data.emergencyPhone,
    num_participants: 1,
    status: registrationStatus,
    parent_consent: data.age < 18,
    waiver_signed: true,
    waiver_signed_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("event_registrations").insert(row);

  if (error) {
    console.error("Event registration error:", error.code, error.message);
    return { status: "error", message: "Something went wrong. Please try again." };
  }

  if (registrationStatus === "waitlisted") {
    return { status: "waitlisted" };
  }

  return { status: "success" };
}
