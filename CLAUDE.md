# CLAUDE.md — Orca Child in the Wild (OCINW) Project Instructions

> This file configures Claude Code's behavior for every session on this project.
> Security, performance, and reliability are non-negotiable first principles.

---

## Project Identity

- **Project:** Orca Child in the Wild (OCINW)
- **Type:** Youth-run nonprofit — ocean, marine, river, lake, pond conservation & education
- **Founder:** Jordyn Rosario and Family
- **Region:** Southern California (Los Angeles to San Diego)
- **Audience:** Mixed — youth (8-18), families, educators, donors, community members
- **Languages:** English (primary), Spanish (secondary)

---

## Critical Files — Read These First Every Session

| File | Purpose | Location |
|------|---------|----------|
| `OCINW.MD` | Master roadmap — all phases, decisions, and WHY reasoning | Project root |
| `Handoff.md` | Current session state — what's done, in-progress, blocked, next | Project root |
| `Completed.md` | Living diary of all completed work with timestamps | Project root |
| `Teams.md` | Agent team personas, roles, and delegation instructions | Project root |
| `CLAUDE.md` | This file — project rules and standards | Project root |

**At the start of every session:**
1. Read `Handoff.md` to understand current state
2. Read `Completed.md` to know what's already done
3. Consult `OCINW.MD` for architectural decisions and WHY reasoning
4. Use `Teams.md` when delegating to specialist agents

---

## Technology Stack (Locked Decisions)

These decisions are final. Do not propose alternatives unless explicitly asked.

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15+ (latest stable) |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS | Latest |
| Components | shadcn/ui (Radix UI primitives) | Latest |
| Content | MDX + Velite | Latest |
| Database | Supabase (PostgreSQL) | Latest |
| Auth | Supabase Auth | Latest |
| Hosting | Vercel (free tier) | — |
| Package Manager | pnpm | Latest |
| Maps | Leaflet + React-Leaflet | Latest |
| Charts | Recharts | Latest |
| Validation | Zod | Latest |
| i18n | next-intl | Latest |
| Icons | Lucide React | Latest |
| Email | Resend | Free tier |
| Donations | Zeffy (embedded) | — |
| Weather API | Open-Meteo | Free / no key |
| Tides API | NOAA CO-OPS | Free / no key |
| Testing | Vitest + Playwright + axe-core | Latest |
| CI/CD | GitHub Actions | — |

---

## Security Standards

### OWASP Top 10 — Mandatory Protections

Every line of code must be defensively written. This site collects personal data from minors (COPPA applies).

1. **Injection Prevention**
   - All user input validated server-side via Zod schemas before any database operation
   - Use Supabase parameterized queries exclusively — never string-concatenate SQL
   - Sanitize all inputs rendered in HTML (React handles this by default — never use `dangerouslySetInnerHTML` without explicit sanitization)

2. **Authentication & Session Security**
   - Admin routes protected via Supabase Auth with email/password
   - Session tokens stored in httpOnly cookies — never localStorage
   - Implement idle timeout (30 minutes) for admin sessions
   - Rate limit login attempts (5 per minute per IP)

3. **Sensitive Data Protection**
   - **Never commit secrets.** All API keys, database URLs, and credentials live in `.env.local` (git-ignored)
   - `.env.example` contains variable names only — never actual values
   - Supabase `service_role_key` used only in server-side API routes — never exposed to client
   - `NEXT_PUBLIC_` prefix only for non-sensitive values (Supabase anon key is designed to be public)
   - Volunteer personal data (email, phone, parent info) protected by Row Level Security — only authenticated admins can read

4. **Access Control**
   - Supabase Row Level Security (RLS) enabled on ALL tables — no exceptions
   - Public users: INSERT only (forms)
   - Authenticated admins: SELECT, UPDATE, DELETE
   - API routes verify authentication before returning sensitive data
   - Never trust client-side auth state alone — always verify server-side

5. **CSRF Protection**
   - All form submissions use server actions or API routes with origin validation
   - Verify `Origin` and `Referer` headers on API routes that modify data

6. **Security Headers (next.config.ts)**

   **Development CSP** (Next.js requires `'unsafe-eval'` for hot module replacement):
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.open-meteo.com https://marine-api.open-meteo.com https://api.tidesandcurrents.noaa.gov https://*.supabase.co; frame-src https://www.zeffy.com;
   ```

   **Production CSP** (strict — no unsafe-eval, use nonce for inline scripts):
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{random}'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.open-meteo.com https://marine-api.open-meteo.com https://api.tidesandcurrents.noaa.gov https://*.supabase.co; frame-src https://www.zeffy.com;
   ```
   Configure via `next.config.ts` headers with environment-specific CSP. Generate nonce per-request in middleware.

   **All environments:**
   ```
   X-Frame-Options: DENY
   X-Content-Type-Options: nosniff
   Referrer-Policy: strict-origin-when-cross-origin
   Permissions-Policy: camera=(), microphone=(), geolocation=(self)
   ```

7. **Dependency Security**
   - Run `pnpm audit` before every PR merge
   - No packages with known critical vulnerabilities
   - Pin major versions in `package.json` to prevent supply chain attacks
   - Prefer packages with >1000 weekly downloads and active maintenance

8. **COPPA Compliance (Children Under 13)**
   - Parental consent required before collecting personal data from under-13 users
   - Age-gating on volunteer form: if "Under 13" selected, parent/guardian fields become required
   - Consent email sent to parent before storing child's data
   - Minimal data collection — only what's strictly necessary
   - Never share children's data with third parties

9. **Rate Limiting**
   - API routes: 10 requests/minute per IP for form submissions
   - Contact form: 3 submissions/hour per IP
   - Newsletter signup: 5 attempts/hour per IP
   - Implement via Vercel middleware or Supabase edge functions

10. **Error Handling**
    - Never expose stack traces, database errors, or internal paths to users
    - Log errors server-side (Vercel function logs)
    - **Never log PII** (names, emails, phone numbers) in error messages — log only: error type, timestamp, URL, anonymized user ID (hash). COPPA prohibits logging children's personal data.
    - Return generic error messages to client: "Something went wrong. Please try again."
    - Custom error boundaries catch and handle React rendering errors gracefully

11. **Request Payload Size Limits**
    - Limit request body to 1MB for form submissions
    - Limit file uploads to 5MB (event photos only, admin-authenticated)
    - Configure via Next.js API route config: `export const config = { api: { bodyParser: { sizeLimit: '1mb' } } }`
    - Reject oversized payloads early to prevent DoS via oversized requests

12. **Backup & Disaster Recovery**
    - Supabase free tier includes daily backups with 7-day retention
    - Export database weekly via `pg_dump` stored in a private GitHub repository
    - MDX content is Git-versioned (inherently backed up with full history)
    - Document recovery procedure: (1) Restore Supabase from dashboard backup, (2) Re-deploy from Git main branch, (3) Verify data integrity post-restore
    - Test recovery procedure once before launch (Phase 12)

---

## Performance Standards

### Core Web Vitals Targets (Non-Negotiable)

| Metric | Target | What It Means |
|--------|--------|---------------|
| LCP (Largest Contentful Paint) | < 2.5s | Main content visible in under 2.5 seconds |
| FCP (First Contentful Paint) | < 1.8s | First meaningful pixel rendered in under 1.8 seconds |
| FID (First Input Delay) | < 100ms | Site responds to first click in under 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 | Content doesn't jump around while loading |
| INP (Interaction to Next Paint) | < 200ms | Every interaction gets visual feedback within 200ms |
| Lighthouse Performance | 90+ | — |
| Lighthouse Accessibility | 100 | Zero accessibility violations |
| Lighthouse Best Practices | 90+ | — |
| Lighthouse SEO | 90+ | — |

### Performance Rules

1. **Images**
   - Always use Next.js `<Image>` component — never raw `<img>` tags
   - All images served as WebP with responsive `sizes` attribute
   - Lazy load all images below the fold
   - Hero images use `priority` prop for immediate loading
   - Maximum image dimensions: 2400px wide (larger is wasted bandwidth)

2. **Fonts**
   - Load via `next/font` — zero layout shift
   - Subset fonts to Latin characters only (reduces file size 60%+)
   - Two font families maximum (heading + body)

3. **JavaScript**
   - Use server components by default — add `"use client"` only when interactivity is required
   - Dynamic import (`next/dynamic`) for heavy components (maps, charts) with loading skeletons
   - Tree-shake all imports: `import { Button } from "./ui/button"` not `import * as UI from "./ui"`
   - No packages over 50KB gzipped without explicit justification

4. **Data Fetching**
   - Weather data: Cache 15 minutes (client-side state + Vercel edge cache)
   - Tide data: Cache 6 hours (predictions are stable)
   - MDX content: Static generation with ISR (revalidate every 1 hour)
   - API responses: Set `Cache-Control` headers appropriately
   - Never fetch data client-side when server-side fetching is possible

5. **Bundle Size**
   - Monitor with `@next/bundle-analyzer`
   - Alert on any PR that increases bundle by >10KB
   - No duplicate dependencies (e.g., both `moment` and `date-fns`)

6. **Database Query Optimization**
   - Always use `.select()` with specific columns — never `SELECT *`
   - Paginate all list queries using `.range(from, to)` — never fetch unbounded result sets
   - Use `.single()` for known single-row results (avoids returning an array)
   - Index frequently queried columns: `email`, `slug`, `status`, `created_at`
   - Use Supabase connection pooling via PgBouncer (enabled by default on free tier)
   - Avoid N+1 queries — use `.select('*, events(*)')` for joined data instead of separate queries

---

## Reliability Standards

### Error Boundaries

- Global error boundary at `src/app/error.tsx` catches all unhandled errors
- Page-level error boundaries for critical sections (weather, donations, forms)
- Every error boundary shows a user-friendly message with a retry action
- Errors logged server-side for debugging

### API Resilience

- All external API calls (Open-Meteo, NOAA) wrapped in try/catch with fallback UI
- Timeout: 10 seconds maximum for any external API call
- If weather API fails: Show "Weather data temporarily unavailable" with last cached data
- If NOAA API fails: Show "Tide data temporarily unavailable" with generic tide chart
- Never let an API failure crash the entire page — isolate failures to their component

### Form Reliability

- Client-side validation (Zod) provides instant feedback
- Server-side validation (same Zod schema) is the source of truth — never trust client alone
- Show inline field errors immediately on blur
- Show form-level error summary on submit failure
- Disable submit button during processing to prevent double-submission
- Display success confirmation with clear next steps

### Database Reliability

- Supabase connection errors handled gracefully — show retry option
- All database writes are idempotent where possible (prevent duplicate volunteer signups via UNIQUE constraints)
- Newsletter: UNIQUE on email prevents duplicates
- Volunteer: UNIQUE on email prevents duplicate registrations

---

## Code Standards

### TypeScript Rules

```typescript
// GOOD: Explicit types, null safety
function getVolunteerAge(ageRange: AgeRange): { isMinor: boolean; requiresConsent: boolean } {
  const isMinor = ageRange === "under-13" || ageRange === "13-17";
  return { isMinor, requiresConsent: isMinor };
}

// BAD: any type, no null checking
function getVolunteerAge(ageRange: any) {
  return ageRange === "under-13";
}
```

- **Never use `any`** — use `unknown` and narrow with type guards if the type is truly unknown
- **Never use `as` type assertions** unless you've verified the type at runtime
- **Never use `!` non-null assertions** — handle null/undefined explicitly
- **Always define return types** for exported functions
- **Use discriminated unions** for state: `{ status: "loading" } | { status: "error"; message: string } | { status: "success"; data: T }`

### Component Patterns

```typescript
// GOOD: Server component by default
// src/app/learn/articles/page.tsx
export default async function ArticlesPage() {
  const articles = await getArticles(); // Server-side data fetch
  return <ArticleGrid articles={articles} />;
}

// GOOD: Client component only when needed
// src/components/weather/LocationSearch.tsx
"use client";
export function LocationSearch() {
  const [zip, setZip] = useState("");
  // ... interactive logic
}
```

- Server components by default — only add `"use client"` for interactivity (useState, useEffect, event handlers)
- Co-locate component, types, and tests: `WeatherCard.tsx`, `WeatherCard.test.tsx`
- One component per file — named export matching filename
- Props defined as TypeScript interface above the component
- Destructure props in function signature

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `WeatherCard.tsx` |
| Pages | lowercase `page.tsx` | `src/app/donate/page.tsx` |
| Utilities | camelCase | `formatTideHeight.ts` |
| Types | camelCase | `weather.ts` |
| Constants | camelCase | `constants.ts` |
| MDX Content | kebab-case | `california-gray-whale.mdx` |
| Test files | same as source + `.test` | `WeatherCard.test.tsx` |

### Import Order

```typescript
// 1. React/Next.js
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

// 2. External packages
import { z } from "zod";
import { format } from "date-fns";

// 3. Internal: components
import { Button } from "@/components/ui/button";
import { WeatherCard } from "@/components/weather/WeatherCard";

// 4. Internal: utilities, hooks, types
import { formatTideHeight } from "@/lib/utils/format";
import { useWeather } from "@/lib/hooks/useWeather";
import type { TidePrediction } from "@/lib/types/tides";

// 5. Styles (if any)
import "./styles.css";
```

### Environment Variable Typing

Create `src/env.ts` to validate all environment variables at startup — fail fast if a required variable is missing rather than discovering it at runtime:

```typescript
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  // ... all other env vars
});

export const env = envSchema.parse(process.env);
```

Import `env` instead of accessing `process.env` directly throughout the codebase.

### Git Commit Messages

```
<type>: <short description>

<optional body explaining WHY, not WHAT>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore`

Examples:
- `feat: add tide chart component with 24-hour visualization`
- `fix: prevent double-submission on volunteer signup form`
- `docs: add species profile content guide for contributors`

---

## Accessibility Standards (WCAG 2.1 AA)

These are not optional. Every component, every page, every interaction.

1. **All images have alt text** — descriptive for informational, empty (`alt=""`) for decorative
2. **Color contrast 4.5:1 minimum** for all text — test with WebAIM contrast checker
3. **All interactive elements keyboard-accessible** — Tab, Enter, Space, Escape, Arrow keys
4. **Visible focus indicators** on all focusable elements — never `outline: none` without replacement
5. **Semantic HTML** — use `<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<header>`, `<footer>`
6. **ARIA only as last resort** — prefer semantic HTML; ARIA supplements, never replaces
7. **Forms: every input has a `<label>`** linked via `htmlFor`/`id`. Group related inputs (radio buttons, checkbox groups) in `<fieldset>` with `<legend>`. Example: volunteer interests, availability selections.
8. **Error messages linked to inputs** via `aria-describedby`
9. **Skip-to-content link** as first focusable element on every page
10. **Respect `prefers-reduced-motion`** — disable animations when user prefers reduced motion
11. **Touch targets 44x44px minimum** on mobile
12. **Content readable at 200% zoom** without horizontal scrolling
13. **Dynamic content announcements** — Use `aria-live="polite"` for non-urgent updates (weather data loaded, form saved) and `aria-live="assertive"` for urgent feedback (form errors, critical alerts). Toast notifications must use `role="alert"`.

---

## i18n (English/Spanish)

- All user-visible strings in translation files: `src/i18n/en.json` and `src/i18n/es.json`
- Never hardcode English text in components — always use translation keys
- Content (MDX) has separate files per language, linked via `translationSlug` frontmatter
- URL structure uses locale prefix: `/en/...` and `/es/...`
- Default locale detected from browser `Accept-Language` header
- Language preference persisted in cookie

---

## Testing Requirements

### Before Every PR

1. `pnpm lint` — zero errors, zero warnings
2. `pnpm type-check` — zero TypeScript errors
3. `pnpm test` — all unit tests pass
4. `pnpm build` — production build succeeds
5. `pnpm audit` — no critical vulnerabilities

### Test Coverage Minimums

| Category | Minimum Coverage |
|----------|-----------------|
| Utility functions | 90% |
| API clients (weather, tides) | 80% |
| Hooks | 80% |
| Zod schemas | 100% |
| Overall | 70% |

### What To Test

- **Always test:** Validation schemas, API response parsing, data transformations, conditional rendering (age-based parent fields, location states), error states
- **Always E2E test:** Donation flow, volunteer signup flow, contact form, navigation, language switching
- **Always accessibility test:** Run axe-core on every page in E2E suite — zero violations
- **Visual regression:** Use Playwright's built-in screenshot comparison (`expect(page).toHaveScreenshot()`) for design system components. Run on desktop (1280px) and mobile (375px) viewports.

---

## Session Protocol

### Starting a Session
1. Read `Handoff.md` for current state
2. Confirm understanding with user before starting work
3. Pick up where last session left off — or pivot based on user's new priorities

### During a Session
1. Update `Handoff.md` as work progresses (in-progress items, blockers, decisions)
2. Mark completed tasks in `Handoff.md`
3. Move completed work descriptions to `Completed.md` with timestamps
4. Consult `Teams.md` when delegating to specialist agents

### Ending a Session
1. Update `Handoff.md` with:
   - What was completed this session
   - What is currently in-progress
   - What should be done next
   - Any blockers or open questions
   - Any decisions made and their reasoning
2. Move all completed items to `Completed.md`
3. Ensure all code changes are saved
4. Recommend next steps to user

---

## Prohibited Actions

- **Never `git push --force`** to any shared branch
- **Never commit `.env.local`** or any file containing secrets
- **Never use `dangerouslySetInnerHTML`** without explicit sanitization
- **Never use `any` type** in TypeScript
- **Never use `eslint-disable`** without a comment explaining why
- **Never delete user data** without explicit user request
- **Never skip form validation** — both client and server-side are mandatory
- **Never store sensitive data in localStorage** — use httpOnly cookies for auth tokens
- **Never embed third-party scripts** without CSP review
- **Never ignore accessibility warnings** from axe-core or eslint-plugin-jsx-a11y
