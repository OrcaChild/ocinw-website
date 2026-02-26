import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Calendar, MapPin } from "lucide-react";
import type { EventWithCapacity } from "@/lib/types/events";
import { EventStatusBadge, EventCapacityBadge } from "./EventStatusBadge";

interface EventCardProps {
  event: EventWithCapacity;
  locale: string;
  viewLabel: string;
  statusLabel: string;
  capacityLabels: {
    spotsRemaining: (count: number) => string;
    almostFull: (count: number) => string;
    waitlistOpen: string;
    unlimitedSpots: string;
  };
}

export function EventCard({ event, locale, viewLabel, statusLabel, capacityLabels }: EventCardProps) {
  const start = new Date(event.start_date);

  return (
    <article className="group overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-card">
      {event.image_url && (
        <Link href={`/conservation/events/${event.slug}`} className="block overflow-hidden">
          <Image
            src={event.image_url}
            alt={event.title}
            width={600}
            height={340}
            className="aspect-[16/9] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2">
          <EventStatusBadge status={event.status} statusLabel={statusLabel} />
          <EventCapacityBadge capacityStatus={event.capacityStatus} labels={capacityLabels} />
        </div>
        <h3 className="mt-3 font-heading text-lg font-bold leading-tight">
          <Link
            href={`/conservation/events/${event.slug}`}
            className="hover:text-primary"
          >
            {event.title}
          </Link>
        </h3>
        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            <Calendar className="size-3.5 shrink-0" aria-hidden="true" />
            {start.toLocaleDateString(locale, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            {" · "}
            {start.toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" })}
          </p>
          <p className="flex items-center gap-1">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            {event.location_name}
          </p>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
          {event.description}
        </p>
        <div className="mt-4">
          <Link
            href={`/conservation/events/${event.slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {viewLabel} &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
