# Project Health — Orca Child in the Wild

> **Comprehensive project health tracker.**
> Last audited: 2026-02-25 | Audit session: #20
> Re-run this audit before every phase launch and before production deployment.

---

## Health Dashboard

| Dimension         | Score      | Grade | Change |
| ----------------- | ---------- | ----- | ------ |
| Quality Gates     | 5/5        | A+    | =      |
| Code Quality      | 9/10       | A     | -1     |
| Security          | 9/10       | A     | -1     |
| Accessibility     | 9/10       | A     | =      |
| Performance       | 9/10       | A     | =      |
| i18n              | 8/10       | B+    | -2     |
| Inclusivity       | 8/10       | B+    | NEW    |
| Bias              | 9/10       | A     | NEW    |
| Test Coverage     | 9/10       | A     | =      |
| Design Continuity | 8/10       | B+    | NEW    |
| Tech Debt         | 8/10       | B+    | -1     |
| Dependencies      | 9/10       | A     | =      |
| Documentation     | 10/10      | A+    | =      |
| **Overall**       | **8.8/10** | **A-**|        |

**Summary:** Session #20 comprehensive 7-dimension audit. Codebase grew from ~7,300 to ~14,257 LOC across 10 sessions. Found and fixed 25 issues (design, security, i18n, accessibility, inclusivity). Key remaining items: CSP nonce implementation, hardcoded English in error boundaries/weather, 10 images missing `sizes`, 23 MDX files need Spanish translations.

---

## 1. Quality Gates

| Gate               | Status |
| ------------------ | ------ |
| `pnpm lint`        | PASS (0 errors, 1 warning) |
| `pnpm type-check`  | PASS   |
| `pnpm build`       | PASS (91 static pages) |
| `pnpm test`        | PASS (238 tests, 1.4s) |
| `pnpm audit`       | WARN (2 high, dev-only) |

### Audit Vulnerability Detail
- **hono** in `shadcn > @modelcontextprotocol/sdk > hono` — dev-only
- **rollup** `>=4.0.0 <4.59.0` in `vitest > vite > rollup` — Arbitrary File Write via Path Traversal, dev-only
- **Production impact:** None — both are dev dependencies only

---

## 2. Codebase Metrics

| Metric                  | Value |
| ----------------------- | ----- |
| Source files (.ts/.tsx)  | 130   |
| Lines of code           | ~14,257 |
| Components (total)      | 62    |
| shadcn/ui components    | 20    |
| Custom components       | 42    |
| API clients             | 6     |
| Custom hooks            | 3     |
| Server actions          | 5     |
| Type definition files   | 8     |
| Utility files           | 5     |
| Pages (routes)          | 26    |
| MDX content files       | 23    |
| Translation keys (EN)   | 757   |
| Translation keys (ES)   | 757   |
| Production dependencies | 19    |
| Dev dependencies        | 21    |
| Unit test files         | 13    |
| Unit test cases         | 238   |
| E2E test files          | 4     |
| E2E test cases          | 24    |
| A11y test files         | 1     |
| A11y test cases         | 16    |

---

## 3. Issues Tracker

### FIXED — Session #20 (Comprehensive Audit)

| ID   | Severity | Category        | Issue                                          | Resolution                                                     |
| ---- | -------- | --------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| A1   | CRITICAL | Design          | White-on-white button (coral-700 undefined)    | Added coral-700/800/900 to globals.css                         |
| A2   | HIGH     | Design          | Incomplete color palettes (sand/kelp/coral)    | Added missing 700-950 shades for all brand palettes            |
| A3   | HIGH     | Design          | Missing -950 shades (ocean/teal/kelp/coral)    | Added -950 shades used in dark mode                            |
| A4   | HIGH     | Design          | Dynamic Tailwind classes via string interpolation | Replaced `bg-${color}-500/10` with explicit class maps        |
| A5   | HIGH     | i18n            | Hardcoded "en-US" in event date formatting     | Added `locale` prop to EventCard, EventMeta, event detail page |
| A6   | MEDIUM   | Security        | Missing CSRF on `validateConsentCode`          | Added `isValidOrigin()` check                                  |
| A7   | MEDIUM   | Security        | `as number` type assertions on RPC results     | Replaced with `typeof x === "number" ? x : 0`                 |
| A8   | MEDIUM   | Security        | No slug format validation in iCal API route    | Added regex validation `^[a-z0-9-]{1,200}$`                   |
| A9   | MEDIUM   | Security        | Header injection risk in Content-Disposition   | Sanitized slug in filename header                              |
| A10  | MEDIUM   | Accessibility   | EventCard empty alt text                       | Changed `alt=""` to `alt={event.title}`                        |
| A11  | MEDIUM   | Accessibility   | Zeffy iframe missing aria-label                | Added `aria-label` to iframe                                   |
| A12  | MEDIUM   | i18n            | Hardcoded English string on about page         | Moved to translation key `focusAreaMapComingSoon`              |
| A13  | MEDIUM   | Bias            | "mentors" references (no mentor program)       | Changed to "communities" in EN and ES                          |
| A14  | LOW      | Security        | Non-null assertion in VolunteerForm            | Replaced `!` with optional chaining pattern                    |
| A15  | LOW      | Inclusivity     | "tide pool walks" assumes mobility             | Changed to "tide pool explorations" (2 files)                  |
| A16  | LOW      | Inclusivity     | "walking near tide pools"                      | Changed to "moving through tide pool areas"                    |
| A17  | LOW      | Inclusivity     | "walking trails" in wetlands content           | Changed to "trails"                                            |
| A18  | LOW      | Inclusivity     | "walking only on bare rock"                    | Changed to "stepping only on bare rock"                        |
| A19  | LOW      | Inclusivity     | "walk newer volunteers" (figurative)           | Changed to "guide newer volunteers"                            |
| A20  | LOW      | Inclusivity     | "Conservation takes physical effort"           | Revised to "Young volunteers bring energy and dedication"      |

### RESOLVED — Session #21

| ID   | Severity | Category    | Issue                                          | Resolution |
| ---- | -------- | ----------- | ---------------------------------------------- | ---------- |
| A21  | HIGH     | Security    | Production CSP uses `unsafe-inline` not nonces | Nonce-based CSP in `proxy.ts` (Session #21) |
| A22  | MEDIUM   | i18n        | Global error boundary hardcoded English        | Lazy useState locale detection (Session #21) |
| A23  | MEDIUM   | i18n        | WeatherErrorBoundary hardcoded English         | Extracted functional component with `useTranslations` (Session #21) |
| A24  | MEDIUM   | i18n        | LocationSelector hardcoded English             | 3 strings replaced with translation keys (Session #21) |
| A25  | MEDIUM   | Performance | 10+ Image components missing `sizes` attribute | Fixed ~16 Image components (Session #21) |

### OPEN — Low Priority Design Polish

| ID   | Severity | Category    | Issue                                          | Location |
| ---- | -------- | ----------- | ---------------------------------------------- | -------- |
| A26  | LOW      | Design      | Inconsistent dark section backgrounds          | 3 patterns: `white/[0.02]`, `muted/30`, `muted/20` |
| A27  | LOW      | Design      | Some CTA buttons use `rounded-md` not `rounded-full` | not-found, error, about, team pages |
| A28  | LOW      | Design      | DonorRecognition uses non-brand colors         | sky, emerald, indigo, purple gradients |

### OPEN — Known Pre-Existing

| ID | Severity | Category      | Issue                                          |
| -- | -------- | ------------- | ---------------------------------------------- |
| O3 | HIGH     | Functionality | Forms don't persist data (needs Supabase SQL migrations) |

### DEFERRED — Content Work

| ID   | Phase   | Issue                                          |
| ---- | ------- | ---------------------------------------------- |
| D8   | Content | 23 MDX files need Spanish translations         |
| D9   | Content | 16 MDX files missing `readingLevel` frontmatter |
| D10  | Content | No accessibility accommodations info anywhere  |

---

## 4. Security Posture

| Control                    | Status |
| -------------------------- | ------ |
| OWASP injection prevention | PASS   |
| `dangerouslySetInnerHTML`  | PASS (3 instances — all JSON-LD on server components, trusted data) |
| `any` type usage           | PASS (0 instances) |
| Secrets in code            | PASS (0 hardcoded) |
| CSP headers (dev)          | PASS   |
| CSP headers (prod)         | **NEEDS NONCES** (A21) |
| X-Frame-Options            | PASS (DENY) |
| X-Content-Type-Options     | PASS (nosniff) |
| Referrer-Policy            | PASS   |
| Permissions-Policy         | PASS   |
| PII logging                | PASS (8 console.error, no PII) |
| Non-null assertions        | PASS (0 after A14 fix) |
| CSRF protection            | PASS (all 5 server actions + validateConsentCode) |
| Rate limiting              | PASS (all forms) |
| External API validation    | MEDIUM (weather/tides lack Zod schemas) |
| Slug/input validation      | PASS (iCal route validated) |
| .gitignore secrets         | PASS |

---

## 5. Accessibility Compliance

| Requirement              | Status |
| ------------------------ | ------ |
| Skip-to-content link     | PASS   |
| Semantic HTML            | PASS   |
| ARIA attributes          | PASS (iframe aria-label added) |
| Focus indicators         | PASS   |
| Keyboard navigation      | PASS   |
| prefers-reduced-motion   | PASS   |
| Touch targets 44x44px    | PASS   |
| Heading hierarchy        | PASS   |
| Form labels              | PASS   |
| Decorative icons         | PASS   |
| Error message a11y       | PASS   |
| Image alt text           | PASS (EventCard fixed) |
| Color contrast           | PASS (coral-700 button fixed) |

**Needs Verification:**
- Lighthouse Accessibility score — needs manual run
- axe-core tests — 16 written, need dev server to run

---

## 6. Design Continuity

| Aspect                    | Status |
| ------------------------- | ------ |
| Color palette complete    | PASS (all 5 palettes 50-950) |
| Brand color usage         | PASS (ocean/teal/coral/sand/kelp) |
| Card patterns consistent  | PASS (all 5 card types match) |
| Typography hierarchy      | PASS   |
| Horizontal padding        | PASS (uniform `px-4 sm:px-6 lg:px-8`) |
| Container widths          | PASS (appropriate hierarchy) |
| Header/Footer consistent  | PASS   |
| Dark mode warm tone       | PASS   |
| Button styling            | MOSTLY (A27: some pages use `rounded-md`) |
| Gradient overlays         | PASS   |

---

## 7. i18n Completeness

| Aspect                     | Status |
| -------------------------- | ------ |
| Translation file parity    | PASS (757/757 keys) |
| URL locale prefix          | PASS   |
| Language toggle             | PASS   |
| Translation quality        | PASS   |
| Event date/time locale     | PASS (A5 fixed) |
| Weather units translatable | PASS   |
| Locale-aware numbers       | PASS   |
| No hardcoded English in JSX| **FAIL** (A22-A24: ~14 strings in error/weather components) |
| MDX content in Spanish     | **FAIL** (D8: 0 of 23 files translated) |

---

## 8. Inclusivity & Bias

| Aspect                     | Status |
| -------------------------- | ------ |
| Gender-neutral language    | PASS   |
| "Parent/Guardian" (not mom/dad) | PASS |
| No gender field collected  | PASS   |
| Economic inclusivity       | PASS ($1 min, custom amounts, non-monetary) |
| Youth-empowering language  | PASS ("capable leaders today") |
| Ability-inclusive language  | PASS (A15-A20 fixed) |
| No mentor references       | PASS (A13 fixed) |
| Diverse volunteer paths    | PASS (13 options: outdoor + indoor + digital) |
| Accommodations info        | **MISSING** (D10) |
| Spanish content            | **MISSING** (D8: 23 files English-only) |

---

## 9. Audit History

| Date       | Session | Auditor         | Found | Fixed | Open        |
| ---------- | ------- | --------------- | ----- | ----- | ----------- |
| 2026-02-22 | #7      | Claude Opus 4.6 | 4     | 4     | 14          |
| 2026-02-22 | #8      | Claude Opus 4.6 | 0     | 11    | 3           |
| 2026-02-22 | #9      | Claude Opus 4.6 | 0     | 2     | 1           |
| 2026-02-25 | #20     | Claude Opus 4.6 | 28    | 20    | 8 + 3 deferred |

**Session #20 summary:** Comprehensive 7-dimension audit (Design, Security, Performance, Functionality, Bias, Inclusivity, Accessibility). Found 28 issues across all dimensions. Fixed 20 in-session. 8 remain open (1 HIGH: CSP nonces, 4 MEDIUM: hardcoded English strings + image sizes, 3 LOW: design consistency). 3 deferred for content phase (Spanish MDX, reading levels, accommodations).

---

## 10. Content Continuity Checks

Run these at the start of every session and before every commit involving MDX files.
These checks caught real bugs in session #23 (duplicate YAML keys, future-dated articles).

### 10a. Article Date Integrity
No article should be dated in the future (relative to today) or more than 90 days in the past before launch.

```bash
# Find future-dated articles (replace TODAY with today's date)
grep -rn "^date:" src/content/articles/ | awk -F'"' '{print $2, $0}' | sort
```
**Pass:** All dates in format `YYYY-MM-DD`, none dated after today.

### 10b. YAML Frontmatter Duplicate Keys
Duplicate YAML keys are silently ignored by parsers (last value wins) but indicate copy-paste errors.

```bash
# Check for duplicate frontmatter keys in MDX files (SOH artifact detection)
python3 -c "
import glob, re
for f in glob.glob('src/content/**/*.mdx', recursive=True):
    with open(f, 'rb') as fh:
        raw = fh.read()
    if b'\x01' in raw or b'\x02' in raw:
        print('CORRUPT:', f)
    lines = raw.split(b'\n')
    in_front = False; seen = {}
    for line in lines:
        l = line.rstrip(b'\r')
        if l == b'---':
            if not in_front: in_front = True
            else: break
        if in_front and b':' in l:
            key = l.split(b':')[0].strip()
            if key in seen:
                print('DUPLICATE KEY:', key.decode(), 'in', f)
            seen[key] = True
"
```
**Pass:** No output (no corrupted bytes, no duplicate keys).

### 10c. Referenced Image Existence
Every `featuredImage:` path in MDX frontmatter must resolve to an actual file in `public/`.

```bash
python3 -c "
import glob, re
missing = []
for f in glob.glob('src/content/**/*.mdx', recursive=True):
    with open(f) as fh:
        for line in fh:
            m = re.match(r'featuredImage:\s*\"(/[^\"]+)\"', line.strip())
            if m:
                path = 'public' + m.group(1)
                import os
                if not os.path.exists(path):
                    missing.append((f, path))
for f, p in missing:
    print('MISSING IMAGE:', p, 'referenced in', f)
"
```
**Pass:** No output (all referenced images exist).

### 10d. MDX Required Frontmatter
All published MDX files must have: `title`, `slug`, `published`.
Articles additionally need: `date`, `author`, `excerpt`, `category`.
Species additionally need: `scientificName`, `category`, `conservationStatus`.

```bash
# Quick spot-check — look for MDX files without title
grep -rL "^title:" src/content/
```
**Pass:** No output.

### 10e. dangerouslySetInnerHTML Audit
All uses of `dangerouslySetInnerHTML` must be for trusted server-side data only (JSON-LD, sanitized HTML).

```bash
grep -rn "dangerouslySetInnerHTML" src/ --include="*.tsx" --include="*.ts"
```
**Expected (approved uses):**
- `src/app/[locale]/learn/articles/[slug]/page.tsx` — JSON-LD (trusted Article schema)
- `src/app/[locale]/learn/species/[slug]/page.tsx` — JSON-LD (trusted Article/Thing schema)
- `src/app/[locale]/conservation/events/[slug]/page.tsx` — JSON-LD (trusted Event schema)

**Any other file:** Investigate immediately.

---

## How to Re-Run This Audit

1. **Quality gates:** `pnpm lint && pnpm type-check && pnpm test && pnpm build && pnpm audit`
2. **Content continuity:** Run all 5 checks in Section 10 above
3. **Security scan:** Search for `dangerouslySetInnerHTML` (see 10e for approved list), `any`, unvalidated `as`, `!` assertions, `console.log` with PII
4. **Design:** Check all color references resolve to defined `--color-*` vars, verify buttons consistent
5. **Accessibility:** Run Lighthouse + axe-core on all pages, check alt text, ARIA, keyboard nav
6. **i18n:** Compare EN/ES key counts, search for hardcoded English in `.tsx` files
7. **Inclusivity:** Search for ability-assuming language, check family structure neutrality
8. **Bias:** Review content for gender/race/economic/age assumptions
9. **Dependencies:** `pnpm audit`, check for unused imports
10. **Test coverage:** `pnpm test --coverage`
11. **Bundle size:** `ANALYZE=true pnpm build`

---

*Next audit should be run after Spanish content translations or CSP nonce implementation.*
