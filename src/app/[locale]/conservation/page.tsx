import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Sparkles, CalendarDays, Users } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "conservation" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ConservationPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <ConservationContent locale={locale as "en" | "es"} />;
}

function ConservationContent({ locale: _locale }: { locale: "en" | "es" }) {
  const t = useTranslations("conservation");

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
          <Sparkles className="mx-auto size-10 text-white/80" aria-hidden="true" />
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

      {/* Quick nav cards */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
          {[
            { icon: CalendarDays, label: t("eventsTitle"), desc: t("eventsDescription"), href: "/conservation/events" },
            { icon: Users, label: t("getInvolvedHeading"), desc: t("getInvolvedText"), href: "/volunteer" },
          ].map(({ icon: Icon, label, desc, href }) => (
            <Link
              key={label}
              href={href}
              className="rounded-2xl border border-border/50 bg-white/60 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white/5"
            >
              <Icon className="mx-auto size-8 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-heading text-lg font-bold">{label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
