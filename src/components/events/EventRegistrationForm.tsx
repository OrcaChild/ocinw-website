"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Send, AlertTriangle } from "lucide-react";

import {
  eventRegistrationSchema,
  type EventRegistrationData,
} from "@/lib/types/forms";
import { submitEventRegistration } from "@/app/actions/event-registration";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface EventRegistrationFormProps {
  eventId: string;
  isWaitlist: boolean;
}

export function EventRegistrationForm({
  eventId,
  isWaitlist,
}: EventRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const t = useTranslations("events");

  const form = useForm<EventRegistrationData>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      eventId,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: undefined,
      parentEmail: "",
      emergencyContact: "",
      emergencyPhone: "",
      waiverAccepted: undefined,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- form.watch() needed for conditional age-gating; React Compiler safely skips this component
  const age = form.watch("age");
  const isMinor = typeof age === "number" && age < 18;
  const isUnder16 = typeof age === "number" && age >= 13 && age < 16;

  async function onSubmit(data: EventRegistrationData) {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.set("eventId", data.eventId);
    formData.set("firstName", data.firstName);
    formData.set("lastName", data.lastName);
    formData.set("email", data.email);
    if (data.phone) formData.set("phone", data.phone);
    formData.set("age", String(data.age));
    if (data.parentEmail) formData.set("parentEmail", data.parentEmail);
    formData.set("emergencyContact", data.emergencyContact);
    formData.set("emergencyPhone", data.emergencyPhone);
    formData.set("waiverAccepted", String(data.waiverAccepted));

    const result = await submitEventRegistration(formData);

    setIsSubmitting(false);

    if (result.status === "success") {
      toast.success(t("successTitle"), {
        description: t("successMessage"),
      });
      setIsRegistered(true);
    } else if (result.status === "waitlisted") {
      toast.info(t("waitlistedTitle"), {
        description: t("waitlistedMessage"),
      });
      setIsRegistered(true);
    } else if (result.status === "event_full") {
      toast.error(t("eventFullMessage"));
    } else if (result.status === "event_closed") {
      toast.error(t("eventClosedMessage"));
    } else if (result.status === "rate_limited") {
      toast.error(t("rateLimited"));
    } else {
      toast.error(t("errorMessage"));
    }
  }

  if (isRegistered) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center dark:border-green-900/50 dark:bg-green-950/20" role="alert">
        <p className="font-heading text-lg font-bold text-green-800 dark:text-green-200">
          {t("successTitle")}
        </p>
        <p className="mt-2 text-sm text-green-700 dark:text-green-300">
          {t("successMessage")}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold">{t("registrationHeading")}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("registrationDescription")}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-8">
          {/* Hidden event ID */}
          <input type="hidden" {...form.register("eventId")} />

          {/* Personal Information */}
          <fieldset className="space-y-6">
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

            <div className="grid gap-6 sm:grid-cols-2">
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

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("ageLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={13}
                        max={120}
                        placeholder={t("agePlaceholder")}
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          {/* Parent/Guardian — shown for minors */}
          {isMinor && (
            <fieldset className="space-y-6 rounded-2xl border border-amber-200 bg-amber-50/50 p-6 dark:border-amber-900/50 dark:bg-amber-950/20">
              <legend className="font-heading text-lg font-bold">
                {t("parentEmailLabel")}
              </legend>
              <div className="flex items-start gap-3 rounded-lg bg-amber-100/60 p-4 text-sm dark:bg-amber-900/20">
                <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <p className="text-amber-800 dark:text-amber-200">{t("parentNotice")}</p>
              </div>

              {isUnder16 && (
                <div className="flex items-start gap-3 rounded-lg bg-red-100/60 p-4 text-sm dark:bg-red-900/20" role="alert">
                  <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
                  <p className="font-medium text-red-800 dark:text-red-200">{t("parentPresentNotice")}</p>
                </div>
              )}

              <FormField
                control={form.control}
                name="parentEmail"
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
            </fieldset>
          )}

          {/* Emergency Contact */}
          <fieldset className="space-y-6">
            <legend className="font-heading text-lg font-bold">
              {t("emergencyContactLabel")}
            </legend>

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("emergencyContactLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("emergencyContactPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emergencyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("emergencyPhoneLabel")}</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder={t("emergencyPhonePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          {/* Liability Waiver */}
          <fieldset className="space-y-4">
            <legend className="font-heading text-lg font-bold">
              {t("waiverHeading")}
            </legend>
            <p className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
              {t("waiverText")}
            </p>

            <FormField
              control={form.control}
              name="waiverAccepted"
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
                      {t("waiverAcceptLabel")}
                    </FormLabel>
                    <FormMessage />
                  </div>
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
                {isWaitlist ? t("submitWaitlist") : t("submitButton")}
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
