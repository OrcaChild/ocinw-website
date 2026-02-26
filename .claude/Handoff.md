# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-25
> Session: #20 (Comprehensive 7-Dimension Site Audit)

---

## At A Glance

**Current Phase:** Phase 10 COMPLETE (code) — Site audited, 20 issues fixed | **Security:** 14/14 + 6 new fixed | **Tests:** 238 passing | **Next Action:** Fix remaining audit items → SQL migrations → SEO

---

## Quick Status

| Phase                          | Status          | Notes                                                    |
| ------------------------------ | --------------- | -------------------------------------------------------- |
| Phase 1 — Legal Foundation     | NOT STARTED     | Independent of website dev                                |
| Phase 2 — Brand Identity       | **COMPLETE**    | Carlsbad Coastal redesign                                 |
| Phase 3 — Tech Stack           | DECIDED         | All choices locked                                        |
| Phase 4 — Project Scaffolding  | **COMPLETE**    | 11 steps, 11 commits                                     |
| Phase 5 — Core Website         | **COMPLETE**    | All pages, nav, forms, security                           |
| Phase 6 — Weather & Tides      | **COMPLETE**    | Dashboard, live APIs, geolocation, tide chart             |
| Phase 7 — Donation System      | **COMPLETE**    | Donate page + Zeffy placeholder                           |
| Phase 8 — Volunteer System     | **COMPLETE**    | Full signup + consent code system + COPPA                 |
| Phase 9 — Education Content    | **COMPLETE**    | Velite + 23 MDX files + hubs                              |
| Phase 10 — Events System       | **CODE COMPLETE** | Needs SQL migrations before go-live                     |
| Phase 11 — Testing             | **COMPLETE**    | 238 tests, E2E, axe-core                                  |
| Phase 12 — Pre-Launch          | NOT STARTED     | All features must be built                                |
| Phase 13 — Launch              | IN PROGRESS     | VPS deployed, HTTPS live                                  |
| Phase 14 — Post-Launch         | NOT STARTED     | —                                                         |

---

## NEXT SESSION — Priority Actions (in order)

### 1. Fix Remaining Audit Issues (8 open)

**HIGH:**
- **A21:** Implement CSP nonces for production — replace `unsafe-inline` in script-src (`next.config.ts`, `proxy.ts`)

**MEDIUM:**
- **A22:** Internationalize global-error.tsx (5 hardcoded English strings)
- **A23:** Internationalize WeatherErrorBoundary.tsx (3 hardcoded English strings)
- **A24:** Internationalize LocationSelector.tsx (3 hardcoded English strings)
- **A25:** Add `sizes` attribute to 10 Image components (5 card components + 5 slug pages)

**LOW (optional):**
- **A26:** Standardize dark section backgrounds (3 patterns: `white/[0.02]`, `muted/30`, `muted/20`)
- **A27:** Standardize CTA button shapes — some use `rounded-md` vs `rounded-full` (not-found, error, about, team)
- **A28:** DonorRecognition uses non-brand colors (sky, emerald, indigo, purple) — consider brand palettes

### 2. Run SQL Migrations in Supabase (user action)

Two migration files need to be run in Supabase SQL Editor:

1. **`supabase/migrations/002_events_phase10.sql`** — Events tables, RPC function, UNIQUE constraint, deleted_at column
2. **`supabase/migrations/003_parental_consent.sql`** — Consent request + consent code tables, RLS, indexes

### 3. SEO Foundations (start ranking in search)

User wants to rank alongside orgs like Heal the Bay and OC Coastkeeper.

- `src/app/sitemap.ts` — Dynamic sitemap generation
- `src/app/robots.ts` — robots.txt config
- JSON-LD structured data (Organization, Event, Article schemas)
- Open Graph + Twitter Card meta tags
- Rich meta descriptions on key pages

### 4. Seed Test Events

Insert 2-3 sample events into the `events` table so pages have content.

---

## What Was Completed This Session (#20)

### Comprehensive 7-Dimension Audit
- Audited **all code from Sessions #10-#19** (~7,000 new LOC, codebase now ~14,257 LOC)
- **28 issues found** across Design, Security, Performance, i18n, Accessibility, Bias, Inclusivity
- **20 fixed in-session**, 8 remain open, 3 deferred to content phase
- All quality gates pass after fixes (lint, type-check, 238 tests, build)

### Key Fixes Applied
1. **Design:** Completed all brand color palettes (coral/sand/kelp -700 to -950, ocean/teal -950), fixed dynamic Tailwind class construction, remapped to brand colors
2. **Security:** CSRF on validateConsentCode, safe type guards replacing `as number`, slug validation on iCal route, header sanitization, non-null assertion removal
3. **Accessibility:** EventCard alt text, Zeffy iframe aria-label
4. **i18n:** Locale-aware date formatting on all event pages, hardcoded English → translation keys
5. **Inclusivity:** 6 ability-inclusive language fixes in MDX content
6. **Bias:** Removed all "mentors" references → "communities" (no mentor program)

### Documentation Updated
- `ProjectHealth.md` — Complete rewrite with audit scores (Overall: 8.8/10 A-)
- `Handoff.md` — This file
- `Completed.md` — Session #20 entry with all details

---

## Audit Health Summary

| Dimension         | Score   | Grade |
| ----------------- | ------- | ----- |
| Quality Gates     | 5/5     | A+    |
| Code Quality      | 9/10    | A     |
| Security          | 9/10    | A     |
| Accessibility     | 9/10    | A     |
| Performance       | 9/10    | A     |
| i18n              | 8/10    | B+    |
| Inclusivity       | 8/10    | B+    |
| Bias              | 9/10    | A     |
| Test Coverage     | 9/10    | A     |
| Design Continuity | 8/10    | B+    |
| Tech Debt         | 8/10    | B+    |
| Dependencies      | 9/10    | A     |
| Documentation     | 10/10   | A+    |
| **Overall**       | **8.8** | **A-**|

See `.claude/ProjectHealth.md` for full issue tracker, security posture, and accessibility compliance details.

---

## Deferred Content Work

| ID   | Phase   | Issue                                          |
| ---- | ------- | ---------------------------------------------- |
| D8   | Content | 23 MDX files need Spanish translations         |
| D9   | Content | 16 MDX files missing `readingLevel` frontmatter |
| D10  | Content | No accessibility accommodations info anywhere  |

---

## Idea Backlog

- **Animated wave video background** — User wants the hero beach image to be a looping video of gentle waves. React can handle `<video autoplay loop muted>`. Would need a short 5-10s MP4/WebM clip of the same beach. Deferred — not part of audit.

---

## Security Status

| ID | Severity | Issue | Status |
|----|----------|-------|--------|
| V1–V9 | Various | Original security vulnerabilities (Sessions #7-9) | ALL RESOLVED |
| E-A–E-E | Various | Event/COPPA security (Session #18) | ALL RESOLVED |
| A6 | MEDIUM | CSRF on validateConsentCode | **RESOLVED** (Session #20) |
| A7 | MEDIUM | Unsafe `as number` type assertions | **RESOLVED** (Session #20) |
| A8 | MEDIUM | No slug validation in iCal route | **RESOLVED** (Session #20) |
| A9 | MEDIUM | Header injection in iCal route | **RESOLVED** (Session #20) |
| A14 | LOW | Non-null assertion in VolunteerForm | **RESOLVED** (Session #20) |
| A21 | HIGH | Production CSP needs nonces | **OPEN** |

---

## VPS Connection Details

| Detail | Value |
|--------|-------|
| Host | 72.62.200.30 |
| SSH Port | 2222 |
| SSH User | orcachild |
| SSH Key | `~/.ssh/orcachild_vps` |
| SSH Command | `ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30` |
| Web Console | Hostinger hPanel → VPS → Terminal |
| App Path | `/home/orcachild/ocinw-website/` |
| PM2 Process | `ocinw` (ID 0) |
| Domain | `www.orcachildinthewild.com` (canonical) |
| SSL Expiry | 2026-05-26 (auto-renews) |
| SITE_URL | `https://www.orcachildinthewild.com` |

### Deployment Workflow
```bash
# One-liner deploy from local machine:
ssh -i ~/.ssh/orcachild_vps -p 2222 orcachild@72.62.200.30 \
  "cd ~/ocinw-website && git pull && pnpm install --frozen-lockfile && pnpm build && pm2 restart ocinw"
```

---

## Blockers & Open Questions

1. **SQL migrations not yet run** — must run 002 + 003 in Supabase SQL Editor before events/consent work
2. **Zeffy account not created** — requires registered nonprofit
3. **No logo yet** — using Waves icon placeholder
4. **Original photos in progress** — user assembling real photos
5. **Admin code generation** — currently manual via Supabase SQL Editor (no admin UI yet)
6. **Website content is filler** — user will work with Jordyn to create real content

---

## Decisions Made This Session

| Decision | Choice | Why |
| -------- | ------ | --- |
| "Mentors" → "Communities" | Remove all mentor/mentorship references | 501(c)(3) nonprofit doesn't have a mentor program — they go into communities to make a difference |
| Ability-inclusive language | Replace "walking" with neutral alternatives | Ensure all activity descriptions welcome people regardless of mobility |
| Brand color remapping | amber→sand, primary→ocean, rose→coral | Maintain Carlsbad Coastal identity consistently across all pages |
| Animated wave video | Deferred to idea backlog | User loves the idea but audit comes first |

---

## Supabase Project Details

| Detail | Value |
|--------|-------|
| Project | ocinw-website |
| Region | West US (North California) |
| URL | `https://eepwfuxxiftyedyvfgyv.supabase.co` |
| Dashboard | `https://supabase.com/dashboard/project/eepwfuxxiftyedyvfgyv` |
| Schema | `supabase/schema.sql` (8 tables) + 2 pending migrations (10 tables total) |

---

## Environment Setup Notes

- Development machine: Windows 11 Pro
- Shell: bash (Git Bash)
- Working directory: `c:\OrcaChild`
- **Note:** Turbopack crashes on this machine. Use `pnpm dev --webpack` for dev server.

### Key Versions (Local Dev)
- Next.js 16.1.6 | React 19.2.3 | TypeScript 5.9.3
- Tailwind CSS v4.2.0 | shadcn/ui (latest) | Velite 0.3.1
- Zod v4.3.6 | next-intl v4.8.3
- Vitest 4.0.18 | Playwright 1.58.2 | happy-dom 20.7.0
- pnpm 10.10.0 | Node.js v20.18.0

### Key Versions (VPS)
- Node.js v22.22.0 | pnpm 10.30.2 | PM2 6.0.14
- Nginx 1.24.0 | Certbot 2.9.0
- Ubuntu 24.04 LTS | Kernel 6.8.0-101-generic
