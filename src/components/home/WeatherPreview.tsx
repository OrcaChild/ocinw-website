import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudSun, Waves, ArrowRight } from "lucide-react";

export function WeatherPreview() {
  const t = useTranslations("home");

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight">
          {t("weatherHeading")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          {t("weatherDescription")}
        </p>
        <Card className="mx-auto mt-8 max-w-lg">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex gap-3">
              <CloudSun
                className="size-10 text-ocean-500"
                aria-hidden="true"
              />
              <Waves
                className="size-10 text-teal-500"
                aria-hidden="true"
              />
            </div>
            <p className="font-medium">
              {t("weatherDescription")}
            </p>
            <Button asChild className="gap-2">
              <Link href="/weather">
                {t("weatherCta")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
