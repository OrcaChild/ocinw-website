import { createClient } from "@/lib/api/supabase-server";
import type { Event, EventWithCapacity } from "@/lib/types/events";
import { computeCapacityStatus } from "@/lib/types/events";

/** Columns to SELECT — never SELECT * */
const EVENT_COLUMNS =
  "id, title, slug, description, location_name, location_address, latitude, longitude, start_date, end_date, max_participants, requires_parent_consent, image_url, status, created_at, updated_at" as const;

/** Get all upcoming/active events, ordered by start_date ascending */
export async function getUpcomingEvents(): Promise<Event[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .in("status", ["upcoming", "active"])
    .order("start_date", { ascending: true })
    .limit(20);

  if (error) {
    console.error("Events fetch error:", error.code, error.message);
    return [];
  }

  return (data ?? []) as Event[];
}

/** Get a single event by slug */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // Not found
    console.error("Event fetch error:", error.code, error.message);
    return null;
  }

  return data as Event;
}

/** Get registration count for a single event via RPC function */
export async function getRegistrationCount(eventId: string): Promise<number> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_event_registration_count", {
    p_event_id: eventId,
  });

  if (error) {
    console.error("Registration count error:", error.code, error.message);
    return 0;
  }

  return typeof data === "number" ? data : 0;
}

/** Get all upcoming/active events with capacity information */
export async function getEventsWithCapacity(): Promise<EventWithCapacity[]> {
  const events = await getUpcomingEvents();

  // Fetch registration counts in parallel (acceptable for <20 events)
  const eventsWithCapacity = await Promise.all(
    events.map(async (event) => {
      const registrationCount = await getRegistrationCount(event.id);
      const spotsRemaining =
        event.max_participants !== null
          ? Math.max(0, event.max_participants - registrationCount)
          : null;

      return {
        ...event,
        registrationCount,
        spotsRemaining,
        capacityStatus: computeCapacityStatus(
          event.max_participants,
          registrationCount,
        ),
      };
    }),
  );

  return eventsWithCapacity;
}

/** Get a single event by slug with capacity information */
export async function getEventBySlugWithCapacity(
  slug: string,
): Promise<EventWithCapacity | null> {
  const event = await getEventBySlug(slug);
  if (!event) return null;

  const registrationCount = await getRegistrationCount(event.id);
  const spotsRemaining =
    event.max_participants !== null
      ? Math.max(0, event.max_participants - registrationCount)
      : null;

  return {
    ...event,
    registrationCount,
    spotsRemaining,
    capacityStatus: computeCapacityStatus(
      event.max_participants,
      registrationCount,
    ),
  };
}
