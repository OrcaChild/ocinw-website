# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-22
> Session: #4 (ready to start — Phase 5: Core Website)

---

## At A Glance

**Current Phase:** Phase 5 (Core Website) — READY TO START | **Blockers:** 0 critical (4 non-blocking) | **Next Action:** Build root layout with header, navigation, and footer

---

## Quick Status

| Phase | Status | Dependencies | Notes |
|-------|--------|-------------|-------|
| Phase 1 — Legal Foundation | NOT STARTED | None | Independent of website dev; can run in parallel |
| Phase 2 — Brand Identity | NOT STARTED | None | Design system defined in plan; no assets created |
| Phase 3 — Tech Stack | DECIDED | None | All technology choices locked in OCINW.MD |
| Phase 4 — Project Scaffolding | **COMPLETE** | None | 11 steps, 11 commits, all gates pass |
| Phase 5 — Core Website | **NEXT** | Phase 4 ✅ | Root layout, nav, homepage, about, contact, errors |
| Phase 6 — Weather & Tides | NOT STARTED | Phase 4 ✅, Phase 5 | Requires core layout and API infrastructure |
| Phase 7 — Donation System | NOT STARTED | Phase 1 (Zeffy needs nonprofit status) | Zeffy embed can be stubbed without 501(c)(3) |
| Phase 8 — Volunteer System | NOT STARTED | Phase 4 ✅, Phase 5 | Requires DB schema and core layout |
| Phase 9 — Education Content | NOT STARTED | Phase 4 ✅ (MDX infra) | Content writing can start as soon as MDX schema defined |
| Phase 10 — Accessibility/i18n | NOT STARTED | Phase 4 ✅ | Translation *content* happens here; i18n *infrastructure* done |
| Phase 11 — Testing | NOT STARTED | Phase 5+ | Tests written alongside features, comprehensive pass here |
| Phase 12 — Pre-Launch | NOT STARTED | Phase 5-11 | All features must be built |
| Phase 13 — Launch | NOT STARTED | Phase 12 | Pre-launch checklist must pass |
| Phase 14 — Post-Launch | NOT STARTED | Phase 13 | — |

---

## Currently In-Progress

Nothing currently in-progress. Ready for Phase 5.

---

## What Should Be Done Next

### Phase 5 — Core Website Development

Build the website shell — all pages share a consistent layout with header, nav, and footer.

**Consult OCINW.MD Phase 5 for full specifications.** Key deliverables:

1. **Root layout enhancements** — Skip-to-content link, Sonner toast provider, theme provider (light/dark)
2. **Header + Navigation** — Desktop navbar with logo + nav links + language switcher + CTA button. Mobile hamburger menu via Sheet component. Sticky header with scroll behavior.
3. **Footer** — Site links, social media, newsletter signup stub, copyright with dynamic year, language switcher
4. **Homepage** (`/`) — Hero section with CTA buttons, mission statement, featured content cards, impact counter, weather preview stub, upcoming events stub
5. **About page** (`/about`) — Mission, team members, organization history, partners
6. **Contact page** (`/contact`) — Form with Zod validation (name, email, subject, message), success/error states
7. **Error pages** — Custom 404 (`not-found.tsx`), error boundary (`error.tsx`), global error boundary
8. **Legal pages** — Privacy policy stub (`/privacy`), terms of use stub (`/terms`)

**All pages must:**
- Use translation keys from `messages/en.json` and `messages/es.json` (never hardcode English)
- Be server components by default (`"use client"` only for interactivity)
- Include proper metadata (title, description) for SEO
- Be keyboard-accessible and meet WCAG 2.1 AA
- Work at desktop (1280px) and mobile (375px) viewports

### Phase 5 Acceptance Criteria
- [ ] All pages render without errors
- [ ] Navigation works (desktop + mobile responsive)
- [ ] Language switching works (EN/ES)
- [ ] Skip-to-content link present
- [ ] `pnpm build` passes
- [ ] `pnpm lint` passes with zero errors/warnings
- [ ] `pnpm type-check` passes

---

## Repository

- **GitHub:** `https://github.com/OrcaChild/ocinw-website`
- **Branch:** `main`
- **11 commits** (Phase 4 complete)
- **Git config:** user.name="Orca Child", user.email="orcachildinthewild@gmail.com"
- **GitHub CLI:** installed (`gh` v2.87.2) — auth via `gh auth login` in terminal when needed

---

## Blockers & Open Questions

1. **Domain name not yet registered** — `orcachildinthewild.org` should be secured before deployment
2. **Supabase project not created** — need free-tier project for DB features (Phase 8+)
3. **Zeffy account not created** — requires registered nonprofit status for full donation setup
4. **No logo or visual assets yet** — use placeholder for development; brand identity (Phase 2) in parallel

*None of these block Phase 5. All can proceed in parallel with development.*

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
├── .claude/                  ← Planning documents
│   ├── OCINW.MD             ← Master roadmap (~2,800 lines)
│   ├── CLAUDE.md            ← Project instructions for Claude Code
│   ├── Handoff.md           ← This file (session state)
│   ├── Completed.md         ← Work diary
│   └── Teams.md             ← Agent team definitions (13 agents)
├── .github/workflows/ci.yml ← GitHub Actions CI pipeline
├── messages/                 ← i18n translation files
│   ├── en.json              ← English translations
│   └── es.json              ← Spanish translations
├── src/
│   ├── app/
│   │   ├── globals.css      ← OCINW design system (Tailwind v4)
│   │   ├── layout.tsx       ← Root layout (fonts, metadata)
│   │   └── [locale]/        ← Locale routing
│   │       ├── layout.tsx   ← Locale provider
│   │       └── page.tsx     ← Home page
│   ├── components/ui/       ← 19 shadcn/ui components
│   ├── components/          ← Feature directories (layout, weather, donate, etc.)
│   ├── i18n/                ← next-intl config (routing, request, navigation, types)
│   ├── lib/api/             ← Supabase clients (browser + server)
│   ├── lib/types/           ← Type definitions (weather, tides, content, forms)
│   ├── lib/hooks/           ← Custom hooks (empty)
│   ├── content/             ← Content directories (articles, species, ecosystems, etc.)
│   ├── env.ts               ← Zod-validated environment config
│   └── proxy.ts             ← Next.js 16 proxy (i18n middleware)
├── tests/                    ← Test directories (unit, integration, e2e, accessibility)
├── .env.example              ← Environment variable template
├── eslint.config.mjs         ← ESLint flat config with a11y rules
├── .prettierrc               ← Prettier config with Tailwind plugin
├── vitest.config.ts          ← Vitest test runner config
├── playwright.config.ts      ← E2E test config
├── tsconfig.json             ← TypeScript strict config
├── next.config.ts            ← Next.js + next-intl plugin
└── package.json              ← Dependencies and scripts
```

### Key Versions
- Next.js 16.1.6 | React 19.2.3 | TypeScript 5.9.3
- Tailwind CSS v4.2.0 | shadcn/ui (latest)
- Zod v4.3.6 | next-intl v4.8.3
- pnpm 10.10.0 | Node.js v20.18.0
