"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Heart, Mail, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface DonationWidgetProps {
  embedUrl: string | undefined;
  donationsEnabled: boolean;
}

export function DonationWidget({ embedUrl, donationsEnabled }: DonationWidgetProps) {
  const t = useTranslations("donate");
  const [isLoading, setIsLoading] = useState(true);

  const isConfigured = embedUrl && embedUrl.includes("zeffy.com");

  // Donations are paused until the IRS grants federal 501(c)(3) status.
  // Show a clear notice and a disabled Donate control instead of the form.
  if (!donationsEnabled) {
    return (
      <section className="bg-sand-50/50 px-4 py-20 dark:bg-white/[0.02] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {t("statusNoticeHeading")}
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-card">
            <div className="flex flex-col items-center gap-6 p-12 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                <Heart className="size-8 text-primary" aria-hidden="true" />
              </div>
              <p
                id="donations-status-notice"
                className="max-w-md text-muted-foreground"
              >
                {t("statusNoticeBody")}
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  aria-describedby="donations-status-notice"
                  title={t("statusNoticeButtonTooltip")}
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-muted px-6 py-3 text-sm font-medium text-muted-foreground opacity-70"
                >
                  <Heart className="size-4" aria-hidden="true" />
                  {t("statusNoticeButton")}
                </button>
                <Link
                  href="/volunteer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Users className="size-4" aria-hidden="true" />
                  {t("statusNoticeVolunteerCta")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-sand-50/50 px-4 py-20 dark:bg-white/[0.02] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {t("formHeading")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("formDescription")}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-card">
          {isConfigured ? (
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white p-8 dark:bg-card">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="mt-4 h-12 w-full max-w-sm" />
                  <Skeleton className="h-12 w-full max-w-sm" />
                  <Skeleton className="h-12 w-full max-w-sm" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("formLoading")}
                  </p>
                </div>
              )}
              <iframe
                src={embedUrl}
                title={t("formHeading")}
                aria-label={t("formHeading")}
                className="h-[700px] w-full border-0"
                onLoad={() => setIsLoading(false)}
                allow="payment"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6 p-12 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                <Heart
                  className="size-8 text-primary"
                  aria-hidden="true"
                />
              </div>
              <p className="max-w-md text-muted-foreground">
                {t("formPlaceholder")}
              </p>
              <a
                href="mailto:orcachildinthewild@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Mail className="size-4" aria-hidden="true" />
                orcachildinthewild@gmail.com
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
