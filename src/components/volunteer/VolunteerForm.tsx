"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Send, AlertTriangle } from "lucide-react";

import {
  volunteerFormSchema,
  type VolunteerFormData,
} from "@/lib/types/forms";
import { submitVolunteerForm } from "@/app/actions/volunteer";
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

export function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("volunteer");

  const form = useForm<VolunteerFormData>({
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
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- form.watch() is needed for conditional age-gating; React Compiler safely skips this component
  const ageRange = form.watch("ageRange");
  const isMinor = ageRange === "under-13" || ageRange === "13-17";

  async function onSubmit(data: VolunteerFormData) {
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

    const result = await submitVolunteerForm(formData);

    setIsSubmitting(false);

    if (result.status === "success") {
      toast.success(t("successTitle"), {
        description: t("successMessage"),
      });
      form.reset();
    } else if (result.status === "rate_limited") {
      toast.error(t("rateLimited"));
    } else {
      toast.error(t("errorMessage"));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {/* Personal Information */}
        <fieldset className="space-y-6">
          <legend className="font-heading text-xl font-bold">
            {t("personalHeading")}
          </legend>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
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
              control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            <FormField
              control={form.control}
              name="ageRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("ageRangeLabel")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("ageRangePlaceholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ageRangeOptions.map(({ value, labelKey }) => (
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
              control={form.control}
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

        {/* Parent/Guardian Information — conditionally shown for minors */}
        {isMinor && (
          <fieldset className="space-y-6 rounded-2xl border border-amber-200 bg-amber-50/50 p-6 dark:border-amber-900/50 dark:bg-amber-950/20">
            <legend className="font-heading text-xl font-bold">
              {t("parentHeading")}
            </legend>
            <div className="flex items-start gap-3 rounded-lg bg-amber-100/60 p-4 text-sm dark:bg-amber-900/20">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <p className="text-amber-800 dark:text-amber-200">{t("parentNotice")}</p>
            </div>

            <FormField
              control={form.control}
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
              control={form.control}
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
              control={form.control}
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
            control={form.control}
            name="interests"
            render={() => (
              <FormItem>
                <div className="grid gap-3 sm:grid-cols-2">
                  {interestOptions.map(({ value, labelKey }) => (
                    <FormField
                      key={value}
                      control={form.control}
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
            control={form.control}
            name="availability"
            render={() => (
              <FormItem>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {availabilityOptions.map(({ value, labelKey }) => (
                    <FormField
                      key={value}
                      control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
            control={form.control}
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
