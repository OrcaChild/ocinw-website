import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import {
  BookOpen,
  Fish,
  TreePalm,
  ExternalLink,
} from "lucide-react";
import { getArticles, getSpecies, getEcosystems } from "@/lib/content";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "learn" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LearnPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <LearnContent locale={locale as "en" | "es"} />;
}

function LearnContent({ locale }: { locale: "en" | "es" }) {
  const t = useTranslations("learn");
  const articles = getArticles(locale);
  const species = getSpecies(locale);
  const ecosystems = getEcosystems(locale);

  const categories = [
    {
      icon: BookOpen,
      titleKey: "articlesTitle" as const,
      descKey: "articlesDescription" as const,
      countKey: "articlesCount" as const,
      count: articles.length,
      href: "/learn/articles",
      bgClass: "bg-ocean-500/10",
      iconClass: "text-ocean-600 dark:text-ocean-400",
    },
    {
      icon: Fish,
      titleKey: "speciesTitle" as const,
      descKey: "speciesDescription" as const,
      countKey: "speciesCount" as const,
      count: species.length,
      href: "/learn/species",
      bgClass: "bg-teal-500/10",
      iconClass: "text-teal-600 dark:text-teal-400",
    },
    {
      icon: TreePalm,
      titleKey: "ecosystemsTitle" as const,
      descKey: "ecosystemsDescription" as const,
      countKey: "ecosystemsCount" as const,
      count: ecosystems.length,
      href: "/learn/ecosystems",
      bgClass: "bg-kelp-500/10",
      iconClass: "text-kelp-600 dark:text-kelp-400",
    },
    {
      icon: ExternalLink,
      titleKey: "resourcesTitle" as const,
      descKey: "resourcesDescription" as const,
      countKey: undefined,
      count: 0,
      href: "/learn/resources",
      bgClass: "bg-coral-500/10",
      iconClass: "text-coral-600 dark:text-coral-400",
    },
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden">
        <Image
          src="/images/activities/kids-exploring.jpg"
          alt={t("heroImageAlt")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <BookOpen className="mx-auto size-10 text-white/80" aria-hidden="true" />
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

      {/* Category Cards */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("categoriesHeading")}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {categories.map(({ icon: Icon, titleKey, descKey, countKey, count, href, bgClass, iconClass }) => (
              <Link
                key={titleKey}
                href={href}
                className="group rounded-2xl border border-border/50 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white/5"
              >
                <div className={`flex size-12 items-center justify-center rounded-full ${bgClass}`}>
                  <Icon className={`size-6 ${iconClass}`} aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold">
                  {t(titleKey)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(descKey)}
                </p>
                {countKey && count > 0 && (
                  <p className="mt-3 text-xs font-medium text-primary">
                    {t(countKey, { count })}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div aria-hidden="true">
        <svg viewBox="0 0 1440 80" className="block w-full fill-sand-50/50 dark:fill-white/[0.02]" preserveAspectRatio="none">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </>
  );
}
