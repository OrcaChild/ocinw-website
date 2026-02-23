# Project Health — Orca Child in the Wild

> **Comprehensive project health tracker.**
> Last audited: 2026-02-22 | Audit session: #8
> Re-run this audit before every phase launch and before production deployment.

---

## Health Dashboard

| Dimension         | Score      | Grade |
| ----------------- | ---------- | ----- |
| Quality Gates     | 4/5        | B+    |
| Code Quality      | 10/10      | A+    |
| Security          | 10/10      | A+    |
| Accessibility     | 9/10       | A     |
| Performance       | 9/10       | A     |
| i18n              | 10/10      | A+    |
| Test Coverage     | 0/10       | F     |
| Tech Debt         | 9/10       | A     |
| Dependencies      | 9/10       | A     |
| Documentation     | 10/10      | A+    |
| **Overall**       | **8.0/10** | **B+**|

**Summary:** All code quality, security, i18n, and accessibility issues from Session #7 are fixed. Test coverage (F) is the sole remaining gap — needs dedicated session.

---

## 1. Quality Gates

| Gate               | Status |
| ------------------ | ------ |
| `pnpm lint`        | PASS   |
| `pnpm type-check`  | PASS   |
| `pnpm build`       | PASS   |
| `pnpm test`        | N/A    |
| `pnpm audit`       | WARN   |

**Notes:**
- Build: 19 static pages, compiled in ~3s
- Test: No tests written yet (0% coverage)
- Audit: 2 high (minimatch ReDoS in eslint deps — dev-only, not production)

### Audit Vulnerability Detail
- **Package:** `minimatch` <10.2.1
- **Severity:** High (ReDoS)
- **Path:** `eslint > minimatch` and `eslint-config-next > ... > minimatch`
- **Production impact:** None — dev dependency only
- **Action:** Monitor for eslint update that resolves this

---

## 2. Codebase Metrics

| Metric                  | Value |
| ----------------------- | ----- |
| Source files (.ts/.tsx)  | 90    |
| Lines of code           | ~7,300|
| Components (total)      | 48    |
| shadcn/ui components    | 20    |
| Custom components       | 28    |
| API clients             | 3     |
| Custom hooks            | 3     |
| Server actions          | 2     |
| Type definition files   | 6     |
| Utility files           | 4     |
| Pages (static)          | 19    |
| Translation keys (EN)   | 300   |
| Translation keys (ES)   | 300   |
| Production dependencies | 19    |
| Dev dependencies        | 20    |

---

## 3. Issues Tracker

### FIXED — Session #7 (Audit)

| ID | Severity | Issue                                        | Resolution                                             |
| -- | -------- | -------------------------------------------- | ------------------------------------------------------ |
| F1 | CRITICAL | PII logging in `contact.ts`/`newsletter.ts`  | Removed `console.log` that logged emails               |
| F2 | MEDIUM   | Non-null assertions in Supabase clients       | Replaced with validated `env` import                   |
| F3 | MEDIUM   | Non-null assertion in `geo.ts`                | Replaced with proper undefined check + throw           |
| F4 | LOW      | Unused `date-fns` dependency                  | Removed via `pnpm remove date-fns`                     |

### FIXED — Session #8 (Grade Remediation)

| ID  | Severity | Issue                                          | Resolution                                                   |
| --- | -------- | ---------------------------------------------- | ------------------------------------------------------------ |
| O2  | HIGH     | Server actions lack CSRF origin verification   | Added Origin header check in both server actions              |
| O4  | HIGH     | Nominatim API response not validated with Zod   | Added Zod schema, replaced `as` assertion with `safeParse`   |
| O5  | MEDIUM   | No rate limiting on form submissions            | Created `rate-limit.ts` utility, 3/hr contact, 5/hr newsletter |
| O7  | MEDIUM   | Newsletter duplicate email check missing        | Added in-memory Set tracking + early return `duplicate` status |
| O8  | MEDIUM   | Hardcoded `"en-US"` in date/time formatters     | Added `locale` param to `formatTime`, `formatDate`, `formatRelativeTime` |
| O9  | MEDIUM   | Weather units not translatable                  | Added `unitMph`, `unitFt`, `unitIn`, `unitSeconds` translation keys, passed to formatters |
| O10 | MEDIUM   | Missing visible `<label>` on ZIP input          | Added `<label htmlFor="zip-code-input" className="sr-only">` |
| O11 | MEDIUM   | Error announcement timing (newsletter)          | Kept error `<p>` always in DOM with `aria-live="polite"`, hidden class |
| O12 | LOW      | `global-error.tsx` styling mismatch             | Converted to inline styles matching OCINW ocean theme (Tailwind unavailable in global-error) |
| O13 | LOW      | Decorative icons missing `aria-hidden`          | Added `aria-hidden="true"` to 18 decorative icons across 10 files |
| O14 | LOW      | Sonner toaster uses inline styles               | Moved CSS vars to `globals.css` `[data-sonner-toaster]` selector |

### OPEN — Must Fix Before Production (Phase 12)

| ID | Severity | Category      | Issue                                          |
| -- | -------- | ------------- | ---------------------------------------------- |
| O1 | CRITICAL | Testing       | No test suite (0% coverage)                    |
| O3 | HIGH     | Functionality | Forms don't persist data (needs Supabase)      |
| O6 | MEDIUM   | Accessibility | No axe-core accessibility tests running        |

**Locations & Effort:**

| ID | Location                              | Effort |
| -- | ------------------------------------- | ------ |
| O1 | `tests/` dirs empty                   | Large  |
| O3 | `actions/contact.ts`, `newsletter.ts` | Medium |
| O6 | `tests/accessibility/` empty          | Medium |

### DEFERRED — Expected for Future Phases

| ID | Phase    | Issue                           |
| -- | -------- | ------------------------------- |
| D1 | Phase 8  | Supabase integration for forms  |
| D2 | Phase 8  | Resend email integration        |
| D3 | Phase 8  | COPPA parental consent workflow |
| D4 | Phase 7  | Zeffy donation embed            |
| D5 | Phase 9  | MDX content pipeline (Velite)   |
| D6 | Phase 12 | Domain registration             |
| D7 | Phase 2  | Logo and visual assets          |

---

## 4. Security Posture

**All Controls Passing:**

| Control                    | Status |
| -------------------------- | ------ |
| OWASP injection prevention | PASS   |
| `dangerouslySetInnerHTML`  | PASS   |
| Secrets in code            | PASS   |
| CSP headers                | PASS   |
| X-Frame-Options            | PASS   |
| X-Content-Type-Options     | PASS   |
| Referrer-Policy            | PASS   |
| Permissions-Policy         | PASS   |
| PII logging                | PASS   |
| Non-null assertions        | PASS   |
| CSRF protection            | PASS   |
| Rate limiting              | PASS   |
| External API validation    | PASS   |

**Deferred (Phase 8):**

| Control                     | Status | Notes                                    |
| --------------------------- | ------ | ---------------------------------------- |
| Supabase RLS                | N/A    | Deferred to Phase 8                      |
| Auth session security       | N/A    | Deferred to Phase 8                      |

---

## 5. Accessibility Compliance

**Passing:**

| Requirement              | Status |
| ------------------------ | ------ |
| Skip-to-content link     | PASS   |
| Semantic HTML            | PASS   |
| ARIA attributes          | PASS   |
| Focus indicators         | PASS   |
| Keyboard navigation      | PASS   |
| prefers-reduced-motion   | PASS   |
| Touch targets 44x44px    | PASS   |
| Heading hierarchy        | PASS   |
| Form labels              | PASS   |
| Decorative icons         | PASS   |
| Error message a11y       | PASS   |

**Needs Verification:**

| Requirement                | Status     | Notes                                     |
| -------------------------- | ---------- | ----------------------------------------- |
| Color contrast             | ASSUMED    | Needs Lighthouse verification             |
| axe-core automated testing | FAIL       | Infrastructure exists, tests empty (O6)   |
| Lighthouse Accessibility   | UNVERIFIED | Needs manual run                          |

---

## 6. Performance Practices

**Passing:**

| Practice                      | Status |
| ----------------------------- | ------ |
| Server components by default  | PASS   |
| Next.js `<Image>` component   | PASS   |
| `next/font` for fonts         | PASS   |
| Dynamic imports (heavy comps) | PASS   |
| API response caching          | PASS   |
| AbortController timeouts      | PASS   |
| Tree-shaken imports           | PASS   |
| Static generation             | PASS   |

**Needs Verification:**

| Practice              | Status     | Notes                                   |
| --------------------- | ---------- | --------------------------------------- |
| Bundle size monitoring| READY      | `@next/bundle-analyzer` not yet run     |
| Core Web Vitals       | UNVERIFIED | Needs Lighthouse measurement            |

---

## 7. i18n Completeness

**All Passing:**

| Aspect                     | Status |
| -------------------------- | ------ |
| Translation file parity    | PASS   |
| URL locale prefix          | PASS   |
| Language toggle             | PASS   |
| Translation quality        | PASS   |
| No hardcoded English in JSX| PASS   |
| Locale-aware date/time     | PASS   |
| Weather units translatable | PASS   |
| Locale-aware numbers       | PASS   |

---

## 8. Test Coverage

| Category              | Required | Actual | Gap      |
| --------------------- | -------- | ------ | -------- |
| Utility functions     | 90%      | 0%     | CRITICAL |
| API clients           | 80%      | 0%     | CRITICAL |
| Hooks                 | 80%      | 0%     | CRITICAL |
| Zod schemas           | 100%     | 0%     | CRITICAL |
| Overall               | 70%      | 0%     | CRITICAL |
| E2E tests             | Required | 0      | CRITICAL |
| Accessibility (axe)   | Required | 0      | CRITICAL |

### Test Infrastructure Status
- Vitest: Configured and ready
- Playwright: Configured with multi-browser support
- @axe-core/playwright: Installed
- @testing-library/react: Installed
- Test directories: `tests/unit/`, `integration/`, `e2e/`, `accessibility/`
- **Blocker:** Zero test files written

### Testing Priority Order

| Step | What to Test             | Target  |
| ---- | ------------------------ | ------- |
| 1    | Zod form schemas         | 100%    |
| 2    | Utility functions        | 90%     |
| 3    | API clients              | 80%     |
| 4    | Custom hooks             | 80%     |
| 5    | E2E critical flows       | Pass    |
| 6    | Accessibility (axe-core) | 0 viols |

---

## 9. Tech Debt Register

| Item                            | Type           | Impact | Effort |
| ------------------------------- | -------------- | ------ | ------ |
| No test coverage                | Testing gap    | High   | Large  |
| Server actions stubbed (no DB)  | Incomplete     | Medium | Medium |
| 6 unused shadcn/ui components   | Bundle size    | Tiny   | Tiny   |
| Empty content dirs (.gitkeep)   | Clutter        | Tiny   | Tiny   |
| No bundle size analysis run     | Perf gap       | Low    | Tiny   |

### Unused shadcn/ui Components (reserved for future phases)
- `dialog.tsx` — Phase 8: volunteer modals
- `select.tsx` — Phase 8: volunteer form dropdowns
- `tabs.tsx` — Phase 9: content tabbed views
- `badge.tsx` — Phase 9: content tags
- `checkbox.tsx` — Phase 8: volunteer interests
- `radio-group.tsx` — Phase 8: age selection

These are intentionally pre-installed. No action needed.

---

## 10. Dependency Health

| Metric                       | Value |
| ---------------------------- | ----- |
| Production deps              | 19    |
| Dev deps                     | 20    |
| Unused deps                  | 0     |
| Missing deps                 | 0     |
| Duplicate functionality      | 0     |
| Packages >50KB gzipped       | 0     |
| Known vulns (production)     | 0     |
| Known vulns (dev-only)       | 2     |
| Deprecated subdeps           | 1     |

**Notes:**
- Dev vulns: minimatch in eslint (not production)
- Deprecated: node-domexception (no action needed)

---

## 11. File Organization

| Aspect                   | Status |
| ------------------------ | ------ |
| App Router structure     | PASS   |
| Component dir hierarchy  | PASS   |
| Lib dir structure        | PASS   |
| Naming conventions       | PASS   |
| Config files at root     | PASS   |
| .gitignore coverage      | PASS   |
| No duplicate files       | PASS   |
| No oversized files       | PASS   |

---

## 12. Documentation Health

| Document              | Status   | Lines  |
| --------------------- | -------- | ------ |
| OCINW.MD (roadmap)    | COMPLETE | ~2,800 |
| CLAUDE.md (rules)     | COMPLETE | ~460   |
| Teams.md (agents)     | COMPLETE | ~620   |
| Handoff.md (state)    | COMPLETE | ~275   |
| Completed.md (diary)  | COMPLETE | ~420   |
| ProjectHealth.md      | UPDATED  | ~370   |
| MEMORY.md (memory)    | COMPLETE | ~120   |

All documents up to date as of Session #8.

---

## Audit History

| Date       | Session | Auditor         | Fixed      | Open        |
| ---------- | ------- | --------------- | ---------- | ----------- |
| 2026-02-22 | #7      | Claude Opus 4.6 | 4 (F1-F4)  | 14 (O1-O14) |
| 2026-02-22 | #8      | Claude Opus 4.6 | 11 (O2-O14)| 3 (O1,O3,O6)|

**Session #8 findings:** 0 new issues. 11 fixes applied. 3 remaining (1 CRITICAL test gap, 1 HIGH needs Supabase, 1 MEDIUM needs tests).

---

## How to Re-Run This Audit

1. **Quality gates:** `pnpm lint && pnpm type-check && pnpm build && pnpm audit`
2. **Security scan:** Search for `console.log`, `dangerouslySetInnerHTML`, `any`, `as `, `!` assertions
3. **Accessibility:** Run Lighthouse on all pages, run axe-core E2E tests
4. **i18n:** Compare EN/ES key counts, search for hardcoded English in `.tsx` files
5. **Dependencies:** `pnpm audit`, check for unused imports
6. **Test coverage:** `pnpm test --coverage`
7. **Bundle size:** `ANALYZE=true pnpm build`

---

*Next audit should be run after test suite is written (Session #9) or Phase 7 completion.*
