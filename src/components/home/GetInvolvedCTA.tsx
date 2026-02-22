import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart } from "lucide-react";

export function GetInvolvedCTA() {
  const t = useTranslations("home");

  return (
    <section className="bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight">
          {t("involvedHeading")}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {/* Volunteer card */}
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-950/30">
                <Users className="size-7 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold">
                {t("involvedVolunteerTitle")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("involvedVolunteerDescription")}
              </p>
              <Button asChild>
                <Link href="/volunteer">{t("involvedVolunteerCta")}</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Donate card */}
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-coral-50 dark:bg-coral-950/30">
                <Heart className="size-7 text-coral-600 dark:text-coral-400" />
              </div>
              <h3 className="font-heading text-xl font-semibold">
                {t("involvedDonateTitle")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("involvedDonateDescription")}
              </p>
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link href="/donate">{t("involvedDonateCta")}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
