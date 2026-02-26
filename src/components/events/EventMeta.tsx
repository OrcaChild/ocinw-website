import { Calendar, MapPin, Users } from "lucide-react";
import type { CapacityStatus } from "@/lib/types/events";
import { EventCapacityBadge } from "./EventStatusBadge";

interface EventMetaProps {
  startDate: string;
  endDate: string;
  locationName: string;
  locationAddress: string | null;
  capacityStatus: CapacityStatus;
  labels: {
    dateLabel: string;
    locationLabel: string;
    spotsLabel: string;
    spotsRemaining: (count: number) => string;
    almostFull: (count: number) => string;
    waitlistOpen: string;
    unlimitedSpots: string;
  };
}

export function EventMeta({
  startDate,
  endDate,
  locationName,
  locationAddress,
  capacityStatus,
  labels,
}: EventMetaProps) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const isSameDay =
    start.toDateString() === end.toDateString();

  const fullDate = start.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const startTime = start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const endTime = end.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const shortStart = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const shortEnd = end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const dateDisplay = isSameDay
    ? `${fullDate} · ${startTime} – ${endTime}`
    : `${shortStart} – ${shortEnd}`;

  return (
    <div className="space-y-2 text-sm text-muted-foreground">
      <p className="flex items-center gap-2">
        <Calendar className="size-4 shrink-0" aria-hidden="true" />
        <span>
          <span className="sr-only">{labels.dateLabel}: </span>
          {dateDisplay}
        </span>
      </p>
      <p className="flex items-center gap-2">
        <MapPin className="size-4 shrink-0" aria-hidden="true" />
        <span>
          <span className="sr-only">{labels.locationLabel}: </span>
          {locationName}
          {locationAddress && (
            <span className="text-muted-foreground/70"> · {locationAddress}</span>
          )}
        </span>
      </p>
      <p className="flex items-center gap-2">
        <Users className="size-4 shrink-0" aria-hidden="true" />
        <span>
          <span className="sr-only">{labels.spotsLabel}: </span>
          <EventCapacityBadge capacityStatus={capacityStatus} labels={labels} />
        </span>
      </p>
    </div>
  );
}
