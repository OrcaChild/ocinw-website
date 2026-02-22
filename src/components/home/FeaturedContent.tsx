import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Fish, CalendarDays } from "lucide-react";

const placeholders = [
  {
    headingKey: "featuredArticlesHeading" as const,
    icon: FileText,
    color: "text-ocean-500",
  },
  {
    headingKey: "featuredSpeciesHeading" as const,
    icon: Fish,
    color: "text-teal-500",
  },
  {
    headingKey: "featuredEventsHeading" as const,
    icon: CalendarDays,
    color: "text-coral-500",
  },
];

export function FeaturedContent() {
  const t = useTranslations("home");

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight">
          {t("featuredHeading")}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placeholders.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.headingKey}>
                <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                  <Icon
                    className={`size-8 ${item.color}`}
                    aria-hidden="true"
                  />
                  <h3 className="font-heading text-lg font-semibold">
                    {t(item.headingKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("featuredPlaceholder")}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
