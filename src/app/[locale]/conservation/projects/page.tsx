import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { CalendarDays, Users, Waves } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "conservation" });
  return {
    title: t("projectsHeading"),
    description: t("projectsPageDescription"),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Waves className="mx-auto size-12 text-primary" aria-hidden="true" />
        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Conservation Projects
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          We&apos;re building our first conservation programs right now. Beach cleanups, water quality
          monitoring, and habitat restoration projects are in planning — and we need passionate
          people like you to make them happen.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-2xl gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-white/60 p-8 shadow-sm backdrop-blur-sm dark:bg-white/5">
          <CalendarDays className="size-8 text-primary" aria-hidden="true" />
          <h2 className="font-heading text-xl font-bold">See Our Events</h2>
          <p className="flex-1 text-sm text-muted-foreground">
            Our first community cleanup events are being scheduled now. Check our events page to
            find out where and when we&apos;re showing up next.
          </p>
          <Link
            href="/conservation/events"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Upcoming Events &rarr;
          </Link>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-white/60 p-8 shadow-sm backdrop-blur-sm dark:bg-white/5">
          <Users className="size-8 text-primary" aria-hidden="true" />
          <h2 className="font-heading text-xl font-bold">Volunteer With Us</h2>
          <p className="flex-1 text-sm text-muted-foreground">
            Be part of the founding volunteer team. Sign up now and we&apos;ll reach out as our first
            projects launch along the coast from Los Angeles to San Diego.
          </p>
          <Link
            href="/volunteer"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Join the Team &rarr;
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center">
        <p className="font-medium">Want to propose a project?</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Have an idea for a cleanup location or conservation program in Southern California?
          We&apos;d love to hear from you.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Get in touch &rarr;
        </Link>
      </div>
    </section>
  );
}
