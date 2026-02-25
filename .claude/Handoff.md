# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-24
> Session: #12 (Phase 9 — Education & Conservation Content)

---

## At A Glance

**Current Phase:** Phase 9 COMPLETE | **Blockers:** 0 critical (1 remaining: O3 Supabase) | **Next Action:** Phase 10 (Events System) or commit Phase 9

---

## Quick Status

| Phase                          | Status          | Dependencies                         | Notes                                                    |
| ------------------------------ | --------------- | ------------------------------------ | -------------------------------------------------------- |
| Phase 1 — Legal Foundation     | NOT STARTED     | None                                 | Independent of website dev; can run in parallel           |
| Phase 2 — Brand Identity       | **COMPLETE**    | None                                 | Carlsbad Coastal redesign — warm palette + images         |
| Phase 3 — Tech Stack           | DECIDED         | None                                 | All technology choices locked in OCINW.MD                 |
| Phase 4 — Project Scaffolding  | **COMPLETE**    | None                                 | 11 steps, 11 commits, all gates pass                     |
| Phase 5 — Core Website         | **COMPLETE**    | Phase 4                              | All pages, nav, forms, error handling, security headers   |
| Phase 6 — Weather & Tides      | **COMPLETE**    | Phase 5                              | Full dashboard, live APIs, geolocation, tide chart        |
| Phase 7 — Donation System      | **COMPLETE**    | Phase 1 (Zeffy needs nonprofit)      | Full donate page + thank-you + Zeffy embed placeholder    |
| Phase 8 — Volunteer System     | **COMPLETE**    | Phase 5                              | Full signup form + age-gating + COPPA fields + thank-you  |
| Phase 9 — Education Content    | **COMPLETE**    | Phase 4 (MDX infra)                  | Velite + 23 MDX files + Education Hub + Conservation Hub  |
| Phase 10 — Events System       | NOT STARTED     | Phase 5                              | Events listing, detail, registration, calendar            |
| Phase 11 — Testing             | **COMPLETE**    | Phase 5+                             | 217 unit tests, 4 E2E suites, axe-core a11y tests        |
| Phase 12 — Pre-Launch          | NOT STARTED     | Phase 5-11                           | All features must be built                                |
| Phase 13 — Launch              | NOT STARTED     | Phase 12                             | Pre-launch checklist must pass                            |
| Phase 14 — Post-Launch         | NOT STARTED     | Phase 13                             | —                                                         |

---

## Currently In-Progress

Nothing — Phase 9 is complete, ready for commit and next phase.

---

## What Was Completed This Session (Session #12)

### Phase 9 — Education & Conservation Content (COMPLETE)

**Infrastructure — Velite MDX Content Pipeline:**
- Installed Velite 0.3.1 as build-time MDX processor
- Created `velite.config.ts` with 4 collections: articles (7 fields), species (12 fields), ecosystems (10 fields), projects (14 fields)
- Each collection uses Zod-based frontmatter schemas matching Phase 9 spec
- VeliteWebpackPlugin integration in `next.config.ts` for seamless dev/build
- `#content` TypeScript path alias in `tsconfig.json` → `.velite/` generated output
- `.gitignore` updated to exclude `.velite/`
- Build script: `"velite && next build"` in `package.json`

**MDX Content Files (23 total):**
- 7 articles: welcome-to-ocinw, why-southern-california-ocean-needs-you, what-happens-at-a-beach-cleanup, five-things-help-oceans, understanding-tides-beginners-guide, marine-protected-areas-la-to-san-diego, citizen-science-for-kids
- 10 species: orca, gray whale, sea lion, garibaldi, giant kelp, purple sea urchin, brown pelican, green sea turtle, leopard shark, grunion
- 4 ecosystems: kelp forests, tide pools, coastal wetlands & estuaries, sandy beaches
- 2 projects: SoCal Beach Cleanup Program, Carlsbad Lagoon Water Quality Watch

**Shared Components:**
- `MDXContent.tsx` — client component evaluating Velite's compiled MDX function strings
- `src/lib/content.ts` — 15+ typed query helpers (getArticles, getSpecies, getEcosystems, getProjects, etc.)
- `src/lib/types/content.ts` — re-exports Velite-generated types

**Education Hub Components (4 card components):**
- `ArticleCard.tsx` — article listing card with image, category, reading time
- `SpeciesCard.tsx` — species card with IUCN conservation status badge
- `ConservationStatusBadge.tsx` — color-coded LC/NT/VU/EN/CR badges
- `EcosystemCard.tsx` — ecosystem card with type badge, location, key species tags

**Education Hub Pages (8 routes × 2 locales = 16 pages):**
- `/learn` — landing page with hero, 4 category cards
- `/learn/articles` — article listing grid
- `/learn/articles/[slug]` — article detail with MDX body, tags, related articles
- `/learn/species` — species listing grid
- `/learn/species/[slug]` — species detail with sidebar (habitat, viewing locations, fun facts, threats, how to help)
- `/learn/ecosystems` — ecosystem listing grid
- `/learn/ecosystems/[slug]` — ecosystem detail with sidebar (locations, key species, threats, conservation efforts)
- `/learn/resources` — curated external resource links (NOAA, CCC, Academic, Youth, Local)

**Conservation Hub Components (1 card component):**
- `ProjectCard.tsx` — project card with status color, type, location, impact metrics

**Conservation Hub Pages (4 routes × 2 locales = 8 pages):**
- `/conservation` — landing page with hero, quick nav cards, active projects grid
- `/conservation/projects` — project listing
- `/conservation/projects/[slug]` — project detail with impact metrics, MDX body, partners, volunteer CTA
- `/conservation/impact` — impact dashboard with 6 metrics (hardcoded, ready for Supabase)

**Translation Keys Added:**
- `learn` namespace: ~80 keys (EN + ES) — page titles, filters, card labels, resource categories
- `conservation` namespace: ~55 keys (EN + ES) — page titles, status labels, impact metrics, project details
- `nav` namespace: added `educationResources` key (EN + ES)

**Navigation Updates:**
- Added `/learn/resources` link to DesktopNav and MobileNav
- Removed `/conservation/events` link (page doesn't exist yet — Phase 10)

**Quality Gates — All Pass:**
- `pnpm lint` — zero errors, zero warnings
- `pnpm type-check` — zero TypeScript errors
- `pnpm build` — 89 static pages generated (up from 27)
- `pnpm test` — 217 tests pass (13 files)

---

## What Was Completed Last Session (Session #11)

### Phase 7 — Donation System + Phase 8 — Volunteer System

See Completed.md for full details.

---

## What Should Be Done Next

### Option A: Commit Phase 9 + Push to GitHub
All Phase 9 code is ready for commit. Stage all new/modified files and push.

### Option B: Phase 10 — Events System
Events listing, detail pages, event registration, calendar view. Requires `/conservation/events` page (nav link already removed until built).

### Option C: Add Tests for Phase 9 Content
Write unit tests for content query helpers (`getArticles`, `getSpecies`, etc.) and component rendering tests for the new card components.

### Option D: Swap Stock Photos for Originals
User is putting together original photos. When ready, drop them into `public/images/` matching current filenames.

### Remaining Open Issues (1)

| ID | Severity | Issue                                | Status                        |
| -- | -------- | ------------------------------------ | ----------------------------- |
| O3 | HIGH     | Forms don't persist data             | Deferred to Supabase setup    |

---

## Repository

- **GitHub:** `https://github.com/OrcaChild/ocinw-website`
- **Branch:** `main`
- **Git config:** user.name="Orca Child", user.email="orcachildinthewild@gmail.com"
- **GitHub CLI:** installed (`gh` v2.87.2)

---

## Blockers & Open Questions

1. **Domain name not yet registered** — `orcachildinthewild.org` should be secured before deployment
2. **Supabase project not created** — need free-tier project for DB features
3. **Zeffy account not created** — requires registered nonprofit status for full donation setup
4. **No logo yet** — using Waves icon (lucide) as placeholder
5. **Original photos in progress** — user assembling real photos to replace stock placeholders

*None of these block Phase 10.*

---

## Infrastructure Free-Tier Limits

| Service    | Free Tier Limit          | Action If Exceeded                                   |
| ---------- | ------------------------ | ---------------------------------------------------- |
| Supabase   | 500MB database, 50K MAU  | Upgrade to Pro ($25/mo) or optimize queries          |
| Vercel     | 100GB bandwidth/month    | Enable edge caching, optimize images                 |
| Resend     | 100 emails/day           | Batch newsletter sends across days                   |
| Open-Meteo | 10,000 requests/day      | Increase cache duration, add stale-while-revalidate  |

---

## Decisions Made

### Implementation Decisions (Sessions #2-12)

| Decision            | Choice               | Why                                     | Session |
| ------------------- | -------------------- | --------------------------------------- | ------- |
| i18n in Phase 4     | Moved from Phase 10  | Build with translation keys from day one| #2      |
| Background checks   | Sterling Volunteers  | Nonprofit rates, youth-org specialist   | #2      |
| Newsletter delivery | Resend Broadcast     | Already in stack, free tier sufficient  | #2      |
| GitHub org          | OrcaChild            | Matches brand name                      | #3      |
| Form server actions | Stubbed (no Supabase)| Validation works; DB insert later       | #4      |
| Security headers    | Dev/prod CSP split   | Dev needs unsafe-eval for HMR           | #4      |
| Weather units       | Fahrenheit/mph/inches| SoCal audience uses imperial units      | #5      |
| WeatherPreview      | Server component     | Keep homepage lightweight               | #5      |
| Hook state pattern  | useReducer           | Avoids eslint set-state-in-effect       | #5      |
| Rate limiting       | In-memory Map        | No external deps, sufficient for free tier | #8   |
| Global error styles | Inline CSS           | Tailwind unavailable when root layout fails | #8   |
| Sonner styles       | CSS selector          | Cleaner than inline `style` prop        | #8      |
| Vitest config       | .mts extension       | ESM-only Vitest 4 + Vite 7 compat      | #9      |
| DOM test env        | happy-dom            | jsdom 28 ESM chain incompatibility      | #9      |
| Test env directive  | Per-file comments    | environmentMatchGlobs fails on Windows  | #9      |
| Module isolation    | vi.resetModules()    | API clients/actions have module-level state | #9   |
| Visual identity     | Carlsbad Coastal     | Warm, inviting SoCal feel — not corporate| #10    |
| Image approach      | Full-bleed + overlays| Modern 2026 — no boxy square layouts    | #10     |
| Stock photos        | Unsplash placeholders| $0 cost, user will swap in originals    | #10     |
| Dark mode warmth    | Warm charcoal        | California evening, not submarine       | #10     |
| Wave dividers       | SVG organic shapes   | No hard edges between sections          | #10     |
| MDX content engine  | Velite 0.3.1         | Build-time processing, typed schemas, Zod-based | #12 |
| MDX rendering       | new Function() + JSX runtime | Velite compiles MDX to function strings | #12 |
| Content queries     | Typed helper functions | Centralized in src/lib/content.ts      | #12     |
| Events nav link     | Removed until Phase 10 | Avoid 404 on non-existent page        | #12     |

---

## Environment Setup Notes

- Development machine: Windows 11 Pro
- Shell: bash (Git Bash)
- Working directory: `c:\OrcaChild`
- Node.js: v20.18.0
- pnpm: 10.10.0
- GitHub CLI: v2.87.2 (installed via winget)
- **Note:** Turbopack crashes on this machine (`0xc0000142` DLL init failure). Use `pnpm dev --webpack` for dev server.

---

### Key Versions
- Next.js 16.1.6 | React 19.2.3 | TypeScript 5.9.3
- Tailwind CSS v4.2.0 | shadcn/ui (latest) | Velite 0.3.1
- Zod v4.3.6 | next-intl v4.8.3
- Vitest 4.0.18 | Playwright 1.58.2 | happy-dom 20.7.0
- pnpm 10.10.0 | Node.js v20.18.0

---

## Content Inventory (Phase 9)

| Type | Count | Location |
|------|-------|----------|
| Articles | 7 | `src/content/articles/` |
| Species Profiles | 10 | `src/content/species/` |
| Ecosystem Guides | 4 | `src/content/ecosystems/` |
| Conservation Projects | 2 | `src/content/projects/` |
| **Total MDX files** | **23** | — |

---

## Page Count Summary

| Category | Routes | Static Pages (EN+ES) |
|----------|--------|---------------------|
| Core (home, about, contact, privacy, terms) | 6 | 12 |
| Weather & Tides | 1 | 2 |
| Donate | 2 | 4 |
| Volunteer | 2 | 4 |
| Learn Hub | 8 + slug pages | ~40 |
| Conservation Hub | 4 + slug pages | ~12 |
| **Total** | — | **89** |

---

## Image Library (public/images/)

| File | Category | Size | Source | Replace With |
|------|----------|------|--------|--------------|
| `hero/coastal-golden-hour.jpg` | Hero background | 290KB | Unsplash | Original Carlsbad coastal photo |
| `activities/tide-pool.jpg` | Mission: Protect | 112KB | Unsplash | Real SoCal tide pool photo |
| `activities/kids-exploring.jpg` | Mission: Educate | 101KB | Unsplash | Jordyn + team exploring |
| `activities/beach-cleanup.jpg` | Events thumbnail | 82KB | Unsplash | Real OCINW cleanup event |
| `activities/volunteers-cleanup.jpg` | Volunteer CTA bg | 185KB | Unsplash | Real OCINW volunteer photo |
| `community/beach-community.jpg` | Mission: Connect | 87KB | Unsplash | OCINW community gathering |
| `marine/ocean-wave.jpg` | Articles thumbnail | 185KB | Unsplash | SoCal ocean photo |
| `marine/sea-turtle.jpg` | Species thumbnail | 62KB | Unsplash | Local marine life photo |
| `landscapes/ocean-sunset.jpg` | Donate CTA bg | 287KB | Unsplash | Carlsbad sunset |
| `textures/sand-ripples.jpg` | Weather section bg | 129KB | Unsplash | Original beach texture |

---

## Test Suite Inventory

| Category | File | Tests |
|----------|------|-------|
| Schemas | `tests/unit/schemas.test.ts` | 48 |
| Formatters | `tests/unit/weather-format.test.ts` | 53 |
| Geo | `tests/unit/geo.test.ts` | 9 |
| Rate Limit | `tests/unit/rate-limit.test.ts` | 8 |
| Utils | `tests/unit/utils.test.ts` | 5 |
| Weather API | `tests/unit/weather-api.test.ts` | 12 |
| Tides API | `tests/unit/tides-api.test.ts` | 15 |
| Geolocation | `tests/unit/geolocation.test.ts` | 26 |
| useWeather | `tests/unit/hooks/useWeather.test.ts` | 7 |
| useTides | `tests/unit/hooks/useTides.test.ts` | 8 |
| useGeolocation | `tests/unit/hooks/useGeolocation.test.ts` | 11 |
| Contact Action | `tests/unit/actions/contact.test.ts` | 7 |
| Newsletter Action | `tests/unit/actions/newsletter.test.ts` | 8 |
| **Total** | **13 files** | **217 unit tests** |
| E2E: Contact | `tests/e2e/contact.spec.ts` | 6 |
| E2E: Newsletter | `tests/e2e/newsletter.spec.ts` | 4 |
| E2E: Weather | `tests/e2e/weather.spec.ts` | 6 |
| E2E: Navigation | `tests/e2e/navigation.spec.ts` | 8 |
| Accessibility | `tests/accessibility/pages.spec.ts` | 16 |
