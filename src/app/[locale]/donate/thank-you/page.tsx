import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  Mail,
  Share2,
  Home,
  ArrowRight,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "donate" });
  return {
    title: t("thankYouTitle"),
    description: t("thankYouMessage"),
  };
}

export default async function DonateThankYouPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <ThankYouContent />;
}

function ThankYouContent() {
  const t = useTranslations("donate");

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Hero message */}
      <div className="text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary/10">
          <Heart
            className="size-10 text-primary"
            aria-hidden="true"
          />
        </div>
        <h1 className="mt-8 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          {t("thankYouTitle")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {t("thankYouMessage")}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          {t("thankYouReceiptNote")}
        </p>
      </div>

      {/* What's Next */}
      <section className="mt-16">
        <h2 className="text-center font-heading text-2xl font-bold tracking-tight">
          {t("thankYouNextHeading")}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {/* Volunteer */}
          <div className="rounded-2xl border border-border/50 bg-white/60 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white/5">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-teal-500/10">
              <Users
                className="size-6 text-teal-600 dark:text-teal-400"
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-4 font-heading text-lg font-bold">
              {t("thankYouVolunteer")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("thankYouVolunteerText")}
            </p>
            <div className="mt-4">
              <Button
                asChild
                variant="outline"
                className="rounded-full"
              >
                <Link href="/volunteer">
                  {t("thankYouVolunteer")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Newsletter */}
          <div className="rounded-2xl border border-border/50 bg-white/60 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white/5">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Mail
                className="size-6 text-primary"
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-4 font-heading text-lg font-bold">
              {t("thankYouNewsletter")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("thankYouNewsletterText")}
            </p>
            <div className="mt-4">
              <Button
                asChild
                variant="outline"
                className="rounded-full"
              >
                <Link href="/contact">
                  {t("thankYouNewsletter")}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Share */}
          <div className="rounded-2xl border border-border/50 bg-white/60 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white/5">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-rose-500/10">
              <Share2
                className="size-6 text-rose-600 dark:text-rose-400"
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-4 font-heading text-lg font-bold">
              {t("thankYouShare")}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("thankYouShareText2")}
            </p>
          </div>
        </div>
      </section>

      {/* Navigation buttons */}
      <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button asChild className="rounded-full px-8">
          <Link href="/">
            <Home className="size-4" aria-hidden="true" />
            {t("thankYouBackHome")}
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-full px-8"
        >
          <Link href="/donate">
            <Heart className="size-4" aria-hidden="true" />
            {t("thankYouDonateAgain")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
