import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Trash2, Clock, Users } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "conservation" });
  return {
    title: t("impactHeading"),
    description: t("impactPageDescription"),
  };
}

export default async function ImpactPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Our Impact Story Starts Here
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Every great conservation movement began with a first step. Orca Child in the Wild is just
          beginning — and every number we track from here will be real, earned, and meaningful.
        </p>
        <p className="mt-4 text-muted-foreground">
          We&apos;re building our programs, recruiting our first volunteers, and preparing for our
          inaugural cleanup events along the Southern California coast. These are the things we
          will measure together:
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/50 bg-white/60 p-8 text-center shadow-sm backdrop-blur-sm dark:bg-white/5">
          <Trash2 className="mx-auto size-10 text-primary" aria-hidden="true" />
          <p className="mt-4 font-heading text-2xl font-bold text-primary">— lbs</p>
          <p className="mt-2 font-medium">Trash Removed</p>
          <p className="mt-1 text-sm text-muted-foreground">from SoCal waterways and beaches</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-white/60 p-8 text-center shadow-sm backdrop-blur-sm dark:bg-white/5">
          <Clock className="mx-auto size-10 text-primary" aria-hidden="true" />
          <p className="mt-4 font-heading text-2xl font-bold text-primary">— hrs</p>
          <p className="mt-2 font-medium">Volunteer Hours</p>
          <p className="mt-1 text-sm text-muted-foreground">logged by our growing community</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-white/60 p-8 text-center shadow-sm backdrop-blur-sm dark:bg-white/5">
          <Users className="mx-auto size-10 text-primary" aria-hidden="true" />
          <p className="mt-4 font-heading text-2xl font-bold text-primary">— people</p>
          <p className="mt-2 font-medium">Young Conservationists</p>
          <p className="mt-1 text-sm text-muted-foreground">inspired to protect our ocean</p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-xl text-center">
        <p className="text-lg font-medium">Want to be part of our first numbers?</p>
        <p className="mt-2 text-muted-foreground">
          Sign up to volunteer and help write the story of what we accomplish together.
        </p>
        <Link
          href="/volunteer"
          className="mt-6 inline-flex items-center rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Sign Up to Volunteer
        </Link>
        <div className="mt-4">
          <Link
            href="/conservation/events"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            See upcoming events &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
