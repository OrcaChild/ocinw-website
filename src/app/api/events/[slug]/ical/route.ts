import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/api/supabase-server";

function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse> {
  const { slug } = await params;

  // Validate slug format (alphanumeric + hyphens, max 200 chars)
  if (!/^[a-z0-9-]{1,200}$/.test(slug)) {
    return NextResponse.json({ error: "Invalid event slug" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: event, error } = await supabase
    .from("events")
    .select("title, description, location_name, location_address, start_date, end_date, slug")
    .eq("slug", slug)
    .in("status", ["upcoming", "active"])
    .single();

  if (error || !event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  const now = formatICSDate(new Date());
  const start = formatICSDate(new Date(event.start_date));
  const end = formatICSDate(new Date(event.end_date));
  const uid = `${event.slug}@orcachildinthewild.com`;
  const location = event.location_name + (event.location_address ? `, ${event.location_address}` : "");

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Orca Child in the Wild//Events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeICS(event.title)}`,
    `DESCRIPTION:${escapeICS(event.description)}`,
    `LOCATION:${escapeICS(location)}`,
    `URL:https://www.orcachildinthewild.com/conservation/events/${event.slug}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new NextResponse(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.slug.replace(/[^a-z0-9-]/g, "")}.ics"`,
    },
  });
}
