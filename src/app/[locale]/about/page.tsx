import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Milestone, Heart, Compass } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const milestones = [
  { key: "milestone1" as const, icon: Heart },
  { key: "milestone2" as const, icon: Compass },
  { key: "milestone3" as const, icon: Milestone },
];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Sub-navigation */}
      <nav className="mb-8 flex gap-4 text-sm" aria-label="About section navigation">
        <span className="font-semibold text-foreground">{t("subNavAbout")}</span>
        <Link href="/about/mission" className="text-muted-foreground hover:text-foreground">
          {t("subNavMission")}
        </Link>
        <Link href="/about/team" className="text-muted-foreground hover:text-foreground">
          {t("subNavTeam")}
        </Link>
      </nav>

      <h1 className="font-heading text-4xl font-bold tracking-tight">
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>

      {/* Origin story */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">{t("originHeading")}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {t("originText")}
        </p>
      </section>

      {/* Milestones */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">
          {t("milestonesHeading")}
        </h2>
        <div className="mt-6 space-y-4">
          {milestones.map((milestone) => {
            const Icon = milestone.icon;
            return (
              <div key={milestone.key} className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ocean-50 dark:bg-ocean-950/30">
                  <Icon className="size-5 text-ocean-600 dark:text-ocean-400" />
                </div>
                <p className="pt-2 text-sm text-muted-foreground">
                  {t(milestone.key)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Mission preview */}
      <section>
        <h2 className="font-heading text-2xl font-bold">
          {t("missionPreviewHeading")}
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {t("missionPreviewText")}
        </p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/about/mission">{t("subNavMission")}</Link>
        </Button>
      </section>

      <Separator className="my-12" />

      {/* Vision */}
      <section>
        <h2 className="font-heading text-2xl font-bold">{t("visionHeading")}</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {t("visionText")}
        </p>
      </section>

      <Separator className="my-12" />

      {/* Focus Area */}
      <section>
        <h2 className="font-heading text-2xl font-bold">
          {t("focusAreaHeading")}
        </h2>
        <p className="mt-4 text-muted-foreground">{t("focusAreaDescription")}</p>
        <Card className="mt-6">
          <CardContent className="flex items-center justify-center p-12">
            <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
              <MapPin className="size-10" />
              <p className="text-sm">{t("focusAreaMapAlt")}</p>
              <p className="text-xs">Interactive map coming in Phase 6</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
