# Audit Log -- Orca Child in the Wild

> Issue tracking, tech debt, and audit history.
> Last updated: 2026-04-11 | Session: #29 (governance audit)

---

## Open Issues

| ID | Severity | Category | Issue |
|----|----------|----------|-------|
| O3 | HIGH | Functionality | Forms don't persist data (needs Supabase SQL migrations 002 + 003) |

## Deferred Content Work

| ID | Issue | Status |
|----|-------|--------|
| D8 | 23 MDX files need Spanish translations | Open |
| D9 | 16 MDX files missing `readingLevel` frontmatter | Open |
| ~~D10~~ | ~~No accessibility accommodations info~~ | RESOLVED (Session #26) |

## Blockers

1. SQL migrations not yet run -- must run 002 + 003 in Supabase SQL Editor
2. Zeffy account not created -- requires registered nonprofit status
3. No logo yet -- using Waves icon placeholder
4. og-image.jpg not created -- 1200x630 branded image needed
5. Website content is placeholder -- Jordyn to write real content
6. Admin code generation -- manual via Supabase SQL Editor (no admin UI)

## Tech Debt

| Area | Issue | Priority |
|------|-------|----------|
| Dependencies | 9 vulns (2 high, 7 moderate), all dev-only: 2x Vite (HIGH, dev via vitest), 5x hono/@hono (MODERATE, dev via shadcn), 2x Vite (MODERATE, dev). Production deps clean. | MEDIUM |
| Vitest unpinned | Was pinned to 4.0.18 for Node 20 compat, now 4.1.2 (pulls Vite 7). Verify tests still work on Node 20 | MEDIUM |
| ZIP coverage | socal-beaches.ts has only 44 ZIPs -- needs ~280 for tri-county coverage | MEDIUM |
| Resend | Package not yet installed -- email TODO comments in volunteer.ts | MEDIUM |
| Lighthouse | No live Lighthouse/axe-core run yet on production | MEDIUM |
| SECURITY-AUDIT.md | Missing -- required for all live projects per portfolio standard | MEDIUM |

## Resolved Issues (Sessions #7-27)

All A-series audit items (A1-A28) resolved. See `ProjectHealth.md` sections 3 for full history.

Summary:
- **28 issues found** in Session #20 comprehensive audit, **25 fixed** in-session
- **A21** (CSP nonces) resolved Session #21
- **A22-A25** (hardcoded English, image sizes) resolved Session #21
- **A26-A28** (design consistency) resolved Session #25
- **D10** (accommodations) resolved Session #26

## Audit History

| Date | Session | Found | Fixed | Open |
|------|---------|-------|-------|------|
| 2026-02-22 | #7 | 4 | 4 | 14 |
| 2026-02-22 | #8 | 0 | 11 | 3 |
| 2026-02-22 | #9 | 0 | 2 | 1 |
| 2026-02-25 | #20 | 28 | 20 | 8 + 3 deferred |
| 2026-02-25 | #21 | 0 | 5 | 3 + 3 deferred |
| 2026-03-09 | #25 | 0 | 3 | 0 + 3 deferred |
| 2026-03-09 | #26 | 0 | 1 (D10) | 0 + 2 deferred |
| 2026-03-21 | #28 | 0 | 0 | 1 + 2 deferred |
| 2026-04-11 | #29 | 3 (dep vulns) | 0 | 1 + 2 deferred + 3 dep vulns |

## Quality Gates (last verified Session #29 governance audit, 2026-04-11)

- `pnpm lint` -- not re-run this session (was 0 errors at Session #27)
- `pnpm type-check` -- not re-run this session (was 0 errors at Session #27)
- `pnpm test` -- not re-run this session (was 238/238 at Session #27, needs Bas permission)
- `pnpm build` -- not re-run this session (was passing at Session #27)
- `pnpm audit` -- 9 vulnerabilities (2 high, 7 moderate), all dev-only. 0 production vulnerabilities.
