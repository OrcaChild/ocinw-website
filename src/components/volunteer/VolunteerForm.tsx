"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Send, AlertTriangle, KeyRound, ArrowLeft, CheckCircle } from "lucide-react";

import {
  volunteerFormSchema,
  parentConsentRequestSchema,
  consentCodeSchema,
  type VolunteerFormData,
  type ParentConsentRequestData,
} from "@/lib/types/forms";
import { submitVolunteerForm } from "@/app/actions/volunteer";
import { submitParentConsentRequest, validateConsentCode } from "@/app/actions/parent-consent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const interestOptions = [
  { value: "beach-cleanup", labelKey: "interestBeachCleanup" },
  { value: "river-restoration", labelKey: "interestRiverRestoration" },
  { value: "marine-monitoring", labelKey: "interestMarineMonitoring" },
  { value: "water-testing", labelKey: "interestWaterTesting" },
  { value: "education", labelKey: "interestEducation" },
  { value: "event-planning", labelKey: "interestEventPlanning" },
  { value: "photography", labelKey: "interestPhotography" },
  { value: "social-media", labelKey: "interestSocialMedia" },
  { value: "fundraising", labelKey: "interestFundraising" },
  { value: "admin", labelKey: "interestAdmin" },
  { value: "research", labelKey: "interestResearch" },
  { value: "design", labelKey: "interestDesign" },
  { value: "web-dev", labelKey: "interestWebDev" },
] as const;

const availabilityOptions = [
  { value: "weekday-morning", labelKey: "availWeekdayMorning" },
  { value: "weekday-afternoon", labelKey: "availWeekdayAfternoon" },
  { value: "weekday-evening", labelKey: "availWeekdayEvening" },
  { value: "weekend-morning", labelKey: "availWeekendMorning" },
  { value: "weekend-afternoon", labelKey: "availWeekendAfternoon" },
  { value: "weekend-evening", labelKey: "availWeekendEvening" },
] as const;

const ageRangeOptions = [
  { value: "under-13", labelKey: "ageUnder13" },
  { value: "13-17", labelKey: "age13to17" },
  { value: "18-25", labelKey: "age18to25" },
  { value: "26-40", labelKey: "age26to40" },
  { value: "41-60", labelKey: "age41to60" },
  { value: "60+", labelKey: "age60plus" },
] as const;

const howHeardOptions = [
  { value: "social-media", labelKey: "howHeardSocial" },
  { value: "school", labelKey: "howHeardSchool" },
  { value: "friend", labelKey: "howHeardFriend" },
  { value: "search", labelKey: "howHeardSearch" },
  { value: "event", labelKey: "howHeardEvent" },
  { value: "news", labelKey: "howHeardNews" },
  { value: "other", labelKey: "howHeardOther" },
] as const;

/**
 * Form mode state machine:
 * - initial: Only age range is visible. User selects age range.
 * - parent_contact: Minor selected → shows ONLY parent contact fields (zero child PII).
 * - code_entry: Parent request submitted OR user clicked "Have a code?" → code input.
 * - full_form: Code validated OR adult selected → complete volunteer form visible.
 */
type FormMode = "initial" | "parent_contact" | "code_entry" | "full_form";

export function VolunteerForm() {
  const [mode, setMode] = useState<FormMode>("initial");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [consentCode, setConsentCode] = useState("");
  const [validatedCode, setValidatedCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [selectedAgeRange, setSelectedAgeRange] = useState("");
  const t = useTranslations("volunteer");

  // Parent consent request form (Phase 1 — zero child PII)
  const parentForm = useForm<ParentConsentRequestData>({
    resolver: zodResolver(parentConsentRequestSchema),
    defaultValues: {
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      ageRange: undefined,
    },
  });

  // Full volunteer form (Phase 2 — after consent code validated, or adult)
  const volunteerForm = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ageRange: undefined,
      zipCode: "",
      interests: [],
      availability: [],
      parentGuardianName: "",
      parentGuardianEmail: "",
      parentGuardianPhone: "",
      howHeard: undefined,
      skills: "",
      message: "",
      agreeToCodeOfConduct: undefined,
      agreeToPrivacy: undefined,
      receiveUpdates: false,
      consentCode: "",
    },
  });

  const isMinor = selectedAgeRange === "under-13" || selectedAgeRange === "13-17";
  const isUnder16 = selectedAgeRange === "under-13" || selectedAgeRange === "13-17";

  function handleAgeRangeSelect(value: string) {
    setSelectedAgeRange(value);

    if (value === "under-13" || value === "13-17") {
      // Minor — go to parent contact phase (zero child PII)
      parentForm.setValue("ageRange", value as "under-13" | "13-17");
      setMode("parent_contact");
    } else {
      // Adult — go straight to full form
      volunteerForm.setValue("ageRange", value as VolunteerFormData["ageRange"]);
      setMode("full_form");
    }
  }

  async function onParentSubmit(data: ParentConsentRequestData) {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.set("parentName", data.parentName);
    formData.set("parentEmail", data.parentEmail);
    formData.set("parentPhone", data.parentPhone);
    formData.set("ageRange", data.ageRange);

    const result = await submitParentConsentRequest(formData);
    setIsSubmitting(false);

    if (result.status === "success") {
      toast.success(t("consentRequestSuccess"));
      setMode("code_entry");
    } else if (result.status === "rate_limited") {
      toast.error(t("consentRateLimited"));
    } else {
      toast.error(t("errorMessage"));
    }
  }

  async function handleCodeValidation() {
    setCodeError("");
    const normalized = consentCode.toUpperCase().trim();

    const formatResult = consentCodeSchema.safeParse(normalized);
    if (!formatResult.success) {
      setCodeError(t("codeInvalid"));
      return;
    }

    setIsValidatingCode(true);
    const result = await validateConsentCode(normalized);
    setIsValidatingCode(false);

    if (result.status === "valid") {
      setValidatedCode(normalized);
      toast.success(t("codeValidSuccess"));

      // Pre-populate parent fields from parent form into volunteer form
      volunteerForm.setValue("ageRange", selectedAgeRange as VolunteerFormData["ageRange"]);
      volunteerForm.setValue("consentCode", normalized);
      volunteerForm.setValue("parentGuardianName", parentForm.getValues("parentName"));
      volunteerForm.setValue("parentGuardianEmail", parentForm.getValues("parentEmail"));
      volunteerForm.setValue("parentGuardianPhone", parentForm.getValues("parentPhone"));

      setMode("full_form");
    } else if (result.status === "expired") {
      setCodeError(t("codeExpired"));
    } else if (result.status === "rate_limited") {
      setCodeError(t("codeTooManyAttempts"));
    } else {
      setCodeError(t("codeInvalid"));
    }
  }

  async function onVolunteerSubmit(data: VolunteerFormData) {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.set("firstName", data.firstName);
    formData.set("lastName", data.lastName);
    formData.set("email", data.email);
    if (data.phone) formData.set("phone", data.phone);
    formData.set("ageRange", data.ageRange);
    formData.set("zipCode", data.zipCode);
    for (const interest of data.interests) {
      formData.append("interests", interest);
    }
    for (const avail of data.availability) {
      formData.append("availability", avail);
    }
    if (data.parentGuardianName) formData.set("parentGuardianName", data.parentGuardianName);
    if (data.parentGuardianEmail) formData.set("parentGuardianEmail", data.parentGuardianEmail);
    if (data.parentGuardianPhone) formData.set("parentGuardianPhone", data.parentGuardianPhone);
    if (data.howHeard) formData.set("howHeard", data.howHeard);
    if (data.skills) formData.set("skills", data.skills);
    if (data.message) formData.set("message", data.message);
    formData.set("agreeToCodeOfConduct", String(data.agreeToCodeOfConduct));
    formData.set("agreeToPrivacy", String(data.agreeToPrivacy));
    formData.set("receiveUpdates", String(data.receiveUpdates ?? false));
    if (validatedCode) formData.set("consentCode", validatedCode);

    const result = await submitVolunteerForm(formData);
    setIsSubmitting(false);

    if (result.status === "success") {
      toast.success(t("successTitle"), {
        description: t("successMessage"),
      });
      volunteerForm.reset();
      setMode("initial");
      setSelectedAgeRange("");
      setValidatedCode("");
      setConsentCode("");
    } else if (result.status === "invalid_code") {
      toast.error(t("invalidCode"));
    } else if (result.status === "rate_limited") {
      toast.error(t("rateLimited"));
    } else {
      toast.error(t("errorMessage"));
    }
  }

  function handleBackToAge() {
    setMode("initial");
    setSelectedAgeRange("");
    setConsentCode("");
    setCodeError("");
    setValidatedCode("");
    parentForm.reset();
    volunteerForm.reset();
  }

  // ─── MODE: Initial — only age range selector ───────────────────────────────

  if (mode === "initial") {
    return (
      <div className="space-y-6">
        <fieldset className="space-y-4">
          <legend className="font-heading text-xl font-bold">
            {t("personalHeading")}
          </legend>
          <p className="text-sm text-muted-foreground">
            {t("ageRangeLabel")}
          </p>

          <Select onValueChange={handleAgeRangeSelect} value={selectedAgeRange}>
            <SelectTrigger>
              <SelectValue placeholder={t("ageRangePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {ageRangeOptions.map(({ value, labelKey }) => (
                <SelectItem key={value} value={value}>
                  {t(labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </fieldset>

        <button
          type="button"
          onClick={() => setMode("code_entry")}
          className="text-sm text-primary underline-offset-4 hover:underline"
        >
          <KeyRound className="mr-1 inline-block size-4" aria-hidden="true" />
          {t("consentAlreadyHaveCode")}
        </button>
      </div>
    );
  }

  // ─── MODE: Parent Contact — Phase 1 (zero child PII) ──────────────────────

  if (mode === "parent_contact") {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={handleBackToAge}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("ageRangeLabel")}
        </button>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 dark:border-amber-900/50 dark:bg-amber-950/20">
          <h2 className="font-heading text-xl font-bold">
            {t("consentHeading")}
          </h2>
          <div className="mt-3 flex items-start gap-3 rounded-lg bg-amber-100/60 p-4 text-sm dark:bg-amber-900/20">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <p className="text-amber-800 dark:text-amber-200">
              {t("consentNotice")}
            </p>
          </div>

          {isUnder16 && (
            <div className="mt-3 flex items-start gap-3 rounded-lg bg-red-100/60 p-4 text-sm dark:bg-red-900/20" role="alert">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
              <p className="font-medium text-red-800 dark:text-red-200">
                {t("parentPresentNotice")}
              </p>
            </div>
          )}

          <Form {...parentForm}>
            <form onSubmit={parentForm.handleSubmit(onParentSubmit)} className="mt-6 space-y-6">
              <FormField
                control={parentForm.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("consentParentNameLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("consentParentNamePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={parentForm.control}
                name="parentEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("consentParentEmailLabel")}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t("consentParentEmailPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={parentForm.control}
                name="parentPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("consentParentPhoneLabel")}</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder={t("consentParentPhonePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full"
                >
                  {isSubmitting ? (
                    t("consentSubmitting")
                  ) : (
                    <>
                      <Send className="size-4" aria-hidden="true" />
                      {t("consentSubmitButton")}
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => setMode("code_entry")}
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  <KeyRound className="mr-1 inline-block size-4" aria-hidden="true" />
                  {t("consentAlreadyHaveCode")}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  // ─── MODE: Code Entry — validate consent code ──────────────────────────────

  if (mode === "code_entry") {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={handleBackToAge}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("ageRangeLabel")}
        </button>

        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6 dark:border-blue-900/50 dark:bg-blue-950/20">
          <h2 className="font-heading text-xl font-bold">
            <KeyRound className="mr-2 inline-block size-5" aria-hidden="true" />
            {t("consentCodeHeading")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("consentCodeDescription")}
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="consent-code" className="text-sm font-medium">
                {t("consentCodeLabel")}
              </label>
              <Input
                id="consent-code"
                value={consentCode}
                onChange={(e) => {
                  setConsentCode(e.target.value.toUpperCase());
                  setCodeError("");
                }}
                placeholder={t("consentCodePlaceholder")}
                maxLength={9}
                className="mt-1.5 font-mono text-lg tracking-widest uppercase"
                aria-describedby={codeError ? "consent-code-error" : undefined}
              />
              {codeError && (
                <p id="consent-code-error" className="mt-1.5 text-sm text-destructive" role="alert">
                  {codeError}
                </p>
              )}
            </div>

            <Button
              type="button"
              onClick={handleCodeValidation}
              disabled={isValidatingCode || consentCode.length !== 9}
              className="rounded-full"
            >
              {isValidatingCode ? (
                t("validatingCode")
              ) : (
                <>
                  <CheckCircle className="size-4" aria-hidden="true" />
                  {t("validateCodeButton")}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ─── MODE: Full Form — complete volunteer signup ───────────────────────────

  return (
    <Form {...volunteerForm}>
      <form onSubmit={volunteerForm.handleSubmit(onVolunteerSubmit)} className="space-y-10">
        {/* Back button */}
        <button
          type="button"
          onClick={handleBackToAge}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("ageRangeLabel")}
        </button>

        {/* Consent code confirmation for minors */}
        {isMinor && validatedCode && (
          <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-950/20">
            <CheckCircle className="mt-0.5 size-5 shrink-0 text-green-600 dark:text-green-400" aria-hidden="true" />
            <div>
              <p className="font-medium text-green-800 dark:text-green-200">
                {t("codeValidSuccess")}
              </p>
              <p className="mt-1 font-mono text-sm tracking-wider text-green-700 dark:text-green-300">
                {validatedCode}
              </p>
            </div>
          </div>
        )}

        {/* Personal Information */}
        <fieldset className="space-y-6">
          <legend className="font-heading text-xl font-bold">
            {t("personalHeading")}
          </legend>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={volunteerForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("firstNameLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("firstNamePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={volunteerForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("lastNameLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("lastNamePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={volunteerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("emailLabel")}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t("emailPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={volunteerForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("phoneLabel")}</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder={t("phonePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Age range display — locked to selection */}
            <div className="space-y-2">
              <p className="text-sm font-medium">{t("ageRangeLabel")}</p>
              <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                {(() => {
                  const option = ageRangeOptions.find((o) => o.value === selectedAgeRange);
                  return option ? t(option.labelKey) : selectedAgeRange;
                })()}
              </p>
              {/* Hidden field for form data */}
              <input type="hidden" {...volunteerForm.register("ageRange")} />
            </div>

            <FormField
              control={volunteerForm.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("zipCodeLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("zipCodePlaceholder")} maxLength={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>

        {/* Parent/Guardian — shown for minors (pre-populated from consent flow) */}
        {isMinor && (
          <fieldset className="space-y-6 rounded-2xl border border-amber-200 bg-amber-50/50 p-6 dark:border-amber-900/50 dark:bg-amber-950/20">
            <legend className="font-heading text-xl font-bold">
              {t("parentHeading")}
            </legend>

            {isUnder16 && (
              <div className="flex items-start gap-3 rounded-lg bg-red-100/60 p-4 text-sm dark:bg-red-900/20" role="alert">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
                <p className="font-medium text-red-800 dark:text-red-200">{t("parentPresentNotice")}</p>
              </div>
            )}

            <FormField
              control={volunteerForm.control}
              name="parentGuardianName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("parentNameLabel")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("parentNamePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={volunteerForm.control}
              name="parentGuardianEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("parentEmailLabel")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t("parentEmailPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={volunteerForm.control}
              name="parentGuardianPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("parentPhoneLabel")}</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder={t("parentPhonePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
        )}

        {/* Interests */}
        <fieldset className="space-y-4">
          <legend className="font-heading text-xl font-bold">
            {t("interestsHeading")}
          </legend>
          <p className="text-sm text-muted-foreground">{t("interestsDescription")}</p>

          <FormField
            control={volunteerForm.control}
            name="interests"
            render={() => (
              <FormItem>
                <div className="grid gap-3 sm:grid-cols-2">
                  {interestOptions.map(({ value, labelKey }) => (
                    <FormField
                      key={value}
                      control={volunteerForm.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(value)}
                              onCheckedChange={(checked) => {
                                const current = field.value ?? [];
                                field.onChange(
                                  checked
                                    ? [...current, value]
                                    : current.filter((v: string) => v !== value),
                                );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer font-normal">
                            {t(labelKey)}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        {/* Availability */}
        <fieldset className="space-y-4">
          <legend className="font-heading text-xl font-bold">
            {t("availabilityHeading")}
          </legend>
          <p className="text-sm text-muted-foreground">{t("availabilityDescription")}</p>

          <FormField
            control={volunteerForm.control}
            name="availability"
            render={() => (
              <FormItem>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {availabilityOptions.map(({ value, labelKey }) => (
                    <FormField
                      key={value}
                      control={volunteerForm.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(value)}
                              onCheckedChange={(checked) => {
                                const current = field.value ?? [];
                                field.onChange(
                                  checked
                                    ? [...current, value]
                                    : current.filter((v: string) => v !== value),
                                );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer font-normal">
                            {t(labelKey)}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        {/* Additional Information */}
        <fieldset className="space-y-6">
          <legend className="font-heading text-xl font-bold">
            {t("additionalHeading")}
          </legend>

          <FormField
            control={volunteerForm.control}
            name="howHeard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("howHeardLabel")}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value ?? ""}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("howHeardPlaceholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {howHeardOptions.map(({ value, labelKey }) => (
                      <SelectItem key={value} value={value}>
                        {t(labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={volunteerForm.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("skillsLabel")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t("skillsPlaceholder")} rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={volunteerForm.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("messageLabel")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t("messagePlaceholder")} rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        {/* Agreements */}
        <fieldset className="space-y-4">
          <legend className="font-heading text-xl font-bold">
            {t("agreementsHeading")}
          </legend>

          <FormField
            control={volunteerForm.control}
            name="agreeToCodeOfConduct"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1">
                  <FormLabel className="cursor-pointer font-normal">
                    {t("agreeCodeOfConduct")}
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={volunteerForm.control}
            name="agreeToPrivacy"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1">
                  <FormLabel className="cursor-pointer font-normal">
                    {t("agreePrivacy")}
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={volunteerForm.control}
            name="receiveUpdates"
            render={({ field }) => (
              <FormItem className="flex items-start gap-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value === true}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="cursor-pointer font-normal">
                  {t("receiveUpdates")}
                </FormLabel>
              </FormItem>
            )}
          />
        </fieldset>

        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="w-full rounded-full sm:w-auto"
        >
          {isSubmitting ? (
            t("submitting")
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              {t("submitButton")}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
