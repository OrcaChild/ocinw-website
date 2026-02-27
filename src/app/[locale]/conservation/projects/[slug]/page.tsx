import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, MapPin, Calendar, Users, Trash2, Clock, Ruler } from "lucide-react";
import { getProjectBySlug } from "@/lib/content";
import { projects as allProjects } from "#content";
import { MDXContent } from "@/components/shared/MDXContent";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.type} conservation project in ${project.location}.`,
  };
}

const statusColors = {
  planned: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  completed: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
} as const;

const statusLabels = {
  planned: "statusPlanned",
  active: "statusActive",
  completed: "statusCompleted",
} as const;

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "conservation" });

  return (
    <article className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/conservation/projects"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("backToProjects")}
        </Link>

        {project.featuredImage && (
          <div className="mt-6 overflow-hidden rounded-2xl">
            <Image
              src={project.featuredImage}
              alt={project.featuredImageAlt ?? ""}
              width={900}
              height={500}
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        <header className="mt-8">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-3 py-0.5 text-sm font-semibold ${statusColors[project.status]}`}>
              {t(statusLabels[project.status])}
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-0.5 text-sm font-medium text-primary">
              {project.type}
            </span>
          </div>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <div className="mt-4 space-y-1 text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" />
              {project.location}
            </p>
            {project.frequency && (
              <p className="flex items-center gap-2">
                <Calendar className="size-4" aria-hidden="true" />
                {project.frequency}
              </p>
            )}
          </div>
        </header>

        {/* Impact Metrics */}
        {project.impactMetrics && (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {project.impactMetrics.trashCollected > 0 && (
              <div className="rounded-xl bg-primary/5 p-4 text-center">
                <Trash2 className="mx-auto size-5 text-primary" aria-hidden="true" />
                <p className="mt-2 text-2xl font-bold text-primary">{project.impactMetrics.trashCollected.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{t("metricTrash")}</p>
              </div>
            )}
            {project.impactMetrics.volunteerHours > 0 && (
              <div className="rounded-xl bg-primary/5 p-4 text-center">
                <Clock className="mx-auto size-5 text-primary" aria-hidden="true" />
                <p className="mt-2 text-2xl font-bold text-primary">{project.impactMetrics.volunteerHours.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{t("metricHours")}</p>
              </div>
            )}
            {project.impactMetrics.milesCleared > 0 && (
              <div className="rounded-xl bg-primary/5 p-4 text-center">
                <Ruler className="mx-auto size-5 text-primary" aria-hidden="true" />
                <p className="mt-2 text-2xl font-bold text-primary">{project.impactMetrics.milesCleared}</p>
                <p className="text-xs text-muted-foreground">{t("metricMiles")}</p>
              </div>
            )}
            {project.impactMetrics.volunteersEngaged > 0 && (
              <div className="rounded-xl bg-primary/5 p-4 text-center">
                <Users className="mx-auto size-5 text-primary" aria-hidden="true" />
                <p className="mt-2 text-2xl font-bold text-primary">{project.impactMetrics.volunteersEngaged}</p>
                <p className="text-xs text-muted-foreground">{t("metricVolunteers")}</p>
              </div>
            )}
          </div>
        )}

        {/* Body */}
        <div className="prose prose-lg mt-10 max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary">
          <MDXContent code={project.body} />
        </div>

        {/* Partners */}
        {project.partners.length > 0 && (
          <div className="mt-10 border-t pt-6">
            <h2 className="font-heading text-xl font-bold">{t("projectPartners")}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.partners.map((partner) => (
                <span key={partner} className="rounded-full bg-muted px-3 py-1 text-sm">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-primary/5 p-6 text-center">
          <h2 className="font-heading text-xl font-bold">{t("joinProject")}</h2>
          <Link
            href="/volunteer"
            className="mt-4 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("getInvolvedCta")}
          </Link>
        </div>
      </div>
    </article>
  );
}
