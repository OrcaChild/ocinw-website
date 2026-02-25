import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Users,
  Heart,
  Home,
  CheckCircle2,
  Mail,
  Calendar,
} from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "volunteer" });
  return {
    title: t("thankYouTitle"),
    description: t("thankYouMessage"),
  };
}

export default async function VolunteerThankYouPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <ThankYouContent />;
}

function ThankYouContent() {
  const t = useTranslations("volunteer");

  const steps = [
    { icon: CheckCircle2, text: t("thankYouNextStep1") },
    { icon: Mail, text: t("thankYouNextStep2") },
    { icon: Calendar, text: t("thankYouNextStep3") },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Hero message */}
      <div className="text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-teal-500/10">
          <Users
            className="size-10 text-teal-600 dark:text-teal-400"
            aria-hidden="true"
          />
        </div>
        <h1 className="mt-8 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          {t("thankYouTitle")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {t("thankYouMessage")}
        </p>
      </div>

      {/* What Happens Next */}
      <section className="mt-16">
        <h2 className="text-center font-heading text-2xl font-bold tracking-tight">
          {t("thankYouNextTitle")}
        </h2>
        <div className="mt-8 space-y-6">
          {steps.map(({ icon: Icon, text }, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl border border-border/50 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:bg-white/5"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal-500/10">
                <Icon
                  className="size-5 text-teal-600 dark:text-teal-400"
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Step {index + 1}
                </p>
                <p className="mt-1">{text}</p>
              </div>
            </div>
          ))}
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
            {t("thankYouDonate")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
