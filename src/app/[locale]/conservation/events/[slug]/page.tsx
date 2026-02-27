import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  CalendarPlus,
  Cloud,
  ExternalLink,
  XCircle,
  CheckCircle2,
  Camera,
  BarChart3,
} from "lucide-react";
import { getEventBySlugWithCapacity } from "@/lib/api/events";
import { EventStatusBadge, EventCapacityBadge } from "@/components/events/EventStatusBadge";
import { EventRegistrationForm } from "@/components/events/EventRegistrationForm";
import type { EventWithCapacity } from "@/lib/types/events";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Map our DB status to schema.org EventStatus
const schemaEventStatus: Record<string, string> = {
  upcoming: "https://schema.org/EventScheduled",
  active: "https://schema.org/EventScheduled",
  completed: "https://schema.org/EventScheduled",
  cancelled: "https://schema.org/EventCancelled",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const event = await getEventBySlugWithCapacity(slug);
  if (!event) return {};
  const description = event.description.slice(0, 160);
  return {
    title: event.title,
    description,
    openGraph: {
      type: "article",
      title: event.title,
      description,
      ...(event.image_url && { images: [event.image_url] }),
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const event = await getEventBySlugWithCapacity(slug);
  if (!event) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.start_date,
    endDate: event.end_date,
    eventStatus: schemaEventStatus[event.status] ?? "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location_name,
      ...(event.location_address && { address: event.location_address }),
    },
    organizer: {
      "@type": "Organization",
      name: "Orca Child in the Wild",
      url: "https://www.orcachildinthewild.com",
    },
    ...(event.image_url && { image: event.image_url }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EventDetailContent event={event} />
    </>
  );
}

const statusLabels = {
  upcoming: "statusUpcoming",
  active: "statusActive",
  completed: "statusCompleted",
  cancelled: "statusCancelled",
} as const;

function EventDetailContent({ event }: { event: EventWithCapacity }) {
  const t = useTranslations("events");
  const locale = useLocale();

  const start = new Date(event.start_date);
  const end = new Date(event.end_date);
  const isSameDay = start.toDateString() === end.toDateString();

  const fullDate = start.toLocaleDateString(locale, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const startTime = start.toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });
  const endTime = end.toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });
  const shortStart = start.toLocaleDateString(locale, { month: "short", day: "numeric" });
  const shortEnd = end.toLocaleDateString(locale, { month: "short", day: "numeric", year: "numeric" });

  const dateDisplay = isSameDay
    ? `${fullDate} · ${startTime} – ${endTime}`
    : `${shortStart} – ${shortEnd}`;

  const isRegistrationOpen =
    event.status === "upcoming" || event.status === "active";
  const isCancelled = event.status === "cancelled";
  const isCompleted = event.status === "completed";
  const isWaitlist = event.capacityStatus.type === "waitlist";

  const capacityLabels = {
    spotsRemaining: (count: number) => t("spotsRemaining", { count }),
    almostFull: (count: number) => t("almostFull", { count }),
    waitlistOpen: t("waitlistOpen"),
    unlimitedSpots: t("unlimitedSpots"),
  };

  // Google Maps directions URL
  const directionsUrl = event.latitude && event.longitude
    ? `https://www.google.com/maps/dir/?api=1&destination=${event.latitude},${event.longitude}`
    : event.location_address
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.location_address)}`
      : null;

  return (
    <article className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/conservation/events"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("backToEvents")}
        </Link>

        {/* Hero image */}
        {event.image_url && (
          <div className="mt-6 overflow-hidden rounded-2xl">
            <Image
              src={event.image_url}
              alt=""
              width={900}
              height={500}
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mt-8">
          <div className="flex items-center gap-2">
            <EventStatusBadge
              status={event.status}
              statusLabel={t(statusLabels[event.status])}
            />
            <EventCapacityBadge capacityStatus={event.capacityStatus} labels={capacityLabels} />
          </div>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {event.title}
          </h1>
        </header>

        {/* Cancelled banner */}
        {isCancelled && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20" role="alert">
            <XCircle className="mt-0.5 size-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
            <p className="font-medium text-red-800 dark:text-red-200">{t("cancelledBanner")}</p>
          </div>
        )}

        {/* Completed banner */}
        {isCompleted && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/20" role="status">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gray-600 dark:text-gray-400" aria-hidden="true" />
            <p className="font-medium text-gray-700 dark:text-gray-300">{t("completedBanner")}</p>
          </div>
        )}

        {/* Event metadata */}
        <div className="mt-6 space-y-3 text-muted-foreground">
          <p className="flex items-center gap-2">
            <Calendar className="size-5 shrink-0" aria-hidden="true" />
            <span>{dateDisplay}</span>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="size-5 shrink-0" aria-hidden="true" />
            <span>
              {event.location_name}
              {event.location_address && (
                <span className="text-muted-foreground/70"> · {event.location_address}</span>
              )}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Users className="size-5 shrink-0" aria-hidden="true" />
            <EventCapacityBadge capacityStatus={event.capacityStatus} labels={capacityLabels} />
          </p>
        </div>

        {/* Description */}
        <div className="prose prose-lg mt-10 max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary">
          <p>{event.description}</p>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          {directionsUrl && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <MapPin className="size-4" aria-hidden="true" />
              {t("getDirections")}
              <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          )}

          {isRegistrationOpen && (
            <a
              href={`/api/events/${event.slug}/ical`}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <CalendarPlus className="size-4" aria-hidden="true" />
              {t("addToCalendar")}
            </a>
          )}

          <Link
            href="/weather"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Cloud className="size-4" aria-hidden="true" />
            {t("checkWeather")}
          </Link>
        </div>

        {/* What to Bring / What to Expect placeholders */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/50 p-6">
            <h2 className="font-heading text-xl font-bold">{t("whatToBring")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("whatToBringPlaceholder")}</p>
          </div>
          <div className="rounded-2xl border border-border/50 p-6">
            <h2 className="font-heading text-xl font-bold">{t("whatToExpect")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("whatToExpectPlaceholder")}</p>
          </div>
        </div>

        {/* Registration form */}
        <div className="mt-12 border-t pt-10">
          {isRegistrationOpen ? (
            <EventRegistrationForm
              eventId={event.id}
              isWaitlist={isWaitlist}
            />
          ) : (
            <div className="rounded-2xl bg-muted/50 p-6 text-center">
              <p className="text-muted-foreground">{t("registrationClosed")}</p>
            </div>
          )}
        </div>

        {/* Post-event placeholders (only show for completed events) */}
        {isCompleted && (
          <div className="mt-12 space-y-8 border-t pt-10">
            <div className="rounded-2xl border border-border/50 p-6 text-center">
              <Camera className="mx-auto size-8 text-muted-foreground/40" aria-hidden="true" />
              <h2 className="mt-3 font-heading text-xl font-bold">{t("photoGalleryHeading")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("photoGalleryPlaceholder")}</p>
            </div>
            <div className="rounded-2xl border border-border/50 p-6 text-center">
              <BarChart3 className="mx-auto size-8 text-muted-foreground/40" aria-hidden="true" />
              <h2 className="mt-3 font-heading text-xl font-bold">{t("impactReportHeading")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("impactReportPlaceholder")}</p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
