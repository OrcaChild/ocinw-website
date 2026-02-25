import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { getEcosystems } from "@/lib/content";
import { EcosystemCard } from "@/components/education/EcosystemCard";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "learn" });
  return {
    title: t("ecosystemsHeading"),
    description: t("ecosystemsPageDescription"),
  };
}

export default async function EcosystemsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <EcosystemsContent locale={locale as "en" | "es"} />;
}

function EcosystemsContent({ locale }: { locale: "en" | "es" }) {
  const t = useTranslations("learn");
  const ecosystems = getEcosystems(locale);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("ecosystemsHeading")}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {t("ecosystemsPageDescription")}
          </p>
        </div>

        {ecosystems.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            {t("noEcosystems")}
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {ecosystems.map((eco) => (
              <EcosystemCard
                key={eco.slug}
                ecosystem={eco}
                viewLabel={t("viewEcosystem")}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
