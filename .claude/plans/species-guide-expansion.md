# Plan: Robust Species Guide Expansion

## Current State (Session #22)

10 published species profiles covering the most iconic SoCal marine animals. Each has:
- Detailed MDX content (biology, habitat, threats, fun facts, how to help)
- Real representative photos from NOAA, USFWS, or Wikimedia Commons (CC-licensed)
- Photo attribution via `imageCredit` field displayed on detail pages
- Conservation status badges, sidebar quick facts, best viewing locations

---

## Vision: A Comprehensive Southern California Marine Species Database

The goal is 50–100 species profiles organized by category, covering everything a curious kid, educator, or first-time volunteer would want to know about the animals they might see on a beach cleanup or tide pool walk.

---

## Proposed New Species (by Category)

### Marine Mammals (currently 3, target 8)
- [ ] **Harbor Porpoise** — smaller than dolphins, shy, seen in bays
- [ ] **Common Dolphin** — massive pods in SoCal offshore waters
- [ ] **Pacific White-Sided Dolphin** — acrobatic offshore species
- [ ] **Northern Elephant Seal** — huge males at Año Nuevo / Piedras Blancas
- [ ] **Harbor Seal** — the "puppy dog" seal, hauls out at La Jolla

### Fish (currently 3, target 10)
- [ ] **Yellowtail** — prized sportfish, kelp beds
- [ ] **Halibut** — camouflage masters, sandy flats
- [ ] **Kelp Bass** — lurks in kelp, ambush predator
- [ ] **Soupfin Shark** — endangered, SoCal bays
- [ ] **Horn Shark** — slow, nocturnal, corkscrew egg cases
- [ ] **Bat Ray** — diamond-shaped, common in bays
- [ ] **Thornback Ray** — spiny, shallow sandy areas

### Invertebrates (currently 1, target 8)
- [ ] **Hermit Crab** — common tide pool find for kids
- [ ] **Ochre Sea Star** — keystone predator of tide pools (Pisaster ochraceus)
- [ ] **Giant Green Anemone** — vivid, closes when touched
- [ ] **Acorn Barnacle** — everywhere, teaching opportunity
- [ ] **California Spiny Lobster** — nocturnal, crevice dweller
- [ ] **Pacific Mole Crab** — swash zone, wave-riding sand crabs
- [ ] **Giant Owl Limpet** — territorial, maintains algae gardens

### Birds (currently 1, target 5)
- [ ] **Western Snowy Plover** — endangered nester, beach closures
- [ ] **Brandt's Cormorant** — colonial nester on sea stacks
- [ ] **Black Oystercatcher** — all-black with red bill, tide pools
- [ ] **Western Gull** — the "seagull," opportunistic scavenger

### Plants & Algae (currently 1, target 4)
- [ ] **Eel Grass** (Zostera marina) — critical nursery habitat
- [ ] **Sea Palm** (Postelsia palmaeformis) — intertidal, wave-splashed rocks
- [ ] **Coralline Algae** — pink crust that looks like coral

### Reptiles (currently 1, target 2)
- [ ] **Leatherback Sea Turtle** — largest turtle, visits open ocean off SoCal

---

## Enhancement Ideas for Existing Profiles

### New Frontmatter Fields
- `relatedSpecies: string[]` — "See also" links between species pages
- `difficulty: "easy" | "moderate" | "expert"` — for tide pool ID guides
- `sizeRange: string` — e.g., "2–4 feet long"
- `diet: string[]` — what they eat
- `predators: string[]` — what eats them

### New Content Sections
- **Identification Guide** — how to recognize it in the field (colors, shapes, size)
- **Look-alikes** — species that are commonly confused (e.g., harbor seal vs. sea lion)
- **Safety Notes** — e.g., don't touch sea urchins, watch for waves
- **Citizen Science** — links to iNaturalist to report sightings

### Interactive Features (Phase 14+)
- **iNaturalist integration** — embed recent sightings near the user's location
- **Printable ID cards** — credit-card-sized PDF field guides for each species
- **Species quiz** — photo-based identification game for kids
- **Sighting map** — leaflet map showing where species have been observed in SoCal

---

## Image Sourcing Strategy

**Priority sources (in order):**
1. NOAA Photo Library (photolib.noaa.gov) — fully public domain, government work
2. USFWS Digital Library — fully public domain
3. iNaturalist (inaturalist.org) — CC BY or CC BY-NC, quality varies
4. Wikimedia Commons — mixed licenses, high quality
5. MBARI (Monterey Bay Aquarium Research Institute) — deep-sea imagery, check license per image

**For each new species:**
- Use Wikipedia API for initial image discovery
- Prefer photos taken in California/Pacific to keep it geographically relevant
- Aim for 1200–1600px wide to balance quality and file size

---

## Implementation Steps

1. **Create MDX template** — standard frontmatter structure for new profiles
2. **Add missing fields** to velite.config.ts species schema (`relatedSpecies`, `difficulty`, `sizeRange`)
3. **Write content batches** — 10 species per session, prioritize:
   - Most common tide pool animals (kid-friendly, high educational value)
   - Species on cleanup zones (sharks, rays, pelicans)
   - Keystone/endangered species for conservation message
4. **Image sourcing** — find and download one image per species before writing
5. **Cross-link** — update `relatedSpecies` arrays to connect profiles
6. **Spanish translations** — add Spanish MDX versions for top 20 profiles

---

## Content Quality Standard

Each profile should answer:
- "What is it?" — size, appearance, behavior
- "Where do I find it?" — specific SoCal locations
- "Why does it matter?" — ecological role
- "Is it in danger?" — conservation status with context
- "What can I do?" — actionable, age-appropriate steps
- "Cool thing you didn't know" — the hook that makes kids remember it

Target reading level: 5th grade (accessible to OCINW's 8–18 audience)

---

## Priority Order for New Species

| Priority | Species | Why |
|----------|---------|-----|
| 1 | Ochre Sea Star | Keystone predator, tide pool staple |
| 2 | Common Dolphin | Most common sighting in SoCal |
| 3 | Harbor Seal | Kids love them, La Jolla Children's Pool |
| 4 | Giant Green Anemone | Every tide pool has one |
| 5 | California Spiny Lobster | Surprising, nocturnal, SoCal icon |
| 6 | Horn Shark | Non-scary shark, unique egg case |
| 7 | Bat Ray | Common bay species, graceful |
| 8 | Western Snowy Plover | Endangered, beach closure context |
| 9 | Eel Grass | Invisible but critical habitat |
| 10 | Pacific Mole Crab | Perfect "first find" for kids |

---

## Notes

- Grunion profile photo quality is lower resolution (iNaturalist) — replace if better photo found
- Consider adding a "Seasonal Sighting Calendar" page that maps which species appear when
- Species profiles are currently English only — Spanish translations are Phase 10+ work
