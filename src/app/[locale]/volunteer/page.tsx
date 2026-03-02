import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  BookOpen,
  Users,
  Award,
  Accessibility,
  Ear,
  UtensilsCrossed,
  Languages,
} from "lucide-react";
import { VolunteerForm } from "@/components/volunteer/VolunteerForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "volunteer" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function VolunteerPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <VolunteerContent />;
}

const faqKeys = [1, 2, 3, 4, 5] as const;

function VolunteerContent() {
  const t = useTranslations("volunteer");

  return (
    <>
      {/* Hero — full-bleed volunteer action shot */}
      <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden">
        <Image
          src="/images/activities/volunteers-cleanup.jpg"
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
          <Users
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

      {/* Why Volunteer */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("whyHeading")}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {([
              { icon: Sparkles, titleKey: "whyImpactTitle", textKey: "whyImpactText", bgClass: "bg-teal-500/10", iconClass: "text-teal-600 dark:text-teal-400" },
              { icon: BookOpen, titleKey: "whySkillsTitle", textKey: "whySkillsText", bgClass: "bg-ocean-500/10", iconClass: "text-ocean-600 dark:text-ocean-400" },
              { icon: Users, titleKey: "whyCommunityTitle", textKey: "whyCommunityText", bgClass: "bg-sand-500/10", iconClass: "text-sand-600 dark:text-sand-400" },
              { icon: Award, titleKey: "whyCertTitle", textKey: "whyCertText", bgClass: "bg-coral-500/10", iconClass: "text-coral-600 dark:text-coral-400" },
            ] as const).map(({ icon: Icon, titleKey, textKey, bgClass, iconClass }) => (
              <div
                key={titleKey}
                className="rounded-2xl border border-border/50 bg-white/60 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white/5"
              >
                <div className={`mx-auto flex size-12 items-center justify-center rounded-full ${bgClass}`}>
                  <Icon
                    className={`size-6 ${iconClass}`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold">
                  {t(titleKey)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(textKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility & Accommodations */}
      <section className="bg-sand-50/50 px-4 py-20 dark:bg-white/[0.02] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("accommodationsHeading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            {t("accommodationsDescription")}
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {([
              { icon: Accessibility, titleKey: "accommodationMobility", textKey: "accommodationMobilityText", iconClass: "text-ocean-600 dark:text-ocean-400" },
              { icon: Ear, titleKey: "accommodationSensory", textKey: "accommodationSensoryText", iconClass: "text-teal-600 dark:text-teal-400" },
              { icon: UtensilsCrossed, titleKey: "accommodationDietary", textKey: "accommodationDietaryText", iconClass: "text-coral-600 dark:text-coral-400" },
              { icon: Languages, titleKey: "accommodationLanguage", textKey: "accommodationLanguageText", iconClass: "text-kelp-600 dark:text-kelp-400" },
            ] as const).map(({ icon: Icon, titleKey, textKey, iconClass }) => (
              <div
                key={titleKey}
                className="flex gap-4 rounded-2xl border border-border/50 bg-white/60 p-6 shadow-sm backdrop-blur-sm dark:bg-white/5"
              >
                <div className="shrink-0">
                  <Icon
                    className={`size-6 ${iconClass}`}
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">
                    {t(titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(textKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t("accommodationContact")}{" "}
            <Link href="/contact" className="font-medium text-primary hover:underline">
              orcachildinthewild@gmail.com
            </Link>
          </p>
        </div>
      </section>

      {/* Signup Form */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {t("formHeading")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("formDescription")}
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-white p-6 shadow-lg dark:bg-card sm:p-8">
            <VolunteerForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand-50/50 px-4 py-20 dark:bg-white/[0.02] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("faqHeading")}
          </h2>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {faqKeys.map((num) => (
              <AccordionItem key={num} value={`faq-${num}`}>
                <AccordionTrigger className="text-left">
                  {t(`faq${num}Question`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t(`faq${num}Answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Wave divider before footer */}
      <div aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          className="block w-full fill-sand-50/50 dark:fill-white/[0.02]"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </>
  );
}
