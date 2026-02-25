import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { getSpecies } from "@/lib/content";
import { SpeciesCard } from "@/components/education/SpeciesCard";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "learn" });
  return {
    title: t("speciesHeading"),
    description: t("speciesPageDescription"),
  };
}

export default async function SpeciesPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <SpeciesContent locale={locale as "en" | "es"} />;
}

function SpeciesContent({ locale }: { locale: "en" | "es" }) {
  const t = useTranslations("learn");
  const speciesList = getSpecies(locale);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("speciesHeading")}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {t("speciesPageDescription")}
          </p>
        </div>

        {speciesList.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            {t("noSpecies")}
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {speciesList.map((sp) => (
              <SpeciesCard
                key={sp.slug}
                species={sp}
                viewLabel={t("viewSpecies")}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
