# Plan: Volunteer Welcome Email with Beach Day Guide

## Summary

After a volunteer successfully submits the registration form, send an automated welcome email via Resend that includes a "Your First Beach Day" guide. This replaces the two `// TODO` comments in `src/app/actions/volunteer.ts`.

---

## What the Email Contains

### Welcome section
- Personalized greeting using `firstName`
- Confirmation that their signup was received
- Next steps (we'll review and match them to events)

### "Your First Beach Day Guide" (embedded in email body)
A practical, youth-friendly checklist covering:

**What to Expect**
- Arrive early for check-in and briefing
- You'll be assigned to a small team with a team lead
- Typical cleanup runs 2–3 hours
- Team leads record trash data on Ocean Conservancy datasheets

**What We Provide**
- Trash grabbers and gloves
- Trash bags (large and small)
- Datasheet clipboards and pens
- Water station on-site (bring a reusable bottle to refill)

**What to Bring**
- Reusable water bottle (stay hydrated!)
- Closed-toe shoes — no flip-flops (broken glass, sharp debris)
- Hat and sunglasses
- Comfortable clothes you don't mind getting sandy
- A positive attitude

**No Bad Products at the Beach**
Include a friendly, educational note:
> "Please use reef-safe, coral-safe sunscreen. Many popular sunscreens contain oxybenzone and octinoxate, which damage coral reefs and harm marine life. Look for sunscreens labeled 'reef-safe' with zinc oxide or titanium dioxide as the active ingredient. Hawaii and other locations have banned these harmful chemicals — help protect our SoCal reefs too!"

Suggested coral-safe brands (generic mention, no sponsorship):
- Mineral/zinc-based sunscreens
- Brands labeled "reef safe" or "ocean safe"

**Leave No Trace Reminders**
- Pack out everything you pack in
- Don't disturb wildlife or nesting areas
- Stay on marked paths near dunes

---

## Implementation Plan

### 1. Email template
Create a React Email template:
- File: `src/emails/VolunteerWelcome.tsx`
- Props: `{ firstName: string; isMinor: boolean }`
- Include the full beach guide as styled sections
- Mobile-responsive (many volunteers will open on phone)
- Brand colors: OCINW teal/ocean palette
- Footer: unsubscribe link, physical address (CAN-SPAM compliance)

### 2. Admin notification email
Create a second template:
- File: `src/emails/VolunteerNotification.tsx`
- Props: full volunteer data (for admin eyes only)
- Plain, data-dense layout
- Subject: "New volunteer signup: {firstName} {lastName}"

### 3. Wire up in volunteer.ts
Replace `// TODO` lines with actual Resend calls:
```ts
import { Resend } from "resend";
import { VolunteerWelcome } from "@/emails/VolunteerWelcome";
import { VolunteerNotification } from "@/emails/VolunteerNotification";

const resend = new Resend(process.env.RESEND_API_KEY);

// Send welcome email to volunteer
await resend.emails.send({
  from: "Orca Child in the Wild <hello@orcachildinthewild.com>",
  to: data.email,
  subject: "Welcome to OCINW — Your First Beach Day Guide",
  react: VolunteerWelcome({ firstName: data.firstName, isMinor }),
});

// Notify admin team
await resend.emails.send({
  from: "OCINW Volunteer System <hello@orcachildinthewild.com>",
  to: "orcachildinthewild@gmail.com",
  subject: `New volunteer signup: ${data.firstName} ${data.lastName}`,
  react: VolunteerNotification({ volunteer: data }),
});
```

### 4. Environment
- `RESEND_API_KEY` already in `.env.local` (Resend free tier)
- `RESEND_FROM_EMAIL` = `hello@orcachildinthewild.com` (domain must be verified in Resend)
- Verify the sending domain in Resend dashboard before deploying

### 5. Error handling
- Wrap Resend calls in try/catch — email failure should NOT fail the signup
- Log email errors server-side (`console.error`) but still return `{ status: "success" }`
- The volunteer is already saved; email is best-effort

---

## Dependencies to Add
```bash
pnpm add resend @react-email/components
```
Both are free tier / open source. `@react-email/components` provides `Html`, `Body`, `Section`, `Text`, `Button`, `Hr`, `Img`, `Link` primitives.

---

## Files to Create / Modify
| File | Action |
|------|--------|
| `src/emails/VolunteerWelcome.tsx` | Create — welcome + beach guide |
| `src/emails/VolunteerNotification.tsx` | Create — admin notification |
| `src/app/actions/volunteer.ts` | Modify — add Resend calls |
| `.env.example` | Update — add RESEND_API_KEY placeholder |

---

## i18n Note
The welcome email should be in the volunteer's preferred language. The volunteer form doesn't currently capture language preference, but we can infer from the locale they submitted from. For Phase 1, English only is acceptable. Spanish email can be Phase 2.

---

## CAN-SPAM / Email Compliance
- Physical mailing address required in footer — use OCINW P.O. box or address when registered
- Unsubscribe link required (Resend handles this via list management)
- Clear sender identification

---

## Testing
- Use Resend's test mode (no real emails sent)
- Add unit tests for email prop rendering with `@react-email/render`
- Test error handling: Resend fails → volunteer signup still succeeds

---

## Priority
Medium — implement after the volunteer form is live in production and accepting signups.
