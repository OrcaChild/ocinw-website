import type { MetadataRoute } from "next";
import {
  articles,
  species,
  ecosystems,
  projects,
} from "#content";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.orcachildinthewild.com";

const LOCALES = ["en", "es"] as const;

// Static routes present under every locale
const STATIC_PATHS = [
  "",
  "/about",
  "/about/mission",
  "/about/team",
  "/conservation",
  "/conservation/events",
  "/conservation/projects",
  "/learn",
  "/learn/articles",
  "/learn/species",
  "/learn/ecosystems",
  "/donate",
  "/volunteer",
  "/contact",
] as const;

function url(locale: string, path: string): string {
  return `${SITE_URL}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages — both locales
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: url(locale, path),
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, url(l, path)])
        ),
      },
    }))
  );

  // Dynamic MDX content — articles
  const articleEntries: MetadataRoute.Sitemap = articles
    .filter((a) => a.published)
    .flatMap((article) =>
      LOCALES.map((locale) => ({
        url: url(locale, `/learn/articles/${article.slug}`),
        lastModified: article.updated
          ? new Date(article.updated)
          : new Date(article.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [
              l,
              url(l, `/learn/articles/${article.slug}`),
            ])
          ),
        },
      }))
    );

  // Dynamic MDX content — species
  const speciesEntries: MetadataRoute.Sitemap = species
    .filter((sp) => sp.published)
    .flatMap((sp) =>
      LOCALES.map((locale) => ({
        url: url(locale, `/learn/species/${sp.slug}`),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, url(l, `/learn/species/${sp.slug}`)])
          ),
        },
      }))
    );

  // Dynamic MDX content — ecosystems
  const ecosystemEntries: MetadataRoute.Sitemap = ecosystems
    .filter((eco) => eco.published)
    .flatMap((eco) =>
      LOCALES.map((locale) => ({
        url: url(locale, `/learn/ecosystems/${eco.slug}`),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, url(l, `/learn/ecosystems/${eco.slug}`)])
          ),
        },
      }))
    );

  // Dynamic MDX content — projects
  const projectEntries: MetadataRoute.Sitemap = projects
    .filter((p) => p.published)
    .flatMap((project) =>
      LOCALES.map((locale) => ({
        url: url(locale, `/conservation/projects/${project.slug}`),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [
              l,
              url(l, `/conservation/projects/${project.slug}`),
            ])
          ),
        },
      }))
    );

  return [
    ...staticEntries,
    ...articleEntries,
    ...speciesEntries,
    ...ecosystemEntries,
    ...projectEntries,
  ];
}
