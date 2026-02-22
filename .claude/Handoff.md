# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-22
> Session: #6 (Phase 6 Bug Fixes & UX Improvements — COMPLETE)

---

## At A Glance

**Current Phase:** Phase 6 (Weather & Tides) — **COMPLETE** | **Blockers:** 0 critical (4 non-blocking) | **Next Action:** Phase 7 (Donations) or Phase 8 (Volunteers)

---

## Quick Status

| Phase | Status | Dependencies | Notes |
|-------|--------|-------------|-------|
| Phase 1 — Legal Foundation | NOT STARTED | None | Independent of website dev; can run in parallel |
| Phase 2 — Brand Identity | NOT STARTED | None | Design system defined in plan; no assets created |
| Phase 3 — Tech Stack | DECIDED | None | All technology choices locked in OCINW.MD |
| Phase 4 — Project Scaffolding | **COMPLETE** | None | 11 steps, 11 commits, all gates pass |
| Phase 5 — Core Website | **COMPLETE** | Phase 4 ✅ | All pages, nav, forms, error handling, security headers |
| Phase 6 — Weather & Tides | **COMPLETE** | Phase 5 ✅ | Full dashboard, live APIs, geolocation, tide chart |
| Phase 7 — Donation System | **NEXT** | Phase 1 (Zeffy needs nonprofit status) | Zeffy embed can be stubbed without 501(c)(3) |
| Phase 8 — Volunteer System | **NEXT** | Phase 5 ✅ | Requires Supabase project for DB features |
| Phase 9 — Education Content | NOT STARTED | Phase 4 ✅ (MDX infra) | Content writing can start as soon as MDX schema defined |
| Phase 10 — Accessibility/i18n | NOT STARTED | Phase 4 ✅ | Translation *content* happens here; i18n *infrastructure* done |
| Phase 11 — Testing | NOT STARTED | Phase 5+ | Tests written alongside features, comprehensive pass here |
| Phase 12 — Pre-Launch | NOT STARTED | Phase 5-11 | All features must be built |
| Phase 13 — Launch | NOT STARTED | Phase 12 | Pre-launch checklist must pass |
| Phase 14 — Post-Launch | NOT STARTED | Phase 13 | — |

---

## Currently In-Progress

Nothing currently in-progress. Phase 6 + bug fixes/UX improvements complete. Ready for Phase 7+.

---

## What Was Completed This Session (Phase 6 Bug Fixes & UX)

### Bug Fixes (4)
1. **Marine API null values crash** — Open-Meteo Marine API returns `null` for all wave/swell fields at inland locations (e.g., Lake Elsinore). `parseMarine` now detects all-null values and returns `null` (no marine card) instead of creating an object with null numbers that crash formatters (`null.toFixed()` → TypeError).
2. **Recharts SSR crash** — Split `TideChart.tsx` into `TideChart.tsx` + `TideChartInner.tsx` with `next/dynamic` `ssr: false` to prevent Recharts from accessing `window`/`document` during server rendering.
3. **localStorage poisoning** — `clearLocation()` now calls `clearSavedLocation()` to wipe coordinates from localStorage. Save effect only persists settled states (`!loading && !error`). Users are no longer stuck in a crash loop.
4. **Circular import** — Moved `ChartDataPoint` type from `TideChart.tsx` to `TideChartInner.tsx` to break circular dependency that Turbopack couldn't resolve.

### UX Improvements (3)
1. **GPS location name resolution** — Added reverse geocoding via Nominatim (OpenStreetMap). When using GPS, location bar now shows actual city name (e.g., "Lake Elsinore") instead of "Current Location". Non-blocking — falls back gracefully.
2. **Live station switcher** — New `StationSwitcher` component lets users change NOAA tide stations from the dashboard without returning to the location selector. Shows current station name + "(nearest)" label. Dropdown with all 7 stations.
3. **Error boundary** — `WeatherErrorBoundary` class component wraps the dashboard. On crash, shows friendly error message with "Reset Location & Retry" button that clears localStorage and reloads.

### Data Improvements
- **Expanded ZIP codes** — Added 14 Inland Empire ZIPs: Lake Elsinore (92530, 92532), Murrieta, Temecula, Corona, Perris, Moreno Valley, Riverside, Rancho Cucamonga, Fontana, San Bernardino.
- **Updated marine response types** — `OpenMeteoMarineResponse` now correctly types all values as `number | null`.
- **CSP updated** — Added `https://nominatim.openstreetmap.org` to connect-src for reverse geocoding.
- **Translation keys** — Added `switchStation`, `nearest` to EN/ES.

### All Quality Gates Pass
- [x] `pnpm lint` — zero errors/warnings
- [x] `pnpm type-check` — zero TypeScript errors
- [x] `pnpm build` — 19 static pages
- [x] User-tested: GPS (inland), ZIP codes, beach selection, station switching all working

---

## What Should Be Done Next

### Option A: Phase 7 — Donation System
- Zeffy embed integration (iframe or redirect)
- Impact tiers display
- Donor recognition (if anonymous toggle)
- Donation tracking (Supabase table)
- Note: Zeffy account needs nonprofit status; can be stubbed

### Option B: Phase 8 — Volunteer System
- Requires Supabase project creation
- Volunteer signup form with COPPA age-gating
- Parental consent verification workflow
- Volunteer opportunities listing

### Option C: Phase 9 — Education Content
- MDX content architecture (species, ecosystems, articles)
- Velite build pipeline
- Content pages with responsive layouts

**Recommendation:** Phase 7 (Donations) — Zeffy embed is simple to integrate, completes the "give money" user journey, and can be stubbed without a Zeffy account. Alternatively Phase 9 (Education Content) to leverage the MDX infrastructure already in place.

---

## Repository

- **GitHub:** `https://github.com/OrcaChild/ocinw-website`
- **Branch:** `main`
- **Commits:** Phase 4 (11) + Phase 5 (1) + Phase 6 (1) + Phase 6 fixes pending commit
- **Git config:** user.name="Orca Child", user.email="orcachildinthewild@gmail.com"
- **GitHub CLI:** installed (`gh` v2.87.2) — auth via `gh auth login` in terminal when needed

---

## Blockers & Open Questions

1. **Domain name not yet registered** — `orcachildinthewild.org` should be secured before deployment
2. **Supabase project not created** — need free-tier project for DB features (Phase 8+). Contact form and newsletter are stubbed.
3. **Zeffy account not created** — requires registered nonprofit status for full donation setup
4. **No logo or visual assets yet** — using Waves icon (lucide) as placeholder; brand identity (Phase 2) in parallel

*None of these block Phase 7-9. All can proceed in parallel with development.*

---

## Infrastructure Free-Tier Limits

| Service | Free Tier Limit | Action If Exceeded |
|---------|----------------|-------------------|
| Supabase | 500MB database, 50K MAU | Upgrade to Pro ($25/mo) or optimize queries |
| Vercel | 100GB bandwidth/month | Enable edge caching, optimize images |
| Resend | 100 emails/day | Batch newsletter sends across days |
| Open-Meteo | 10,000 requests/day | Increase cache duration, add stale-while-revalidate |

---

## Decisions Made

| Decision | Choice | Why | Reversibility | Session |
|----------|--------|-----|--------------|---------|
| Framework | Next.js (React) | SSR for SEO, free Vercel hosting, largest ecosystem | Hard (full rewrite) | #1 |
| Language | TypeScript (strict) | Type safety, catch bugs early, industry standard | Hard | #1 |
| Styling | Tailwind CSS | Utility-first, small bundles, responsive built-in | Medium | #1 |
| Components | shadcn/ui | Accessible, ownable code, Tailwind-native | Easy (swap components) | #1 |
| Content | MDX + Velite | Free, Git-versioned, no CMS cost | Medium | #1 |
| Database | Supabase | Free tier, PostgreSQL, auth + RLS built-in | Hard (migration) | #1 |
| Hosting | Vercel | Free, native Next.js, preview deploys | Easy (redeploy elsewhere) | #1 |
| Donations | Zeffy | 100% free — no fees at all | Easy (swap embed) | #1 |
| Weather API | Open-Meteo | Free, no key, marine data included | Easy (swap API client) | #1 |
| Tides API | NOAA CO-OPS | Free, authoritative US government data | Easy (swap API client) | #1 |
| Maps | Leaflet + OpenStreetMap | Free, no API key, open-source tiles | Easy (swap map library) | #1 |
| Charts | Recharts | React-native, SVG (accessible), simple API | Easy (swap chart library) | #1 |
| Email | Resend | Free tier (100/day), modern API | Easy (swap email provider) | #1 |
| i18n | next-intl | Built for Next.js App Router | Medium | #1 |
| Testing | Vitest + Playwright | Fast, modern, multi-browser | Medium | #1 |
| Package manager | pnpm | Fast, strict, disk-efficient | Easy | #1 |
| Timeline | No fixed deadline | Quality over speed | — | #1 |
| i18n in Phase 4 | Moved from Phase 10 to 4.7 | Build with translation keys from day one | — | #2 |
| Background checks | Sterling Volunteers | Nonprofit rates, youth-org specialist | Easy (swap provider) | #2 |
| Newsletter delivery | Resend Broadcast | Already in stack, free tier sufficient | Easy (swap to Loops.so) | #2 |
| GitHub org | OrcaChild | Matches brand name | Easy | #3 |
| Form server actions | Stubbed (no Supabase yet) | Server-side validation works; DB insert added when Supabase ready | Easy | #4 |
| Security headers | Dev/prod CSP split | Dev needs unsafe-eval for HMR; prod strict CSP | Easy (update next.config) | #4 |
| Weather units | Fahrenheit/mph/inches | SoCal audience uses imperial units | Easy (add metric toggle) | #5 |
| WeatherPreview | Server component (no live data) | Keep homepage lightweight; full dashboard at /weather | Easy (swap to client) | #5 |
| Hook state pattern | useReducer over useState | Avoids eslint react-hooks/set-state-in-effect in data-fetching effects | Easy | #5 |

---

## Environment Setup Notes

- Development machine: Windows 11 Pro
- Shell: bash (Git Bash)
- Working directory: `c:\OrcaChild`
- Node.js: v20.18.0
- pnpm: 10.10.0
- GitHub CLI: v2.87.2 (installed via winget)

---

## File Inventory

```
c:\OrcaChild\
├── .claude/                           ← Planning documents
│   ├── OCINW.MD                       ← Master roadmap (~2,800 lines)
│   ├── CLAUDE.md                      ← Project instructions for Claude Code
│   ├── Handoff.md                     ← This file (session state)
│   ├── Completed.md                   ← Work diary
│   └── Teams.md                       ← Agent team definitions (13 agents)
├── .github/workflows/ci.yml           ← GitHub Actions CI pipeline
├── messages/
│   ├── en.json                        ← English translations (~320 keys)
│   └── es.json                        ← Spanish translations (~320 keys)
├── src/
│   ├── app/
│   │   ├── globals.css                ← OCINW design system (Tailwind v4)
│   │   ├── layout.tsx                 ← Root layout (fonts, ThemeProvider, Sonner)
│   │   ├── global-error.tsx           ← Global error boundary
│   │   ├── actions/
│   │   │   ├── contact.ts             ← Contact form server action (stubbed)
│   │   │   └── newsletter.ts          ← Newsletter signup server action (stubbed)
│   │   └── [locale]/
│   │       ├── layout.tsx             ← Locale layout (Header, Footer, main wrapper)
│   │       ├── page.tsx               ← Homepage (7 sections)
│   │       ├── not-found.tsx          ← Custom 404
│   │       ├── error.tsx              ← Error boundary
│   │       ├── about/
│   │       │   ├── layout.tsx         ← About section layout
│   │       │   ├── page.tsx           ← About main page
│   │       │   ├── team/page.tsx      ← Team page
│   │       │   └── mission/page.tsx   ← Mission & Values page
│   │       ├── contact/page.tsx       ← Contact page (form + FAQ)
│   │       ├── weather/page.tsx       ← Weather & Tides dashboard (NEW)
│   │       ├── privacy/page.tsx       ← Privacy policy (stub)
│   │       └── terms/page.tsx         ← Terms of use (stub)
│   ├── components/
│   │   ├── ui/                        ← 19 shadcn/ui components
│   │   ├── layout/
│   │   │   ├── Header.tsx             ← Sticky header with scroll detection
│   │   │   ├── DesktopNav.tsx         ← NavigationMenu with dropdowns
│   │   │   ├── MobileNav.tsx          ← Sheet drawer with accordion menus
│   │   │   ├── LanguageToggle.tsx     ← EN/ES switcher
│   │   │   └── Footer.tsx             ← 4-column footer
│   │   ├── shared/
│   │   │   ├── SkipToContent.tsx      ← Accessibility skip link
│   │   │   ├── ThemeToggle.tsx        ← Light/dark toggle
│   │   │   ├── NewsletterForm.tsx     ← Newsletter signup form
│   │   │   └── ContactForm.tsx        ← Contact form (react-hook-form + Zod)
│   │   ├── home/
│   │   │   ├── HeroSection.tsx        ← Hero with gradient + CTAs
│   │   │   ├── MissionCards.tsx       ← Protect/Educate/Connect cards
│   │   │   ├── ImpactCounter.tsx      ← Animated count-up stats
│   │   │   ├── WeatherPreview.tsx     ← Weather CTA card (links to /weather)
│   │   │   ├── FeaturedContent.tsx    ← Placeholder content cards
│   │   │   ├── GetInvolvedCTA.tsx     ← Volunteer + Donate cards
│   │   │   └── PartnersSection.tsx    ← Partner placeholders
│   │   └── weather/                   ← Weather & Tides components (NEW)
│   │       ├── WeatherDashboard.tsx   ← Main dashboard orchestrator
│   │       ├── LocationSelector.tsx   ← GPS + ZIP + beach selector
│   │       ├── CurrentConditions.tsx  ← Temperature, wind, humidity, UV
│   │       ├── MarineConditionsCard.tsx ← Waves, swell, period
│   │       ├── TideStatus.tsx         ← Rising/falling, next hi/lo
│   │       ├── TideChart.tsx          ← 24h Recharts area chart
│   │       ├── DailyForecast.tsx      ← 7-day forecast cards
│   │       ├── SafetyAdvisory.tsx     ← UV warning + activity tips
│   │       └── WeatherIcon.tsx        ← Dynamic weather icon component
│   ├── i18n/                          ← next-intl config
│   ├── lib/
│   │   ├── api/
│   │   │   ├── weather.ts            ← Open-Meteo API client (NEW)
│   │   │   ├── tides.ts              ← NOAA CO-OPS API client (NEW)
│   │   │   ├── geolocation.ts        ← Browser GPS + ZIP lookup (NEW)
│   │   │   ├── supabase-browser.ts   ← Supabase browser client
│   │   │   └── supabase-server.ts    ← Supabase server client
│   │   ├── data/
│   │   │   ├── socal-beaches.ts      ← Stations, beaches, ZIP lookup (NEW)
│   │   │   └── weather-codes.ts      ← WMO code → description/icon (NEW)
│   │   ├── hooks/
│   │   │   ├── useGeolocation.ts     ← Location state management (NEW)
│   │   │   ├── useWeather.ts         ← Weather data fetching (NEW)
│   │   │   └── useTides.ts           ← Tide data fetching (NEW)
│   │   ├── types/
│   │   │   ├── weather.ts            ← Weather types (updated)
│   │   │   ├── tides.ts              ← Tide types (updated)
│   │   │   ├── geolocation.ts        ← Location types (NEW)
│   │   │   ├── content.ts            ← Content types
│   │   │   ├── forms.ts              ← Form schemas
│   │   │   └── index.ts              ← Barrel export (updated)
│   │   ├── utils/
│   │   │   ├── weather-format.ts     ← Formatting utilities (NEW)
│   │   │   ├── geo.ts                ← Haversine + nearest station (NEW)
│   │   │   └── utils.ts              ← cn() utility
│   │   └── ...
│   ├── content/                       ← MDX content directories (empty)
│   ├── env.ts                         ← Zod-validated environment config
│   └── proxy.ts                       ← Next.js 16 proxy (i18n middleware)
├── tests/                              ← Test directories
├── next.config.ts                      ← Next.js config + security headers
└── package.json                        ← Dependencies and scripts
```

### Key Versions
- Next.js 16.1.6 | React 19.2.3 | TypeScript 5.9.3
- Tailwind CSS v4.2.0 | shadcn/ui (latest)
- Zod v4.3.6 | next-intl v4.8.3
- pnpm 10.10.0 | Node.js v20.18.0
