import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Trash2, Clock, Ruler, Users, Calendar, GraduationCap } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "conservation" });
  return {
    title: t("impactHeading"),
    description: t("impactPageDescription"),
  };
}

export default async function ImpactPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <ImpactContent />;
}

// Impact data — will be pulled from Supabase when DB is set up
const impactData = {
  trashCollected: 2650,
  volunteerHours: 570,
  milesCleared: 15,
  volunteersEngaged: 225,
  eventsHeld: 12,
  youthEducated: 350,
};

function ImpactContent() {
  const t = useTranslations("conservation");

  const metrics = [
    { icon: Trash2, value: impactData.trashCollected, heading: "impactTrashHeading" as const, unit: "impactTrashUnit" as const },
    { icon: Clock, value: impactData.volunteerHours, heading: "impactHoursHeading" as const, unit: "impactHoursUnit" as const },
    { icon: Ruler, value: impactData.milesCleared, heading: "impactMilesHeading" as const, unit: "impactMilesUnit" as const },
    { icon: Users, value: impactData.volunteersEngaged, heading: "impactVolunteersHeading" as const, unit: "impactVolunteersUnit" as const },
    { icon: Calendar, value: impactData.eventsHeld, heading: "impactEventsHeading" as const, unit: "impactEventsUnit" as const },
    { icon: GraduationCap, value: impactData.youthEducated, heading: "impactYouthHeading" as const, unit: "impactYouthUnit" as const },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("impactHeading")}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {t("impactPageDescription")}
          </p>
          <p className="mt-4 text-muted-foreground">
            {t("impactIntro")}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map(({ icon: Icon, value, heading, unit }) => (
            <div
              key={heading}
              className="rounded-2xl border border-border/50 bg-white/60 p-8 text-center shadow-sm backdrop-blur-sm dark:bg-white/5"
            >
              <Icon className="mx-auto size-8 text-primary" aria-hidden="true" />
              <p className="mt-4 text-4xl font-bold tracking-tight text-primary">
                {value.toLocaleString()}
              </p>
              <p className="mt-1 text-sm font-medium">
                {t(heading)}
              </p>
              <p className="text-xs text-muted-foreground">
                {t(unit)}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          {t("impactGrowingNote")}
        </p>

        <div className="mt-8 text-center">
          <Link
            href="/volunteer"
            className="inline-flex items-center rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("impactCta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
