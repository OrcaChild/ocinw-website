/** Event status values matching the database column */
export type EventStatus = "upcoming" | "active" | "completed" | "cancelled";

/** Event record from Supabase */
export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  location_name: string;
  location_address: string | null;
  latitude: number | null;
  longitude: number | null;
  start_date: string;
  end_date: string;
  max_participants: number | null;
  requires_parent_consent: boolean;
  image_url: string | null;
  status: EventStatus;
  created_at: string;
  updated_at: string;
}

/** Capacity status for display */
export type CapacityStatus =
  | { type: "unlimited" }
  | { type: "available"; remaining: number }
  | { type: "almost_full"; remaining: number }
  | { type: "waitlist" };

/** Event with computed capacity information */
export interface EventWithCapacity extends Event {
  registrationCount: number;
  spotsRemaining: number | null;
  capacityStatus: CapacityStatus;
}

/** Compute capacity status from event data */
export function computeCapacityStatus(
  maxParticipants: number | null,
  registrationCount: number,
): CapacityStatus {
  if (maxParticipants === null) return { type: "unlimited" };
  const remaining = maxParticipants - registrationCount;
  if (remaining <= 0) return { type: "waitlist" };
  if (remaining <= 5) return { type: "almost_full", remaining };
  return { type: "available", remaining };
}
