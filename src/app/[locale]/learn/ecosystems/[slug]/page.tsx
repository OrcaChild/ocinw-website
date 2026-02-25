import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, MapPin, AlertTriangle, Leaf, Fish } from "lucide-react";
import { getEcosystemBySlug } from "@/lib/content";
import { ecosystems as allEcosystems } from "#content";
import { MDXContent } from "@/components/shared/MDXContent";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return allEcosystems
    .filter((e) => e.published)
    .map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const eco = getEcosystemBySlug(slug);
  if (!eco) return {};
  return {
    title: eco.title,
    description: `Explore ${eco.title} — a ${eco.type.toLowerCase()} ecosystem in Southern California.`,
  };
}

export default async function EcosystemDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const eco = getEcosystemBySlug(slug);
  if (!eco) notFound();

  const t = await getTranslations({ locale, namespace: "learn" });

  return (
    <article className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/learn/ecosystems"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("backToEcosystems")}
        </Link>

        {eco.featuredImage && (
          <div className="mt-6 overflow-hidden rounded-2xl">
            <Image
              src={eco.featuredImage}
              alt={eco.featuredImageAlt ?? ""}
              width={900}
              height={500}
              priority
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        <header className="mt-8">
          <span className="rounded-full bg-teal-500/10 px-3 py-0.5 text-sm font-medium text-teal-700 dark:text-teal-300">
            {eco.type}
          </span>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {eco.title}
          </h1>
          <p className="mt-2 flex items-center gap-1 text-muted-foreground">
            <MapPin className="size-4" aria-hidden="true" />
            {eco.location}
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary">
            <MDXContent code={eco.body} />
          </div>

          <aside className="space-y-6">
            {/* Where to Visit */}
            {eco.localExamples.length > 0 && (
              <div className="rounded-xl border border-border/50 p-4">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold">
                  <MapPin className="size-4 text-primary" aria-hidden="true" />
                  {t("localExamples")}
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {eco.localExamples.map((loc) => (
                    <li key={loc}>{loc}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Species */}
            {eco.keySpecies.length > 0 && (
              <div className="rounded-xl border border-border/50 p-4">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold">
                  <Fish className="size-4 text-primary" aria-hidden="true" />
                  {t("keySpecies")}
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {eco.keySpecies.map((sp) => (
                    <span key={sp} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Threats */}
            {eco.threats.length > 0 && (
              <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-red-800 dark:text-red-300">
                  <AlertTriangle className="size-4" aria-hidden="true" />
                  {t("threats")}
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-red-700 dark:text-red-400">
                  {eco.threats.map((threat) => (
                    <li key={threat}>{threat}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Conservation */}
            {eco.conservationEfforts.length > 0 && (
              <div className="rounded-xl border border-green-200 bg-green-50/50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
                <h3 className="flex items-center gap-2 font-heading text-sm font-bold text-green-800 dark:text-green-300">
                  <Leaf className="size-4" aria-hidden="true" />
                  {t("conservationEfforts")}
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-green-700 dark:text-green-400">
                  {eco.conservationEfforts.map((effort) => (
                    <li key={effort}>{effort}</li>
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
