# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-22
> Session: #4 (Phase 5: Core Website — COMPLETE)

---

## At A Glance

**Current Phase:** Phase 5 (Core Website) — **COMPLETE** | **Blockers:** 0 critical (4 non-blocking) | **Next Action:** Phase 6 (Weather & Tides) or Phase 7 (Donations)

---

## Quick Status

| Phase | Status | Dependencies | Notes |
|-------|--------|-------------|-------|
| Phase 1 — Legal Foundation | NOT STARTED | None | Independent of website dev; can run in parallel |
| Phase 2 — Brand Identity | NOT STARTED | None | Design system defined in plan; no assets created |
| Phase 3 — Tech Stack | DECIDED | None | All technology choices locked in OCINW.MD |
| Phase 4 — Project Scaffolding | **COMPLETE** | None | 11 steps, 11 commits, all gates pass |
| Phase 5 — Core Website | **COMPLETE** | Phase 4 ✅ | All pages, nav, forms, error handling, security headers |
| Phase 6 — Weather & Tides | **NEXT** | Phase 5 ✅ | Requires core layout (done) and API infrastructure |
| Phase 7 — Donation System | **NEXT** | Phase 1 (Zeffy needs nonprofit status) | Zeffy embed can be stubbed without 501(c)(3) |
| Phase 8 — Volunteer System | NOT STARTED | Phase 5 ✅ | Requires DB schema and core layout (done) |
| Phase 9 — Education Content | NOT STARTED | Phase 4 ✅ (MDX infra) | Content writing can start as soon as MDX schema defined |
| Phase 10 — Accessibility/i18n | NOT STARTED | Phase 4 ✅ | Translation *content* happens here; i18n *infrastructure* done |
| Phase 11 — Testing | NOT STARTED | Phase 5+ | Tests written alongside features, comprehensive pass here |
| Phase 12 — Pre-Launch | NOT STARTED | Phase 5-11 | All features must be built |
| Phase 13 — Launch | NOT STARTED | Phase 12 | Pre-launch checklist must pass |
| Phase 14 — Post-Launch | NOT STARTED | Phase 13 | — |

---

## Currently In-Progress

Nothing currently in-progress. Phase 5 complete. Ready for Phase 6+.

---

## What Was Completed This Session (Phase 5)

### 10 Implementation Steps

1. **Translation files expanded** — Fixed "Pacific Northwest" → "Southern California" across EN/ES. Expanded from ~35 to ~250+ translation keys covering all pages.
2. **Root layout enhanced** — ThemeProvider (light/dark/system), Sonner toast container, metadata fix.
3. **Header + Desktop Navigation** — Sticky header with backdrop blur on scroll, NavigationMenu with 3 dropdown menus (About, Learn, Conservation), language toggle, theme toggle, Donate CTA button.
4. **Mobile Navigation** — Sheet drawer from left, accordion sub-menus, Donate CTA at top, language/theme toggles in footer.
5. **Footer + Newsletter form** — 4-column layout (brand, explore links, get involved links, newsletter), social media links, copyright with dynamic year, "Founded by Jordyn Rosario", 501(c)(3) notice, privacy/terms links. Newsletter form with Zod validation and stubbed server action.
6. **Homepage (7 sections)** — Hero with gradient + CTAs, Mission Cards (Protect/Educate/Connect), Impact Counter (animated count-up with IntersectionObserver, respects prefers-reduced-motion), Weather Preview stub, Featured Content placeholders, Get Involved CTA (volunteer + donate cards), Partners Section.
7. **About pages (3 sub-pages)** — About main (origin story, milestones, mission preview, vision, focus area map placeholder), Team page (board + youth council profiles), Mission & Values (mission, vision, 5 core values, 4 strategic goals). Shared sub-navigation.
8. **Contact page** — Contact form with react-hook-form + Zod validation + stubbed server action, FAQ accordion (5 questions), contact info sidebar. Toast notifications for success/error.
9. **Error + Legal pages** — Custom 404 (ocean-themed with popular page links), error boundary (try again + go home), global error boundary (catches root layout errors). Privacy policy stub (7 sections including COPPA/CCPA). Terms of use stub (7 sections). Both marked as DRAFT.
10. **Security headers** — CSP (dev/prod split), X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy.

### Phase 5 Acceptance Criteria — All Passed
- [x] All pages render without errors (17 pages built for EN/ES)
- [x] Navigation works (desktop dropdown menus + mobile Sheet drawer)
- [x] Language switching works (EN/ES via locale-aware navigation)
- [x] Skip-to-content link present and keyboard-accessible
- [x] `pnpm build` passes (17 static pages generated)
- [x] `pnpm lint` passes with zero errors/warnings
- [x] `pnpm type-check` passes with zero TypeScript errors

---

## What Should Be Done Next

### Option A: Phase 6 — Weather & Tides System
- Open-Meteo API integration (current conditions, hourly/daily forecast)
- NOAA CO-OPS tides API (7 SoCal stations)
- Geolocation with ZIP code fallback
- Tide chart visualization (Recharts)
- Caching strategy (15min weather, 6hr tides)

### Option B: Phase 7 — Donation System
- Zeffy embed integration
- Impact tiers
- Donor recognition (if anonymous toggle)
- Donation tracking (Supabase table)

### Option C: Phase 8 — Volunteer System
- Requires Supabase project creation
- Volunteer signup form with COPPA age-gating
- Parental consent verification workflow
- Volunteer opportunities listing

**Recommendation:** Phase 6 (Weather & Tides) — it's the most visible feature, has no external dependencies, and the API infrastructure was designed for it.

---

## Repository

- **GitHub:** `https://github.com/OrcaChild/ocinw-website`
- **Branch:** `main`
- **Commits:** 11 (Phase 4) + Phase 5 pending commit
- **Git config:** user.name="Orca Child", user.email="orcachildinthewild@gmail.com"
- **GitHub CLI:** installed (`gh` v2.87.2) — auth via `gh auth login` in terminal when needed

---

## Blockers & Open Questions

1. **Domain name not yet registered** — `orcachildinthewild.org` should be secured before deployment
2. **Supabase project not created** — need free-tier project for DB features (Phase 8+). Contact form and newsletter are stubbed.
3. **Zeffy account not created** — requires registered nonprofit status for full donation setup
4. **No logo or visual assets yet** — using Waves icon (lucide) as placeholder; brand identity (Phase 2) in parallel

*None of these block Phase 6. All can proceed in parallel with development.*

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
│   ├── en.json                        ← English translations (~250 keys)
│   └── es.json                        ← Spanish translations (~250 keys)
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
│   │   └── home/
│   │       ├── HeroSection.tsx        ← Hero with gradient + CTAs
│   │       ├── MissionCards.tsx       ← Protect/Educate/Connect cards
│   │       ├── ImpactCounter.tsx      ← Animated count-up stats
│   │       ├── WeatherPreview.tsx     ← Weather stub card
│   │       ├── FeaturedContent.tsx    ← Placeholder content cards
│   │       ├── GetInvolvedCTA.tsx     ← Volunteer + Donate cards
│   │       └── PartnersSection.tsx    ← Partner placeholders
│   ├── i18n/                          ← next-intl config
│   ├── lib/                           ← API clients, types, utils, hooks
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
