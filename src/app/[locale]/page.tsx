import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { HeroSection } from "@/components/home/HeroSection";
import { MissionCards } from "@/components/home/MissionCards";
import { WeatherPreview } from "@/components/home/WeatherPreview";
import { FeaturedContent } from "@/components/home/FeaturedContent";
import { GetInvolvedCTA } from "@/components/home/GetInvolvedCTA";
import { PartnersSection } from "@/components/home/PartnersSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "home" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return {
    title: tCommon("siteName"),
    description: t("subtitle"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <MissionCards />
      <WeatherPreview />
      <FeaturedContent />
      <GetInvolvedCTA />
      <PartnersSection />
    </>
  );
}
