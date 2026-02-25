// =============================================================================
// Zod Schema Tests — 100% coverage required
// Source: src/lib/types/forms.ts
// =============================================================================

import {
  contactFormSchema,
  volunteerFormSchema,
  newsletterFormSchema,
  eventRegistrationSchema,
} from "@/lib/types/forms";
import {
  validContactForm,
  validVolunteerForm,
  validNewsletterForm,
  validEventRegistration,
} from "../fixtures";

// ---------------------------------------------------------------------------
// contactFormSchema
// ---------------------------------------------------------------------------

describe("contactFormSchema", () => {
  it("accepts valid contact form data", () => {
    const result = contactFormSchema.safeParse(validContactForm);
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = contactFormSchema.safeParse({ ...validContactForm, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects single-character name", () => {
    const result = contactFormSchema.safeParse({ ...validContactForm, name: "A" });
    expect(result.success).toBe(false);
  });

  it("accepts name with exactly 2 characters", () => {
    const result = contactFormSchema.safeParse({ ...validContactForm, name: "Jo" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email format", () => {
    const result = contactFormSchema.safeParse({ ...validContactForm, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects empty email", () => {
    const result = contactFormSchema.safeParse({ ...validContactForm, email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects subject shorter than 5 characters", () => {
    const result = contactFormSchema.safeParse({ ...validContactForm, subject: "Hi" });
    expect(result.success).toBe(false);
  });

  it("accepts subject with exactly 5 characters", () => {
    const result = contactFormSchema.safeParse({ ...validContactForm, subject: "Hello" });
    expect(result.success).toBe(true);
  });

  it("rejects message shorter than 10 characters", () => {
    const result = contactFormSchema.safeParse({ ...validContactForm, message: "Short" });
    expect(result.success).toBe(false);
  });

  it("accepts message with exactly 10 characters", () => {
    const result = contactFormSchema.safeParse({ ...validContactForm, message: "0123456789" });
    expect(result.success).toBe(true);
  });

  it("provides custom error messages", () => {
    const result = contactFormSchema.safeParse({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message);
      expect(messages).toContain("Name must be at least 2 characters");
    }
  });
});

// ---------------------------------------------------------------------------
// volunteerFormSchema
// ---------------------------------------------------------------------------

describe("volunteerFormSchema", () => {
  it("accepts valid volunteer form data", () => {
    const result = volunteerFormSchema.safeParse(validVolunteerForm);
    expect(result.success).toBe(true);
  });

  it("rejects firstName shorter than 2 characters", () => {
    const result = volunteerFormSchema.safeParse({ ...validVolunteerForm, firstName: "J" });
    expect(result.success).toBe(false);
  });

  it("rejects lastName shorter than 2 characters", () => {
    const result = volunteerFormSchema.safeParse({ ...validVolunteerForm, lastName: "S" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email format", () => {
    const result = volunteerFormSchema.safeParse({ ...validVolunteerForm, email: "bad" });
    expect(result.success).toBe(false);
  });

  it("makes phone optional", () => {
    const result = volunteerFormSchema.safeParse(validVolunteerForm);
    expect(result.success).toBe(true);

    const withPhone = volunteerFormSchema.safeParse({
      ...validVolunteerForm,
      phone: "3105551234",
    });
    expect(withPhone.success).toBe(true);
  });

  it("rejects invalid ageRange", () => {
    const result = volunteerFormSchema.safeParse({ ...validVolunteerForm, ageRange: "invalid" });
    expect(result.success).toBe(false);
  });

  it("accepts all valid ageRange values", () => {
    for (const range of ["under-13", "13-17", "18-25", "26-40", "41-60", "60+"]) {
      const data = range === "under-13" || range === "13-17"
        ? { ...validVolunteerForm, ageRange: range, parentGuardianName: "Pat Smith", parentGuardianEmail: "pat@example.com", parentGuardianPhone: "3105551234" }
        : { ...validVolunteerForm, ageRange: range };
      const result = volunteerFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid zipCode format", () => {
    const result = volunteerFormSchema.safeParse({ ...validVolunteerForm, zipCode: "abc" });
    expect(result.success).toBe(false);
  });

  it("accepts valid 5-digit zipCode", () => {
    const result = volunteerFormSchema.safeParse({ ...validVolunteerForm, zipCode: "90210" });
    expect(result.success).toBe(true);
  });

  it("rejects empty interests array", () => {
    const result = volunteerFormSchema.safeParse({ ...validVolunteerForm, interests: [] });
    expect(result.success).toBe(false);
  });

  it("accepts interests with one item", () => {
    const result = volunteerFormSchema.safeParse({
      ...validVolunteerForm,
      interests: ["education"],
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty availability array", () => {
    const result = volunteerFormSchema.safeParse({ ...validVolunteerForm, availability: [] });
    expect(result.success).toBe(false);
  });

  it("requires parent info for minors under 18", () => {
    const result = volunteerFormSchema.safeParse({
      ...validVolunteerForm,
      ageRange: "13-17",
    });
    expect(result.success).toBe(false);
  });

  it("accepts minor with complete parent info", () => {
    const result = volunteerFormSchema.safeParse({
      ...validVolunteerForm,
      ageRange: "under-13",
      parentGuardianName: "Pat Smith",
      parentGuardianEmail: "pat@example.com",
      parentGuardianPhone: "3105551234",
    });
    expect(result.success).toBe(true);
  });

  it("validates parentGuardianEmail format when provided", () => {
    const result = volunteerFormSchema.safeParse({
      ...validVolunteerForm,
      ageRange: "13-17",
      parentGuardianName: "Pat Smith",
      parentGuardianEmail: "bad-email",
      parentGuardianPhone: "3105551234",
    });
    expect(result.success).toBe(false);
  });

  it("rejects agreeToCodeOfConduct as false", () => {
    const result = volunteerFormSchema.safeParse({
      ...validVolunteerForm,
      agreeToCodeOfConduct: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects agreeToPrivacy as false", () => {
    const result = volunteerFormSchema.safeParse({
      ...validVolunteerForm,
      agreeToPrivacy: false,
    });
    expect(result.success).toBe(false);
  });

  it("requires both agreeToCodeOfConduct and agreeToPrivacy to be true", () => {
    const result = volunteerFormSchema.safeParse({
      ...validVolunteerForm,
      agreeToCodeOfConduct: true,
      agreeToPrivacy: true,
    });
    expect(result.success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// newsletterFormSchema
// ---------------------------------------------------------------------------

describe("newsletterFormSchema", () => {
  it("accepts valid email with firstName", () => {
    const result = newsletterFormSchema.safeParse(validNewsletterForm);
    expect(result.success).toBe(true);
  });

  it("accepts email only (firstName optional)", () => {
    const result = newsletterFormSchema.safeParse({ email: "test@example.com" });
    expect(result.success).toBe(true);
  });

  it("accepts email with undefined firstName", () => {
    const result = newsletterFormSchema.safeParse({
      email: "test@example.com",
      firstName: undefined,
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = newsletterFormSchema.safeParse({ email: "not-email" });
    expect(result.success).toBe(false);
  });

  it("rejects empty email", () => {
    const result = newsletterFormSchema.safeParse({ email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects missing email", () => {
    const result = newsletterFormSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// eventRegistrationSchema
// ---------------------------------------------------------------------------

describe("eventRegistrationSchema", () => {
  it("accepts valid event registration data", () => {
    const result = eventRegistrationSchema.safeParse(validEventRegistration);
    expect(result.success).toBe(true);
  });

  it("requires eventId", () => {
    const { eventId: _, ...rest } = validEventRegistration;
    const result = eventRegistrationSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects firstName shorter than 2 characters", () => {
    const result = eventRegistrationSchema.safeParse({
      ...validEventRegistration,
      firstName: "C",
    });
    expect(result.success).toBe(false);
  });

  it("rejects lastName shorter than 2 characters", () => {
    const result = eventRegistrationSchema.safeParse({
      ...validEventRegistration,
      lastName: "J",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = eventRegistrationSchema.safeParse({
      ...validEventRegistration,
      email: "bad",
    });
    expect(result.success).toBe(false);
  });

  it("makes phone optional", () => {
    const result = eventRegistrationSchema.safeParse(validEventRegistration);
    expect(result.success).toBe(true);

    const withPhone = eventRegistrationSchema.safeParse({
      ...validEventRegistration,
      phone: "3105551234",
    });
    expect(withPhone.success).toBe(true);
  });

  it("rejects age below 8", () => {
    const result = eventRegistrationSchema.safeParse({
      ...validEventRegistration,
      age: 7,
    });
    expect(result.success).toBe(false);
  });

  it("rejects age above 120", () => {
    const result = eventRegistrationSchema.safeParse({
      ...validEventRegistration,
      age: 121,
    });
    expect(result.success).toBe(false);
  });

  it("makes parentEmail optional but validates when provided", () => {
    const valid = eventRegistrationSchema.safeParse({
      ...validEventRegistration,
      parentEmail: "parent@example.com",
    });
    expect(valid.success).toBe(true);

    const invalid = eventRegistrationSchema.safeParse({
      ...validEventRegistration,
      parentEmail: "bad",
    });
    expect(invalid.success).toBe(false);
  });

  it("requires emergencyContact min 2 characters", () => {
    const result = eventRegistrationSchema.safeParse({
      ...validEventRegistration,
      emergencyContact: "P",
    });
    expect(result.success).toBe(false);
  });

  it("requires emergencyPhone min 10 characters", () => {
    const result = eventRegistrationSchema.safeParse({
      ...validEventRegistration,
      emergencyPhone: "310555",
    });
    expect(result.success).toBe(false);
  });

  it("requires waiverAccepted as boolean", () => {
    const accepted = eventRegistrationSchema.safeParse({
      ...validEventRegistration,
      waiverAccepted: true,
    });
    expect(accepted.success).toBe(true);

    const declined = eventRegistrationSchema.safeParse({
      ...validEventRegistration,
      waiverAccepted: false,
    });
    // waiverAccepted is z.boolean() — false is valid (unlike agreeToTerms which is z.literal(true))
    expect(declined.success).toBe(true);
  });

  it("rejects non-boolean waiverAccepted", () => {
    const result = eventRegistrationSchema.safeParse({
      ...validEventRegistration,
      waiverAccepted: "yes",
    });
    expect(result.success).toBe(false);
  });
});
