import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  AlertTriangle,
  Heart,
  Lightbulb,
  Eye,
} from "lucide-react";
import { getSpeciesBySlug } from "@/lib/content";
import { species as allSpecies } from "#content";
import { ConservationStatusBadge } from "@/components/education/ConservationStatusBadge";
import { MDXContent } from "@/components/shared/MDXContent";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return allSpecies
    .filter((s) => s.published)
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const sp = getSpeciesBySlug(slug);
  if (!sp) return {};
  return {
    title: `${sp.title} (${sp.scientificName})`,
    description: `Learn about ${sp.title}, a ${sp.category.toLowerCase()} species found in Southern California.`,
  };
}

export default async function SpeciesDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const sp = getSpeciesBySlug(slug);
  if (!sp) notFound();

  const t = await getTranslations({ locale, namespace: "learn" });

  return (
    <article className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back */}
        <Link
          href="/learn/species"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("backToSpecies")}
        </Link>

        {/* Hero */}
        {sp.featuredImage && (
          <div className="mt-6 overflow-hidden rounded-2xl">
            <Image
              src={sp.featuredImage}
              alt={sp.featuredImageAlt ?? ""}
              width={900}
              height={500}
              priority
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mt-8">
          <div className="flex items-center gap-3">
            <ConservationStatusBadge status={sp.conservationStatus} />
            <span className="text-sm text-muted-foreground">{sp.category}</span>
          </div>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {sp.title}
          </h1>
          <p className="mt-1 text-lg italic text-muted-foreground">
            {sp.scientificName}
          </p>
        </header>

        {/* Quick Facts Sidebar + Content */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Body */}
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary">
            <MDXContent code={sp.body} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Habitat */}
            {sp.habitat.length > 0 && (
              <div className="rounded-xl border border-border/50 p-4">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold">
                  <MapPin className="size-4 text-primary" aria-hidden="true" />
                  {t("habitat")}
                </h3>
                <div className="mt-2 flex flex-wrap gap-1">
                  {sp.habitat.map((h) => (
                    <span key={h} className="rounded-full bg-muted px-2.5 py-0.5 text-xs">{h}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Best Viewing */}
            {sp.bestViewingLocations.length > 0 && (
              <div className="rounded-xl border border-border/50 p-4">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold">
                  <Eye className="size-4 text-primary" aria-hidden="true" />
                  {t("bestViewingLocations")}
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {sp.bestViewingLocations.map((loc) => (
                    <li key={loc}>{loc}</li>
                  ))}
                </ul>
                {sp.bestViewingSeason && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    <Calendar className="mr-1 inline size-3" aria-hidden="true" />
                    {sp.bestViewingSeason}
                  </p>
                )}
              </div>
            )}

            {/* Fun Facts */}
            {sp.funFacts.length > 0 && (
              <div className="rounded-xl border border-border/50 bg-primary/5 p-4">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold">
                  <Lightbulb className="size-4 text-primary" aria-hidden="true" />
                  {t("funFacts")}
                </h3>
                <ul className="mt-2 space-y-2 text-sm">
                  {sp.funFacts.map((fact, i) => (
                    <li key={i} className="leading-snug">{fact}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Threats */}
            {sp.threats.length > 0 && (
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-red-800 dark:text-red-300">
                  <AlertTriangle className="size-4" aria-hidden="true" />
                  {t("threats")}
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-red-700 dark:text-red-400">
                  {sp.threats.map((threat) => (
                    <li key={threat}>{threat}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* How to Help */}
            {sp.howToHelp.length > 0 && (
              <div className="rounded-xl border border-green-200 bg-green-50/50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-green-800 dark:text-green-300">
                  <Heart className="size-4" aria-hidden="true" />
                  {t("howToHelp")}
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-green-700 dark:text-green-400">
                  {sp.howToHelp.map((help) => (
                    <li key={help}>{help}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
