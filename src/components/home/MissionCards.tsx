import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, BookOpen, Users } from "lucide-react";

const missions = [
  {
    icon: Shield,
    titleKey: "missionProtectTitle" as const,
    descKey: "missionProtectDescription" as const,
    href: "/conservation/projects",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-950/30",
  },
  {
    icon: BookOpen,
    titleKey: "missionEducateTitle" as const,
    descKey: "missionEducateDescription" as const,
    href: "/learn/articles",
    color: "text-ocean-600 dark:text-ocean-400",
    bg: "bg-ocean-50 dark:bg-ocean-950/30",
  },
  {
    icon: Users,
    titleKey: "missionConnectTitle" as const,
    descKey: "missionConnectDescription" as const,
    href: "/volunteer",
    color: "text-coral-600 dark:text-coral-400",
    bg: "bg-coral-50 dark:bg-coral-950/30",
  },
];

export function MissionCards() {
  const t = useTranslations("home");

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight">
          {t("missionHeading")}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <Link key={mission.titleKey} href={mission.href} className="group">
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div
                      className={`mb-4 flex size-14 items-center justify-center rounded-full ${mission.bg}`}
                    >
                      <Icon className={`size-7 ${mission.color}`} aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold group-hover:text-primary">
                      {t(mission.titleKey)}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t(mission.descKey)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
