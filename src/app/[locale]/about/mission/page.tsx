import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Microscope,
  HeartHandshake,
  Accessibility,
  Eye,
  Target,
  TreePine,
  BookOpen,
  Handshake,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("missionTitle"),
    description: t("missionDescription"),
  };
}

const values = [
  { titleKey: "valueYouthLed" as const, descKey: "valueYouthLedDesc" as const, icon: Users },
  { titleKey: "valueScienceBased" as const, descKey: "valueScienceBasedDesc" as const, icon: Microscope },
  { titleKey: "valueCommunity" as const, descKey: "valueCommunityDesc" as const, icon: HeartHandshake },
  { titleKey: "valueInclusion" as const, descKey: "valueInclusionDesc" as const, icon: Accessibility },
  { titleKey: "valueTransparency" as const, descKey: "valueTransparencyDesc" as const, icon: Eye },
];

const goals = [
  { titleKey: "goal1Title" as const, descKey: "goal1Desc" as const, icon: Target },
  { titleKey: "goal2Title" as const, descKey: "goal2Desc" as const, icon: TreePine },
  { titleKey: "goal3Title" as const, descKey: "goal3Desc" as const, icon: BookOpen },
  { titleKey: "goal4Title" as const, descKey: "goal4Desc" as const, icon: Handshake },
];

export default async function MissionPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <MissionContent />;
}

function MissionContent() {
  const t = useTranslations("about");

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Sub-navigation */}
      <nav className="mb-8 flex gap-4 text-sm" aria-label="About section navigation">
        <Link href="/about" className="text-muted-foreground hover:text-foreground">
          {t("subNavAbout")}
        </Link>
        <span className="font-semibold text-foreground">{t("subNavMission")}</span>
        <Link href="/about/team" className="text-muted-foreground hover:text-foreground">
          {t("subNavTeam")}
        </Link>
      </nav>

      <h1 className="font-heading text-4xl font-bold tracking-tight">
        {t("missionTitle")}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {t("missionDescription")}
      </p>

      {/* Mission */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">
          {t("missionPreviewHeading")}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {t("missionPreviewText")}
        </p>
      </section>

      {/* Vision */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">{t("visionHeading")}</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {t("visionText")}
        </p>
      </section>

      <Separator className="my-12" />

      {/* Core Values */}
      <section>
        <h2 className="font-heading text-2xl font-bold">{t("valuesHeading")}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <Card key={value.titleKey}>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ocean-50 dark:bg-ocean-950/30">
                    <Icon className="size-5 text-ocean-600 dark:text-ocean-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">
                      {t(value.titleKey)}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t(value.descKey)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Strategic Goals */}
      <section>
        <h2 className="font-heading text-2xl font-bold">
          {t("strategicGoalsHeading")}
        </h2>
        <div className="mt-8 space-y-6">
          {goals.map((goal, index) => {
            return (
              <div key={goal.titleKey} className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-50 font-heading text-sm font-bold text-teal-700 dark:bg-teal-950/30 dark:text-teal-400">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-heading font-semibold">
                    {t(goal.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(goal.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
