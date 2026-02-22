# ORCA CHILD IN THE WILD (OCINW) — Complete Executable Roadmap

> **From Idea to Launch: A Youth-Run Aquatic Preservation & Education Resource**
> Founded by Jordyn Rosario and Family
> Focus Region: Southern California — Los Angeles to San Diego

---

## Context

Orca Child in the Wild is a youth-run nonprofit dedicated to ocean, marine, river, lake, and pond environmental conservation and stewardship. This document is the single-source-of-truth roadmap spanning every phase from legal formation through technology build, content development, testing, and public launch. The plan is designed for a mixed audience (youth, families, educators, community members) and prioritizes Southern California's coastline and waterways between Los Angeles and San Diego as the initial service area.

### Why This Document Exists

Every decision in this roadmap includes a "WHY" explanation. Nothing is assumed. This is intentional — a youth-run organization deserves to understand *why* each choice was made so that future leaders, board members, grant reviewers, and volunteers can trace the reasoning behind every element. If a choice can be questioned, it should be explained. This document is that explanation.

---

## TABLE OF CONTENTS

1. [Phase 1 — Organization Formation & Legal Foundation](#phase-1--organization-formation--legal-foundation)
2. [Phase 2 — Brand Identity & Design System](#phase-2--brand-identity--design-system)
3. [Phase 3 — Technology Stack & Architecture](#phase-3--technology-stack--architecture)
4. [Phase 4 — Project Scaffolding & Infrastructure](#phase-4--project-scaffolding--infrastructure)
5. [Phase 5 — Core Website Development](#phase-5--core-website-development)
6. [Phase 6 — Live Weather & Tides System](#phase-6--live-weather--tides-system)
7. [Phase 7 — Donation System](#phase-7--donation-system)
8. [Phase 8 — Volunteer Management System](#phase-8--volunteer-management-system)
9. [Phase 9 — Environmental Education & Conservation Content](#phase-9--environmental-education--conservation-content)
10. [Phase 10 — Accessibility, Internationalization & Compliance](#phase-10--accessibility-internationalization--compliance)
11. [Phase 11 — Testing & Quality Assurance](#phase-11--testing--quality-assurance)
12. [Phase 12 — Pre-Launch Preparation](#phase-12--pre-launch-preparation)
13. [Phase 13 — Launch](#phase-13--launch)
14. [Phase 14 — Post-Launch Operations & Growth](#phase-14--post-launch-operations--growth)
15. [Appendix A — API Reference & Integrations](#appendix-a--api-reference--integrations)
16. [Appendix B — Southern California Conservation Landscape](#appendix-b--southern-california-conservation-landscape)
17. [Appendix C — Budget Estimates](#appendix-c--budget-estimates)
18. [Appendix D — Partner Organizations](#appendix-d--partner-organizations)

---

## PHASE 1 — ORGANIZATION FORMATION & LEGAL FOUNDATION

### 1.1 Choose a Legal Structure

- **Choice:** California Public Benefit Corporation (nonprofit)
- **WHY this structure and not others:**
  - **Why not a Mutual Benefit Corporation?** Mutual benefit corps serve their members (like trade associations or clubs). OCINW serves the public — the ocean, waterways, and community — not its own members. Public benefit is the correct legal category.
  - **Why not a Religious Corporation?** OCINW has no religious affiliation.
  - **Why not an LLC or S-Corp?** These are for-profit structures. A nonprofit public benefit corporation is required to qualify for 501(c)(3) federal tax-exempt status, which enables tax-deductible donations — critical for a donation-funded organization.
  - **Why not a Fiscal Sponsorship instead of incorporating?** Fiscal sponsorship (operating under another nonprofit's 501(c)(3)) is faster but gives OCINW less control, requires sharing revenue with the sponsor, and limits independent branding. Since OCINW is a long-term organization with its own identity, independent incorporation is the right path.
  - **Why California specifically?** OCINW operates in California and its founders are California residents. You must incorporate in the state where you operate.
- Subject to California Attorney General oversight — this means transparency requirements, which aligns with OCINW's core value of accountability
- Requires minimum three (3) board directors under California law

### 1.2 Draft Governing Documents

#### 1.2.1 Articles of Incorporation
- Draft Articles of Incorporation for a California Nonprofit Public Benefit Corporation
- Must include:
  - Corporation name: **Orca Child in the Wild** (verify name availability with CA Secretary of State)
  - Statement of purpose (environmental conservation and education)
  - Agent for service of process (registered agent in California)
  - IRS-required language for 501(c)(3) eligibility:
    - Organized exclusively for charitable, educational purposes
    - No part of net earnings inures to private individuals
    - Dissolution clause directing assets to another 501(c)(3)
- File with California Secretary of State ($30 filing fee for certified copy)

#### 1.2.2 Bylaws
- **WHY bylaws matter:** Bylaws are your organization's operating constitution. Without them, the IRS will reject your 501(c)(3) application. Beyond legal requirement, they prevent internal disputes by establishing clear rules before conflicts arise.
- Draft organizational bylaws covering:
  - **Board Composition:** Minimum 3 directors; recommend 5-7 including youth representatives
    - **WHY 5-7?** Three is the legal minimum, but 5-7 provides diverse perspectives, prevents deadlocks on votes (odd numbers help), and distributes workload. More than 7 at this stage creates scheduling difficulties and slows decision-making for a startup nonprofit.
  - **Youth Advisory Council:** Formal structure for youth participation in governance (ages 13-18)
    - **WHY a separate council instead of youth on the board?** Minors face legal complications serving as board directors (fiduciary duty, liability). A Youth Advisory Council gives youth real voice and influence without legal exposure. Their recommendations can be formally presented to the board for action.
  - **Officer Positions:** President, Vice President, Treasurer, Secretary (minimum)
    - **WHY these four?** California law requires at minimum a Chair/President, Secretary, and Chief Financial Officer/Treasurer. VP provides succession planning. These four cover governance (President), financial oversight (Treasurer), record-keeping (Secretary), and continuity (VP).
  - **Meeting Procedures:** Quarterly board meetings minimum; monthly for youth advisory council
    - **WHY quarterly for the board?** California law requires at least one annual meeting. Quarterly keeps the board engaged without overburdening volunteers. Monthly youth meetings maintain momentum and engagement — youth lose interest with less frequent touchpoints.
  - **Decision-Making:** Quorum requirements, voting procedures, proxy rules
  - **Conflict of Interest Policy:** Mandatory disclosure and recusal procedures
  - **Committees:** Finance, Programs, Governance, Youth Leadership
    - **WHY these four committees?** Finance ensures fiscal responsibility (required by best practices). Programs oversees conservation and education activities (the core mission). Governance handles board recruitment and organizational health. Youth Leadership ensures the "youth-run" promise is real.
  - **Fiscal Year:** Recommend calendar year (January 1 – December 31)
    - **WHY calendar year?** Simplifies tax filing (aligns with personal tax year), makes annual reporting intuitive, and most grant cycles align with calendar year reporting.
  - **Amendment Procedures:** How bylaws can be modified

#### 1.2.3 Conflict of Interest Policy
- Required by IRS for 501(c)(3) applications
- Must cover board members, officers, key employees, and their family members
- Annual disclosure statements required from all covered individuals

### 1.3 Federal Tax-Exempt Status

#### 1.3.1 Obtain Employer Identification Number (EIN)
- Apply online via IRS.gov (Form SS-4) — free, immediate issuance
- Required before any bank accounts or tax filings

#### 1.3.2 File IRS Form 1023 or 1023-EZ
- **WHY 1023-EZ over 1023?** OCINW is a brand-new organization with no revenue history. The 1023-EZ is shorter (3 pages vs 30+), costs less ($275 vs $600), and processes in weeks instead of months. As long as projected gross receipts stay under $50,000/year for the first 3 years and assets under $250,000 — which is realistic for a startup nonprofit — the EZ form is the smart choice. You can always "upgrade" later as the organization grows.
- **Form 1023-EZ** (simplified): Available if gross receipts ≤ $50,000/year for 3 years and total assets ≤ $250,000
  - Filing fee: $275
  - Processing time: 2-4 weeks typical
- **Form 1023** (full): Required if above thresholds are exceeded
  - Filing fee: $600
  - Processing time: 3-6 months
- Include all required attachments: Articles of Incorporation, Bylaws, Conflict of Interest Policy
- Narrative description of planned activities (conservation cleanups, education programs, website resources)
- Financial projections for first 3 years

### 1.4 California State Registration

#### 1.4.1 Statement of Information
- File Form SI-100 with Secretary of State within 90 days of incorporation
- Filing fee: $20
- Must be filed biennially thereafter

#### 1.4.2 Attorney General Registration
- Register with California Attorney General's Registry of Charitable Trusts
- File CT-1 form within 30 days of receiving first charitable assets (donations)
- Filing fee: $50
- Annual filing of Form RRF-1 required thereafter

#### 1.4.3 California Tax Exemption
- File FTB Form 3500 (or 3500A for organizations with IRS determination letter)
- California requires separate state tax exemption application even with federal 501(c)(3) status
- California Franchise Tax Board processes this

#### 1.4.4 Charitable Solicitation Registration
- Required before soliciting donations in California
- Register with Attorney General's office
- Annual renewal required

### 1.5 Insurance

- **WHY insurance is non-negotiable for OCINW:** You are running outdoor activities on beaches, near water, with minors. A volunteer could slip on rocks, a child could be injured during a cleanup, or equipment could damage park property. Without insurance, one accident could bankrupt the organization and expose board members to personal liability. Most parks, beaches, and partner organizations will also *require* proof of insurance before allowing your events.

#### 1.5.1 General Liability Insurance
- Covers bodily injury and property damage during organizational activities
- **WHY this is priority #1:** Beach cleanups, tide pool explorations, and waterway monitoring are the core activities — all happen outdoors near water with inherent physical risk. This is the single most important policy.
- Essential for beach cleanups, field events, and community gatherings
- Typical cost: $500-$1,500/year for small nonprofits
- Recommended carriers: Nonprofits Insurance Alliance, Philadelphia Insurance Companies
  - **WHY these carriers?** Nonprofits Insurance Alliance is a nonprofit insuring nonprofits — they understand the sector and offer competitive rates. Philadelphia Insurance Companies has specialized nonprofit programs. Both are rated A+ by AM Best (financial stability).

#### 1.5.2 Directors & Officers (D&O) Liability Insurance
- Protects board members against personal liability for management decisions
- Mandatory if nonprofit has employees
- California Corporations Code Section 5239(a) provides volunteer director protection if organization demonstrates good faith effort to obtain insurance
- Typical cost: $500-$2,000/year

#### 1.5.3 Employment Practices Liability Insurance
- Covers claims of harassment, discrimination, wrongful termination
- Extends to both employees AND volunteers
- Important for youth-serving organizations

#### 1.5.4 Event Insurance
- Specific coverage for individual events (beach cleanups, fundraisers, educational outings)
- Can be purchased per-event or as an annual rider
- Required by many venue partners and parks departments

#### 1.5.5 Cyber Liability Insurance
- Covers data breaches, donor information protection
- Important when collecting donations and personal information online
- Typical cost: $300-$1,000/year for small organizations

### 1.6 Banking & Financial Setup

- Open nonprofit checking account (requires EIN and Articles of Incorporation)
- Recommended banks with nonprofit programs: US Bank, Bank of America, local credit unions
  - **WHY a credit union is worth considering:** Credit unions are member-owned nonprofits themselves. They typically offer lower fees, no minimum balance requirements, and are community-focused — aligning with OCINW's values. Many SoCal credit unions (like San Diego County Credit Union or SchoolsFirst) have dedicated nonprofit banking programs.
- Set up accounting system: QuickBooks Online Nonprofit Edition (discounted for 501(c)(3)s)
  - **WHY QuickBooks and not a free tool like Wave?** QuickBooks has purpose-built nonprofit features: fund tracking, donor reports, grant management, and Form 990 preparation. Wave is free but lacks nonprofit-specific reporting. When applying for grants, funders expect professional financial reports — QuickBooks generates these. The nonprofit discount makes it affordable (~$15/month).
  - **WHY not just a spreadsheet?** Spreadsheets lack audit trails, are error-prone, and won't scale. The IRS and grant funders expect proper accounting records. Starting with proper accounting software from day one prevents painful migrations later.
- Establish financial controls:
  - Dual signature requirement for checks over $500
    - **WHY dual signatures?** Prevents fraud and embezzlement — the #1 risk in small nonprofits. No single person should be able to authorize spending alone. This also protects your Treasurer from false accusations.
  - Monthly financial reports to board
  - Annual budget approval by board
  - Segregation of duties (no single person controls all financial transactions)
    - **WHY segregation of duties?** The person who writes checks should not be the same person who reconciles bank statements. This is a basic internal control that grant funders look for and that protects everyone involved.

### 1.7 Compliance Calendar

| Month | Action |
|-------|--------|
| January | Begin annual budget planning |
| March | File Form RRF-1 with Attorney General (if fiscal year = calendar year) |
| May 15 | IRS Form 990/990-EZ due (or request extension) |
| Biennially | File Statement of Information (SI-100) with Secretary of State |
| Ongoing | Maintain minutes of all board meetings |
| Ongoing | Update Registry of Charitable Trusts with any material changes |

---

## PHASE 2 — BRAND IDENTITY & DESIGN SYSTEM

- **WHY invest in branding before building?** Grant applications, partner organizations, and donors judge you by appearance before they read your mission. A consistent, professional brand signals legitimacy and competence. For a youth-run organization, this is even more important — adults need to trust that young people are leading something real. Branding done right makes every future asset (website, flyers, social media, grant proposals) cohesive and professional automatically.

### 2.1 Brand Strategy

#### 2.1.1 Mission Statement
- **WHY a mission statement first?** Everything else flows from this — your website copy, grant applications, volunteer pitches, donor appeals. Without a clear mission statement, messaging becomes inconsistent. The IRS Form 1023 also requires a clear statement of purpose.
- Draft a clear, concise mission statement (1-2 sentences)
- Example framework: "Orca Child in the Wild empowers youth to protect and restore aquatic ecosystems across Southern California through hands-on conservation, education, and community stewardship."
- Must resonate with mixed audience: youth (ages 8-18), families, educators, community partners
- **WHY "mixed audience" matters here:** A mission statement that sounds too childish alienates donors and partners. One that sounds too corporate alienates youth. The language must be aspirational and accessible — something a 12-year-old can say with pride and a foundation program officer finds compelling.

#### 2.1.2 Vision Statement
- Long-term aspirational statement
- Example framework: "A future where every waterway — from the Pacific Ocean to local ponds — thrives because young people lead the way in conservation."

#### 2.1.3 Core Values
- Youth Leadership
- Environmental Stewardship
- Scientific Curiosity
- Community Inclusion
- Transparency & Accountability
- Respect for All Living Things

#### 2.1.4 Brand Voice & Tone
- **Primary Voice:** Enthusiastic, empowering, accessible
- **For Youth Audience:** Fun, encouraging, action-oriented ("Let's do this!")
- **For Adult/Educator Audience:** Informative, professional, trustworthy
- **For Donor Audience:** Impact-focused, transparent, grateful
- Avoid jargon; explain scientific terms when used
- Bilingual capability (English/Spanish) in all brand messaging

### 2.2 Visual Identity

#### 2.2.1 Logo Design
- Primary logo: Orca-themed mark incorporating ocean/nature elements
- Secondary mark: Simplified icon for small spaces (favicons, social media avatars)
- Logo must work in:
  - Full color
  - Single color (black, white)
  - Small sizes (16x16px favicon up to billboard)
- Design considerations: youth-friendly but not childish; professional enough for grant applications
- File deliverables: SVG (vector), PNG (transparent background, multiple sizes), ICO (favicon)

#### 2.2.2 Color Palette
- **Primary Colors:** Ocean blues, deep teals (representing water)
- **Secondary Colors:** Sandy neutrals, kelp greens (representing coastline and marine life)
- **Accent Colors:** Coral/orange for calls-to-action, sunset warm tones
- **Semantic Colors:** Success green, warning amber, error red, info blue
- **WHY these specific color families?**
  - Blues and teals are universally associated with water, ocean, and trust — the core of OCINW's identity
  - Sandy neutrals and kelp greens ground the palette in nature without competing with the primary blues
  - Coral/orange accents create visual urgency for calls-to-action (Donate, Sign Up) because warm colors on cool backgrounds draw the eye — this is backed by color theory and UX research
  - Semantic colors (red for errors, green for success) follow universal conventions that users already understand
- All color combinations must meet WCAG 2.1 AA contrast requirements (4.5:1 minimum for normal text)
  - **WHY this contrast requirement?** It's a legal accessibility standard, and 1 in 12 men and 1 in 200 women have color vision deficiency. Low contrast text is physically unreadable for millions of people, including many of OCINW's potential audience.
- Define exact hex, RGB, and HSL values for each color

#### 2.2.3 Typography
- **Heading Font:** A bold, friendly sans-serif (e.g., Nunito, Poppins, or Montserrat)
- **Body Font:** A highly readable sans-serif (e.g., Open Sans, Inter, or Source Sans Pro)
- **Monospace Font:** For data displays (tide times, coordinates) — JetBrains Mono or Fira Code
- **WHY sans-serif fonts throughout?** Sans-serif fonts are more readable on screens, especially at small sizes and on mobile devices. Youth audiences are primarily mobile users. Serif fonts (like Times New Roman) look formal/academic and would conflict with the approachable brand voice.
- **WHY Google Fonts specifically?** They are free (no licensing cost), open-source (no vendor lock-in), optimized for web loading speed, and used by millions of sites (proven reliability). Paid font licenses can cost $100-500+/year and add legal complexity for a nonprofit.
- All fonts must be Google Fonts (free, open-source, web-optimized)
- Define type scale: h1 through h6, body text, small text, caption text
- Minimum body text size: 16px (accessibility requirement)
  - **WHY 16px minimum?** Browsers default to 16px for a reason — it's the minimum comfortable reading size on most screens. Anything smaller forces users to zoom in, especially on mobile. WCAG accessibility guidelines strongly recommend this as a baseline.

#### 2.2.4 Iconography
- Use a consistent icon library (Lucide Icons, Heroicons, or Phosphor Icons — all free/open-source)
  - **WHY Lucide as the primary recommendation?** Lucide is the community-maintained successor to Feather Icons. It has 1,400+ icons, is tree-shakeable (only icons you use are included in the build, keeping the site fast), works natively with React, and is completely free. Heroicons (by Tailwind CSS team) is an excellent alternative but has fewer icons. Phosphor is larger but heavier.
- Custom icons for:
  - Marine life categories (orca, dolphin, sea turtle, fish, seabird)
  - Water body types (ocean, river, lake, pond)
  - Activity types (cleanup, education, monitoring, advocacy)
  - Weather conditions (sun, clouds, rain, wind, waves)

#### 2.2.5 Photography & Imagery Guidelines
- Prioritize original photography of Southern California coastline and waterways
- Stock imagery guidelines: Use only royalty-free images (Unsplash, Pexels)
- Photo subjects: Youth in action, marine life, coastal landscapes, community events
- Image optimization: WebP format, responsive sizes, lazy loading
- Alt text required for every image (accessibility compliance)

### 2.3 Design System (Component Library)

#### 2.3.1 Spacing System
- Base unit: 4px
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px
- Consistent padding and margins across all components

#### 2.3.2 Grid System
- 12-column responsive grid
- Breakpoints:
  - Mobile: 0-639px (1 column default)
  - Tablet: 640-1023px (2-3 columns)
  - Desktop: 1024-1279px (3-4 columns)
  - Wide: 1280px+ (4+ columns)
- Maximum content width: 1280px
- Gutter width: 16px (mobile), 24px (tablet), 32px (desktop)

#### 2.3.3 Component Inventory
Define reusable UI components:
- **Navigation:** Header, mobile drawer, footer, breadcrumbs
- **Buttons:** Primary, secondary, tertiary, icon buttons, donate CTA
- **Cards:** Event card, location card, species card, article card, volunteer opportunity card
- **Forms:** Input fields, textareas, select dropdowns, checkboxes, radio buttons, date pickers
- **Data Display:** Weather widget, tide chart, water quality indicators, statistics counters
- **Feedback:** Alerts, toasts, loading spinners, progress bars, empty states
- **Media:** Image gallery, video player, interactive map
- **Layout:** Section containers, hero banners, feature grids, testimonial carousels

---

## PHASE 3 — TECHNOLOGY STACK & ARCHITECTURE

- **WHY technology choices matter more for a nonprofit:** Every dollar and hour spent on technology is a dollar and hour not spent on conservation. The stack must minimize ongoing costs (ideally $0/month), minimize maintenance burden (a youth team should not need a full-time developer), maximize performance (mobile-first for youth users), and be built on skills that are transferable and well-documented (so future team members can learn it).

### 3.1 Technology Decisions

#### 3.1.1 Frontend Framework: Next.js (React)
- **WHY Next.js and not other frameworks?**
  - **Why not plain HTML/CSS/JS?** A static site would be simpler but cannot handle dynamic features like live weather/tides, form submissions, or database interactions without a separate backend. Next.js provides both frontend and backend in one project.
  - **Why not WordPress?** WordPress is easier for non-developers to manage content, but it requires PHP hosting ($5-30/month), has security vulnerabilities requiring constant updates, is slower by default, and gives less control over design and functionality. For the weather/tides integration and custom interactivity OCINW needs, WordPress would require expensive plugins or custom PHP development. Next.js deploys free on Vercel with better performance.
  - **Why not Gatsby, Remix, Astro, or SvelteKit?** Gatsby is declining in popularity and has a fragile build system. Remix is excellent but has a smaller community and fewer learning resources. Astro is great for content sites but less proven for dynamic features like weather APIs. SvelteKit is elegant but has a much smaller ecosystem than React — finding help, tutorials, and contributors is harder. Next.js (React) has the largest ecosystem, most job-relevant skills, and best documentation.
  - **Why not a site builder like Wix or Squarespace?** These are easy to use but: (1) cost $16-46/month, (2) cannot integrate custom weather/tide APIs, (3) limit design customization, (4) don't allow code export (vendor lock-in), and (5) don't teach youth transferable development skills.
- **Version:** Latest stable (Next.js 15+)
- **Rendering Strategy:** Hybrid — static generation for content pages, server-side rendering for dynamic data (weather/tides), client-side for interactive features
  - **WHY hybrid rendering?** Static pages (articles, species guides) load instantly because they're pre-built HTML — no server needed at request time. Dynamic pages (weather, tides) need fresh data from APIs so they use server rendering. Interactive features (maps, forms) use client-side rendering for responsiveness. This mix gives the best performance for each page type.
- **Benefits for this project:**
  - Built-in image optimization (critical for photography-heavy site — automatically converts to WebP, resizes, and lazy-loads)
  - API routes for backend functionality (no separate server needed — saves $0/month in server costs)
  - Incremental Static Regeneration for content updates (pages rebuild automatically when content changes)
  - Excellent TypeScript support
  - Large community and abundant learning resources (good for youth developers — React is the most-taught framework in schools and bootcamps)

#### 3.1.2 Language: TypeScript
- **WHY TypeScript instead of JavaScript?**
  - TypeScript catches bugs before they reach users — it tells you "this variable might be null" before the site crashes in production
  - IDE autocompletion makes development faster (the editor suggests what you can type next)
  - It's the industry standard for professional React projects — learning it prepares youth developers for careers
  - **WHY not just JavaScript?** JavaScript works fine for small projects but becomes error-prone at scale. When multiple people contribute code (as in a youth-run organization), TypeScript prevents one person's changes from breaking another's work.
- Strict mode enabled for maximum safety
- All components, utilities, API routes, and tests typed

#### 3.1.3 Styling: Tailwind CSS
- **WHY Tailwind CSS instead of other CSS approaches?**
  - **Why not plain CSS?** Plain CSS works but leads to naming conflicts, unused styles accumulating, and inconsistency across pages. On a team project, everyone invents different class names and the CSS file grows unmanageably.
  - **Why not CSS Modules or Styled Components?** CSS Modules are fine but require switching between files constantly. Styled Components (CSS-in-JS) add JavaScript overhead and slow down page loads. Tailwind keeps styles in the HTML — you see exactly what an element looks like by reading its classes.
  - **Why not Bootstrap?** Bootstrap is opinionated about design — every Bootstrap site looks like a Bootstrap site. Tailwind provides building blocks without imposing a visual style, so OCINW can have a unique brand identity.
  - **WHY Tailwind specifically?** It generates only the CSS you actually use (tiny file sizes = fast load times), has built-in responsive design utilities (write `md:text-lg` instead of media queries), and has excellent documentation. It's also the most popular CSS framework in the React ecosystem.
- Custom configuration aligned with design system (colors, fonts, spacing)
- Component variants via `class-variance-authority` (CVA)
  - **WHY CVA?** When a Button needs to be "primary blue" or "secondary outline" or "danger red," CVA provides a clean, typed system for managing variants instead of messy conditional class strings.
- Dark mode support via Tailwind's dark mode utility

#### 3.1.4 UI Components: shadcn/ui
- **WHY shadcn/ui instead of other component libraries?**
  - **Why not Material UI (MUI)?** MUI imposes Google's Material Design look — every MUI site looks like a Google product. It's also heavy (large bundle size = slower page loads) and difficult to customize deeply.
  - **Why not Chakra UI?** Chakra is solid but adds a CSS-in-JS runtime that slows performance. It also has its own opinionated styling system that conflicts with Tailwind.
  - **Why not Ant Design?** Ant Design is enterprise-focused and visually heavy — not suitable for a youth-oriented environmental site.
  - **WHY shadcn/ui specifically?** It's not a traditional library — components are copy-pasted into your project, so you own the code completely. No dependency to update, no breaking changes from version upgrades. Built on Radix UI primitives which handle accessibility (keyboard navigation, screen reader support, focus management) correctly out of the box. Fully styled with Tailwind CSS, so it integrates perfectly with the existing styling choice. It's the most popular React component approach in 2025-2026.
- Components used: Button, Card, Dialog, Form, Input, Select, Tabs, Toast, Sheet, Navigation Menu, Accordion
- Fully customizable to match OCINW design system

#### 3.1.5 Content Management: MDX + Contentlayer (or Velite)
- **WHY MDX instead of a traditional CMS?**
  - **Why not WordPress as a CMS?** WordPress requires PHP hosting ($5-30/month), a separate server, security updates, plugin management, and database backups. For a nonprofit trying to keep costs at $0, this is unnecessary overhead.
  - **Why not Sanity, Strapi, or Contentful (headless CMS)?** These are excellent for large teams producing high-volume content, but they add complexity and cost. Sanity's free tier limits to 3 users. Strapi requires hosting a separate server. Contentful charges after 5 users. For OCINW's initial content volume (a few articles/month), a headless CMS is overkill.
  - **WHY MDX specifically?** MDX is Markdown (simple text formatting anyone can learn in 10 minutes) with the ability to embed interactive React components (maps, quizzes, tide charts) directly in articles. Content is stored as files in the Git repository — free, version-controlled, and backed up automatically. A youth team member can write `## About Sea Otters` in a text file and it becomes a formatted web page. No database, no admin panel, no monthly fees.
  - **WHY Velite over Contentlayer?** Contentlayer is unmaintained (archived on GitHub). Velite is its spiritual successor — actively maintained, faster builds, and similar API. If Velite proves unsuitable, alternatives include `next-mdx-remote` or `fumadocs`.
- Content types: Articles, conservation guides, species profiles, event descriptions
- Frontmatter metadata for categorization, SEO, and filtering
- Allows non-developer team members to contribute content via Markdown files
- Future option: Migrate to headless CMS (Sanity, Strapi) if content volume demands it

#### 3.1.6 Database: Supabase (PostgreSQL)
- **WHY Supabase instead of other databases?**
  - **Why not Firebase (Google)?** Firebase uses a NoSQL document model that makes relational queries (like "show me all volunteers in ZIP code 92101 who are interested in beach cleanups") difficult and expensive. Supabase uses PostgreSQL — the world's most advanced open-source relational database — which handles these queries naturally.
  - **Why not PlanetScale or Neon (other hosted databases)?** PlanetScale removed its free tier in 2024. Neon is a good alternative but has a smaller ecosystem. Supabase provides not just a database but also authentication, file storage, and real-time subscriptions — an all-in-one backend.
  - **Why not build a custom backend with Express/Fastify?** That requires hosting a separate server ($5-20/month), managing security, handling authentication, and maintaining it. Supabase provides all of this free with a managed service.
  - **WHY Supabase specifically?** Free tier is generous (500MB database, 1GB file storage, 50K monthly active users), it's open-source (no vendor lock-in — you can self-host if needed), it has built-in authentication (for admin panel), Row Level Security (so anonymous users can submit forms but can't read other people's data), and it provides a dashboard for non-developers to view data.
- Use cases: Volunteer registrations, event signups, contact form submissions, newsletter subscriptions
- Row Level Security for data protection
- Supabase Auth for admin panel authentication
- Free tier sufficient for launch phase

#### 3.1.7 Hosting & Deployment: Vercel
- **WHY Vercel instead of other hosting platforms?**
  - **Why not Netlify?** Netlify is good but has slower build times for Next.js, less native integration (Vercel literally built Next.js), and a smaller free tier for serverless functions.
  - **Why not AWS/Google Cloud/Azure?** These are enterprise platforms with complex setup, billing surprises, and steep learning curves. They're overkill for a nonprofit website and would require DevOps expertise the team doesn't need to learn.
  - **Why not a traditional web host (GoDaddy, Bluehost)?** These use outdated shared hosting models optimized for PHP/WordPress. They can't run Next.js applications natively.
  - **Why not Cloudflare Pages?** Cloudflare Pages is a strong alternative (and could be a future option) but has less seamless Next.js integration. Vercel's preview deployments and analytics are superior for a team workflow.
  - **WHY Vercel specifically?** Vercel created Next.js — the integration is seamless. Free tier includes: 100GB bandwidth/month (more than enough for a nonprofit), unlimited deployments, preview deployments for every pull request (team members can review changes before they go live), built-in analytics, automatic SSL, CDN (content delivered from servers closest to the user), and custom domain support. Cost: $0.
- Preview deployments for every pull request
- Edge functions for geolocation-aware content
- Analytics included in free tier
- Custom domain support

#### 3.1.8 Version Control: GitHub
- **WHY GitHub instead of alternatives?**
  - **Why not GitLab or Bitbucket?** Both are capable, but GitHub has the largest community, best integration with Vercel (one-click deployment), most extensive free tier for nonprofits (GitHub for Nonprofits program), and is where most open-source projects live. Youth developers learning GitHub are learning the industry standard.
  - **WHY version control at all?** Every change to the website is tracked — who changed what, when, and why. If something breaks, you can instantly revert to a working version. Multiple people can work simultaneously without overwriting each other. This is essential for a team project.
- Repository: `orcachild/ocinw-website` (or similar)
- Branch strategy: `main` (production), `develop` (staging), feature branches
  - **WHY this branch strategy?** `main` is always the live website — it must always work. `develop` is where changes are tested before going live. Feature branches isolate individual changes so a bug in one feature doesn't block another. This is the standard "Git Flow" approach used by professional teams.
- GitHub Actions for CI/CD
  - **WHY CI/CD?** Every time code is pushed, automated checks run: linting (code style), type checking (TypeScript errors), tests, and build verification. This catches problems before they reach the live site. It's free for public repositories on GitHub.
- GitHub Issues for task tracking
- GitHub Pages for documentation (optional)

#### 3.1.9 Package Manager: pnpm
- **WHY pnpm instead of npm or yarn?**
  - **Why not npm?** npm is the default Node.js package manager but is slower, uses more disk space (duplicates packages across projects), and has a "flat" dependency structure that can cause phantom dependency bugs.
  - **Why not yarn?** Yarn was created to fix npm's problems but has had confusing version splits (Yarn Classic vs Yarn Berry). Yarn Berry requires a learning curve with its Plug'n'Play system.
  - **WHY pnpm specifically?** pnpm is 2-3x faster than npm for installs, uses a content-addressable store (packages are saved once on disk and linked to projects — saves gigabytes), and has strict dependency isolation (you can only import packages you explicitly declared — prevents "works on my machine" bugs). It's the recommended package manager for Next.js projects.
- Workspace support if monorepo needed later

### 3.2 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL (Hosting)                       │
│  ┌───────────────────────────────────────────────────┐   │
│  │              Next.js Application                    │   │
│  │                                                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌───────────┐ │   │
│  │  │  Static Pages│  │  SSR Pages  │  │ API Routes│ │   │
│  │  │  (MDX Content│  │  (Weather/  │  │ (Forms,   │ │   │
│  │  │   Articles,  │  │   Tides,    │  │  Webhooks)│ │   │
│  │  │   Guides)    │  │   Dynamic)  │  │           │ │   │
│  │  └─────────────┘  └──────┬──────┘  └─────┬─────┘ │   │
│  │                          │                │        │   │
│  └──────────────────────────┼────────────────┼────────┘   │
│                             │                │            │
└─────────────────────────────┼────────────────┼────────────┘
                              │                │
              ┌───────────────┼────────────────┼──────────────┐
              │               ▼                ▼              │
              │  ┌──────────────────┐  ┌──────────────────┐  │
              │  │  External APIs   │  │    Supabase       │  │
              │  │                  │  │                    │  │
              │  │  • Open-Meteo    │  │  • PostgreSQL DB   │  │
              │  │  • NOAA Tides    │  │  • Auth            │  │
              │  │  • Geolocation   │  │  • File Storage    │  │
              │  │  • Zeffy/Stripe  │  │  • Real-time       │  │
              │  └──────────────────┘  └──────────────────┘  │
              │           EXTERNAL SERVICES                   │
              └───────────────────────────────────────────────┘
```

### 3.3 Project Directory Structure

- **WHY this structure matters:** A well-organized directory structure means any developer (including future youth team members who weren't part of the initial build) can find any file in seconds. This follows Next.js App Router conventions and React community best practices. Each folder has a single purpose. Files are grouped by feature (weather, donate, volunteer) rather than by file type (all components in one folder, all styles in another) — this is called "feature-based organization" and is the recommended approach for projects with multiple distinct features.

```
c:\OrcaChild\
├── OCINW.MD                        # This roadmap document
├── README.md                       # Project readme (developer onboarding)
├── CLAUDE.md                       # AI assistant instructions
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                  # Continuous integration (lint, test, build)
│   │   ├── deploy-preview.yml      # Preview deployment on PR
│   │   └── deploy-production.yml   # Production deployment on main merge
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── content_request.md
│   └── PULL_REQUEST_TEMPLATE.md
├── public/
│   ├── images/
│   │   ├── logo/                   # Logo variants (SVG, PNG, ICO)
│   │   ├── heroes/                 # Hero banner images
│   │   ├── species/                # Marine life photography
│   │   ├── locations/              # Beach/waterway photography
│   │   └── team/                   # Team/volunteer photos
│   ├── fonts/                      # Self-hosted font files (if needed)
│   ├── manifest.json               # PWA manifest
│   ├── robots.txt                  # Search engine directives
│   └── sitemap.xml                 # Auto-generated sitemap
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── layout.tsx              # Root layout (header, footer, providers)
│   │   ├── page.tsx                # Homepage
│   │   ├── loading.tsx             # Global loading state
│   │   ├── error.tsx               # Global error boundary
│   │   ├── not-found.tsx           # 404 page
│   │   ├── about/
│   │   │   ├── page.tsx            # About OCINW
│   │   │   ├── team/page.tsx       # Team members
│   │   │   └── mission/page.tsx    # Mission & values
│   │   ├── weather-tides/
│   │   │   ├── page.tsx            # Weather & tides dashboard
│   │   │   └── [location]/page.tsx # Location-specific weather
│   │   ├── donate/
│   │   │   ├── page.tsx            # Donation page
│   │   │   └── thank-you/page.tsx  # Donation confirmation
│   │   ├── volunteer/
│   │   │   ├── page.tsx            # Volunteer signup
│   │   │   ├── opportunities/page.tsx # Available opportunities
│   │   │   └── thank-you/page.tsx  # Signup confirmation
│   │   ├── learn/
│   │   │   ├── page.tsx            # Education hub landing
│   │   │   ├── articles/
│   │   │   │   ├── page.tsx        # Article listing
│   │   │   │   └── [slug]/page.tsx # Individual article
│   │   │   ├── species/
│   │   │   │   ├── page.tsx        # Species guide listing
│   │   │   │   └── [slug]/page.tsx # Individual species profile
│   │   │   ├── ecosystems/
│   │   │   │   ├── page.tsx        # Ecosystem guide listing
│   │   │   │   └── [slug]/page.tsx # Individual ecosystem profile
│   │   │   └── resources/
│   │   │       └── page.tsx        # External resource links
│   │   ├── conservation/
│   │   │   ├── page.tsx            # Conservation efforts hub
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx        # Active projects listing
│   │   │   │   └── [slug]/page.tsx # Individual project page
│   │   │   ├── events/
│   │   │   │   ├── page.tsx        # Upcoming events
│   │   │   │   └── [slug]/page.tsx # Individual event page
│   │   │   └── impact/page.tsx     # Impact metrics & reports
│   │   ├── contact/
│   │   │   └── page.tsx            # Contact form
│   │   ├── privacy/page.tsx        # Privacy policy
│   │   ├── terms/page.tsx          # Terms of service
│   │   └── api/
│   │       ├── weather/route.ts    # Weather API proxy
│   │       ├── tides/route.ts      # Tides API proxy
│   │       ├── contact/route.ts    # Contact form handler
│   │       ├── newsletter/route.ts # Newsletter signup handler
│   │       └── volunteer/route.ts  # Volunteer signup handler
│   ├── components/
│   │   ├── ui/                     # shadcn/ui base components
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Site header with navigation
│   │   │   ├── Footer.tsx          # Site footer
│   │   │   ├── MobileNav.tsx       # Mobile navigation drawer
│   │   │   └── Container.tsx       # Max-width content wrapper
│   │   ├── weather/
│   │   │   ├── WeatherDashboard.tsx    # Main weather display
│   │   │   ├── TideChart.tsx           # Tide prediction chart
│   │   │   ├── LocationSearch.tsx      # ZIP code / geolocation input
│   │   │   ├── WeatherCard.tsx         # Individual condition card
│   │   │   ├── MarineConditions.tsx    # Marine-specific weather
│   │   │   └── WeatherProvider.tsx     # Weather context/state
│   │   ├── donate/
│   │   │   ├── DonationWidget.tsx      # Embedded donation form
│   │   │   ├── DonationTiers.tsx       # Suggested amounts
│   │   │   └── ImpactCounter.tsx       # "Your donation funds..."
│   │   ├── volunteer/
│   │   │   ├── VolunteerForm.tsx       # Signup form
│   │   │   ├── OpportunityCard.tsx     # Opportunity listing card
│   │   │   └── VolunteerMap.tsx        # Map of volunteer locations
│   │   ├── education/
│   │   │   ├── ArticleCard.tsx         # Article preview card
│   │   │   ├── SpeciesCard.tsx         # Species profile card
│   │   │   ├── ResourceLink.tsx        # External resource link
│   │   │   └── QuizWidget.tsx          # Interactive learning quiz
│   │   ├── conservation/
│   │   │   ├── ProjectCard.tsx         # Conservation project card
│   │   │   ├── EventCard.tsx           # Event listing card
│   │   │   ├── ImpactMetrics.tsx       # Statistics display
│   │   │   └── InteractiveMap.tsx      # Map of conservation sites
│   │   └── shared/
│   │       ├── SEO.tsx                 # Meta tags component
│   │       ├── Newsletter.tsx          # Newsletter signup form
│   │       ├── SocialLinks.tsx         # Social media links
│   │       ├── ImageGallery.tsx        # Photo gallery
│   │       ├── ShareButtons.tsx        # Social sharing
│   │       └── LanguageToggle.tsx      # EN/ES language switcher
│   ├── lib/
│   │   ├── api/
│   │   │   ├── weather.ts          # Open-Meteo API client
│   │   │   ├── tides.ts            # NOAA CO-OPS API client
│   │   │   ├── geolocation.ts      # Geolocation utilities
│   │   │   └── supabase.ts         # Supabase client initialization
│   │   ├── utils/
│   │   │   ├── format.ts           # Date, number, coordinate formatting
│   │   │   ├── validation.ts       # Form validation schemas (Zod)
│   │   │   └── constants.ts        # App-wide constants
│   │   ├── hooks/
│   │   │   ├── useWeather.ts       # Weather data hook
│   │   │   ├── useTides.ts         # Tide data hook
│   │   │   ├── useGeolocation.ts   # Browser geolocation hook
│   │   │   └── useMediaQuery.ts    # Responsive breakpoint hook
│   │   └── types/
│   │       ├── weather.ts          # Weather data types
│   │       ├── tides.ts            # Tide data types
│   │       ├── content.ts          # Content/MDX types
│   │       └── forms.ts            # Form data types
│   ├── content/
│   │   ├── articles/               # MDX blog articles
│   │   ├── species/                # MDX species profiles
│   │   ├── ecosystems/             # MDX ecosystem guides
│   │   ├── projects/               # MDX conservation project descriptions
│   │   └── events/                 # MDX event descriptions
│   ├── i18n/
│   │   ├── en.json                 # English translations
│   │   ├── es.json                 # Spanish translations
│   │   └── config.ts               # i18n configuration
│   └── styles/
│       └── globals.css             # Global styles, Tailwind imports, CSS variables
├── tests/
│   ├── unit/                       # Unit tests (Vitest)
│   ├── integration/                # Integration tests
│   ├── e2e/                        # End-to-end tests (Playwright)
│   └── accessibility/              # Accessibility tests (axe-core)
├── docs/
│   ├── CONTRIBUTING.md             # Contributor guide
│   ├── CONTENT_GUIDE.md            # How to write/add content
│   └── API_INTEGRATION.md          # API integration documentation
├── .env.example                    # Environment variable template
├── .env.local                      # Local environment variables (git-ignored)
├── .gitignore
├── .eslintrc.json                  # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── next.config.ts                  # Next.js configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── postcss.config.js               # PostCSS configuration
├── vitest.config.ts                # Vitest test configuration
├── playwright.config.ts            # Playwright E2E configuration
├── package.json                    # Dependencies and scripts
└── pnpm-lock.yaml                  # Lock file
```

### 3.4 Environment Variables

```
# .env.example

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NOAA API (no key required, but base URL configured)
NEXT_PUBLIC_NOAA_TIDES_API_URL=https://api.tidesandcurrents.noaa.gov/api/prod/

# Open-Meteo (no key required)
NEXT_PUBLIC_OPEN_METEO_API_URL=https://api.open-meteo.com/v1/

# Donation Platform
NEXT_PUBLIC_ZEFFY_EMBED_URL=your_zeffy_form_url
# OR if using Stripe:
# STRIPE_SECRET_KEY=your_stripe_secret
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Contact/Email
RESEND_API_KEY=your_resend_api_key  # For transactional emails (free tier: 100/day)

# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=auto  # Vercel Analytics (free)

# Site
NEXT_PUBLIC_SITE_URL=https://orcachildinthewild.org
NEXT_PUBLIC_SITE_NAME=Orca Child in the Wild
```

---

## PHASE 4 — PROJECT SCAFFOLDING & INFRASTRUCTURE

### 4.1 Repository Initialization

1. Initialize Git repository in `c:\OrcaChild`
2. Create `.gitignore` (Node.js + Next.js template)
3. Create initial commit with OCINW.MD and README.md

### 4.2 Next.js Project Setup

1. Initialize Next.js project with TypeScript and App Router:
   ```bash
   pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```
2. Configure TypeScript strict mode in `tsconfig.json`
3. Configure Tailwind CSS with custom design tokens
4. Install and configure ESLint + Prettier for code consistency

### 4.3 Core Dependencies

```json
{
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "@supabase/supabase-js": "latest",
    "@supabase/ssr": "latest",
    "zod": "latest",
    "date-fns": "latest",
    "lucide-react": "latest",
    "next-intl": "latest",
    "recharts": "latest",
    "leaflet": "latest",
    "react-leaflet": "latest",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "@types/react": "latest",
    "@types/node": "latest",
    "@types/leaflet": "latest",
    "tailwindcss": "latest",
    "postcss": "latest",
    "autoprefixer": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "prettier": "latest",
    "prettier-plugin-tailwindcss": "latest",
    "vitest": "latest",
    "@testing-library/react": "latest",
    "@testing-library/jest-dom": "latest",
    "@playwright/test": "latest",
    "axe-core": "latest",
    "@axe-core/playwright": "latest"
  }
}
```

Key library purposes and WHY each was chosen over alternatives:
- **zod**: Form validation schemas (type-safe, works with TypeScript)
  - **WHY not Yup or Joi?** Zod is TypeScript-native — validation schemas automatically generate TypeScript types. Yup predates TypeScript and requires separate type definitions. Joi is designed for Node.js servers, not browser forms. Zod is also smaller (8KB vs Yup's 40KB).
- **date-fns**: Date/time formatting for tide predictions and events
  - **WHY not Moment.js or Day.js?** Moment.js is deprecated and huge (67KB). Day.js is tiny but has fewer formatting options. date-fns is tree-shakeable (only import functions you use), immutable (safer), and has the best TypeScript support.
- **lucide-react**: Icon library (consistent, accessible SVG icons) — see 2.2.4 reasoning above
- **next-intl**: Internationalization (English/Spanish)
  - **WHY not react-i18next or next-translate?** next-intl is purpose-built for Next.js App Router with server component support. react-i18next was designed for client-side React and has awkward Next.js integration. next-intl handles URL-based locale routing, SEO meta tags, and server rendering natively.
- **recharts**: Charts for tide predictions and data visualization
  - **WHY not Chart.js, D3, or Nivo?** Chart.js requires a canvas element which is less accessible (screen readers can't read canvas). D3 is extremely powerful but has a steep learning curve — overkill for tide charts. Nivo is built on D3 with the same complexity. Recharts is built for React, uses SVG (accessible, scalable), and has the simplest API for common chart types.
- **leaflet + react-leaflet**: Interactive maps (free, open-source, no API key required)
  - **WHY not Google Maps or Mapbox?** Google Maps charges $7 per 1,000 map loads after a small free tier. Mapbox charges after 50,000 loads/month but requires an API key and account. Leaflet is 100% free with no API key, no account, no usage limits. For a nonprofit trying to keep costs at $0, this is the clear choice.
  - **Tile provider:** OpenStreetMap (free, no API key, community-maintained). Leaflet is a rendering engine, not a map data provider — it needs tiles. Configured via `L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' })`. OSM tiles are free and align with OCINW's open-source values.
- **@radix-ui**: Accessible UI primitives (used by shadcn/ui) — handles complex accessibility patterns (focus traps, keyboard navigation, screen reader announcements) that are notoriously difficult to build correctly from scratch
- **class-variance-authority**: Component variant management — see 3.1.3 reasoning above
- **clsx + tailwind-merge**: Conditional class name management
  - **WHY both?** clsx combines class names conditionally (`clsx("base", isActive && "active")`). tailwind-merge resolves conflicting Tailwind classes (`twMerge("p-4 p-8")` → `"p-8"`). Together they prevent broken styles when components accept custom classes.

### 4.4 shadcn/ui Setup

1. Initialize shadcn/ui: `pnpm dlx shadcn@latest init`
2. Install required components:
   ```bash
   pnpm dlx shadcn@latest add button card dialog form input select tabs toast sheet navigation-menu accordion badge separator skeleton alert
   ```
3. Customize component themes to match OCINW design system

### 4.5 Supabase Setup

1. Create Supabase project (free tier)
2. Define database schema:
   ```sql
   -- Volunteer signups
   CREATE TABLE volunteers (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     email TEXT NOT NULL UNIQUE,
     phone TEXT,
     age_range TEXT NOT NULL, -- 'under-13', '13-17', '18-25', '26-40', '41-60', '60+'
     zip_code TEXT NOT NULL,
     interests TEXT[] DEFAULT '{}', -- beach-cleanup, education, monitoring, advocacy, etc.
     availability TEXT[] DEFAULT '{}', -- weekdays, weekends, mornings, afternoons
     parent_guardian_name TEXT, -- Required if under 18
     parent_guardian_email TEXT, -- Required if under 18
     parent_guardian_phone TEXT, -- Required if under 18
     parent_consent_status TEXT DEFAULT 'not_required', -- 'not_required', 'pending', 'confirmed', 'rejected'
     parent_consent_token UUID, -- Unique token for email-based consent verification link
     parent_consent_date TIMESTAMPTZ, -- When parent confirmed or rejected
     parent_consent_ip TEXT, -- IP address at time of consent (COPPA verifiable consent)
     how_heard TEXT,
     message TEXT,
     agreed_to_terms BOOLEAN NOT NULL DEFAULT false,
     deleted_at TIMESTAMPTZ, -- Soft delete for CCPA/COPPA data deletion requests
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   -- WHY consent tracking fields? COPPA requires *verifiable* parental consent —
   -- storing a parent's email alone doesn't prove they actually consented. The token
   -- enables email-based verification, consent_date provides an audit trail, and
   -- consent_ip satisfies FTC guidance on recording consent provenance.

   -- Contact form submissions
   CREATE TABLE contact_submissions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     subject TEXT NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Newsletter subscriptions
   CREATE TABLE newsletter_subscribers (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     email TEXT NOT NULL UNIQUE,
     first_name TEXT,
     language_preference TEXT DEFAULT 'en',
     subscribed_at TIMESTAMPTZ DEFAULT NOW(),
     unsubscribed_at TIMESTAMPTZ,
     deleted_at TIMESTAMPTZ -- Soft delete for CCPA/COPPA data deletion requests
   );

   -- Events (for dynamic event management)
   CREATE TABLE events (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     slug TEXT NOT NULL UNIQUE,
     description TEXT NOT NULL,
     location_name TEXT NOT NULL,
     location_address TEXT,
     latitude DOUBLE PRECISION,
     longitude DOUBLE PRECISION,
     start_date TIMESTAMPTZ NOT NULL,
     end_date TIMESTAMPTZ NOT NULL,
     max_participants INTEGER,
     requires_parent_consent BOOLEAN DEFAULT false,
     image_url TEXT,
     status TEXT DEFAULT 'upcoming', -- upcoming, active, completed, cancelled
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Event registrations
   CREATE TABLE event_registrations (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     event_id UUID REFERENCES events(id) ON DELETE CASCADE,
     volunteer_id UUID REFERENCES volunteers(id), -- NULLABLE: event attendees don't need to be pre-registered volunteers
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT,
     num_participants INTEGER DEFAULT 1,
     status TEXT DEFAULT 'confirmed', -- 'confirmed', 'waitlisted', 'cancelled'
     parent_consent BOOLEAN DEFAULT false,
     waiver_signed BOOLEAN DEFAULT false,
     waiver_signed_at TIMESTAMPTZ,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   -- WHY status field? Event cards display "spots available / almost full / waitlist"
   -- but without a status field there's no way to distinguish confirmed vs waitlisted
   -- registrations, and no way to track cancellations for accurate capacity counts.
   -- WHY waiver fields? Events involve physical activity near water with minors —
   -- liability waivers are required by insurance policies and venue partners.

   -- Donation records
   -- WHY track donations in our own database? Zeffy tracks donations externally, but
   -- OCINW needs its own record for: impact reporting on the website, donor recognition
   -- tiers (Tide Pool, Kelp Forest, etc.), grant applications that require financial
   -- data, and annual tax reporting. Relying solely on Zeffy creates vendor lock-in.
   CREATE TABLE donations (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     donor_name TEXT, -- NULL if anonymous
     donor_email TEXT,
     amount INTEGER NOT NULL, -- Stored in cents to avoid floating-point issues
     currency TEXT DEFAULT 'USD',
     donation_type TEXT NOT NULL DEFAULT 'one-time', -- 'one-time', 'monthly', 'annual'
     zeffy_transaction_id TEXT UNIQUE, -- Links to Zeffy's external record
     is_anonymous BOOLEAN DEFAULT false,
     in_honor_of TEXT, -- "In honor of [name]" dedication
     display_name_publicly BOOLEAN DEFAULT false, -- Opt-in for donor recognition page
     donated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
     deleted_at TIMESTAMPTZ, -- Soft delete for CCPA data deletion requests
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Admin users with role-based access control (RBAC)
   -- WHY not just use Supabase auth.users directly? Without defined roles, every
   -- authenticated user has full access. A content contributor shouldn't be able to
   -- delete volunteer records. RBAC prevents accidental data loss and supports the
   -- principle of least privilege. This also allows non-board-members (e.g., a
   -- volunteer coordinator) to have limited admin access.
   CREATE TABLE admin_users (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
     role TEXT NOT NULL DEFAULT 'viewer', -- 'super_admin', 'content_manager', 'volunteer_manager', 'viewer'
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Audit log for admin actions
   -- WHY audit logging? Nonprofit accountability requires knowing who did what.
   -- Grant funders and auditors expect this. It protects against both errors and
   -- malfeasance, and enables rollback of accidental changes.
   CREATE TABLE audit_log (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     admin_user_id UUID REFERENCES admin_users(id),
     action TEXT NOT NULL, -- 'create', 'update', 'delete', 'export', 'login'
     table_name TEXT NOT NULL,
     record_id UUID,
     old_values JSONB,
     new_values JSONB,
     ip_address TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Row Level Security
   ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
   ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
   ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
   ALTER TABLE events ENABLE ROW LEVEL SECURITY;
   ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
   ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
   ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

   -- Public can insert (signup), only authenticated admins can read
   CREATE POLICY "Anyone can sign up as volunteer"
     ON volunteers FOR INSERT
     TO anon WITH CHECK (true);

   CREATE POLICY "Admins can view volunteers"
     ON volunteers FOR SELECT
     TO authenticated USING (true);

   CREATE POLICY "Anyone can submit contact form"
     ON contact_submissions FOR INSERT
     TO anon WITH CHECK (true);

   CREATE POLICY "Anyone can subscribe to newsletter"
     ON newsletter_subscribers FOR INSERT
     TO anon WITH CHECK (true);

   CREATE POLICY "Anyone can view upcoming events"
     ON events FOR SELECT
     TO anon USING (status = 'upcoming' OR status = 'active');

   CREATE POLICY "Anyone can register for events"
     ON event_registrations FOR INSERT
     TO anon WITH CHECK (true);

   -- RBAC-aware admin policies (check role via admin_users table)
   CREATE POLICY "Admins can view donations"
     ON donations FOR SELECT
     TO authenticated USING (
       EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
     );

   CREATE POLICY "Super admins can manage admin users"
     ON admin_users FOR ALL
     TO authenticated USING (
       EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid() AND role = 'super_admin')
     );

   CREATE POLICY "Admins can view audit log"
     ON audit_log FOR SELECT
     TO authenticated USING (
       EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid())
     );

   -- Only super_admin and volunteer_manager can update/delete volunteer records
   CREATE POLICY "Authorized admins can manage volunteers"
     ON volunteers FOR UPDATE
     TO authenticated USING (
       EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()
               AND role IN ('super_admin', 'volunteer_manager'))
     );

   -- Content managers can manage events
   CREATE POLICY "Authorized admins can manage events"
     ON events FOR ALL
     TO authenticated USING (
       EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid()
               AND role IN ('super_admin', 'content_manager'))
     );
   ```

3. Enable Row Level Security policies
4. Set up Supabase Auth for admin dashboard (email/password for board members)
5. Seed initial super_admin user for the founding board member

### 4.6 CI/CD Pipeline (GitHub Actions)

#### 4.6.1 Continuous Integration (`ci.yml`)
Triggered on every push and pull request:
1. Install dependencies (`pnpm install --frozen-lockfile`)
2. Run linter (`pnpm lint`)
3. Run type check (`pnpm type-check`)
4. Run unit tests (`pnpm test`)
5. Run build (`pnpm build`)
6. Run accessibility tests
7. Run Lighthouse CI (performance, accessibility, SEO scores)

#### 4.6.2 Preview Deployment (`deploy-preview.yml`)
Triggered on pull requests:
1. Deploy to Vercel preview environment
2. Comment PR with preview URL
3. Run E2E tests against preview URL

#### 4.6.3 Production Deployment (`deploy-production.yml`)
Triggered on merge to `main`:
1. Deploy to Vercel production
2. Run smoke tests against production URL
3. Invalidate CDN cache
4. Notify team (optional: Discord/Slack webhook)

### 4.7 Internationalization Foundation (i18n)

- **WHY set up i18n infrastructure now instead of Phase 10?** i18n must be a foundation, not an afterthought. Every component built in Phase 5+ should use translation keys from day one. Retrofitting i18n onto existing components is 3-5x more expensive than building it in from the start — every hardcoded string must be found, extracted to a translation key, and tested in both languages. By configuring next-intl now, all development naturally uses `t('key')` from the beginning.
- **Phase 10 becomes "Translation Content & Compliance"** — focused on actually writing Spanish translations, hiring reviewers, and compliance verification, not on rebuilding the infrastructure.

#### 4.7.1 next-intl Configuration
1. Install `next-intl`
2. Configure middleware for locale detection and URL routing:
   - URL pattern: `/{locale}/...` (e.g., `/en/about`, `/es/acerca`)
   - Default locale: `en` (no prefix for English, prefix for Spanish)
   - Locale detection: browser `Accept-Language` header → cookie → default
3. Create `src/i18n/config.ts` with supported locales and default locale
4. Create `src/i18n/en.json` (English translations — initially just navigation and common labels)
5. Create `src/i18n/es.json` (Spanish translations — can be empty initially, populated in Phase 10)
6. Set up `useTranslations` hook usage pattern for components
7. Configure `next-intl/server` for server components

#### 4.7.2 Translation Key Convention
- Namespace by page/feature: `home.hero.title`, `nav.about`, `volunteer.form.firstName`
- Common keys in `common` namespace: `common.submit`, `common.cancel`, `common.loading`
- Error messages in `errors` namespace: `errors.required`, `errors.invalidEmail`
- All user-visible strings must use translation keys — no hardcoded English in components

---

## PHASE 5 — CORE WEBSITE DEVELOPMENT

> **Note:** All user-visible text in Phase 5+ components must use translation keys via `useTranslations()` (configured in Phase 4.7). Use English values as defaults but always go through the i18n system.

> **Content Dependency:** The homepage (5.2) requires article cards, species spotlights, and event listings. During development, use placeholder content. Initial launch content (Phase 9.4.1) must be drafted in parallel with Phase 5 development so that real content is ready before Phase 12 pre-launch review.

### 5.1 Root Layout & Navigation

#### 5.1.1 Root Layout (`src/app/layout.tsx`)
- HTML lang attribute (dynamic based on locale)
- Meta tags: charset, viewport, theme-color
- Font loading (Google Fonts via `next/font`)
- Global providers: ThemeProvider, I18nProvider, WeatherProvider
- Skip-to-content link (accessibility)
- Header component
- Main content area
- Footer component
- Toast notification container
- Analytics script

#### 5.1.2 Header Component
- OCINW logo (links to homepage)
- Primary navigation links:
  - About (dropdown: Mission, Team)
  - Weather & Tides
  - Learn (dropdown: Articles, Species Guide, Ecosystems, Resources)
  - Conservation (dropdown: Projects, Events, Impact)
  - Volunteer
  - Donate (highlighted CTA button)
- Language toggle (EN/ES)
- Mobile hamburger menu (Sheet/drawer component)
- Sticky header with backdrop blur on scroll

#### 5.1.3 Footer Component
- OCINW logo and tagline
- Quick links (same as header navigation)
- Contact information (email, social media)
- Newsletter signup form (inline)
- Social media icons (Instagram, TikTok, YouTube, Facebook, X/Twitter)
- Legal links: Privacy Policy, Terms of Service
- Copyright notice
- "Founded by Jordyn Rosario" attribution
- 501(c)(3) tax-exempt status notice

#### 5.1.4 Mobile Navigation
- Full-screen slide-in drawer from left
- All navigation items with accordion sub-menus
- Language toggle
- Donate CTA button prominently placed
- Close button and backdrop click to dismiss
- Focus trap for accessibility

### 5.2 Homepage (`src/app/page.tsx`)

#### 5.2.1 Hero Section
- Full-width hero banner with Southern California ocean imagery
- Headline: Dynamic, inspiring (e.g., "Young Guardians of Our Waters")
- Sub-headline: Brief mission description
- Two CTA buttons: "Get Involved" → Volunteer, "Learn More" → About
- Subtle scroll-down indicator animation

#### 5.2.2 Mission Snapshot
- 2-3 sentence mission statement
- Three feature cards with icons:
  - "Protect" — Conservation projects
  - "Educate" — Learning resources
  - "Connect" — Community building
- Each card links to respective section

#### 5.2.3 Live Weather & Tides Preview
- Compact weather widget showing current conditions for nearest location
- Current tide status (rising/falling, next high/low)
- "View Full Weather & Tides" link
- Geolocation prompt or ZIP code input

#### 5.2.4 Featured Content
- Latest 3 articles/blog posts (auto-populated from MDX content)
- Featured species spotlight (rotating)
- Upcoming events (next 2-3 events from database)

#### 5.2.5 Impact Counter
- Animated statistics:
  - Pounds of trash removed
  - Volunteer hours contributed
  - Miles of coastline monitored
  - Youth educated
- Numbers animate on scroll into view

#### 5.2.6 Get Involved CTA Section
- Split layout: Volunteer card + Donate card
- Brief descriptions of each
- Direct action buttons

#### 5.2.7 Partners & Sponsors
- Logo carousel of partner organizations
- "Become a Partner" link

#### 5.2.8 Newsletter Signup
- Email input with "Subscribe" button
- Brief value proposition ("Get monthly updates on conservation efforts")
- Language preference option

#### 5.2.9 Newsletter Delivery System
- **WHY this needs specification:** A newsletter signup form that never sends anything destroys user trust. The system must actually deliver on the promise of "monthly updates."
- **Delivery method:** Resend Broadcast feature (available in free tier for small lists)
  - **WHY Resend and not a dedicated platform like Mailchimp/Buttondown?** Resend is already in the stack for transactional emails (confirmations, consent emails). Using Resend's broadcast feature avoids adding another service, another account, and another set of API keys. For a small subscriber list (<1,000), Resend's free tier (100 emails/day) is sufficient — a 500-subscriber newsletter can be sent in 5 daily batches.
  - **WHY not Mailchimp?** Mailchimp's free tier was discontinued in 2023. Their cheapest plan is $13/month — violates OCINW's $0/month target.
  - **Future scaling:** If the subscriber list exceeds Resend's free tier capacity, migrate to Loops.so (free for <1,000 contacts) or upgrade Resend to the Pro plan ($20/month — justified by then).
- **Cadence:** Monthly newsletter, with occasional special announcements for major events
- **Content template:** Impact update, upcoming events, featured species/article, volunteer spotlight, donation CTA
- **Unsubscribe:** One-click unsubscribe link in every email (CAN-SPAM compliance). Sets `unsubscribed_at` in `newsletter_subscribers` table.

### 5.3 About Pages

#### 5.3.1 About OCINW (`/about`)
- Origin story: Jordyn Rosario's vision and founding story
- Organization history and milestones
- Mission, vision, and values (from Phase 2)
- Photo gallery of team and activities
- "Our Focus Area" map showing LA-to-San Diego region

#### 5.3.2 Team Page (`/about/team`)
- Board of Directors profiles (photo, name, title, brief bio)
- Youth Advisory Council members
- Key volunteers and contributors
- "Join Our Team" CTA

#### 5.3.3 Mission & Values Page (`/about/mission`)
- Detailed mission statement
- Core values with descriptions
- Strategic goals
- Annual report / transparency section

### 5.4 Contact Page (`/contact`)
- Contact form (name, email, subject, message)
- Form validation with Zod
- Server-side submission to Supabase + email notification via Resend
- Organization email address
- Social media links
- FAQ section (accordion)
- Physical mailing address (if applicable)

### 5.5 Legal Pages

#### 5.5.1 Privacy Policy (`/privacy`)
- Data collection practices
- Cookie usage
- Third-party services (Supabase, Zeffy/Stripe, analytics)
- COPPA compliance (collecting data from minors)
- Data retention and deletion policies
- Contact for privacy concerns

#### 5.5.2 Terms of Service (`/terms`)
- Website usage terms
- User-generated content policies
- Donation refund policy
- Liability limitations
- Governing law (California)

### 5.6 Error Pages

#### 5.6.1 404 Not Found (`not-found.tsx`)
- Friendly ocean-themed illustration
- "Looks like this page drifted out to sea"
- Search bar
- Links to popular pages
- "Go Home" button

#### 5.6.2 Error Boundary (`error.tsx`)
- Friendly error message
- "Try Again" button
- Link to homepage
- Error reporting (optional: log to Supabase)

---

## PHASE 6 — LIVE WEATHER & TIDES SYSTEM

- **WHY this feature is central to OCINW's mission:** Weather and tides are the heartbeat of coastal conservation. Volunteers need to know tide levels for safe beach cleanups. Educators planning tide pool visits need low tide times. Families want to know if it's a good beach day. Surfers and marine life watchers need wave and swell data. By providing this data through OCINW's website, you make the site a daily utility — not just an occasional visit. This drives repeat traffic, builds brand recognition, and positions OCINW as the go-to resource for Southern California coastal information. **Practically: a weather/tides feature turns a nonprofit website from a brochure into a tool people use every day.**

### 6.1 Geolocation System

- **WHY geolocation with ZIP code fallback?** The user asked for both. Geolocation (GPS) provides instant, precise location data — a user standing on La Jolla Beach sees La Jolla weather immediately. But many users block location access (privacy concerns), use desktop browsers without GPS, or browse from locations that don't match where they want weather data for (planning a beach trip from home). ZIP code fallback ensures 100% of users can access weather data regardless of device or privacy settings.

#### 6.1.1 Browser Geolocation (`src/lib/api/geolocation.ts`)
- Use `navigator.geolocation.getCurrentPosition()` API
  - **WHY this specific API?** It's the W3C standard built into every modern browser — no external service needed, no API key, no cost. It uses GPS on mobile devices (accurate to ~5 meters) and WiFi/IP triangulation on desktops (accurate to ~100 meters). Both are sufficient for weather data which covers entire cities.
- Request permission from user with clear explanation of why location is needed
  - **WHY explain before asking?** Browsers show a generic "This site wants your location" popup. If users don't understand why, they deny it. A pre-prompt like "We use your location to show weather and tides for your nearest beach" increases permission acceptance rates from ~30% to ~70% based on UX research.
- Handle all states:
  - **Permission granted:** Use coordinates for weather/tide lookup
  - **Permission denied:** Show ZIP code input fallback
  - **Permission not yet asked:** Show prompt with "Use My Location" button
  - **Geolocation unavailable:** Show ZIP code input
  - **Timeout:** Show ZIP code input with message
- Cache last known location in localStorage for return visits

#### 6.1.2 ZIP Code Fallback
- Text input field accepting 5-digit US ZIP codes
- Validate format (regex: `/^\d{5}$/`)
- Convert ZIP code to latitude/longitude coordinates using a lookup table
- Pre-built lookup table of Southern California ZIP codes (90xxx through 92xxx) with their coordinates
- "Popular Locations" quick-select buttons:
  - Santa Monica Beach
  - Venice Beach
  - Manhattan Beach
  - Redondo Beach
  - Long Beach
  - Huntington Beach
  - Newport Beach
  - Laguna Beach
  - Dana Point
  - Oceanside
  - Carlsbad
  - Encinitas
  - Del Mar
  - La Jolla
  - Mission Beach
  - Ocean Beach
  - Coronado
  - Imperial Beach

#### 6.1.3 Location Context Hook (`src/lib/hooks/useGeolocation.ts`)
```typescript
interface LocationState {
  latitude: number | null;
  longitude: number | null;
  locationName: string | null;
  source: 'gps' | 'zip' | 'manual' | null;
  loading: boolean;
  error: string | null;
}
```
- Shared across weather and tide components via React Context
- Persists selected location across page navigations
- Provides `requestLocation()`, `setZipCode()`, `setManualLocation()` methods

### 6.2 Weather API Integration

#### 6.2.1 Open-Meteo API Client (`src/lib/api/weather.ts`)
- **WHY Open-Meteo over other weather APIs?**
  - **Why not OpenWeatherMap?** OpenWeatherMap is the most popular weather API, but its free tier limits to 60 calls/minute and 1,000 calls/day. At scale, each user visiting the weather page is an API call. Open-Meteo has no such limits for non-commercial use — perfect for a nonprofit.
  - **Why not WeatherAPI.com or Tomorrow.io?** Both require API keys, accounts, and have limited free tiers (WeatherAPI: 1M calls/month; Tomorrow.io: 500 calls/day). Open-Meteo requires NO API key, NO account, NO registration.
  - **Why not the National Weather Service API?** The NWS API is free but has poor documentation, inconsistent response formats, frequent downtime, and rate limiting. Open-Meteo aggregates NWS data (and other national weather services) into a clean, reliable, well-documented JSON API.
  - **WHY Open-Meteo specifically?** 100% free for non-commercial use, no API key needed, high-resolution data from multiple national weather services, supports marine weather data (wave height, swell), 7-day forecasts, and has excellent uptime. It also has a dedicated Marine API for ocean conditions.
- **Base URL:** `https://api.open-meteo.com/v1/forecast`
- **No API key required** (completely free, no registration)
- Request parameters:
  ```
  latitude, longitude
  current: temperature_2m, relative_humidity_2m, apparent_temperature,
           precipitation, weather_code, wind_speed_10m, wind_direction_10m,
           wind_gusts_10m, uv_index
  hourly: temperature_2m, precipitation_probability, weather_code,
          wind_speed_10m, wind_direction_10m, uv_index
  daily: temperature_2m_max, temperature_2m_min, sunrise, sunset,
         precipitation_sum, precipitation_probability_max,
         wind_speed_10m_max, uv_index_max
  timezone: America/Los_Angeles
  forecast_days: 7
  ```
- **Marine Weather Extension** (Open-Meteo Marine API):
  ```
  Base URL: https://marine-api.open-meteo.com/v1/marine
  Parameters: wave_height, wave_direction, wave_period,
              wind_wave_height, swell_wave_height,
              swell_wave_direction, swell_wave_period
  ```
- Response parsing and type-safe data mapping
- Error handling with fallback messaging
- Cache responses for 15 minutes (reduce API calls, improve performance)

#### 6.2.2 Weather Data Types (`src/lib/types/weather.ts`)
```typescript
interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  weatherDescription: string;
  weatherIcon: string;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  uvIndex: number;
}

interface MarineConditions {
  waveHeight: number;
  waveDirection: number;
  wavePeriod: number;
  swellHeight: number;
  swellDirection: number;
  swellPeriod: number;
}

interface HourlyForecast {
  time: string;
  temperature: number;
  precipitationProbability: number;
  weatherCode: number;
  windSpeed: number;
  uvIndex: number;
}

interface DailyForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  sunrise: string;
  sunset: string;
  precipitationSum: number;
  precipitationProbability: number;
  windSpeedMax: number;
  uvIndexMax: number;
}
```

#### 6.2.3 Weather Code Mapping
- Map Open-Meteo WMO weather codes to:
  - Human-readable descriptions (English and Spanish)
  - Weather icons (from Lucide or custom SVG set)
  - Background colors/themes for the weather widget
- Codes: 0 (Clear sky) through 99 (Thunderstorm with heavy hail)

### 6.3 Tide API Integration

#### 6.3.1 NOAA CO-OPS API Client (`src/lib/api/tides.ts`)
- **WHY NOAA CO-OPS over other tide data sources?**
  - **Why not WorldTides API?** WorldTides charges credits per request — it's pay-per-use. NOAA is the US government agency that *generates* the tide predictions. WorldTides and similar services are just reselling NOAA data at a markup. Go to the source.
  - **Why not Stormglass or Surfline API?** Both are commercial services with limited free tiers. Surfline's API isn't publicly documented. Stormglass costs $49+/month for production use.
  - **WHY NOAA specifically?** It's the authoritative source — all other tide data in the US originates from NOAA. It's free, requires no API key, has no rate limits for reasonable use, and provides predictions for 10+ years into the future. The data is taxpayer-funded and intended for public use. For a nonprofit, there's no reason to pay for data that's free from the government.
- **Base URL:** `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter`
- **No API key required** (free government service)
- Request parameters:
  ```
  station: {nearest_station_id}
  product: predictions
  datum: MLLW (Mean Lower Low Water)
  time_zone: lst_ldt (Local Standard/Daylight Time)
  units: english
  interval: hilo (high/low only) OR h (hourly)
  format: json
  begin_date: {today}
  end_date: {today + 7 days}
  application: OrcaChildInTheWild
  ```
- **Station Selection:** Map user coordinates to nearest NOAA tide station
- Southern California NOAA Tide Stations (organized north-to-south):
  ```
  9410840 - Santa Monica
  9410660 - Los Angeles (Outer Harbor)
  9410680 - Long Beach (Pier J)
  9410580 - Newport Bay Entrance
  9410230 - La Jolla (Scripps Pier)
  9410170 - San Diego (San Diego Bay)
  9410120 - Imperial Beach (IB Pier)
  ```
- Find nearest station by calculating Haversine distance from user coordinates
- Parse tide prediction response into typed data

#### 6.3.2 Tide Data Types (`src/lib/types/tides.ts`)
```typescript
interface TidePrediction {
  time: string;    // ISO 8601
  height: number;  // feet above MLLW datum
  type: 'H' | 'L'; // High or Low
}

interface TideStation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface TideData {
  station: TideStation;
  predictions: TidePrediction[];
  currentTide: {
    status: 'rising' | 'falling';
    nextHigh: TidePrediction | null;
    nextLow: TidePrediction | null;
    currentEstimatedHeight: number;
  };
}
```

#### 6.3.3 Tide Calculation Utilities
- Interpolate current tide height between known high/low points
- Determine if tide is rising or falling
- Calculate time until next high/low tide
- Format tide heights and times for display

### 6.4 Weather & Tides Dashboard Page (`/weather-tides`)

#### 6.4.1 Page Layout
- Location bar at top (current location display + change location button)
- Current conditions section:
  - Large temperature display with weather icon
  - Feels like, humidity, wind speed/direction, UV index
  - Marine conditions (wave height, swell, period)
- Current tide section:
  - Tide status (rising/falling) with animated indicator
  - Next high/low times and heights
  - Tide chart (24-hour sine-curve visualization using Recharts)
- 7-day forecast section:
  - Daily cards showing high/low temps, precipitation chance, wind
- Hourly breakdown (expandable):
  - 24-hour hourly forecast with temperature and precipitation
- Safety advisory section:
  - UV index warning with sun protection advice
  - Rip current risk (if data available)
  - Marine weather advisories
- "Best Times for Beach Activities" widget:
  - Cross-reference tide, weather, UV, and wind data
  - Recommend optimal times for tide pooling, surfing, beach cleanup, wildlife viewing

#### 6.4.2 Tide Chart Component (`src/components/weather/TideChart.tsx`)
- Interactive line chart using Recharts
- X-axis: Time (24-hour view, scrollable to 7-day)
- Y-axis: Tide height (feet above MLLW)
- Current time marker (vertical line)
- High/low labels on peaks and troughs
- Touch-friendly tooltips on mobile
- Sunrise/sunset overlay bands

#### 6.4.3 Location-Specific Pages (`/weather-tides/[location]`)
- Pre-generated pages for popular Southern California beaches
- SEO-optimized titles (e.g., "La Jolla Beach Weather & Tides - Orca Child in the Wild")
- Location-specific conservation information
- Nearby cleanup events

### 6.5 Weather Data Caching Strategy
- **Client-side:** Cache weather data in React state; refetch on location change or after 15 minutes
- **Server-side (API routes):** Cache NOAA/Open-Meteo responses in Vercel Edge Cache
  - Weather: 15-minute TTL
  - Tides: 6-hour TTL (predictions don't change frequently)
- **Static pages:** Revalidate location-specific pages every hour via ISR

---

## PHASE 7 — DONATION SYSTEM

- **WHY donations need their own phase:** Donations are the financial lifeblood of a nonprofit. Every dollar lost to platform fees is a dollar not spent on conservation. The donation experience must be frictionless (too many clicks = abandoned donations), trustworthy (donors need to feel safe entering payment info), and legally compliant (tax receipts, 501(c)(3) disclosure, PCI compliance).

### 7.1 Donation Platform Selection

#### 7.1.1 Primary Choice: Zeffy
- **WHY Zeffy over all alternatives?**
  - **The math is simple:** On a $100 donation through Stripe, OCINW keeps $97.50 (after 2.2% + $0.30 fee). Through Zeffy, OCINW keeps $100.00. On $10,000 in annual donations, that's $250 saved — enough to fund an entire beach cleanup event.
  - **Why not worry about "optional donor tips to Zeffy"?** Zeffy shows donors an optional tip screen after they donate. Some donors add a tip (usually 15%), some set it to $0. Either way, OCINW receives 100% of the intended donation. Zeffy's business model is funded by these tips, not by charging nonprofits.
  - **Why not PayPal Giving Fund?** PayPal Giving Fund takes 15-45 days to distribute funds (cash flow nightmare for a startup nonprofit) and requires separate enrollment. Zeffy distributes within standard processing times.
  - **Why not GoFundMe Charity?** GoFundMe charges a 2.9% + $0.30 platform fee on charity campaigns despite the branding.
- **Cost:** 100% free — $0 platform fees, $0 transaction fees
- **How it works:** Revenue comes from optional donor tips to Zeffy (not to OCINW)
- **Features:** Donation forms, recurring donations, tax receipts, donor management
- **Integration method:** Embedded iframe or redirect to Zeffy-hosted form
- **Requirements:** Must be a registered nonprofit
- **Website:** https://www.zeffy.com

#### 7.1.2 Backup Alternative: Stripe for Nonprofits
- **WHY keep Stripe as a backup?** If OCINW's donation volume grows significantly, or if the embedded Zeffy form limits design customization, Stripe provides full API control for a custom-built donation flow. Stripe is the gold standard for payment processing and handles all PCI compliance.
- **Cost:** 2.2% + $0.30 per domestic transaction (reduced nonprofit rate)
- **Requires:** 501(c)(3) verification; email nonprofits@stripe.com with documentation
- **Benefits:** Full control over donation experience, custom forms, recurring donations
- **When to switch:** If Zeffy's embedded iframe creates design limitations, if donation volume exceeds Zeffy's capabilities, or if OCINW needs advanced features like campaign-specific donation pages

#### 7.1.3 Backup Alternative: Give Lively
- **WHY consider Give Lively?** It offers text-to-donate (donors text a number to give) and peer-to-peer fundraising (volunteers create personal fundraising pages) — features Zeffy doesn't offer. Consider adding Give Lively for specific campaigns while keeping Zeffy for general donations.
- **Cost:** No platform fees (only standard credit card processing fees ~2.9% + $0.30)
- **Features:** Fundraising pages, text-to-donate, peer-to-peer campaigns, event ticketing

### 7.2 Donation Page (`/donate`)

#### 7.2.1 Page Layout
- Hero section with emotional impact imagery (youth at beach cleanup)
- "Why Donate" section explaining impact of donations
- Impact tiers showing what different amounts fund:
  - **WHY impact tiers?** Research by the Nonprofit Marketing Guide shows donors give 20-30% more when they can see exactly what their money funds. "$25 provides educational materials for a classroom" is vastly more compelling than a blank amount field. This is called "tangible impact framing" and is the single most effective technique for increasing online donation amounts.
  - $10 — Supplies for one volunteer at a beach cleanup
  - $25 — Educational materials for a classroom presentation
  - $50 — Water testing kit for a local waterway
  - $100 — Sponsor a youth conservation workshop
  - $250 — Fund a full beach cleanup event
  - $500 — Support a month of water quality monitoring
  - Custom amount option
  - **WHY these specific amounts?** They follow the "$10 entry / $25-50 sweet spot / $100+ aspirational" ladder that most successful nonprofits use. The lowest tier ($10) is accessible to everyone, including youth donors. The middle tiers ($25-$100) are where most donations land. The higher tiers ($250-$500) attract committed supporters. The custom amount catches outliers.
- Embedded donation form (Zeffy widget or custom Stripe form)
- Donation options:
  - One-time donation
  - Monthly recurring donation
  - Annual recurring donation
- Donor recognition options:
  - "Display my name on our supporters page" checkbox
  - "Make my donation anonymous" checkbox
  - "Dedicate this donation in honor/memory of" option
- Tax deduction information:
  - 501(c)(3) status confirmation
  - EIN number displayed
  - "Your donation is tax-deductible to the extent allowed by law"
- Corporate matching section:
  - "Does your employer match charitable donations?" prompt
  - Link to matching gift databases
- Alternative ways to support:
  - Amazon Smile (if still active)
  - In-kind donations (supplies, equipment)
  - Volunteer time

#### 7.2.2 Donation Thank You Page (`/donate/thank-you`)
- Thank you message with animation
- Receipt/confirmation information
- Social sharing buttons ("I just donated to Orca Child in the Wild!")
- Suggested next actions:
  - Sign up to volunteer
  - Follow on social media
  - Subscribe to newsletter
  - Share with friends

### 7.3 Donation Integration Implementation

#### 7.3.1 Zeffy Integration (Primary)
```typescript
// Embed Zeffy donation form via iframe
// src/components/donate/DonationWidget.tsx
// - Responsive iframe sizing
// - Loading state while iframe loads
// - Post-message communication for form completion
// - Redirect to thank-you page on success
```

#### 7.3.2 Stripe Integration (Alternative/Future)
- If Stripe is chosen:
  - Create Stripe Checkout session via API route
  - Handle webhooks for payment confirmation
  - Generate tax receipts
  - Manage recurring subscriptions
  - PCI compliance handled by Stripe (no card data on OCINW servers)

### 7.4 Donor Recognition
- "Our Supporters" section on website (opt-in only)
- Annual report inclusion
- Social media shoutouts (with permission)
- Tiered recognition levels:
  - Tide Pool ($1-$49)
  - Kelp Forest ($50-$249)
  - Open Ocean ($250-$999)
  - Orca Circle ($1,000+)

---

## PHASE 8 — VOLUNTEER MANAGEMENT SYSTEM

- **WHY build volunteer management into the site rather than using a third-party platform?** OCINW's volunteer pipeline is core to its mission — it's not an afterthought. Embedding volunteer signup directly into the site means: (1) volunteers don't leave the OCINW experience to sign up on a different platform, (2) data flows directly into OCINW's database for tracking and communication, (3) no third-party monthly fees, and (4) the signup experience can be customized exactly for OCINW's needs (especially the parental consent workflow for minors, which most generic platforms handle poorly).
- **WHY not use POINT, VolunteerHub, or SignUpGenius?** These platforms are useful but add monthly costs ($0-50+/month at scale), require volunteers to create accounts on yet another platform, limit customization of the signup form, and fragment data across multiple systems. Building it into the site using Supabase (already set up for free) keeps everything in one place.

### 8.1 Volunteer Signup Page (`/volunteer`)

#### 8.1.1 Page Layout
- Hero section with volunteers-in-action imagery
- "Why Volunteer" section:
  - Impact statistics (hours contributed, trash collected, etc.)
  - Testimonials from current volunteers
  - Skills you'll gain
  - Community you'll join
- Volunteer signup form (detailed below)
- FAQ accordion (common questions about volunteering)

#### 8.1.2 Volunteer Signup Form (`src/components/volunteer/VolunteerForm.tsx`)
Fields:
- **Personal Information:**
  - First Name (required)
  - Last Name (required)
  - Email Address (required, validated)
  - Phone Number (optional)
  - Age Range (required, dropdown: Under 13, 13-17, 18-25, 26-40, 41-60, 60+)
  - ZIP Code (required, validated for SoCal region)
- **Parent/Guardian Information** (conditionally shown if age < 18):
  - Parent/Guardian Full Name (required)
  - Parent/Guardian Email (required)
  - Parent/Guardian Phone (required)
  - Parental consent checkbox (required)
- **Interests** (multi-select checkboxes):
  - Beach & coastal cleanups
  - River & waterway restoration
  - Marine life monitoring
  - Water quality testing
  - Environmental education (teaching/presenting)
  - Event planning & coordination
  - Photography & videography
  - Social media & communications
  - Fundraising & outreach
  - Administrative support
  - Data entry & research
  - Graphic design
  - Web development
- **Availability** (multi-select checkboxes):
  - Weekday mornings
  - Weekday afternoons
  - Weekday evenings
  - Weekend mornings
  - Weekend afternoons
  - Weekend evenings
- **Additional Information:**
  - "How did you hear about us?" (dropdown: Social media, School, Friend/family, Web search, Community event, News article, Other)
  - Special skills or certifications (textarea, optional)
  - Message / anything else we should know (textarea, optional)
- **Agreements:**
  - "I agree to the volunteer code of conduct" (required, link to code of conduct)
  - "I agree to the privacy policy" (required, link to privacy policy)
  - "I would like to receive email updates about volunteer opportunities" (optional)
- **Submit button:** "Sign Up to Volunteer"

#### 8.1.3 Form Validation (Zod Schema)
```typescript
const volunteerFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  ageRange: z.enum(["under-13", "13-17", "18-25", "26-40", "41-60", "60+"]),
  zipCode: z.string().regex(/^\d{5}$/, "Please enter a valid 5-digit ZIP code"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  availability: z.array(z.string()).min(1, "Please select at least one availability"),
  parentGuardianName: z.string().optional(),
  parentGuardianEmail: z.string().email().optional(),
  parentGuardianPhone: z.string().optional(),
  howHeard: z.string().optional(),
  skills: z.string().optional(),
  message: z.string().optional(),
  agreeToCodeOfConduct: z.literal(true, { errorMap: () => ({ message: "You must agree to the code of conduct" }) }),
  agreeToPrivacy: z.literal(true, { errorMap: () => ({ message: "You must agree to the privacy policy" }) }),
  receiveUpdates: z.boolean().optional(),
}).refine((data) => {
  if (data.ageRange === "under-13" || data.ageRange === "13-17") {
    return !!data.parentGuardianName && !!data.parentGuardianEmail && !!data.parentGuardianPhone;
  }
  return true;
}, { message: "Parent/guardian information is required for volunteers under 18" });
```

#### 8.1.4 Form Submission Flow
1. Client-side validation via Zod
2. Submit to API route (`/api/volunteer`)
3. API route:
   - Validate data server-side
   - Insert into Supabase `volunteers` table
   - Send confirmation email to volunteer (via Resend)
   - Send notification email to OCINW admin team
   - If under 18: Trigger parental consent workflow (see 8.1.5)
4. Redirect to thank-you page
5. Error handling: Display inline errors, retry mechanism

#### 8.1.5 Parental Consent Verification Workflow (COPPA Compliance)

- **WHY a full verification workflow?** COPPA requires *verifiable* parental consent — not just collecting a parent's email address. The FTC has ruled that email-plus-confirmation (where a parent must take a positive action to confirm) is an acceptable method for verifiable consent. Simply having a checkbox on the form does NOT satisfy COPPA.

**Full Consent Flow:**
1. Minor submits volunteer signup form → record created with `parent_consent_status = 'pending'`
2. System generates a unique `parent_consent_token` (UUID) stored on the volunteer record
3. Consent email sent to parent/guardian via Resend containing:
   - Who: their child's name and age range
   - What: what OCINW is and what their child signed up for
   - Activities: types of volunteer opportunities
   - Privacy: link to OCINW's privacy policy, what data is collected
   - Action button: "I Approve My Child's Participation" (links to consent landing page with token)
   - Decline link: "I Do Not Approve" (links to decline endpoint)
4. Parent clicks "I Approve" → consent landing page:
   - Displays full details of what they're consenting to
   - Confirms their identity (name, relationship to child)
   - "Confirm Approval" button
   - On confirmation: `parent_consent_status` → 'confirmed', `parent_consent_date` recorded, `parent_consent_ip` recorded
5. If parent clicks "I Do Not Approve":
   - `parent_consent_status` → 'rejected'
   - Record remains in database but volunteer is NOT included in any event invitations or communications
6. If link expires (30 days without action):
   - Record stays as 'pending'
   - Admin dashboard shows pending consents
   - Admin can trigger a reminder email (max 2 reminders)
7. **Without confirmed parental consent, the minor volunteer:**
   - Does NOT appear in volunteer lists for event coordinators
   - Does NOT receive event invitations or newsletters
   - Does NOT count in active volunteer statistics
   - IS visible in admin dashboard under "Pending Consent" filter

### 8.2 Volunteer Opportunities Page (`/volunteer/opportunities`)

#### 8.2.1 Opportunity Listings
- Filter by:
  - Type (cleanup, education, monitoring, advocacy, admin)
  - Location (city or ZIP radius)
  - Date range
  - Time commitment (one-time, weekly, monthly, ongoing)
  - Age group (all ages, teens only, adults only)
- Sort by: Date, proximity, newest
- Card layout showing:
  - Event/opportunity title
  - Date and time
  - Location (with map pin)
  - Description excerpt
  - Number of spots remaining
  - Age requirements
  - "Sign Up" button

#### 8.2.2 Interactive Map
- Leaflet map showing volunteer opportunity locations
- Clustered markers for nearby events
- Click marker to see event details
- Filter map markers by type/date
- User location indicator

### 8.3 Volunteer Thank You Page (`/volunteer/thank-you`)
- Welcome message and next steps
- What to expect (timeline for hearing back)
- Upcoming events they can join immediately
- Social sharing buttons
- "Add upcoming events to calendar" (iCal download)

### 8.4 Admin Volunteer Management
- Protected admin route (`/admin/volunteers`) — requires Supabase Auth
- Volunteer list with search, filter, sort
- Export to CSV
- Email volunteers by interest group
- Track volunteer hours (future feature)
- Event attendance tracking
- Pending parental consents dashboard (list of pending, link to resend consent email)

### 8.5 Volunteer Vetting & Safety

- **WHY background checks?** OCINW organizes outdoor activities near water with minors. Youth-serving organizations have a legal and ethical duty of care. Most insurance policies and partner organizations (state parks, schools, aquariums) require adult volunteers in leadership roles to have passed background checks. Failure to vet volunteers exposes the organization to liability and endangers participants.

#### 8.5.1 When Background Checks Are Required
- All adult volunteers (18+) who will be in direct, unsupervised contact with minors
- All volunteer team leads and event coordinators
- All board members (standard nonprofit governance practice)
- NOT required for: adult volunteers who attend public group events only, youth volunteers

#### 8.5.2 Background Check Provider
- **Provider:** Sterling Volunteers (offers nonprofit rates, ~$25-40/check)
  - **WHY Sterling Volunteers?** They specialize in nonprofit volunteer screening, offer discounted nonprofit rates, and provide a web-based portal. Alternatives include Verified Volunteers and GoodHire — any reputable provider is acceptable, but Sterling is the most widely used among youth-serving nonprofits.
- **Alternative:** Verified Volunteers (similar pricing and features)

#### 8.5.3 Data Handling
- Background check results are NOT stored in the main `volunteers` table (sensitive data separation)
- Store only: check_status ('pending', 'cleared', 'flagged'), check_date, and provider_reference_id
- Full background check reports are retained only by the screening provider
- Access limited to super_admin role only
- Results expire annually — volunteers in ongoing leadership roles must re-check each year

#### 8.5.4 Disqualification Policy
- Any conviction involving violence, sexual offenses, or offenses against minors is an automatic disqualification
- Other results reviewed case-by-case by the board
- All decisions documented in the audit log
- Rejected applicants notified with a general explanation (not specific details of the check results)

### 8.6 Digital Waivers & Liability

- **WHY digital waivers?** Events involve physical activity near water with minors. Liability waivers are required by: (1) OCINW's general liability insurance policy, (2) venue partners (state parks, beaches with permits), and (3) prudent risk management for a youth-serving organization. Digital collection reduces paper handling and provides a timestamped, searchable record.

#### 8.6.1 Waiver Collection Flow
1. Participant registers for an event via the registration form
2. Waiver text displayed inline before the submit button
3. Checkbox: "I have read and agree to the Activity Waiver and Release of Liability"
4. For minors: parent/guardian must check the waiver checkbox (enforced via the parental consent workflow)
5. Timestamp and IP address recorded with the signature
6. Waiver stored in `event_registrations` table (waiver_signed, waiver_signed_at fields)

#### 8.6.2 Waiver Content
- Assumption of risk (outdoor activities, water proximity, wildlife encounters)
- Release of liability (OCINW, its board, volunteers, and partners)
- Medical authorization (permission to seek emergency medical attention if needed)
- Photo/video release (permission to use event photos for OCINW's website and social media)
- Reviewed by legal counsel before deployment

---

## PHASE 9 — ENVIRONMENTAL EDUCATION & CONSERVATION CONTENT

- **WHY content is the most important feature after the technical foundation:** OCINW's website is only as valuable as the information it provides. A beautiful site with no content is an empty shell. Content serves three critical purposes: (1) **SEO** — Google ranks sites based on quality content; articles about "La Jolla tide pools" and "California gray whale migration" will bring organic traffic from people searching for these topics; (2) **Education** — fulfilling OCINW's core mission of environmental education for youth and mixed audiences; (3) **Credibility** — well-researched species profiles and ecosystem guides establish OCINW as a knowledgeable authority, which is essential for grant applications and partner relationships.

### 9.1 Content Architecture

All educational content is authored in MDX (Markdown with React components) and stored in the `src/content/` directory. This approach allows:
- Non-developer team members to write content in Markdown
- Embedding interactive components (maps, quizzes, tide charts) within articles
- Version control via Git
- No external CMS cost

#### 9.1.1 Content Types & Frontmatter

**Articles** (`src/content/articles/`)
```yaml
---
title: "Why Sea Otters Are Keystone Species"
slug: "sea-otters-keystone-species"
author: "Jordyn Rosario"
date: "2026-03-01"
updated: "2026-03-15"
category: "Marine Biology"  # Marine Biology, Conservation, Climate, Pollution, Community
tags: ["sea otters", "kelp forest", "keystone species", "Southern California"]
audience: "all"  # youth, educators, all
readingLevel: "intermediate"  # beginner, intermediate, advanced
readingTime: 8  # minutes
excerpt: "Discover why sea otters play a crucial role in maintaining healthy kelp forest ecosystems along our coast."
featuredImage: "/images/articles/sea-otter-kelp.webp"
featuredImageAlt: "A sea otter floating among kelp fronds in the Pacific Ocean"
language: "en"
translationSlug: "nutrias-marinas-especies-clave"  # Spanish version slug
published: true
---
```

**Species Profiles** (`src/content/species/`)
```yaml
---
title: "California Gray Whale"
slug: "california-gray-whale"
scientificName: "Eschrichtius robustus"
commonNames: ["Gray Whale", "Pacific Gray Whale"]
spanishName: "Ballena Gris"
category: "Marine Mammals"  # Marine Mammals, Fish, Birds, Invertebrates, Plants/Algae, Reptiles
conservationStatus: "Least Concern"  # Least Concern, Near Threatened, Vulnerable, Endangered, Critically Endangered
habitat: ["Open Ocean", "Coastal Waters", "Bays"]
range: "Eastern Pacific Ocean, from Baja California to Arctic"
localRange: "Visible along SoCal coast during migration (December-April)"
funFacts:
  - "Gray whales migrate up to 12,000 miles round trip each year"
  - "They are the only baleen whale that feeds on the ocean floor"
threats: ["Ship strikes", "Entanglement in fishing gear", "Noise pollution", "Climate change"]
howToHelp: ["Report whale sightings", "Support marine protection", "Reduce ocean noise", "Participate in beach cleanups"]
bestViewingLocations: ["Point Loma", "Dana Point", "Palos Verdes"]
bestViewingSeason: "December through April"
featuredImage: "/images/species/gray-whale.webp"
featuredImageAlt: "A California gray whale breaching off the Southern California coast"
language: "en"
published: true
---
```

**Ecosystem Guides** (`src/content/ecosystems/`)
```yaml
---
title: "Kelp Forest Ecosystems"
slug: "kelp-forests"
type: "Marine"  # Marine, Freshwater, Coastal, Estuarine, Riparian
location: "Along the Southern California coastline"
localExamples: ["La Jolla Cove", "Point Loma", "Catalina Island"]
keySpecies: ["Giant Kelp", "Garibaldi", "Sea Urchin", "Sea Otter", "Leopard Shark"]
threats: ["Warming waters", "Purple urchin overpopulation", "Pollution", "Sedimentation"]
conservationEfforts: ["Urchin removal programs", "Kelp restoration", "Marine protected areas"]
relatedArticles: ["sea-otters-keystone-species", "purple-urchin-crisis"]
featuredImage: "/images/ecosystems/kelp-forest.webp"
featuredImageAlt: "Sunlight streaming through a giant kelp forest canopy underwater"
language: "en"
published: true
---
```

**Conservation Projects** (`src/content/projects/`)
```yaml
---
title: "Mission Bay Monthly Cleanup"
slug: "mission-bay-cleanup"
status: "active"  # planned, active, completed
type: "Beach Cleanup"  # Beach Cleanup, Water Monitoring, Habitat Restoration, Education Program, Advocacy
location: "Mission Bay, San Diego"
latitude: 32.7749
longitude: -117.2353
startDate: "2026-04-01"
frequency: "Monthly (first Saturday)"
partners: ["San Diego Coastkeeper", "I Love A Clean San Diego"]
impactMetrics:
  trashCollected: 2500  # pounds
  volunteerHours: 450
  milesCleared: 12
  volunteersEngaged: 180
featuredImage: "/images/projects/mission-bay-cleanup.webp"
language: "en"
published: true
---
```

### 9.2 Education Hub (`/learn`)

#### 9.2.1 Landing Page
- Hero: "Explore, Learn, Protect"
- Content category cards:
  - Articles & Blog → `/learn/articles`
  - Species Guide → `/learn/species`
  - Ecosystem Explorer → `/learn/ecosystems`
  - External Resources → `/learn/resources`
- Featured content carousel
- Search bar (searches across all content types)
- Reading level filter (beginner, intermediate, advanced)
- Audience filter (youth, educators, general)

#### 9.2.2 Articles Listing (`/learn/articles`)
- Filterable grid of article cards
- Filters: Category, audience, reading level, tags
- Sort: Newest, most popular, reading time
- Search within articles
- Pagination (12 per page)

#### 9.2.3 Article Page (`/learn/articles/[slug]`)
- Full article content rendered from MDX
- Table of contents (auto-generated from headings)
- Reading time estimate
- Author info and date
- Related articles sidebar
- Social sharing buttons
- "Was this helpful?" feedback
- Language switcher to Spanish version (if available)
- Interactive components embedded in MDX:
  - Maps showing discussed locations
  - Species cards for mentioned species
  - Quizzes for learning reinforcement
  - Photo galleries

#### 9.2.4 Species Guide (`/learn/species`)
- Grid of species cards with photos
- Filter by category (mammals, fish, birds, invertebrates, plants, reptiles)
- Filter by conservation status
- Filter by habitat
- Search by common or scientific name
- Alphabet index for browsing

#### 9.2.5 Species Profile Page (`/learn/species/[slug]`)
- Hero image of species
- Quick facts sidebar (scientific name, status, habitat, range)
- Conservation status badge with IUCN color coding
- Detailed description (from MDX content)
- "Where to See Them" map (Leaflet map with local viewing locations)
- "How You Can Help" action items
- Fun facts section
- Related species
- Photo gallery

#### 9.2.6 Ecosystem Explorer (`/learn/ecosystems`)
- Visual grid of ecosystem types
- Interactive map showing ecosystem locations along SoCal coast
- Filter by type (marine, freshwater, coastal, estuarine, riparian)

#### 9.2.7 Ecosystem Profile (`/learn/ecosystems/[slug]`)
- Hero image
- Overview and description
- Key species grid (linked to species profiles)
- Threats and challenges
- Conservation efforts
- "Visit These Locations" map
- Related articles and projects

#### 9.2.8 External Resources (`/learn/resources`)
- Curated list of external educational resources organized by category:
  - **NOAA Resources:**
    - NOAA Education Portal
    - NEMO Curriculum (23 lessons in marine science)
    - National Marine Sanctuaries education materials
    - Channel Islands NMS educational resources (California-aligned)
  - **California Coastal Commission:**
    - Resources for Educators
    - At-Home Learning Resources
    - Coastal Art & Poetry Contest (K-12)
    - Climate Change Challenge (middle/high school)
    - WHALE TAIL Grants Program (up to $50,000 for schools)
    - California Coastal Voices (free project-based learning guide)
    - California King Tides Project
  - **Academic Resources:**
    - UC San Diego Center for Marine Biodiversity and Conservation
    - California Sea Grant
    - Schmidt Ocean Institute educational resources
  - **Youth Programs:**
    - Ecology Center Youth Environmental Academy (paid internships)
    - California Youth Climate Policy Leadership Program
    - Silicon Valley Youth Climate Action
  - **Local Partners:**
    - Cabrillo Marine Aquarium (San Pedro)
    - Birch Aquarium at Scripps (La Jolla)
    - Aquarium of the Pacific (Long Beach)
- Each resource includes: Title, description, link, age range, type, cost (free/paid)

### 9.3 Conservation Hub (`/conservation`)

#### 9.3.1 Landing Page
- "Our Conservation Work" hero
- Active projects grid
- Upcoming events list
- Impact metrics dashboard
- "How to Get Involved" CTA

#### 9.3.2 Projects Listing (`/conservation/projects`)
- Active, planned, and completed projects
- Filter by type, location, status
- Map view showing all project locations
- Sort by date, location, type

#### 9.3.3 Project Detail Page (`/conservation/projects/[slug]`)
- Project description and goals
- Location map
- Impact metrics (trash collected, volunteer hours, etc.)
- Photo gallery of events
- Partner organizations
- "Join This Project" volunteer signup
- Progress updates / blog posts

#### 9.3.4 Events Listing (`/conservation/events`)
- Upcoming events calendar/list view
- Filter by type, location, date range, age group
- Map view of event locations
- "Add to Calendar" (iCal) button on each event
- Event status indicators (spots available, almost full, waitlist)

#### 9.3.5 Event Detail Page (`/conservation/events/[slug]`)
- Event description and schedule
- Location map with directions
- What to bring / what to expect
- Age requirements and parental consent info
- Registration form (inline or linked) — includes liability waiver checkbox (see 8.6)
- Number of spots remaining
- Weather forecast for event date (linked to weather system)
- Photo gallery (post-event)
- Impact report (post-event)

#### 9.3.6 Event Cancellation & Notification Workflow
- **WHY specify this?** Outdoor conservation events are weather-dependent. A beach cleanup during a storm is dangerous. Without a defined cancellation protocol, coordinators may cancel informally (social media post, word of mouth), leaving registered participants uninformed.
1. Admin marks event as 'cancelled' with reason (weather, low registration, venue issue)
2. Event `status` field updated to 'cancelled' in database
3. Email sent to all registered participants via Resend, containing:
   - Event name, original date, and reason for cancellation
   - Reschedule information (if applicable)
   - Link to other upcoming events
4. Event page shows cancelled status banner with reschedule info
5. Cancelled events remain visible in the events listing (not deleted) for record-keeping
6. Registration form disabled for cancelled events
7. If weather-related: automated weather alert check 24 hours before event (advisory based on Open-Meteo forecast)

#### 9.3.7 Impact Page (`/conservation/impact`)
- Annual and cumulative impact statistics:
  - Total volunteer hours
  - Pounds of trash removed
  - Miles of coastline/waterways monitored
  - Number of events held
  - Number of volunteers engaged
  - Number of youth educated
  - Species observed and reported
  - Water quality measurements taken
- Data visualizations (charts via Recharts):
  - Monthly volunteer engagement trend
  - Trash collection by type (pie chart)
  - Geographic distribution of activities (map)
  - Year-over-year growth
- Downloadable annual report (PDF)
- Partner and funder acknowledgments

### 9.4 Initial Content Plan

> **IMPORTANT: Timing.** This content must be drafted in parallel with Phase 5 website development, not after it. Use placeholder content during Phase 5 development, but all launch content listed below must be finalized before Phase 12 (Pre-Launch). Content writing can begin as soon as the MDX frontmatter schema (9.1.1) is defined — it does not depend on the website being built.

#### 9.4.1 Launch Content (Minimum Viable Content)
Articles (at least 6):
1. "Welcome to Orca Child in the Wild" — Founding story, mission
2. "Why Southern California's Ocean Needs You" — Regional overview
3. "What Happens at a Beach Cleanup" — Event explainer for newcomers
4. "5 Simple Things You Can Do to Help Our Oceans" — Youth-accessible action items
5. "Understanding Tides: A Beginner's Guide" — Ties into weather/tides feature
6. "Meet the Marine Protected Areas Between LA and San Diego" — Local focus

Species Profiles (at least 10):
- **WHY these 10 species?** Each was selected for a specific reason: (1) Orca is the namesake species and a charismatic megafauna that draws attention; (2) Gray Whale is the most visible SoCal marine mammal, with migrations observable from shore; (3) Sea Lion is the most commonly encountered marine mammal on SoCal beaches; (4) Garibaldi is the California state marine fish and legally protected; (5) Giant Kelp is the foundation species for SoCal's most important marine ecosystem; (6) Purple Sea Urchin is devastating kelp forests (conservation urgency); (7) Brown Pelican is an endangered species success story (inspiration); (8) Green Sea Turtle is federally threatened and seen in San Diego Bay; (9) Leopard Shark is encountered by swimmers in La Jolla (public interest); (10) Grunion has a unique spawning behavior tied to tides (ties into the tides feature).

1. Orca (Killer Whale) — namesake species, charismatic megafauna
2. California Gray Whale — most visible SoCal marine mammal, shore-observable migration
3. California Sea Lion — most commonly encountered marine mammal
4. Garibaldi (California state marine fish) — legally protected, endemic to SoCal
5. Giant Kelp — foundation species for SoCal's primary marine ecosystem
6. Purple Sea Urchin — conservation urgency, kelp forest devastation
7. California Brown Pelican — endangered species recovery success story
8. Green Sea Turtle — federally threatened, San Diego Bay population
9. Leopard Shark — public interest, La Jolla swimmer encounters
10. California Grunion — unique tide-linked spawning behavior

Ecosystem Guides (at least 4):
- **WHY these 4 ecosystems?** They represent the 4 primary habitat types that visitors encounter between LA and San Diego: (1) Kelp Forests are SoCal's signature underwater ecosystem and the most biodiverse; (2) Tide Pools are the most accessible marine habitat for families and youth (touchable, visible); (3) Coastal Wetlands & Estuaries are critically endangered (90%+ loss in SoCal) and essential for water quality; (4) Sandy Beaches are where most visitors first interact with the ocean and where cleanups take place.

1. Kelp Forests — SoCal's signature underwater ecosystem, highest biodiversity
2. Tide Pools — most accessible marine habitat for families and youth
3. Coastal Wetlands & Estuaries — critically endangered (90%+ loss), water quality essential
4. Sandy Beach Ecosystems — primary public interface with the ocean, cleanup sites

Conservation Projects (at least 2):
1. Beach cleanup program (recurring)
2. Water quality monitoring program

---

## PHASE 10 — ACCESSIBILITY, INTERNATIONALIZATION & COMPLIANCE

- **WHY this entire phase exists:**
  - **Accessibility is a legal requirement.** As of April 2026, ADA Title II requires WCAG 2.1 Level AA compliance for public-facing websites. Nonprofits that accept federal/state grants or partner with government agencies must comply. Beyond legality, it's the right thing to do — environmental education should be accessible to everyone, including the 26% of Americans with disabilities.
  - **Spanish language support is not optional in Southern California.** 39% of LA County and 34% of San Diego County residents speak Spanish at home. An English-only website excludes a third of the community OCINW serves. Bilingual support isn't a "nice to have" — it's essential for reaching the full audience.
  - **COPPA compliance is legally required** when collecting data from children under 13. Since OCINW targets youth audiences and accepts volunteer signups from minors, COPPA applies. Violations carry fines of up to $50,120 per incident.

### 10.1 Accessibility (WCAG 2.1 Level AA)

- **WHY Level AA and not Level A or AAA?** Level A is the bare minimum (doesn't even require color contrast). Level AAA is aspirational (requires 7:1 contrast ratios and other extreme measures that can conflict with design goals). Level AA is the legal standard, the industry standard, and what grant funders expect. It's the sweet spot between accessibility and practicality.

#### 10.1.1 Semantic HTML
- Proper use of landmark elements: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`
- Heading hierarchy (h1 → h6) maintained on every page
- Lists (`<ul>`, `<ol>`) for list content
- `<button>` for interactive elements, `<a>` for navigation
- `<table>` with proper `<thead>`, `<tbody>`, `<th scope>` for data tables
- ARIA attributes only where HTML semantics are insufficient

#### 10.1.2 Keyboard Navigation
- All interactive elements reachable via Tab key
- Visible focus indicators (custom focus ring matching brand colors)
- Skip-to-content link as first focusable element
- Modal/dialog focus trapping (handled by Radix UI primitives)
- Escape key closes modals, menus, and drawers
- Arrow keys for menu navigation
- Enter/Space for button activation

#### 10.1.3 Color and Contrast
- All text meets 4.5:1 contrast ratio (AA standard)
- Large text (18px+ bold or 24px+ regular) meets 3:1 ratio
- Non-text interactive elements meet 3:1 contrast ratio
- Information never conveyed by color alone (use icons, patterns, text labels)
- All color combinations tested with color blindness simulators

#### 10.1.4 Images and Media
- All informational images have descriptive `alt` text
- Decorative images use `alt=""` (empty alt)
- Complex images (charts, maps) have extended descriptions
- Videos include closed captions
- Audio content has transcripts
- Animations respect `prefers-reduced-motion` media query

#### 10.1.5 Forms
- All inputs have associated `<label>` elements
- Error messages linked to inputs via `aria-describedby`
- Required fields marked with both visual indicator and `aria-required`
- Error summaries presented on form submission
- Inline validation feedback is announced to screen readers

#### 10.1.6 Responsive and Zoom
- Content readable at 200% zoom without horizontal scrolling
- Touch targets minimum 44x44px
- No fixed-width layouts that break on small screens
- Text resizable without assistive technology

### 10.2 Internationalization — Translation Content & Compliance

> **Note:** The i18n technical infrastructure (next-intl, locale routing, translation key convention) was set up in Phase 4.7. This section covers the actual translation work and compliance verification.

#### 10.2.1 Language Support
- **Phase 1 (Launch):** English (primary), Spanish
- **Future:** Additional languages based on community need
- Implementation via `next-intl` library (configured in Phase 4.7)

#### 10.2.2 Translation Architecture
- UI strings stored in JSON translation files (`src/i18n/en.json`, `src/i18n/es.json`)
- Content (articles, species profiles, etc.) has separate MDX files per language
- URL structure: `/en/learn/articles/...` and `/es/aprender/articulos/...` (or language prefix approach)
- Language preference persisted in cookie/localStorage
- Default language detected from browser settings

#### 10.2.3 Translation Scope
All translatable elements:
- Navigation labels
- Button text
- Form labels and error messages
- Footer content
- Static page content (About, Privacy, Terms)
- Weather descriptions and UI labels
- Tide status descriptions
- Donation page content
- Volunteer form labels
- Error messages (404, error boundary)
- Meta tags (title, description) for SEO in each language
- Accessibility labels (aria-labels, screen reader text)

#### 10.2.4 Content Translation Workflow
- English content authored first (primary language)
- Spanish translation of content prioritized by:
  1. Core pages (Home, About, Donate, Volunteer)
  2. Navigation and UI elements
  3. Key educational articles
  4. Species profiles
  5. All remaining content
- Translation review by native Spanish speakers
- Content parity tracking (which content needs Spanish translation)

### 10.3 COPPA Compliance (Children's Online Privacy Protection Act)

Since the audience includes children under 13:
- Obtain verifiable parental consent before collecting personal information from children under 13
- Clearly disclose data collection practices in Privacy Policy
- Allow parents to review, delete, or refuse further collection of their child's data
- Volunteer signup for under-13 requires parent/guardian information and consent
- Limit data collection from minors to what is strictly necessary
- Do not share children's personal information with third parties
- Implement age-gating on volunteer forms (display parental consent fields when under-13 is selected)

### 10.4 SEO (Search Engine Optimization)

#### 10.4.1 Technical SEO
- Dynamic sitemap generation (`sitemap.xml`) via Next.js
- `robots.txt` allowing search engine crawling
- Canonical URLs on all pages
- Structured data (JSON-LD) for:
  - Organization schema
  - Article schema
  - Event schema
  - Nonprofit schema
  - BreadcrumbList schema
- Open Graph meta tags for social sharing
- Twitter Card meta tags
- Fast load times (Core Web Vitals optimization)

#### 10.4.2 Content SEO
- Unique, descriptive `<title>` tags on every page (under 60 characters)
- Meta descriptions on every page (under 160 characters)
- H1 tags unique per page
- Internal linking between related content
- Descriptive, keyword-rich URLs (slugs)
- Image optimization (WebP, responsive sizes, descriptive filenames)
- Alt text for all images (also for accessibility)

### 10.5 Performance Optimization

- **Images:** Next.js `<Image>` component with automatic WebP conversion, responsive sizes, lazy loading
- **Fonts:** `next/font` for zero-layout-shift font loading
- **Code splitting:** Automatic via Next.js App Router
- **Bundle size:** Analyze and minimize with `@next/bundle-analyzer`
- **Caching:** Aggressive caching headers for static assets
- **Prefetching:** Next.js `<Link>` automatic route prefetching
- **Core Web Vitals targets:**
  - Largest Contentful Paint (LCP): < 2.5s
  - First Input Delay (FID): < 100ms
  - Cumulative Layout Shift (CLS): < 0.1
  - Interaction to Next Paint (INP): < 200ms

---

## PHASE 11 — TESTING & QUALITY ASSURANCE

- **WHY testing is non-negotiable for a nonprofit:**
  - A broken donation form means lost revenue. A broken volunteer signup means lost volunteers. A broken weather widget undermines credibility. Testing catches these problems before users see them.
  - **WHY automated testing specifically?** Manual testing (clicking through the site) is unreliable — humans miss things, especially after making changes. Automated tests run in seconds and catch regressions (things that used to work but broke after a code change) instantly. They're especially important when multiple youth developers contribute code.
  - **WHY Vitest and not Jest?** Vitest is built for modern JavaScript (ESM modules, TypeScript). Jest was created by Facebook in 2014 and requires complex configuration for modern projects. Vitest uses the same configuration as Vite (which Next.js supports), runs 2-5x faster than Jest, and has a nearly identical API (easy to learn if you know Jest). It's the current community standard for new React projects.
  - **WHY Playwright for E2E and not Cypress?** Playwright (by Microsoft) supports all browsers natively (Chromium, Firefox, WebKit/Safari). Cypress only supports Chromium-based browsers reliably. Playwright runs tests in parallel (faster) and handles modern web patterns (like iframes for Zeffy donation embeds) better. It's also free and open-source.

### 11.1 Unit Testing (Vitest)

#### 11.1.1 Scope
- Utility functions (formatting, validation, calculations)
- API client functions (weather, tides, geolocation)
- React hooks (useWeather, useTides, useGeolocation)
- Zod validation schemas
- Data transformation functions

#### 11.1.2 Coverage Targets
- Utility functions: 90%+ coverage
- API clients: 80%+ coverage
- Hooks: 80%+ coverage
- Overall: 70%+ minimum

#### 11.1.3 Example Test Cases
```
✓ weather.ts: parses Open-Meteo response correctly
✓ weather.ts: handles API error gracefully
✓ weather.ts: maps WMO weather codes to descriptions
✓ tides.ts: parses NOAA tide predictions correctly
✓ tides.ts: calculates current tide status (rising/falling)
✓ tides.ts: finds nearest NOAA station from coordinates
✓ geolocation.ts: converts ZIP code to coordinates
✓ geolocation.ts: validates ZIP code format
✓ validation.ts: validates volunteer form data
✓ validation.ts: requires parent info for minors
✓ format.ts: formats tide heights correctly
✓ format.ts: formats dates in locale-appropriate format
```

### 11.2 Component Testing (Vitest + Testing Library)

#### 11.2.1 Scope
- Component rendering and snapshots
- User interaction (clicks, form input, selection)
- Conditional rendering (age-based parent fields, location states)
- Loading and error states
- Responsive behavior

#### 11.2.2 Example Test Cases
```
✓ WeatherCard: renders current temperature and conditions
✓ WeatherCard: shows loading skeleton while fetching
✓ WeatherCard: displays error message on API failure
✓ TideChart: renders tide prediction curve
✓ TideChart: marks current time on chart
✓ LocationSearch: accepts valid ZIP codes
✓ LocationSearch: rejects invalid ZIP codes
✓ LocationSearch: triggers geolocation on button click
✓ VolunteerForm: validates required fields
✓ VolunteerForm: shows parent fields when under-18 selected
✓ VolunteerForm: submits data to API route
✓ DonationWidget: renders Zeffy embed
✓ LanguageToggle: switches between EN and ES
✓ Header: opens mobile navigation on hamburger click
✓ Header: highlights active navigation item
```

### 11.3 Integration Testing

#### 11.3.1 Scope
- API route handlers (contact, volunteer, newsletter)
- Supabase database operations (insert, query)
- Email sending via Resend
- Form submission end-to-end flows

#### 11.3.2 Example Test Cases
```
✓ POST /api/volunteer: creates volunteer record in Supabase
✓ POST /api/volunteer: sends confirmation email
✓ POST /api/volunteer: returns 400 for invalid data
✓ POST /api/contact: creates contact submission in Supabase
✓ POST /api/contact: sends notification email to admin
✓ POST /api/newsletter: subscribes email to newsletter list
✓ POST /api/newsletter: prevents duplicate subscriptions
✓ GET /api/weather: returns cached weather data
✓ GET /api/tides: returns tide predictions for given station
```

### 11.4 End-to-End Testing (Playwright)

#### 11.4.1 Scope
- Full user journeys across multiple pages
- Cross-browser testing (Chromium, Firefox, WebKit)
- Mobile viewport testing
- Form submission workflows

#### 11.4.2 Test Scenarios
```
✓ Homepage: loads and displays all sections
✓ Homepage: navigates to each main section
✓ Weather: displays weather data for default location
✓ Weather: allows ZIP code entry and updates data
✓ Weather: shows tide chart with correct data
✓ Donate: displays donation form
✓ Donate: completes donation flow (mock)
✓ Donate: navigates to thank-you page
✓ Volunteer: fills and submits volunteer form
✓ Volunteer: shows parent fields for minor
✓ Volunteer: navigates to thank-you page
✓ Learn: lists articles with filters
✓ Learn: navigates to individual article
✓ Learn: searches across content types
✓ Species: displays species guide with filters
✓ Species: navigates to individual species profile
✓ Conservation: lists projects and events
✓ Conservation: shows event details
✓ Contact: fills and submits contact form
✓ Navigation: mobile menu opens and navigates
✓ i18n: switches to Spanish and displays translated content
✓ 404: displays custom not found page
✓ Error: displays custom error page
```

### 11.5 Accessibility Testing

#### 11.5.1 Automated Testing (axe-core + Playwright)
- Run axe-core accessibility audit on every page
- Test in Playwright E2E suite
- Fail CI pipeline on any Level A or AA violation
- Generate accessibility report per page

#### 11.5.2 Manual Testing Checklist
- [ ] Screen reader testing (NVDA on Windows, VoiceOver on Mac/iOS, TalkBack on Android)
- [ ] Keyboard-only navigation through all pages
- [ ] High contrast mode testing
- [ ] 200% zoom testing on all pages
- [ ] Color blindness simulation testing
- [ ] Focus order verification
- [ ] Form error announcement verification
- [ ] Skip link functionality
- [ ] Media caption/transcript verification

### 11.6 Performance Testing

- **Lighthouse CI:** Run on every deployment; fail below thresholds:
  - Performance: 90+
  - Accessibility: 100
  - Best Practices: 90+
  - SEO: 90+
- **Core Web Vitals monitoring:** Vercel Analytics (free tier)
- **Bundle size monitoring:** Track and alert on bundle size increases

---

## PHASE 12 — PRE-LAUNCH PREPARATION

- **WHY a dedicated pre-launch phase?** Launching without preparation is how nonprofits end up with broken donation forms on their first big press mention, missing SSL certificates that scare away donors, or privacy policies that violate COPPA. This phase is the "measure twice, cut once" step. Every checklist item below exists because real nonprofits have been burned by skipping it.

### 12.1 Domain & DNS

1. Register domain: **orcachildinthewild.org** (and variants)
   - Also secure: .com, .net if available
   - **WHY .org?** The .org domain is universally recognized as the standard for nonprofits and non-commercial organizations. Donors and partners expect nonprofits to use .org. It signals legitimacy.
   - Recommend Cloudflare Registrar (at-cost pricing, ~$10/year for .org)
   - **WHY Cloudflare?** Cloudflare sells domains at wholesale cost (no markup). GoDaddy charges $20-40/year for the same domain. Over 10 years, Cloudflare saves $100-300. Cloudflare also includes free DNS management, DDoS protection, and CDN — all of which other registrars charge extra for.
2. Configure DNS to point to Vercel
3. SSL/TLS certificate (automatic with Vercel)
4. Set up email forwarding or Google Workspace:
   - info@orcachildinthewild.org
   - volunteer@orcachildinthewild.org
   - donate@orcachildinthewild.org
   - jordyn@orcachildinthewild.org (founder)

### 12.2 Social Media Accounts

Secure handles across all major platforms (consistent handle: `@OrcaChildWild` or `@OrcaChildInTheWild`):
1. **Instagram** — Primary platform for youth audience; visual storytelling
2. **TikTok** — Short-form video content; highest youth engagement
3. **YouTube** — Long-form educational videos; event recaps; documentaries
4. **Facebook** — Community/family engagement; event promotion
5. **X (Twitter)** — News, advocacy, partner engagement
6. **LinkedIn** — Professional networking, corporate partnerships, grants
7. **Threads** — Emerging platform; text-based community updates

### 12.3 Content Readiness Checklist

- [ ] All launch content authored (Phase 9.4.1)
- [ ] All content reviewed for accuracy
- [ ] All content translated to Spanish (priority pages at minimum)
- [ ] All images optimized (WebP, responsive sizes)
- [ ] All alt text written for images
- [ ] Privacy Policy finalized and reviewed by legal counsel
- [ ] Terms of Service finalized and reviewed
- [ ] Volunteer Code of Conduct drafted
- [ ] FAQs compiled and answered
- [ ] 501(c)(3) information displayed correctly

### 12.4 Third-Party Integrations Verification

- [ ] Zeffy/Stripe donation form configured and tested
- [ ] Supabase database schema deployed and tested
- [ ] Supabase Row Level Security policies active
- [ ] Resend email templates configured (confirmation, notification)
- [ ] NOAA Tides API tested for all SoCal stations
- [ ] Open-Meteo API tested for SoCal coordinates
- [ ] Marine weather API tested
- [ ] Geolocation working (HTTPS required)
- [ ] ZIP code lookup table complete and tested
- [ ] Vercel deployment configured
- [ ] Custom domain connected and SSL active
- [ ] Analytics tracking verified

### 12.5 Security Checklist

- [ ] All environment variables secured (not committed to Git)
- [ ] `.env.local` in `.gitignore`
- [ ] Supabase RLS policies prevent unauthorized data access
- [ ] API routes validate and sanitize all input (Zod)
- [ ] CORS headers configured correctly
- [ ] Rate limiting on API routes (Vercel/middleware)
- [ ] No exposed secrets in client-side code
- [ ] Content Security Policy (CSP) headers configured
- [ ] XSS prevention (React's built-in escaping + CSP)
- [ ] CSRF protection on form submissions
- [ ] COPPA compliance verified (parental consent flow)
- [ ] PCI compliance verified (donation processing via Zeffy/Stripe — they handle PCI)
- [ ] Dependency vulnerability scan (`pnpm audit`)

### 12.6 Legal Checklist

- [ ] 501(c)(3) application filed (or approved)
- [ ] California nonprofit registration complete
- [ ] Attorney General Registry of Charitable Trusts registered
- [ ] Charitable solicitation registration filed
- [ ] General liability insurance obtained
- [ ] D&O insurance obtained
- [ ] Privacy Policy reviewed by legal counsel
- [ ] Terms of Service reviewed by legal counsel
- [ ] COPPA compliance reviewed
- [ ] Photo/media release forms created (for volunteer/event photos)
- [ ] Volunteer liability waiver created
- [ ] Parental consent form for minors created

### 12.7 Pre-Launch QA Sprint

Conduct a full quality assurance sprint (1-2 weeks):
1. **Cross-browser testing:** Chrome, Firefox, Safari, Edge (desktop and mobile)
2. **Cross-device testing:** iOS Safari, Android Chrome, tablets
3. **Accessibility audit:** Automated (axe-core) + manual testing
4. **Content proofreading:** All pages reviewed for typos, broken links, accuracy
5. **Form testing:** Submit all forms; verify database entries and email notifications
6. **Weather/Tides testing:** Verify data accuracy against NOAA website
7. **Performance testing:** Lighthouse scores meet targets
8. **SEO audit:** All meta tags, structured data, sitemap verified
9. **Security audit:** Penetration testing on forms and API routes
10. **Load testing:** Simulate concurrent users on donation and signup pages
11. **404/Error testing:** Verify all error pages display correctly
12. **Redirect testing:** Verify old/broken URLs are handled

---

## PHASE 13 — LAUNCH

- **WHY a phased launch (soft → public)?** A "big bang" launch with full promotion on day one is risky. If the donation form breaks under load, or the weather API has an error you didn't catch, the first impression with partners and donors is ruined. A soft launch gives 7 days to catch and fix issues with a small, forgiving audience (board members and close supporters) before promoting to the general public. Every major tech company and successful nonprofit launches this way.

### 13.1 Launch Sequence

#### Day -7: Soft Launch
- **WHY 7 days before public launch?** This gives enough time to find bugs, fix them, and re-test — without rushing. Less than 3 days is too short (some bugs only appear after repeated use). More than 14 days loses momentum.
- Deploy to production with limited promotion
- Share with board members, close supporters, and partner organizations
- Collect feedback and fix critical issues
- Monitor error logs, performance metrics, and analytics

#### Day -3: Final Fixes
- Address all feedback from soft launch
- Final content review and corrections
- Verify all third-party integrations working in production
- Confirm email deliverability (donation receipts, volunteer confirmations)

#### Day -1: Launch Preparation
- Draft launch announcements for all social media platforms
- Prepare email announcement for existing contacts
- Brief board members and youth advisory council on launch messaging
- Test all donation and volunteer signup flows one final time
- Verify Google Search Console indexing

#### Day 0: Public Launch
- Publish social media announcements (coordinated posting schedule)
- Send email announcement to all contacts
- Submit to Google Search Console for indexing
- Submit sitemap to Bing Webmaster Tools
- Monitor:
  - Website uptime
  - Error rates
  - API response times
  - Donation processing
  - Volunteer signup flow
  - Server resource usage
  - Analytics (traffic, bounce rate, user flow)

#### Day +1 through Day +7: Post-Launch Monitoring
- Monitor all metrics daily
- Respond to bug reports within 24 hours
- Engage with social media responses
- Track donation and volunteer signup numbers
- Publish first "Week 1" social media update

### 13.2 Launch Promotion Strategy

- **Social Media Blitz:** Coordinated posts on all platforms with launch announcement
- **Press Release:** Send to local media outlets in LA and San Diego
- **Partner Amplification:** Ask partner organizations to share launch
- **School Outreach:** Send announcements to SoCal schools (science departments, environmental clubs)
- **Community Boards:** Post on local community forums and platforms (Nextdoor, local Facebook groups)
- **First Event:** Schedule launch-week beach cleanup event to generate buzz and photos

---

## PHASE 14 — POST-LAUNCH OPERATIONS & GROWTH

- **WHY post-launch planning matters before launch:** Most nonprofit websites die after launch — content goes stale, volunteer signups stop, donations plateau. Planning the ongoing operations *before* launch ensures the team knows what to do on Day 2, Day 30, and Day 365. A website is not a project with an end date — it's an ongoing program that requires consistent feeding.

### 14.1 Content Calendar

- **WHY a content calendar?** Without a schedule, content creation becomes "whenever someone gets around to it" — which quickly becomes "never." A calendar creates accountability and rhythm. It also ensures the website stays fresh for both repeat visitors and search engines (Google rewards sites that publish regularly).
- **Weekly:** New blog article or species profile
- **Bi-weekly:** Social media content schedule
- **Monthly:** Newsletter to subscribers
- **Quarterly:** Impact report and statistics update
  - **WHY quarterly impact reports?** Donors and grant funders want to see their money at work. Quarterly cadence is often enough to show progress without being burdensome to produce.
- **Annually:** Annual report (published on website and distributed to donors)
  - **WHY an annual report?** It's a requirement for many grant funders, builds donor trust, provides accountability, and serves as a marketing piece for new supporters.

### 14.2 Community Engagement

- Respond to all volunteer inquiries within 48 hours
- Send personalized thank-you to every new donor
- Feature volunteer spotlights monthly
- Host virtual Q&A sessions with marine scientists
- Create youth ambassador program

### 14.3 Growth Roadmap

#### Quarter 1 Post-Launch (Months 1-3)
- Establish regular event cadence (monthly cleanups)
- Build to 50+ newsletter subscribers
- Recruit 25+ volunteers
- Publish 12+ educational articles
- Complete Spanish translation of core pages

#### Quarter 2 Post-Launch (Months 4-6)
- Expand to additional beach locations
- Launch water quality monitoring program
- Build school partnership program
- Apply for first grants:
  - California Coastal Commission WHALE TAIL Grant (up to $50,000)
  - NOAA B-WET Program (environment-based education funding)
  - Local community foundations
- Reach 100+ volunteers

#### Quarter 3 Post-Launch (Months 7-9)
- Launch peer-to-peer fundraising campaigns
- Create downloadable educational curricula
- Build corporate partnership program
- Implement volunteer hour tracking feature
- Host first annual "Orca Child Day" event

#### Quarter 4 Post-Launch (Months 10-12)
- Publish first annual report
- Evaluate year one impact against goals
- Plan year two expansion:
  - Inland waterway focus (rivers, lakes, ponds)
  - Additional geographic regions
  - Mobile app (PWA or native)
  - Virtual events and webinars
  - Advanced data visualization dashboard
- Apply for expanded grant funding
- Board self-evaluation and strategic planning retreat

### 14.4 Future Technical Enhancements

- **PWA (Progressive Web App):** Offline access, push notifications, installable on mobile
- **Admin Dashboard:** Full volunteer management, content management, analytics
- **Water Quality Dashboard:** Real-time water quality data visualization
- **Citizen Science Portal:** Report sightings, observations, pollution incidents
- **Event Calendar Integration:** Google Calendar, Apple Calendar sync
- **Volunteer Hour Tracking:** Log hours, generate reports, issue certificates
- **Interactive Data Map:** Full-featured GIS map of all conservation data
- **AI Chatbot:** Answer common questions about marine life, conservation, volunteering
- **Mobile App:** Native iOS/Android app for field reporting and event check-in
- **Merchandise Store:** Branded items to support fundraising

---

## APPENDIX A — API REFERENCE & INTEGRATIONS

- **WHY this appendix exists:** Every external service OCINW depends on is documented here with its cost, limits, and documentation link. If an API goes down or changes pricing, this is the reference for finding alternatives. It also serves as onboarding documentation for future developers.

### A.1 Open-Meteo Weather API
- **Documentation:** https://open-meteo.com/en/docs
- **Base URL:** `https://api.open-meteo.com/v1/forecast`
- **Marine API:** `https://marine-api.open-meteo.com/v1/marine`
- **Authentication:** None required
- **Rate Limits:** 10,000 requests/day (non-commercial)
- **Cost:** Free for non-commercial use

### A.2 NOAA CO-OPS Tides & Currents API
- **Documentation:** https://api.tidesandcurrents.noaa.gov/api/prod/
- **Base URL:** `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter`
- **Authentication:** None required (include `application` parameter as courtesy)
- **Rate Limits:** Reasonable use (no published hard limit)
- **Cost:** Free (US government data)
- **SoCal Stations:** 9410840 (Santa Monica), 9410660 (LA), 9410680 (Long Beach), 9410580 (Newport), 9410230 (La Jolla), 9410170 (San Diego), 9410120 (Imperial Beach)

### A.3 Browser Geolocation API
- **Documentation:** https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
- **Usage:** `navigator.geolocation.getCurrentPosition()`
- **Requirements:** HTTPS only; user permission required
- **Fallback:** ZIP code to coordinates lookup table

### A.4 Supabase
- **Documentation:** https://supabase.com/docs
- **Free Tier:** 500MB database, 1GB file storage, 50K monthly active users, 500K edge function invocations
- **Usage:** Volunteer signups, contact forms, newsletter subscriptions, events, admin auth

### A.5 Zeffy (Donations)
- **Website:** https://www.zeffy.com
- **Integration:** Embedded iframe or redirect link
- **Cost:** 100% free for nonprofits
- **Features:** One-time & recurring donations, tax receipts, donor management

### A.6 Resend (Transactional Email)
- **Documentation:** https://resend.com/docs
- **Free Tier:** 100 emails/day, 3,000 emails/month
- **Usage:** Volunteer confirmations, contact form notifications, newsletter (until volume requires upgrade)

### A.7 Vercel (Hosting)
- **Documentation:** https://vercel.com/docs
- **Free Tier (Hobby):** 100GB bandwidth/month, unlimited deployments, preview deployments, analytics
- **Note:** Nonprofits may qualify for Vercel's Pro plan sponsorship

---

## APPENDIX B — SOUTHERN CALIFORNIA CONSERVATION LANDSCAPE

### B.1 Marine Protected Areas (LA to San Diego)
The South Coast Region contains approximately 50 MPAs covering ~354 square miles (15% of state waters):
- Matlahuayl State Marine Reserve (La Jolla) — sheltered kelp forest with leopard sharks, garibaldi, lobsters
- San Dieguito Lagoon SMCA
- South La Jolla SMCA
- Channel Islands National Marine Sanctuary — 1,470 sq mi protecting Northern Channel Islands waters

### B.2 Key Waterways
- **Rivers:** Los Angeles River, San Diego River, San Gabriel River, Santa Ana River, San Juan Creek, San Luis Rey River
- **Bays:** San Diego Bay, Mission Bay, Newport Bay, Santa Monica Bay
- **Lagoons:** San Dieguito Lagoon, Batiquitos Lagoon, San Elijo Lagoon, Agua Hedionda Lagoon
- **Watersheds:** San Diego Bay Watershed (888,400 acres), Los Angeles River Watershed

### B.3 Critical Environmental Issues
- 60-90% loss of coastal sage scrub habitat
- ~100% loss of original wetlands in LA River watershed
- 90-95% loss of in-stream riparian habitat in LA River
- Kelp forest decline due to warming waters and urchin overpopulation
- Air and water pollution affecting marine habitats
- Post-wildfire runoff threatening coastal ecosystems
- California has the most endangered species of all 50 US states

### B.4 Species of Special Concern
- Southern California steelhead trout (endangered)
- California gnatcatcher
- Tidewater goby
- Abalone species (multiple)
- California brown pelican (recovered but monitored)
- Green sea turtle
- Various shark species (nursery habitat in SoCal waters)

---

## APPENDIX C — BUDGET ESTIMATES

- **WHY every technology choice in this plan optimizes for $0/month:** A youth-run nonprofit starting from scratch doesn't have reliable revenue. Every dollar in monthly recurring costs must be justified. This plan deliberately chose free-tier services (Vercel, Supabase, Open-Meteo, NOAA, Zeffy, Resend, Google Workspace for Nonprofits) so that OCINW's technology costs are effectively $0/month. The only unavoidable costs are legal (incorporation, registration) and insurance — both of which are one-time or annual, not recurring monthly drains. This means 100% of donations go to the mission, not to software vendors.

### C.1 One-Time Costs
| Item | Estimated Cost |
|------|---------------|
| California nonprofit incorporation | $30 |
| IRS Form 1023-EZ filing | $275 |
| Attorney General CT-1 registration | $50 |
| Statement of Information (SI-100) | $20 |
| Domain registration (.org) | $10-15/year |
| Logo design (if professional) | $0-500 (or volunteer) |
| Legal review of Privacy Policy + Terms | $500-$2,000 (or pro bono) |
| Content creation (if not volunteer) | $0-$5,000 (or volunteer) |
| Photography/stock photos (if not volunteer) | $0-$2,000 (or volunteer/free stock) |
| **Total One-Time** | **$885-$10,890** |

### C.2 Monthly Operating Costs
| Item | Monthly Cost |
|------|-------------|
| Vercel hosting (Hobby tier) | $0 |
| Supabase (Free tier) | $0 |
| Open-Meteo API | $0 |
| NOAA API | $0 |
| Zeffy donation processing | $0 |
| Resend email (Free tier) | $0 |
| Domain renewal (amortized) | ~$1 |
| Google Workspace (Nonprofit) | $0 (free for nonprofits) |
| **Total Monthly** | **~$1** |

### C.3 Annual Operating Costs
| Item | Annual Cost |
|------|------------|
| Hosting & services | $12 |
| General liability insurance | $500-$1,500 |
| D&O insurance | $500-$2,000 |
| Domain renewal | $10-$15 |
| Form RRF-1 filing | $25-$300 (based on revenue) |
| Accounting (volunteer or pro bono) | $0-$500 |
| Background checks (~5 leaders × $30) | $0-$150 |
| **Total Annual** | **$1,047-$4,477** |

### C.4 Potential Grant Funding Sources
- California Coastal Commission WHALE TAIL Grant: up to $50,000
- NOAA B-WET Program: varies
- San Diego Foundation: various environmental grants
- California Community Foundation: various grants
- Patagonia Environmental Grants: up to $20,000
- National Fish and Wildlife Foundation: varies
- Local Rotary Clubs: varies

---

## APPENDIX D — PARTNER ORGANIZATIONS

- **WHY partner organizations matter from day one:** No nonprofit succeeds in isolation. Partners provide: (1) **Credibility** — being associated with established organizations like San Diego Coastkeeper or NOAA validates OCINW's work; (2) **Resources** — shared equipment, expertise, and volunteer pools; (3) **Reach** — partners promote your events to their audiences, multiplying your visibility; (4) **Grant eligibility** — many grants require or prefer collaborative projects with established partners. Reaching out to these organizations before launch creates a support network for when you go public.

### D.1 Potential Conservation Partners
| Organization | Focus | Location |
|-------------|-------|----------|
| San Diego Coastkeeper | Watershed protection | San Diego |
| Ocean Defenders Alliance | Fishing gear removal | Statewide |
| Marine Mammal Care Center LA | Marine mammal rescue | Los Angeles |
| Ocean Conservation Society | Cetacean research | SoCal |
| Catalina Marine Society | Marine science, Catalina | Los Angeles |
| The Bay Foundation | Kelp/eelgrass restoration | Santa Monica |
| I Love A Clean San Diego | Cleanups & education | San Diego |
| Surfrider Foundation | Ocean protection/advocacy | National (local chapters) |
| Heal the Bay | Water quality/beach health | Los Angeles |
| California Marine Sanctuary Foundation | Sanctuary support | Statewide |
| Cabrillo Marine Aquarium | Research & education | San Pedro |
| Birch Aquarium at Scripps | Marine education | La Jolla |
| Aquarium of the Pacific | Marine education | Long Beach |

### D.2 Educational Partners
| Organization | Resources |
|-------------|-----------|
| NOAA Education Portal | Curricula, data, lesson plans |
| California Coastal Commission | Educator resources, grants, contests |
| Channel Islands NMS | CA-aligned educational materials |
| UC San Diego CMBC | Marine conservation research |
| California Sea Grant | MPA research and education |
| Schmidt Ocean Institute | Ocean education resources |

### D.3 Youth Program Partners
| Organization | Program |
|-------------|---------|
| Ecology Center | Youth Environmental Academy (paid internships) |
| CA Youth Climate Policy Leadership | Monthly workshops, advocacy training |
| Silicon Valley Youth Climate Action | Climate action training |

---

## VERIFICATION & TESTING PLAN

After implementation, verify end-to-end functionality:

1. **Homepage loads** with all sections rendering correctly
2. **Weather & Tides:**
   - Allow geolocation → weather and tides display for current location
   - Deny geolocation → ZIP code input appears
   - Enter ZIP code → weather and tides update for that location
   - Select popular location → data updates
   - Verify data accuracy against weather.gov and tidesandcurrents.noaa.gov
3. **Donations:**
   - Click "Donate" → donation form appears
   - Complete test donation → confirmation/thank-you page
   - Verify donation recorded in Zeffy dashboard
4. **Volunteer Signup:**
   - Fill form as adult → submits successfully → confirmation email received
   - Fill form as minor → parent fields appear → submits with consent → email to parent
   - Test all validation (required fields, email format, ZIP format)
   - Verify record appears in Supabase
5. **Education Content:**
   - Browse articles, species, ecosystems
   - Verify all MDX content renders correctly
   - Test search and filtering
   - Verify images load with proper alt text
6. **Conservation:**
   - Browse projects and events
   - Verify maps display correctly
   - Test event registration flow
7. **Accessibility:**
   - Run axe-core on all pages (zero violations)
   - Navigate entire site via keyboard only
   - Test with screen reader
   - Verify at 200% zoom
8. **Internationalization:**
   - Switch to Spanish → all UI elements translate
   - Spanish content pages render correctly
9. **Mobile:**
   - Test on iPhone Safari, Android Chrome
   - Verify touch targets, mobile navigation, responsive layout
10. **Performance:**
    - Lighthouse scores: Performance 90+, Accessibility 100, Best Practices 90+, SEO 90+
    - Page load time under 3 seconds on 3G connection

---

*This roadmap is a living document. Update it as the project evolves, decisions are made, and new requirements emerge.*

*Orca Child in the Wild — Empowering youth to protect our waters, one wave at a time.*
