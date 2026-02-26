import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { CalendarDays, Users } from "lucide-react";
import { getEventsWithCapacity } from "@/lib/api/events";
import { EventCard } from "@/components/events/EventCard";
import type { EventWithCapacity } from "@/lib/types/events";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "events" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const events = await getEventsWithCapacity();

  return <EventsContent events={events} />;
}

const statusLabels = {
  upcoming: "statusUpcoming",
  active: "statusActive",
  completed: "statusCompleted",
  cancelled: "statusCancelled",
} as const;

function EventsContent({ events }: { events: EventWithCapacity[] }) {
  const t = useTranslations("events");
  const locale = useLocale();

  const capacityLabels = {
    spotsRemaining: (count: number) => t("spotsRemaining", { count }),
    almostFull: (count: number) => t("almostFull", { count }),
    waitlistOpen: t("waitlistOpen"),
    unlimitedSpots: t("unlimitedSpots"),
  };

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden">
        <Image
          src="/images/activities/beach-cleanup.jpg"
          alt={t("heroImageAlt")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <CalendarDays className="mx-auto size-10 text-white/80" aria-hidden="true" />
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
            {t("heroHeading")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 drop-shadow-md">
            {t("heroText")}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 z-10 w-full" aria-hidden="true">
          <svg viewBox="0 0 1440 120" className="block w-full fill-background" preserveAspectRatio="none">
            <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {events.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  locale={locale}
                  viewLabel={t("viewEvent")}
                  statusLabel={t(statusLabels[event.status])}
                  capacityLabels={capacityLabels}
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md py-20 text-center">
              <CalendarDays className="mx-auto size-12 text-muted-foreground/40" aria-hidden="true" />
              <p className="mt-4 text-lg text-muted-foreground">{t("noEvents")}</p>
              <Link
                href="/volunteer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Users className="size-4" aria-hidden="true" />
                {t("noEventsVolunteerCta")}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Wave divider */}
      <div aria-hidden="true">
        <svg viewBox="0 0 1440 80" className="block w-full fill-primary/5" preserveAspectRatio="none">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      {/* CTA */}
      <section className="bg-primary/5 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            {t("noEventsVolunteerCta")}
          </h2>
          <Link
            href="/volunteer"
            className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Users className="mr-2 size-4" aria-hidden="true" />
            {t("registerNow")}
          </Link>
        </div>
      </section>
    </>
  );
}
