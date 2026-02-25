# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-24
> Session: #10 (Carlsbad Coastal Visual Redesign — COMPLETE)

---

## At A Glance

**Current Phase:** Phase 2 complete, pre-Phase 7 | **Blockers:** 0 critical (1 remaining: O3 Supabase) | **Next Action:** Phase 7 (Donations) or Phase 8 (Volunteers)

---

## Quick Status

| Phase                          | Status          | Dependencies                         | Notes                                                    |
| ------------------------------ | --------------- | ------------------------------------ | -------------------------------------------------------- |
| Phase 1 — Legal Foundation     | NOT STARTED     | None                                 | Independent of website dev; can run in parallel           |
| Phase 2 — Brand Identity       | **COMPLETE**    | None                                 | Carlsbad Coastal redesign — warm palette + images         |
| Phase 3 — Tech Stack           | DECIDED         | None                                 | All technology choices locked in OCINW.MD                 |
| Phase 4 — Project Scaffolding  | **COMPLETE**    | None                                 | 11 steps, 11 commits, all gates pass                     |
| Phase 5 — Core Website         | **COMPLETE**    | Phase 4 ✅                           | All pages, nav, forms, error handling, security headers   |
| Phase 6 — Weather & Tides      | **COMPLETE**    | Phase 5 ✅                           | Full dashboard, live APIs, geolocation, tide chart        |
| Phase 7 — Donation System      | **NEXT**        | Phase 1 (Zeffy needs nonprofit)      | Zeffy embed can be stubbed without 501(c)(3)             |
| Phase 8 — Volunteer System     | **NEXT**        | Phase 5 ✅                           | Requires Supabase project for DB features                |
| Phase 9 — Education Content    | NOT STARTED     | Phase 4 ✅ (MDX infra)              | Content writing can start as soon as MDX schema defined   |
| Phase 10 — Accessibility/i18n  | NOT STARTED     | Phase 4 ✅                           | Translation *content* here; i18n *infrastructure* done    |
| Phase 11 — Testing             | **COMPLETE**    | Phase 5+                             | 217 unit tests, 4 E2E suites, axe-core a11y tests written|
| Phase 12 — Pre-Launch          | NOT STARTED     | Phase 5-11                           | All features must be built                                |
| Phase 13 — Launch              | NOT STARTED     | Phase 12                             | Pre-launch checklist must pass                            |
| Phase 14 — Post-Launch         | NOT STARTED     | Phase 13                             | —                                                         |

---

## Currently In-Progress

Nothing currently in-progress. Session #10 visual redesign complete.

---

## What Was Completed This Session (Session #10 — Carlsbad Coastal Redesign)

### Full Visual Redesign — "Carlsbad Coastal" Theme

**Color Palette Overhaul (globals.css):**
- Ocean blues: hue 220 → 215 (warm sky blue, morning Pacific light)
- Teal: hue 180 → 168 (seafoam/sage, Batiquitos Lagoon sea glass)
- Sand: hue 80 → 50-65, more saturated (Tamarack Beach golden hour)
- Coral: hue 20-30 → 28-40 (sunset peach, not alarm-red)
- Background: cold blue-white → warm cream/ivory
- Dark mode: cold navy → warm charcoal (California evening, not submarine)
- Body line-height: increased to 1.7 for relaxed readability

**10 Stock Images Downloaded (Unsplash, free license):**
- `hero/coastal-golden-hour.jpg` (290KB) — golden SoCal coastline
- `activities/tide-pool.jpg` (112KB) — rocky California coast
- `activities/kids-exploring.jpg` (101KB) — youth in nature
- `activities/beach-cleanup.jpg` (82KB) — volunteers on beach
- `activities/volunteers-cleanup.jpg` (185KB) — cleanup action shot
- `community/beach-community.jpg` (87KB) — people at the beach
- `marine/ocean-wave.jpg` (185KB) — sunlit ocean waves
- `marine/sea-turtle.jpg` (62KB) — sea turtle swimming
- `landscapes/ocean-sunset.jpg` (287KB) — Pacific sunset
- `textures/sand-ripples.jpg` (129KB) — beach texture

**Component Redesigns (modern 2026, no boxy layouts):**
- HeroSection: full-bleed coastal photo + warm gradient overlay + organic SVG wave divider + glass-morphism CTA + pill-shaped buttons
- MissionCards: full image backgrounds + gradient overlays + glass icon badges + hover zoom
- FeaturedContent: thumbnail images + category tag badges + hover zoom + "Read more" arrows
- GetInvolvedCTA: full-bleed card backgrounds + gradient overlays + white pill CTAs
- ImpactCounter: warm sand background + glass-morphism stat cards
- WeatherPreview: sand texture background + ocean-to-teal gradient + white CTA
- PartnersSection: warm sand background + rounded-2xl placeholders
- Footer: warm sand background + organic SVG wave divider at top

**Translation Keys Added (EN + ES):**
- 13 new keys: heroImageAlt, 3 mission image alts, 3 featured image alts, 3 featured tags, featuredReadMore, 2 involved image alts

### Quality Gates — All Pass
- `pnpm lint` — zero errors, zero warnings
- `pnpm type-check` — zero TypeScript errors
- `pnpm build` — 19 static pages, production build succeeds
- `pnpm test` — 217 tests pass (13 files)

---

## What Should Be Done Next

### Option A: Phase 7 (Donations) — Recommended
Zeffy embed + donation page with impact tiers and donor recognition.

### Option B: Phase 8 (Volunteers)
Volunteer signup form with age-gating, COPPA parental consent. Requires Supabase project.

### Option C: Swap Stock Photos for Originals
User is currently putting together original photos. When ready, drop them into `public/images/` matching current filenames to replace stock photos.

### Option D: Extend Visual Redesign to Inner Pages
The about, contact, and weather pages still use the default layout styling. Could add hero images, warm section treatments, and organic dividers to these pages too.

### Remaining Open Issues (1)

| ID | Severity | Issue                                | Status                        |
| -- | -------- | ------------------------------------ | ----------------------------- |
| O3 | HIGH     | Forms don't persist data             | Deferred to Phase 8 (Supabase)|

**O1 (CRITICAL — test coverage) and O6 (MEDIUM — axe-core tests) are now CLOSED.**

---

## Repository

- **GitHub:** `https://github.com/OrcaChild/ocinw-website`
- **Branch:** `main`
- **Commits:** Phase 4 (11) + Phase 5 (1) + Phase 6 (1) + Session #8 fixes (1) + Session #9 tests (1) + Session #10 visual redesign (pending commit)
- **Git config:** user.name="Orca Child", user.email="orcachildinthewild@gmail.com"
- **GitHub CLI:** installed (`gh` v2.87.2) — auth via `gh auth login` in terminal when needed

---

## Blockers & Open Questions

1. **Domain name not yet registered** — `orcachildinthewild.org` should be secured before deployment
2. **Supabase project not created** — need free-tier project for DB features (Phase 8+)
3. **Zeffy account not created** — requires registered nonprofit status for full donation setup
4. **No logo yet** — using Waves icon (lucide) as placeholder
5. **Original photos in progress** — user assembling real photos to replace stock placeholders

*None of these block Phase 7-9.*

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

### Implementation Decisions (Sessions #2-10)

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
- Tailwind CSS v4.2.0 | shadcn/ui (latest)
- Zod v4.3.6 | next-intl v4.8.3
- Vitest 4.0.18 | Playwright 1.58.2 | happy-dom 20.7.0
- pnpm 10.10.0 | Node.js v20.18.0

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

## Test Suite Inventory (Session #9)

| Category | File | Tests |
|----------|------|-------|
| Fixtures | `tests/fixtures/index.ts` | — |
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
| E2E: Contact | `tests/e2e/contact.spec.ts` | 6 |
| E2E: Newsletter | `tests/e2e/newsletter.spec.ts` | 4 |
| E2E: Weather | `tests/e2e/weather.spec.ts` | 6 |
| E2E: Navigation | `tests/e2e/navigation.spec.ts` | 8 |
| Accessibility | `tests/accessibility/pages.spec.ts` | 16 |
| **Total** | **20 files** | **217 unit + 24 E2E + 16 a11y** |
