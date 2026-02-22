# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-21
> Session: #2 (Comprehensive File Audit & Improvements)

---

## At A Glance

**Current Phase:** Phase 4 (Scaffolding) — READY TO START | **Blockers:** 0 critical (5 non-blocking) | **Next Action:** Initialize Next.js project

---

## Quick Status

| Phase | Status | Dependencies | Notes |
|-------|--------|-------------|-------|
| Phase 1 — Legal Foundation | NOT STARTED | None | Independent of website dev; can run in parallel |
| Phase 2 — Brand Identity | NOT STARTED | None | Design system defined in plan; no assets created |
| Phase 3 — Tech Stack | DECIDED | None | All technology choices locked in OCINW.MD |
| Phase 4 — Project Scaffolding | NOT STARTED | None | **Next task to execute** |
| Phase 5 — Core Website | NOT STARTED | Phase 4 | Requires scaffolding complete |
| Phase 6 — Weather & Tides | NOT STARTED | Phase 4, 5 | Requires core layout and API infrastructure |
| Phase 7 — Donation System | NOT STARTED | Phase 1 (Zeffy needs nonprofit status) | Zeffy embed can be stubbed without 501(c)(3) |
| Phase 8 — Volunteer System | NOT STARTED | Phase 4, 5 | Requires DB schema and core layout |
| Phase 9 — Education Content | NOT STARTED | Phase 4 (MDX infra) | Content writing can start as soon as MDX schema defined |
| Phase 10 — Accessibility/i18n | NOT STARTED | Phase 4 (i18n foundation moved here) | Translation *content* happens here; i18n *infrastructure* is in Phase 4.7 |
| Phase 11 — Testing | NOT STARTED | Phase 5+ | Tests written alongside features, comprehensive pass here |
| Phase 12 — Pre-Launch | NOT STARTED | Phase 5-11 | All features must be built |
| Phase 13 — Launch | NOT STARTED | Phase 12 | Pre-launch checklist must pass |
| Phase 14 — Post-Launch | NOT STARTED | Phase 13 | — |

---

## What Was Completed This Session

### Session #2 — 2026-02-21 (Comprehensive File Audit & Improvements)

1. **Audited all 5 project files** — 3 specialist agents read every file twice, found 144 issues total
2. **Implemented 50 improvements** across all files:
   - **OCINW.MD** (17 changes): Added donations, admin_users, audit_log tables; consent tracking fields; background check spec; digital waiver spec; parental consent workflow; i18n moved to Phase 4.7; newsletter delivery system; soft-delete pattern; species/ecosystem WHY reasoning; NOAA station dedup; budget line items; event cancellation workflow; map tile provider; content ordering notes
   - **CLAUDE.md** (10 changes): Production CSP without unsafe-eval; backup & disaster recovery; payload size limits; DB query optimization; ARIA live regions; fieldset/legend; FCP target; visual regression testing; error logging privacy; env variable typing
   - **Teams.md** (7 changes): Added PRIV agent; conflict resolution defaults; blocking workflow pattern; hotfix pattern; agent handoff format; expanded delegation matrix; SEC CCPA context; updated DB agent with new tables
   - **Handoff.md** (7 changes): This rewrite — TL;DR, dependency column, acceptance criteria, pre-requisites, infrastructure limits, decision metadata, session estimates
   - **Completed.md** (4 changes): Entry template, session index, phase tags, archiving strategy
   - **MEMORY.md** (5 changes): Constraints, DB tables, quality gates, NOAA stations, documentation map

### Session #1 — 2026-02-21 (Initial Planning)

1. **Created `OCINW.MD`** — Complete roadmap from idea to launch
2. **Created `CLAUDE.md`** — Project instructions file
3. **Created `MEMORY.md`** — Persistent project memory
4. **Created `Handoff.md`** — Session continuity
5. **Created `Completed.md`** — Work diary
6. **Created `Teams.md`** — Agent team specialists

---

## Currently In-Progress

Nothing currently in-progress. Session #2 was audit-and-improve-only.

---

## What Should Be Done Next

### Pre-Requisite Verification Checklist

Before starting Phase 4, verify:
- [ ] Node.js v18+ installed (`node --version`)
- [ ] pnpm available (`pnpm --version`), or install via `npm install -g pnpm` / `corepack enable`
- [ ] Git installed and configured (`git --version`, `git config user.name`, `git config user.email`)
- [ ] GitHub account ready for repository creation
- [ ] Supabase account created (supabase.com — free tier)

### Immediate Next Step: Phase 4 — Project Scaffolding

The very first code action should be:

1. **Initialize Git repository** in `c:\OrcaChild`
2. **Create `.gitignore`** (Node.js + Next.js template)
3. **Scaffold Next.js project:**
   ```bash
   pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```
4. **Install core dependencies** (see OCINW.MD Phase 4.3)
5. **Initialize shadcn/ui** and install base components
6. **Configure Tailwind** with OCINW design tokens
7. **Set up ESLint + Prettier** with project rules
8. **Configure next-intl** (Phase 4.7 — i18n foundation)
9. **Create `.env.example`** and `src/env.ts` (typed env validation)
10. **Set up Supabase project** and deploy database schema (all 8 tables)
11. **Create GitHub Actions CI pipeline**

#### Phase 4 Acceptance Criteria
- [ ] `git status` shows clean working tree after initial commit
- [ ] `pnpm install` succeeds without errors
- [ ] `pnpm build` produces a successful production build
- [ ] `pnpm lint` passes with zero errors
- [ ] `pnpm type-check` passes with zero TypeScript errors
- [ ] `.env.example` lists all required environment variables
- [ ] Supabase schema deployed with all 8 tables and RLS policies
- [ ] CI pipeline runs and passes on push
- [ ] i18n foundation configured (next-intl, translation files created)

### After Scaffolding: Phase 5 — Core Website

Build the shell first:
- Root layout (header, footer, providers)
- Homepage (hero, mission, weather preview, featured content, impact counter, CTAs)
- Navigation (desktop + mobile)
- Error pages (404, error boundary)

---

## Blockers & Open Questions

1. **Domain name not yet registered** — `orcachildinthewild.org` should be secured before any deployment
2. **Supabase project not created** — need to create free-tier project and get credentials
3. **Zeffy account not created** — requires registered nonprofit status for full setup
4. **No logo or visual assets yet** — can use placeholder for development, but brand identity (Phase 2) should be started in parallel
5. **501(c)(3) status** — legal formation (Phase 1) is independent of website development and can proceed in parallel

*None of these block Phase 4 scaffolding. All can proceed in parallel with development.*

---

## Infrastructure Free-Tier Limits

Monitor these to avoid unexpected costs or service interruptions:

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
| i18n in Phase 4 | Moved from Phase 10 to 4.7 | Build with translation keys from day one, not retrofit | — | #2 |
| Background checks | Sterling Volunteers | Nonprofit rates, youth-org specialist | Easy (swap provider) | #2 |
| Newsletter delivery | Resend Broadcast | Already in stack, free tier sufficient | Easy (swap to Loops.so) | #2 |

---

## Environment Setup Notes

- Development machine: Windows 11 Pro
- Shell: bash (Git Bash / WSL)
- Working directory: `c:\OrcaChild`
- Node.js: Required (ensure latest LTS installed)
- pnpm: Required (install via `npm install -g pnpm` or `corepack enable`)

---

## File Inventory

```
c:\OrcaChild\
├── OCINW.MD          ← Master roadmap (~2,800 lines after audit improvements)
├── CLAUDE.md         ← Project instructions for Claude Code
├── Handoff.md        ← This file (session state)
├── Completed.md      ← Work diary
└── Teams.md          ← Agent team definitions (13 agents including PRIV)
```

*No code files yet — project scaffolding is the next step.*
