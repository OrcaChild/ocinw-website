import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/conservation/ProjectCard";

type Props = {
  params: Promise<{ locale: string }>;
};

const statusLabels = {
  planned: "statusPlanned",
  active: "statusActive",
  completed: "statusCompleted",
} as const;

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

  return <ProjectsContent locale={locale as "en" | "es"} />;
}

function ProjectsContent({ locale }: { locale: "en" | "es" }) {
  const t = useTranslations("conservation");
  const projects = getProjects(locale);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("projectsHeading")}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {t("projectsPageDescription")}
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            {t("noProjects")}
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                viewLabel={t("viewProject")}
                statusLabel={t(statusLabels[project.status])}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
