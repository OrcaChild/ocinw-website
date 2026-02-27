import { defineConfig, defineCollection, s } from "velite";

// ---------------------------------------------------------------------------
// Content Collections — MDX content stored in src/content/
// Each collection maps to a directory and defines a frontmatter schema.
// Velite generates typed content at build time into .velite/
// ---------------------------------------------------------------------------

const articles = defineCollection({
  name: "Article",
  pattern: "articles/**/*.mdx",
  schema: s.object({
    title: s.string().max(200),
    slug: s.slug("articles"),
    author: s.string().default("Orca Child in the Wild"),
    date: s.isodate(),
    updated: s.isodate().optional(),
    category: s.enum([
      "Marine Biology",
      "Conservation",
      "Climate",
      "Pollution",
      "Community",
    ]),
    tags: s.array(s.string()).default([]),
    audience: s.enum(["youth", "educators", "all"]).default("all"),
    readingLevel: s
      .enum(["beginner", "intermediate", "advanced"])
      .default("beginner"),
    readingTime: s.number().default(5),
    excerpt: s.string().max(500),
    featuredImage: s.string().optional(),
    featuredImageAlt: s.string().optional(),
    language: s.enum(["en", "es"]).default("en"),
    translationSlug: s.string().optional(),
    published: s.boolean().default(false),
    body: s.mdx(),
    metadata: s.metadata(),
  }),
});

const species = defineCollection({
  name: "Species",
  pattern: "species/**/*.mdx",
  schema: s.object({
    title: s.string().max(200),
    slug: s.slug("species"),
    scientificName: s.string(),
    commonNames: s.array(s.string()).default([]),
    spanishName: s.string().optional(),
    category: s.enum([
      "Marine Mammals",
      "Fish",
      "Birds",
      "Invertebrates",
      "Plants & Algae",
      "Reptiles",
    ]),
    conservationStatus: s.enum([
      "Least Concern",
      "Near Threatened",
      "Vulnerable",
      "Endangered",
      "Critically Endangered",
    ]),
    habitat: s.array(s.string()).default([]),
    range: s.string(),
    localRange: s.string(),
    funFacts: s.array(s.string()).default([]),
    threats: s.array(s.string()).default([]),
    howToHelp: s.array(s.string()).default([]),
    bestViewingLocations: s.array(s.string()).default([]),
    bestViewingSeason: s.string().optional(),
    featuredImage: s.string().optional(),
    featuredImageAlt: s.string().optional(),
    imageCredit: s.string().optional(),
    language: s.enum(["en", "es"]).default("en"),
    translationSlug: s.string().optional(),
    published: s.boolean().default(false),
    body: s.mdx(),
    metadata: s.metadata(),
  }),
});

const ecosystems = defineCollection({
  name: "Ecosystem",
  pattern: "ecosystems/**/*.mdx",
  schema: s.object({
    title: s.string().max(200),
    slug: s.slug("ecosystems"),
    type: s.enum(["Marine", "Freshwater", "Coastal", "Estuarine", "Riparian"]),
    location: s.string(),
    localExamples: s.array(s.string()).default([]),
    keySpecies: s.array(s.string()).default([]),
    threats: s.array(s.string()).default([]),
    conservationEfforts: s.array(s.string()).default([]),
    relatedArticles: s.array(s.string()).default([]),
    featuredImage: s.string().optional(),
    featuredImageAlt: s.string().optional(),
    language: s.enum(["en", "es"]).default("en"),
    translationSlug: s.string().optional(),
    published: s.boolean().default(false),
    body: s.mdx(),
    metadata: s.metadata(),
  }),
});

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s.object({
    title: s.string().max(200),
    slug: s.slug("projects"),
    status: s.enum(["planned", "active", "completed"]),
    type: s.enum([
      "Beach Cleanup",
      "Water Monitoring",
      "Habitat Restoration",
      "Education Program",
      "Advocacy",
    ]),
    location: s.string(),
    latitude: s.number().optional(),
    longitude: s.number().optional(),
    startDate: s.isodate(),
    frequency: s.string().optional(),
    partners: s.array(s.string()).default([]),
    impactMetrics: s
      .object({
        trashCollected: s.number().default(0),
        volunteerHours: s.number().default(0),
        milesCleared: s.number().default(0),
        volunteersEngaged: s.number().default(0),
      })
      .optional(),
    featuredImage: s.string().optional(),
    featuredImageAlt: s.string().optional(),
    language: s.enum(["en", "es"]).default("en"),
    published: s.boolean().default(false),
    body: s.mdx(),
    metadata: s.metadata(),
  }),
});

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { articles, species, ecosystems, projects },
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
