import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Building2,
  Users,
  Package,
  Share2,
  Receipt,
  ArrowRight,
} from "lucide-react";
import { DonationTiers } from "@/components/donate/DonationTiers";
import { DonationWidget } from "@/components/donate/DonationWidget";
import { DonorRecognition } from "@/components/donate/DonorRecognition";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "donate" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function DonatePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <DonateContent />;
}

function DonateContent() {
  const t = useTranslations("donate");

  const zeffyUrl = process.env.NEXT_PUBLIC_ZEFFY_EMBED_URL;

  return (
    <>
      {/* Hero — full-bleed ocean sunset */}
      <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden">
        <Image
          src="/images/landscapes/ocean-sunset.jpg"
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
          <Heart
            className="mx-auto size-10 text-white/80"
            aria-hidden="true"
          />
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 drop-shadow-md">
            {t("description")}
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 z-10 w-full" aria-hidden="true">
          <svg
            viewBox="0 0 1440 120"
            className="block w-full fill-background"
            preserveAspectRatio="none"
          >
            <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Why Your Donation Matters */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("whyHeading")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {t("whyText")}
          </p>
          <p className="mt-4 text-xl font-semibold text-primary">
            {t("whyHighlight")}
          </p>
        </div>
      </section>

      {/* Impact Tiers */}
      <DonationTiers />

      {/* Donation Form (Zeffy embed) */}
      <DonationWidget embedUrl={zeffyUrl} />

      {/* Donor Recognition */}
      <DonorRecognition />

      {/* Corporate Matching */}
      <section className="bg-sand-50/50 px-4 py-20 dark:bg-white/[0.02] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10">
            <Building2
              className="size-7 text-primary"
              aria-hidden="true"
            />
          </div>
          <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("matchingHeading")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("matchingText")}
          </p>
          <p className="mt-4 font-medium text-primary">
            {t("matchingPrompt")}
          </p>
        </div>
      </section>

      {/* Other Ways to Support */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("otherHeading")}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-white/60 p-8 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white/5">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-teal-500/10">
                <Users
                  className="size-6 text-teal-600 dark:text-teal-400"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold">
                {t("otherVolunteerTitle")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("otherVolunteerText")}
              </p>
              <div className="mt-4">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full"
                >
                  <Link href="/volunteer">
                    {t("otherVolunteerTitle")}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-white/60 p-8 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white/5">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-amber-500/10">
                <Package
                  className="size-6 text-amber-600 dark:text-amber-400"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold">
                {t("otherSuppliesTitle")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("otherSuppliesText")}
              </p>
              <div className="mt-4">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full"
                >
                  <Link href="/contact">
                    {t("otherSuppliesTitle")}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-white/60 p-8 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white/5">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-rose-500/10">
                <Share2
                  className="size-6 text-rose-600 dark:text-rose-400"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold">
                {t("otherShareTitle")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("otherShareText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Info */}
      <section className="bg-sand-50/50 px-4 py-16 dark:bg-white/[0.02] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl items-start gap-4 rounded-2xl border border-border/50 bg-white/80 p-8 shadow-sm backdrop-blur-sm dark:bg-white/5">
          <Receipt
            className="mt-1 size-6 shrink-0 text-primary"
            aria-hidden="true"
          />
          <div>
            <h2 className="font-heading text-xl font-bold">
              {t("taxHeading")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("taxText")}
            </p>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              {t("taxEin")}
            </p>
          </div>
        </div>
      </section>

      {/* Wave divider before footer */}
      <div className="bg-sand-50/50 dark:bg-white/[0.02]" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          className="block w-full fill-background"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </>
  );
}
