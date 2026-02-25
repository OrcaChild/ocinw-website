import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

const placeholders = [
  {
    headingKey: "featuredArticlesHeading" as const,
    image: "/images/marine/ocean-wave.jpg",
    imageAlt: "featuredArticlesImageAlt" as const,
    tag: "featuredArticlesTag" as const,
  },
  {
    headingKey: "featuredSpeciesHeading" as const,
    image: "/images/marine/sea-turtle.jpg",
    imageAlt: "featuredSpeciesImageAlt" as const,
    tag: "featuredSpeciesTag" as const,
  },
  {
    headingKey: "featuredEventsHeading" as const,
    image: "/images/activities/beach-cleanup.jpg",
    imageAlt: "featuredEventsImageAlt" as const,
    tag: "featuredEventsTag" as const,
  },
];

export function FeaturedContent() {
  const t = useTranslations("home");

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {t("featuredHeading")}
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((item) => (
            <div
              key={item.headingKey}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Image container with hover zoom */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={item.image}
                  alt={t(item.imageAlt)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Tag badge */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm dark:bg-black/60 dark:text-white">
                    {t(item.tag)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold group-hover:text-primary">
                  {t(item.headingKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t("featuredPlaceholder")}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                  <span>{t("featuredReadMore")}</span>
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
