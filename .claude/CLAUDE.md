# CLAUDE.md — Orca Child in the Wild (OCINW) Project Instructions

> **Universal Pillars:** Security Minded | Structure | Performance | Inclusive | Non-Bias | UX Minded
>
> These six pillars govern every decision across all Rosario family projects.
> Tech-specific details vary by stack — the principles never do.

---

## Project Identity

| Attribute | Value |
|-----------|-------|
| **Project** | Orca Child in the Wild (OCINW) |
| **Type** | Youth-run nonprofit — ocean, marine, river, lake, pond conservation & education |
| **Founder** | Jordyn Rosario and Family |
| **Region** | Southern California (Los Angeles to San Diego) |
| **Audience** | Mixed — youth (8-18), families, educators, donors, community members |
| **Languages** | English (primary), Spanish (secondary) |
| **GitHub** | OrcaChild / ocinw-website |

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

## Pillar 1: Security Minded

Every line of code must be defensively written. This site collects personal data from minors (COPPA applies).

### Universal Rules (All Projects)
- **Validate all input at system boundaries** — never trust client-submitted data
- **Never commit secrets** — `.env`, credentials, API keys are always git-ignored
- **Principle of least privilege** — grant minimum access needed, nothing more
- **Never expose internal errors to users** — log server-side, show generic messages
- **Dependency hygiene** — audit packages before adding, prefer well-maintained libraries

### Tech-Specific (This Project)

**Injection Prevention**
- All user input validated server-side via Zod schemas before any database operation
- Use Supabase parameterized queries exclusively — never string-concatenate SQL
- Sanitize all inputs rendered in HTML — never use `dangerouslySetInnerHTML` without explicit sanitization

**Authentication & Session Security**
- Admin routes protected via Supabase Auth with email/password
- Session tokens stored in httpOnly cookies — never localStorage
- Idle timeout: 30 minutes for admin sessions
- Rate limit login attempts: 5 per minute per IP

**Sensitive Data Protection**
- `.env.example` contains variable names only — never actual values
- Supabase `service_role_key` used only in server-side API routes — never exposed to client
- `NEXT_PUBLIC_` prefix only for non-sensitive values
- Volunteer personal data protected by Row Level Security

**Access Control**
- Supabase RLS enabled on ALL tables — no exceptions
- Public users: INSERT only (forms)
- Authenticated admins: SELECT, UPDATE, DELETE
- API routes verify authentication before returning sensitive data

**CSRF Protection**
- All form submissions use server actions or API routes with origin validation
- Verify `Origin` and `Referer` headers on data-modifying API routes

**Security Headers (next.config.ts)**

Development CSP (Next.js requires `'unsafe-eval'` for HMR):
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.open-meteo.com https://marine-api.open-meteo.com https://api.tidesandcurrents.noaa.gov https://*.supabase.co; frame-src https://www.zeffy.com;
```

Production CSP (strict — nonce-based):
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{random}'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.open-meteo.com https://marine-api.open-meteo.com https://api.tidesandcurrents.noaa.gov https://*.supabase.co; frame-src https://www.zeffy.com;
```

All environments:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(self)
```

**Dependency Security**
- Run `pnpm audit` before every PR merge
- No packages with known critical vulnerabilities
- Pin major versions to prevent supply chain attacks
- Prefer packages with >1000 weekly downloads and active maintenance

**COPPA Compliance (Children Under 13)**
- Parental consent required before collecting personal data from under-13 users
- Age-gating on volunteer form: under-13 triggers parent/guardian required fields
- Consent email sent to parent before storing child's data
- Minimal data collection — only what's strictly necessary
- Never share children's data with third parties

**Rate Limiting**
- API routes: 10 requests/minute per IP for form submissions
- Contact form: 3 submissions/hour per IP
- Newsletter signup: 5 attempts/hour per IP

**Error Handling**
- Never expose stack traces, database errors, or internal paths to users
- **Never log PII** — log only: error type, timestamp, URL, anonymized user ID
- COPPA prohibits logging children's personal data
- Return generic error messages to client

**Request Payload Limits**
- Form submissions: 1MB max
- File uploads: 5MB max (event photos only, admin-authenticated)

**Backup & Disaster Recovery**
- Supabase free tier: daily backups with 7-day retention
- Weekly `pg_dump` export stored in private GitHub repository
- MDX content Git-versioned (inherently backed up)
- Recovery procedure documented and tested before launch

---

## Pillar 2: Structure

Clean architecture makes every session productive. A fresh Claude instance should be able to pick up seamlessly.

### Universal Rules (All Projects)
- **Single source of truth** — every domain has ONE authoritative document
- **Handoff-readiness** — update docs as you build, not as an afterthought
- **Archive pattern** — when docs grow past limits, move completed sections to archive with key facts retained inline
- **No file bloat** — prefer editing existing files over creating new ones
- **Code tidiness** — remove dead code, no legacy shims, clean as you go

### Tech-Specific (This Project)

**TypeScript Rules**
- **Never use `any`** — use `unknown` and narrow with type guards
- **Never use `as` type assertions** unless type is verified at runtime
- **Never use `!` non-null assertions** — handle null/undefined explicitly
- **Always define return types** for exported functions
- **Use discriminated unions** for state

**Component Patterns**
- Server components by default — `"use client"` only for interactivity
- Co-locate component, types, and tests: `WeatherCard.tsx`, `WeatherCard.test.tsx`
- One component per file — named export matching filename
- Props defined as TypeScript interface above the component

**File Naming**

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `WeatherCard.tsx` |
| Pages | lowercase `page.tsx` | `src/app/donate/page.tsx` |
| Utilities | camelCase | `formatTideHeight.ts` |
| Constants | camelCase | `constants.ts` |
| MDX Content | kebab-case | `california-gray-whale.mdx` |
| Test files | same as source + `.test` | `WeatherCard.test.tsx` |

**Import Order**
```
1. React/Next.js
2. External packages
3. Internal: components
4. Internal: utilities, hooks, types
5. Styles (if any)
```

**Environment Variable Typing**
- `src/env.ts` with Zod schema validates all env vars at startup — fail fast if missing
- Import `env` instead of accessing `process.env` directly

**Git Commit Messages**
```
<type>: <short description>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```
Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore`

---

## Pillar 3: Performance

Respect the user's time, bandwidth, and device — many visitors are youth on mobile.

### Universal Rules (All Projects)
- **No bloat** — don't add packages, files, or abstractions without clear justification
- **Lazy load where possible** — defer heavy content below the fold
- **Efficient queries** — select only what you need
- **Minimize re-renders** — server-first where applicable
- **Fast feedback loops** — tests should run in seconds, dev server should reload instantly

### Core Web Vitals Targets (Non-Negotiable)

| Metric | Target |
|--------|--------|
| LCP | < 2.5s |
| FCP | < 1.8s |
| FID | < 100ms |
| CLS | < 0.1 |
| INP | < 200ms |
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 90+ |
| Lighthouse SEO | 90+ |

### Tech-Specific Rules

**Images**
- Always use Next.js `<Image>` — never raw `<img>` tags
- WebP with responsive `sizes`, lazy loaded below the fold
- Hero images use `priority` prop
- Maximum 2400px wide

**Fonts**
- Load via `next/font` — zero layout shift
- Subset to Latin characters, two families maximum

**JavaScript**
- Dynamic import for heavy components (maps, charts) with loading skeletons
- Tree-shake all imports — no `import *`
- No packages over 50KB gzipped without justification

**Data Fetching**
- Weather: cache 15 minutes
- Tides: cache 6 hours
- MDX: static generation with ISR (revalidate 1 hour)
- Never fetch client-side when server-side is possible

**Database Queries**
- Always `.select()` with specific columns
- Paginate with `.range(from, to)` — never unbounded
- Use `.single()` for known single-row results
- Avoid N+1 — use joined selects

**Bundle Size**
- Monitor with `@next/bundle-analyzer`
- Alert on PRs that increase bundle by >10KB

---

## Pillar 4: Inclusive

Every person who touches our systems deserves to feel seen, safe, and respected. This is non-negotiable.

### Accessibility (WCAG 2.1 AA — All Projects)
- **All images have alt text** — descriptive for informational, empty (`alt=""`) for decorative
- **Color contrast 4.5:1 minimum** for all text
- **All interactive elements keyboard-accessible** — Tab, Enter, Space, Escape
- **Visible focus indicators** — never `outline: none` without replacement
- **Semantic HTML** — `<button>` for actions, `<a>` for navigation, proper landmarks
- **Touch targets 44x44px minimum** on mobile
- **Respect `prefers-reduced-motion`** — disable animations when preferred
- **Proper heading hierarchy** — no skipped levels

### LGBTQA+ Inclusive (All Projects)
- **Gender-neutral language by default** — use "they/them" when gender is unknown, "partner" instead of "husband/wife" in examples and templates
- **No binary gender assumptions** — forms that collect gender should offer inclusive options or open text fields, never just "Male/Female"
- **Inclusive examples and content** — represent diverse identities, family structures, and relationships
- **No assumptions about personal lives** — focus on the person, not their identity
- **Safe space in all communication** — tone and language never alienates, mocks, or others anyone

### AI Inclusive (All Projects)
- **Transparent about AI use** — users know when AI is involved in analysis or content generation
- **AI as amplifier, not replacement** — extends human capability, doesn't replace human judgment or creativity
- **Accessible AI interactions** — prompts and AI-generated content should be understandable to people who aren't tech-savvy
- **Human review before delivery** — AI output reviewed and personalized before reaching users
- **RAI gates where applicable** — deliverables require human review confirmation before being marked as sent

### Neurodivergent-Friendly (All Projects)
- **Scannability** — documents use headers, bullets, tables, and short paragraphs. No walls of text
- **Clear hierarchy** — most important info first, details follow
- **Visual structure** — use formatting to reduce cognitive load
- **Capacity-aware design** — designed for real life, not ideal conditions

### Tech-Specific (This Project)

**Extended Accessibility (OCINW-Specific)**
- **ARIA only as last resort** — prefer semantic HTML
- **Forms: every input has a `<label>`** linked via `htmlFor`/`id`
- **Error messages linked to inputs** via `aria-describedby`
- **Skip-to-content link** as first focusable element on every page
- **Content readable at 200% zoom** without horizontal scrolling
- **Dynamic content announcements** — `aria-live="polite"` for non-urgent, `aria-live="assertive"` for urgent

**COPPA (Children Under 13)**
- Parental consent required before collecting personal data from under-13 users
- Age-gating on volunteer form triggers parent/guardian required fields
- Minimal data collection — only what's strictly necessary

**i18n (English/Spanish)**
- All user-visible strings in `src/i18n/en.json` and `src/i18n/es.json`
- Never hardcode English text in components
- MDX has separate files per language via `translationSlug` frontmatter
- URL structure: `/en/...` and `/es/...`
- Default locale from browser `Accept-Language` header

---

## Pillar 5: Non-Bias

Our work should never reinforce stereotypes, make assumptions, or exclude. We build for everyone.

### Universal Rules (All Projects)
- **Diverse test data and examples** — names, businesses, backgrounds, and identities should reflect real-world diversity
- **No cultural or demographic assumptions** — don't assume race, ethnicity, religion, ability, orientation, or socioeconomic status
- **Inclusive default language** — avoid idioms, slang, or references that exclude non-native English speakers or specific cultural groups
- **Challenge AI bias** — review AI-generated content for stereotypes, assumptions, or exclusionary language before use
- **No "default" user** — design for the full range of people who will use our systems, not just the most common case
- **Representation matters** — when examples or personas are needed, they should represent a range of identities, not a homogeneous group

### Responsible AI Ethics (All Projects)
- **Disclose AI involvement** — be transparent about what AI does and doesn't do
- **Verify AI output** — never deliver AI-generated content without human review
- **No AI as authority** — AI provides analysis and suggestions, humans make decisions
- **Data privacy** — user data stays within the system, never shared externally
- **No manipulative patterns** — AI should inform and empower, never pressure or deceive

### Tech-Specific (This Project)
- **Youth-appropriate content** — all content suitable for ages 8+
- **Conservation framing** — science-based, action-oriented, never doom-focused
- **Multi-lingual respect** — Spanish translations are full translations, not afterthoughts

---

## Pillar 6: UX Minded

Every interaction should feel intentional, clear, and respectful of the user's time.

### Universal Rules (All Projects)
- **Clear feedback** — every action gets a visible response (loading, success, error)
- **Error recovery** — errors are recoverable with clear instructions, never dead ends
- **Progressive disclosure** — show what's needed now, reveal complexity as needed
- **Consistent patterns** — same action works the same way everywhere
- **Mobile-first** — design for small screens first, enhance for larger

### Tech-Specific (This Project)

**Reliability Standards**
- Global error boundary at `src/app/error.tsx` catches unhandled errors
- Page-level error boundaries for critical sections (weather, donations, forms)
- Every error boundary shows user-friendly message with retry action

**API Resilience**
- All external API calls wrapped in try/catch with fallback UI
- Timeout: 10 seconds for external API calls
- API failures isolated to their component — never crash the full page

**Form UX**
- Client-side validation (Zod) for instant feedback
- Server-side validation (same schema) is source of truth
- Inline field errors on blur, form-level summary on submit failure
- Disable submit during processing — prevent double-submission
- Success confirmation with clear next steps

**Database Reliability**
- Connection errors handled gracefully with retry option
- UNIQUE constraints prevent duplicate signups
- Idempotent writes where possible

---

## Testing Requirements

### Before Every PR
1. `pnpm lint` — zero errors, zero warnings
2. `pnpm type-check` — zero TypeScript errors
3. `pnpm test` — all unit tests pass
4. `pnpm build` — production build succeeds
5. `pnpm audit` — no critical vulnerabilities

### Coverage Minimums

| Category | Minimum |
|----------|---------|
| Utility functions | 90% |
| API clients | 80% |
| Hooks | 80% |
| Zod schemas | 100% |
| Overall | 70% |

### What To Test
- Validation schemas, API response parsing, data transformations
- Conditional rendering (age-based parent fields, location states)
- E2E: donation flow, volunteer signup, contact form, navigation, language switching
- Accessibility: axe-core on every page — zero violations

---

## Session Protocol

### Starting
1. Read `Handoff.md` for current state
2. Read `Completed.md` for what's done
3. Consult `OCINW.MD` for architectural WHY
4. Use `Teams.md` for specialist delegation

### During
1. Update `Handoff.md` as work progresses
2. Mark completed tasks
3. Move completed work to `Completed.md` with timestamps

### Ending
1. Update `Handoff.md` — what's done, in-progress, next, blockers, decisions
2. Move all completed items to `Completed.md`
3. Recommend next steps

---

## Prohibited Actions

- **Never `git push --force`** to any shared branch
- **Never commit `.env.local`** or any file containing secrets
- **Never use `dangerouslySetInnerHTML`** without explicit sanitization
- **Never use `any` type** in TypeScript
- **Never use `eslint-disable`** without a comment explaining why
- **Never delete user data** without explicit user request
- **Never skip form validation** — both client and server-side are mandatory
- **Never store sensitive data in localStorage** — use httpOnly cookies
- **Never embed third-party scripts** without CSP review
- **Never ignore accessibility warnings** from axe-core or eslint-plugin-jsx-a11y
