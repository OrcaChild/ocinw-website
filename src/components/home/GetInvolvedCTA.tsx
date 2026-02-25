import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Users, Heart, ArrowRight } from "lucide-react";

export function GetInvolvedCTA() {
  const t = useTranslations("home");

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {t("involvedHeading")}
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {/* Volunteer card — full image background */}
          <div className="group relative h-80 overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl sm:h-96">
            <Image
              src="/images/activities/volunteers-cleanup.jpg"
              alt={t("involvedVolunteerImageAlt")}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-teal-900/85 via-teal-900/40 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Users className="size-6" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-2xl font-bold">
                {t("involvedVolunteerTitle")}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85">
                {t("involvedVolunteerDescription")}
              </p>
              <div className="mt-6">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white px-6 text-teal-700 shadow-lg hover:bg-white/90"
                >
                  <Link href="/volunteer">
                    {t("involvedVolunteerCta")}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Donate card — full image background */}
          <div className="group relative h-80 overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl sm:h-96">
            <Image
              src="/images/landscapes/ocean-sunset.jpg"
              alt={t("involvedDonateImageAlt")}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-coral-900/85 via-coral-900/40 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Heart className="size-6" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-2xl font-bold">
                {t("involvedDonateTitle")}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85">
                {t("involvedDonateDescription")}
              </p>
              <div className="mt-6">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white px-6 text-coral-700 shadow-lg hover:bg-white/90"
                >
                  <Link href="/donate">
                    {t("involvedDonateCta")}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
