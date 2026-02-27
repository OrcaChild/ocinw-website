import { z } from "zod";

/** Contact form submission */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200, "Subject is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/** Age range options for volunteer form */
export const AGE_RANGES = [
  "under-13",
  "13-17",
  "18+",
] as const;

export type AgeRange = (typeof AGE_RANGES)[number];

/** Minor age ranges that require parental consent */
export const MINOR_AGE_RANGES = ["under-13", "13-17"] as const;

/** Interest options for volunteer form */
export const VOLUNTEER_INTERESTS = [
  "beach-cleanup",
  "river-restoration",
  "marine-monitoring",
  "water-testing",
  "education",
  "event-planning",
  "photography",
  "social-media",
  "fundraising",
  "admin",
  "research",
  "design",
  "web-dev",
] as const;

/** Availability options for volunteer form */
export const VOLUNTEER_AVAILABILITY = [
  "weekday-morning",
  "weekday-afternoon",
  "weekday-evening",
  "weekend-morning",
  "weekend-afternoon",
  "weekend-evening",
] as const;

/** How-heard options for volunteer form */
export const HOW_HEARD_OPTIONS = [
  "social-media",
  "school",
  "friend",
  "search",
  "event",
  "news",
  "other",
] as const;

/** Parent consent request — Phase 1 of minor volunteer flow (zero child PII) */
export const parentConsentRequestSchema = z.object({
  parentName: z.string().min(2, "Parent/guardian name must be at least 2 characters").max(100, "Name is too long"),
  parentEmail: z.email("Please enter a valid email address"),
  parentPhone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  ageRange: z.enum(MINOR_AGE_RANGES, { error: "Please select the child's age range" }),
});

export type ParentConsentRequestData = z.infer<typeof parentConsentRequestSchema>;

/** Consent code validation — 9-character alphanumeric uppercase */
export const consentCodeSchema = z.string()
  .length(9, "Consent code must be exactly 9 characters")
  .regex(/^[A-Z0-9]{9}$/, "Consent code must contain only uppercase letters and numbers");

/** Volunteer registration form */
const volunteerBaseSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(100, "Name is too long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(100, "Name is too long"),
  email: z.email("Please enter a valid email address"),
  phone: z.union([z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"), z.literal("")]).optional(),
  ageRange: z.enum(AGE_RANGES, {
    error: "Please select your age range",
  }),
  zipCode: z.string().regex(/^\d{5}$/, "Please enter a valid 5-digit ZIP code"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  availability: z.array(z.string()).min(1, "Select at least one availability"),
  parentGuardianName: z.string().max(100, "Name is too long").optional(),
  parentGuardianEmail: z.union([z.email("Please enter a valid parent/guardian email"), z.literal("")]).optional(),
  parentGuardianPhone: z.union([z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"), z.literal("")]).optional(),
  howHeard: z.enum(HOW_HEARD_OPTIONS, { error: "Please select how you heard about us" }).optional(),
  skills: z.string().max(500, "Skills description is too long").optional(),
  message: z.string().max(1000, "Message is too long").optional(),
  agreeToCodeOfConduct: z.literal(true, {
    error: "You must agree to the code of conduct",
  }),
  agreeToPrivacy: z.literal(true, {
    error: "You must agree to the privacy policy",
  }),
  receiveUpdates: z.boolean().optional(),
  consentCode: z.string().optional(),
});

export const volunteerFormSchema = volunteerBaseSchema.refine(
  (data) => {
    if (data.ageRange === "under-13" || data.ageRange === "13-17") {
      return (
        !!data.parentGuardianName &&
        !!data.parentGuardianEmail &&
        data.parentGuardianEmail !== "" &&
        !!data.parentGuardianPhone &&
        !!data.consentCode &&
        /^[A-Z0-9]{9}$/.test(data.consentCode)
      );
    }
    return true;
  },
  {
    message: "Parent/guardian information and consent code are required for volunteers under 18",
    path: ["parentGuardianName"],
  },
);

export type VolunteerFormData = z.infer<typeof volunteerBaseSchema>;

/** Newsletter signup form */
export const newsletterFormSchema = z.object({
  email: z.email("Please enter a valid email address"),
  firstName: z.string().max(100, "Name is too long").optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

/** Event registration form */
const eventRegistrationBaseSchema = z.object({
  eventId: z.string().uuid("Invalid event ID"),
  firstName: z.string().min(2, "First name must be at least 2 characters").max(100, "Name is too long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(100, "Name is too long"),
  email: z.email("Please enter a valid email address"),
  phone: z.union([z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"), z.literal("")]).optional(),
  age: z.number().int().min(13, "Minimum age is 13. Children under 13 must be registered by a parent or guardian.").max(120, "Please enter a valid age"),
  parentEmail: z.union([z.email("Please enter a valid parent/guardian email"), z.literal("")]).optional(),
  emergencyContact: z.string().min(2, "Emergency contact name is required").max(100, "Name is too long"),
  emergencyPhone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  waiverAccepted: z.literal(true, {
    error: "You must accept the liability waiver",
  }),
});

export const eventRegistrationSchema = eventRegistrationBaseSchema.refine(
  (data) => {
    if (data.age < 18) {
      return !!data.parentEmail && data.parentEmail !== "";
    }
    return true;
  },
  {
    message: "Parent/guardian email is required for participants under 18",
    path: ["parentEmail"],
  },
);

export type EventRegistrationData = z.infer<typeof eventRegistrationBaseSchema>;
