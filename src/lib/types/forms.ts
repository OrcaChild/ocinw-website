import { z } from "zod";

/** Contact form submission */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/** Volunteer registration form */
export const volunteerFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().optional(),
  age: z.number().int().min(8, "Minimum age is 8").max(120),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  availability: z.array(z.string()).min(1, "Select at least one availability"),
  parentEmail: z.email("Please enter a valid parent/guardian email").optional(),
  agreeToTerms: z.literal(true, {
    error: "You must agree to the terms",
  }),
});

export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;

/** Newsletter signup form */
export const newsletterFormSchema = z.object({
  email: z.email("Please enter a valid email address"),
  firstName: z.string().optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

/** Event registration form */
export const eventRegistrationSchema = z.object({
  eventId: z.string(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  age: z.number().int().min(8).max(120),
  parentEmail: z.email().optional(),
  emergencyContact: z.string().min(2),
  emergencyPhone: z.string().min(10),
  waiverAccepted: z.boolean(),
});

export type EventRegistrationData = z.infer<typeof eventRegistrationSchema>;
