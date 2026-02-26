<div align="center">

```
        ~          ~     ~                ~          ~
   ~       ~  ~        ~       ~    ~        ~     ~       ~
      ~        ~    ~      ~         ~    ~      ~    ~
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   ~~~~    ~~~    ~~~~    ~~~    ~~~~    ~~~    ~~~~    ~~~   ~~~~
     ~~~ ~~~  ~~~ ~~~  ~~~ ~~~  ~~~ ~~~  ~~~ ~~~  ~~~ ~~~  ~~~
       ~~~      ~~~      ~~~      ~~~      ~~~      ~~~      ~~~
```

# Orca Child in the Wild

### Protecting Our Waters from Shore to Sea

*A youth-run nonprofit dedicated to ocean, marine, river, lake, and pond conservation across Southern California*

[![Live Site](https://img.shields.io/badge/Live_Site-orcachildinthewild.com-0077B6?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0yIDEyaDIwTTEyIDJhMTAgMTAgMCAwIDEgMCAyMEExMCAxMCAwIDAgMSAxMiAyIi8+PC9zdmc+)](https://www.orcachildinthewild.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

</div>

---

## The Mission

**Every body of water tells a story.** From the kelp forests of La Jolla to the tide pools of Carlsbad, from the Los Angeles River to the lagoons of Oceanside, Southern California's waterways are teeming with life that needs our protection.

**Orca Child in the Wild** was founded by Jordyn Rosario and family with a simple belief: *the next generation of ocean stewards is already here.* We empower youth ages 13 and up to lead conservation efforts, educate their communities, and protect the waters that connect us all.

This repository contains the full source code for our website — built with care, accessibility, and security as first principles.

---

## What Lives Here

```
                    🐋
                  ╱    ╲
                ╱  About  ╲          Learn about our mission, team, and story
              ╱──────────────╲
            ╱   Conservation   ╲      Events, projects, impact tracking
          ╱──────────────────────╲
        ╱     Learn & Discover     ╲   Species profiles, ecosystems, articles
      ╱──────────────────────────────╲
    ╱     Volunteer  ·  Donate  ·  Contact  ╲   Get involved in the movement
  ╱──────────────────────────────────────────────╲
```

| Feature | Description |
|---------|-------------|
| **Conservation Hub** | Events calendar, project tracking, community impact data |
| **Species Profiles** | 10+ Southern California marine species with conservation status |
| **Ecosystem Guides** | Kelp forests, wetlands, sandy beaches, rocky intertidal zones |
| **Educational Articles** | Citizen science, marine protected areas, how to help |
| **Live Weather & Tides** | Real-time conditions from NOAA and Open-Meteo for SoCal coastline |
| **Volunteer System** | Age-gated signup with COPPA-compliant parental consent |
| **Events & Registration** | Capacity tracking, waitlists, iCal downloads |
| **Donation Portal** | Zero-fee donations through Zeffy |
| **Bilingual** | Full English and Spanish support |

---

## The Tech Behind the Tide

Built to be fast, accessible, and secure — because conservation data should be available to everyone.

```
Frontend          Next.js 16 · React 19 · TypeScript (strict) · Tailwind CSS v4
Components        shadcn/ui (Radix primitives) · Lucide icons
Content           MDX + Velite · 23 articles, species, and ecosystem profiles
Database          Supabase (PostgreSQL) · Row Level Security on every table
Authentication    Supabase Auth · RBAC (super_admin, content_manager, volunteer_manager, viewer)
APIs              NOAA CO-OPS (tides) · Open-Meteo (weather) · Both free, no keys
Donations         Zeffy ($0 processing fees for nonprofits)
Email             Resend (transactional email)
i18n              next-intl (EN/ES with locale-prefixed routing)
Validation        Zod v4 (client + server, same schemas)
Testing           Vitest (218 unit tests) · Playwright (E2E) · axe-core (accessibility)
Hosting           Hostinger VPS · Ubuntu 24.04 · Nginx · PM2 · Let's Encrypt SSL
```

---

## Performance & Accessibility

We believe the web should work for everyone — no exceptions.

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Lighthouse Performance | 90+ | Fast load times on school WiFi and mobile data |
| Lighthouse Accessibility | 100 | Usable by everyone, including screen reader users |
| WCAG 2.1 AA | Full compliance | Legal requirement + the right thing to do |
| LCP | < 2.5s | Content visible fast |
| CLS | < 0.1 | Nothing jumps around |
| Core Web Vitals | All green | Better search ranking, better UX |

---

## Security & Privacy

This site serves minors. We take that responsibility seriously.

- **COPPA Compliant** — Verifiable parental consent before collecting data from children under 13
- **CCPA Compliant** — Soft-delete pattern, data deletion rights for California residents
- **Row Level Security** — Every Supabase table, no exceptions
- **CSRF Protection** — Origin validation on all form submissions
- **Rate Limiting** — Per-IP throttling on all API routes
- **Zero PII in Logs** — Error logs never contain names, emails, or phone numbers
- **Content Security Policy** — Strict CSP headers in production
- **Dependency Auditing** — `pnpm audit` on every deployment

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/OrcaChild/ocinw-website.git
cd ocinw-website

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase keys

# Start the development server
pnpm dev
```

### Available Commands

| Command | What It Does |
|---------|-------------|
| `pnpm dev` | Start dev server (webpack mode) |
| `pnpm build` | Generate content + production build |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | TypeScript type checking |
| `pnpm test` | Run all unit tests |
| `pnpm test:e2e` | Run Playwright end-to-end tests |
| `pnpm test:a11y` | Run accessibility tests |

---

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    [locale]/             # Locale-prefixed routes (en/, es/)
      about/              # Mission, team
      conservation/       # Events, projects, impact
      learn/              # Species, ecosystems, articles
      volunteer/          # Signup form
      donate/             # Zeffy integration
      contact/            # Contact form
      weather/            # Live weather & tide dashboard
    actions/              # Server actions (form handlers)
    api/                  # API routes (iCal, etc.)
  components/             # React components
    ui/                   # shadcn/ui primitives
    layout/               # Navigation, footer
    shared/               # Reusable components
    weather/              # Weather & tide widgets
    events/               # Event cards, registration
    volunteer/            # Volunteer form
    education/            # Species, ecosystem, article cards
  lib/                    # Utilities, hooks, types, API clients
  i18n/                   # Internationalization config
content/                  # MDX content files
  species/                # Marine species profiles
  ecosystems/             # Ecosystem guides
  articles/               # Educational articles
  projects/               # Conservation project descriptions
messages/                 # Translation files (en.json, es.json)
supabase/                 # Database schema & migrations
tests/                    # Vitest unit + Playwright E2E tests
```

---

## The Waters We Protect

Our conservation efforts span the Southern California coastline — from Los Angeles to San Diego.

**NOAA Tide Stations We Monitor:**
Santa Monica | Los Angeles | Long Beach | Newport Beach | La Jolla | San Diego | Imperial Beach

**Ecosystems We Study:**
Kelp Forests | Coastal Wetlands | Sandy Beaches | Rocky Intertidal | Open Ocean | Freshwater Systems

**Species We Track:**
Gray Whales | Blue Whales | Orcas | Sea Lions | Harbor Seals | Sea Otters | Brown Pelicans | Grunion | Garibaldi | Leopard Sharks

---

## Contributing

We welcome contributions from developers, marine biologists, educators, and ocean enthusiasts.

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Make your changes following our code standards
4. Run the quality gates: `pnpm lint && pnpm type-check && pnpm test && pnpm build`
5. Open a pull request

---

## License

This project is open source under the [MIT License](LICENSE).

---

<div align="center">

```
  ·  . *    ·    .  ·    *   .    ·   .  *   ·    .
     .    ·    *  .    ·    .    *  .    ·    .    *
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   ~~~    ~~~    ~~~    ~~~    ~~~    ~~~    ~~~
     ~ ~ ~   ~ ~ ~   ~ ~ ~   ~ ~ ~   ~ ~ ~
```

**Built with love for the ocean by Jordyn Rosario and the Orca Child family.**

*Every wave starts with a single drop.*

[www.orcachildinthewild.com](https://www.orcachildinthewild.com)

</div>
