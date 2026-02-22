import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { WeatherDashboard } from "@/components/weather/WeatherDashboard";
import { WeatherErrorBoundary } from "@/components/weather/WeatherErrorBoundary";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "weather" });
  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
  };
}

export default async function WeatherPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <WeatherPageContent />;
}

function WeatherPageContent() {
  const t = useTranslations("weather");

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("pageTitle")}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {t("pageDescription")}
          </p>
        </div>

        {/* Dashboard */}
        <WeatherErrorBoundary>
          <WeatherDashboard />
        </WeatherErrorBoundary>
      </div>
    </div>
  );
}
