// =============================================================================
// Content Query Helpers — typed functions for accessing Velite content
// All data is statically generated at build time — no runtime DB queries
// =============================================================================

import {
  articles as allArticles,
  species as allSpecies,
  ecosystems as allEcosystems,
  projects as allProjects,
} from "#content";

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------

/** Get all published articles for a given language, sorted newest first */
export function getArticles(language: "en" | "es" = "en") {
  return allArticles
    .filter((a) => a.published && a.language === language)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Get a single article by slug */
export function getArticleBySlug(slug: string) {
  return allArticles.find((a) => a.slug === slug && a.published) ?? null;
}

/** Get articles filtered by category */
export function getArticlesByCategory(
  category: string,
  language: "en" | "es" = "en",
) {
  return getArticles(language).filter((a) => a.category === category);
}

/** Get articles filtered by tag */
export function getArticlesByTag(
  tag: string,
  language: "en" | "es" = "en",
) {
  return getArticles(language).filter((a) =>
    a.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

// ---------------------------------------------------------------------------
// Species
// ---------------------------------------------------------------------------

/** Get all published species profiles for a given language */
export function getSpecies(language: "en" | "es" = "en") {
  return allSpecies
    .filter((s) => s.published && s.language === language)
    .sort((a, b) => a.title.localeCompare(b.title));
}

/** Get a single species by slug */
export function getSpeciesBySlug(slug: string) {
  return allSpecies.find((s) => s.slug === slug && s.published) ?? null;
}

/** Get species filtered by category */
export function getSpeciesByCategory(
  category: string,
  language: "en" | "es" = "en",
) {
  return getSpecies(language).filter((s) => s.category === category);
}

/** Get species filtered by conservation status */
export function getSpeciesByStatus(
  status: string,
  language: "en" | "es" = "en",
) {
  return getSpecies(language).filter((s) => s.conservationStatus === status);
}

// ---------------------------------------------------------------------------
// Ecosystems
// ---------------------------------------------------------------------------

/** Get all published ecosystem guides for a given language */
export function getEcosystems(language: "en" | "es" = "en") {
  return allEcosystems
    .filter((e) => e.published && e.language === language)
    .sort((a, b) => a.title.localeCompare(b.title));
}

/** Get a single ecosystem by slug */
export function getEcosystemBySlug(slug: string) {
  return allEcosystems.find((e) => e.slug === slug && e.published) ?? null;
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

/** Get all published conservation projects for a given language */
export function getProjects(language: "en" | "es" = "en") {
  return allProjects
    .filter((p) => p.published && p.language === language)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

/** Get a single project by slug */
export function getProjectBySlug(slug: string) {
  return allProjects.find((p) => p.slug === slug && p.published) ?? null;
}

/** Get projects filtered by status */
export function getProjectsByStatus(
  status: "planned" | "active" | "completed",
  language: "en" | "es" = "en",
) {
  return getProjects(language).filter((p) => p.status === status);
}

// ---------------------------------------------------------------------------
// Cross-content queries
// ---------------------------------------------------------------------------

/** Get all unique article categories */
export function getArticleCategories(language: "en" | "es" = "en"): string[] {
  const cats = new Set(getArticles(language).map((a) => a.category));
  return [...cats].sort();
}

/** Get all unique species categories */
export function getSpeciesCategories(language: "en" | "es" = "en"): string[] {
  const cats = new Set(getSpecies(language).map((s) => s.category));
  return [...cats].sort();
}

/** Get all unique article tags */
export function getArticleTags(language: "en" | "es" = "en"): string[] {
  const tags = new Set(getArticles(language).flatMap((a) => a.tags));
  return [...tags].sort();
}
