# Handoff — Orca Child in the Wild

> **Session Continuity Document**
> Last updated: 2026-02-26
> Session: #21 (Audit Fixes A21–A25 + SEO Foundations)

---

## At A Glance

**Current Phase:** Phase 10 COMPLETE (code) — All HIGH/MEDIUM audit items resolved | **Security:** A21 RESOLVED (nonce-based CSP) | **Tests:** 238 passing | **Next Action:** SQL migrations → low-priority design polish → Event/Article JSON-LD → Page-level OG meta

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

### 1. Run SQL Migrations in Supabase (user action required)

Two migration files need to be run in Supabase SQL Editor before events/consent goes live:

1. **`supabase/migrations/002_events_phase10.sql`** — Events tables, RPC function, UNIQUE constraint, deleted_at column
2. **`supabase/migrations/003_parental_consent.sql`** — Consent request + consent code tables, RLS, indexes

### 2. SEO — Page-Level Metadata & Rich Snippets

Base OG/JSON-LD is now live. Next layer:
- Add `generateMetadata()` to key pages (home, about, conservation, learn, donate, volunteer) with page-specific og:title, og:description, canonical URL
- Event pages: JSON-LD `Event` schema (startDate, endDate, location, organizer)
- Article pages: JSON-LD `Article` schema (datePublished, author, image)
- Species/ecosystem pages: JSON-LD `Article` or `Thing` schema

### 3. Low-Priority Design Polish (optional, A26–A28)

- **A26:** Standardize dark section backgrounds (3 patterns: `white/[0.02]`, `muted/30`, `muted/20`)
- **A27:** Standardize CTA button shapes — some use `rounded-md` vs `rounded-full` (not-found, error, about, team)
- **A28:** DonorRecognition uses non-brand colors (sky, emerald, indigo, purple) — consider brand palettes

### 4. Seed Test Events

Insert 2-3 sample events into the `events` table so pages have real content to display.

### 5. Phase 12 — Pre-Launch Checklist

Once SQL migrations are run and test events are seeded, Phase 12 can begin:
- Accessibility audit (axe-core on live pages)
- Performance audit (Lighthouse on VPS)
- Security headers audit (securityheaders.com)
- Privacy policy + terms finalization
- Google Search Console setup (after sitemap submission)

---

## What Was Completed This Session (#21)

### Audit Fixes (A21–A25) — all HIGH/MEDIUM items from Session #20 resolved

**A21 — CSP Nonces (HIGH security)**
- `proxy.ts` rewritten: generates per-request nonce, sets nonce-based CSP
- Production: `script-src 'self' 'nonce-{nonce}' 'strict-dynamic' 'unsafe-inline'` — CSP3 browsers use nonce+strict-dynamic (unsafe-inline ignored); CSP2 fallback preserved
- `next.config.ts`: CSP removed (now per-request in middleware), pre-existing lint warning fixed

**A22–A24 — i18n fixes**
- `global-error.tsx`: inline EN/ES translations, lazy useState locale detection from URL
- `WeatherErrorBoundary.tsx`: extracted `ErrorFallback` functional component with `useTranslations`
- `LocationSelector.tsx`: 3 hardcoded strings replaced with translation keys
- `messages/en.json` + `es.json`: 5 new weather keys

**A25 — Image sizes**
- Added `sizes` to all 10 Image components missing it (5 card components + 5 slug pages)
- Bonus: also fixed 6 additional page-level Images that were missing it (total: ~16 fixed)

### SEO Foundations
- `src/app/sitemap.ts` — created (28 static + all published content, hreflang alternates)
- `src/app/robots.ts` — created
- `src/app/layout.tsx` — added Open Graph, Twitter card, robots directives, NonprofitOrganization JSON-LD

### Quality Gates
- ✅ `pnpm lint` — 0 errors, 0 warnings
- ✅ `pnpm type-check` — 0 errors
- ✅ `pnpm test` — 238/238 passing

---

## Audit Health Summary (updated Session #21)

| Dimension         | Score   | Grade | Change |
| ----------------- | ------- | ----- | ------ |
| Quality Gates     | 5/5     | A+    | —      |
| Code Quality      | 9/10    | A     | —      |
| Security          | 10/10   | A+    | ↑ A21 resolved |
| Accessibility     | 9/10    | A     | —      |
| Performance       | 9/10    | A     | ↑ Image sizes fixed |
| i18n              | 9/10    | A     | ↑ A22-A24 fixed |
| Inclusivity       | 8/10    | B+    | —      |
| Bias              | 9/10    | A     | —      |
| Test Coverage     | 9/10    | A     | —      |
| Design Continuity | 8/10    | B+    | —      |
| Tech Debt         | 9/10    | A     | ↑ lint warning fixed |
| Dependencies      | 9/10    | A     | —      |
| Documentation     | 10/10   | A+    | —      |
| SEO               | 7/10    | B     | ↑ new (sitemap+OG+JSON-LD) |
| **Overall**       | **9.1** | **A** | ↑ from 8.8 |

---

## Open Audit Items

| ID  | Severity | Issue | Status |
|-----|----------|-------|--------|
| A26 | LOW      | Standardize dark section backgrounds | Open |
| A27 | LOW      | Standardize CTA button shapes | Open |
| A28 | LOW      | DonorRecognition non-brand colors | Open |

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
| A21 | HIGH | Production CSP needs nonces | **RESOLVED** (Session #21) |

---

## Blockers & Open Questions

1. **SQL migrations not yet run** — must run 002 + 003 in Supabase SQL Editor before events/consent work
2. **Zeffy account not created** — requires registered nonprofit
3. **No logo yet** — using Waves icon placeholder
4. **Original photos in progress** — user assembling real photos
5. **Admin code generation** — currently manual via Supabase SQL Editor (no admin UI yet)
6. **Website content is filler** — user will work with Jordyn to create real content
7. **og-image.jpg not yet created** — placeholder referenced in Open Graph meta; needs a 1200×630 branded image

---

## Decisions Made This Session (#21)

| Decision | Choice | Why |
| -------- | ------ | --- |
| CSP nonces approach | nonce + strict-dynamic + unsafe-inline fallback | strict-dynamic makes unsafe-inline ignored on CSP3 browsers; fallback ensures CSP2 compatibility |
| global-error.tsx i18n | Lazy useState with window.location | No next-intl provider available; lazy initializer avoids useEffect + setState pattern, no flash |
| Image sizes | Fixed all 10+ missing, not just the 10 from audit | Already reading all Image components, fixing all is better ROI |
| sitemap | Include both EN and ES routes with hreflang | Bilingual site needs proper hreflang for Google to understand language targeting |

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
