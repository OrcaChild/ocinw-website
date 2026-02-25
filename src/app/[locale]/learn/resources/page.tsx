import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { ExternalLink } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "learn" });
  return {
    title: t("resourcesHeading"),
    description: t("resourcesPageDescription"),
  };
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return <ResourcesContent />;
}

type Resource = {
  title: string;
  description: string;
  url: string;
  ageRange?: string;
  free: boolean;
};

const resourceCategories = [
  {
    titleKey: "resourcesNoaa" as const,
    descKey: "resourcesNoaaDesc" as const,
    resources: [
      { title: "NOAA Education Portal", description: "Ocean and atmospheric science curriculum and activities for K-12 students.", url: "https://www.noaa.gov/education", ageRange: "K-12", free: true },
      { title: "National Marine Sanctuaries", description: "Virtual tours, lesson plans, and educational materials about America's marine sanctuaries.", url: "https://sanctuaries.noaa.gov/education/", ageRange: "All ages", free: true },
      { title: "NOAA Ocean Explorer", description: "Deep-sea exploration stories, videos, and educational resources.", url: "https://oceanexplorer.noaa.gov/edu/welcome.html", ageRange: "6-18", free: true },
    ],
  },
  {
    titleKey: "resourcesCcc" as const,
    descKey: "resourcesCccDesc" as const,
    resources: [
      { title: "California Coastal Commission Education", description: "Coastal ecology, conservation, and stewardship resources for educators and students.", url: "https://www.coastal.ca.gov/publiced/", ageRange: "K-12", free: true },
      { title: "Coastal Art & Poetry Contest", description: "Annual creative contest for California students celebrating coastal environments.", url: "https://www.coastal.ca.gov/publiced/art-poetry/", ageRange: "K-12", free: true },
      { title: "King Tides Project", description: "Citizen science project documenting the highest tides of the year along the California coast.", url: "https://www.coastal.ca.gov/kingtides/", ageRange: "All ages", free: true },
    ],
  },
  {
    titleKey: "resourcesAcademic" as const,
    descKey: "resourcesAcademicDesc" as const,
    resources: [
      { title: "Scripps Institution of Oceanography", description: "One of the world's leading centers for ocean, earth, and atmospheric science research.", url: "https://scripps.ucsd.edu/", ageRange: "All ages", free: true },
      { title: "California Sea Grant", description: "Science-based solutions for a healthy ocean, coast, and economy.", url: "https://caseagrant.ucsd.edu/", ageRange: "All ages", free: true },
      { title: "Schmidt Ocean Institute", description: "Open-access ocean research data, videos, and educational content.", url: "https://schmidtocean.org/", ageRange: "13+", free: true },
    ],
  },
  {
    titleKey: "resourcesYouth" as const,
    descKey: "resourcesYouthDesc" as const,
    resources: [
      { title: "Youth Climate Action", description: "Resources and programs for young people taking action on climate change.", url: "https://www.youthclimateaction.org/", ageRange: "13-25", free: true },
      { title: "Project WILD", description: "Conservation and environmental education curriculum used in all 50 states.", url: "https://www.fishwildlife.org/projectwild", ageRange: "K-12", free: true },
    ],
  },
  {
    titleKey: "resourcesLocal" as const,
    descKey: "resourcesLocalDesc" as const,
    resources: [
      { title: "Birch Aquarium at Scripps", description: "La Jolla's public aquarium with interactive exhibits and educational programs about the Pacific Ocean.", url: "https://aquarium.ucsd.edu/", ageRange: "All ages", free: false },
      { title: "Aquarium of the Pacific", description: "Long Beach aquarium featuring Southern California marine life and conservation programs.", url: "https://www.aquariumofpacific.org/", ageRange: "All ages", free: false },
      { title: "Cabrillo Marine Aquarium", description: "San Pedro aquarium focusing on the marine life of Southern California waters.", url: "https://www.cabrillomarineaquarium.org/", ageRange: "All ages", free: true },
    ],
  },
] as const;

function ResourcesContent() {
  const t = useTranslations("learn");

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("resourcesHeading")}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {t("resourcesPageDescription")}
          </p>
        </div>

        <p className="mt-8 text-center text-muted-foreground">
          {t("resourcesIntro")}
        </p>

        <div className="mt-12 space-y-12">
          {resourceCategories.map(({ titleKey, descKey, resources }) => (
            <div key={titleKey}>
              <h2 className="font-heading text-2xl font-bold">
                {t(titleKey)}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t(descKey)}
              </p>
              <div className="mt-4 space-y-3">
                {resources.map((resource: Resource) => (
                  <a
                    key={resource.title}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-border/50 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-primary">
                          {resource.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {resource.description}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          {resource.free && (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                              {t("resourceFree")}
                            </span>
                          )}
                          {resource.ageRange && (
                            <span className="text-xs text-muted-foreground">
                              {t("resourceAgeRange", { range: resource.ageRange })}
                            </span>
                          )}
                        </div>
                      </div>
                      <ExternalLink className="mt-1 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
