import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Shield, BookOpen, Users } from "lucide-react";

const missions = [
  {
    icon: Shield,
    titleKey: "missionProtectTitle" as const,
    descKey: "missionProtectDescription" as const,
    href: "/conservation/projects",
    image: "/images/activities/tide-pool.jpg",
    imageAlt: "missionProtectImageAlt" as const,
    gradient: "from-teal-600/80 to-teal-800/60",
  },
  {
    icon: BookOpen,
    titleKey: "missionEducateTitle" as const,
    descKey: "missionEducateDescription" as const,
    href: "/learn/articles",
    image: "/images/activities/kids-exploring.jpg",
    imageAlt: "missionEducateImageAlt" as const,
    gradient: "from-ocean-600/80 to-ocean-800/60",
  },
  {
    icon: Users,
    titleKey: "missionConnectTitle" as const,
    descKey: "missionConnectDescription" as const,
    href: "/volunteer",
    image: "/images/community/beach-community.jpg",
    imageAlt: "missionConnectImageAlt" as const,
    gradient: "from-coral-600/80 to-coral-800/60",
  },
];

export function MissionCards() {
  const t = useTranslations("home");

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {t("missionHeading")}
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission) => {
            const Icon = mission.icon;
            return (
              <Link
                key={mission.titleKey}
                href={mission.href}
                className="group"
              >
                <div className="relative h-80 overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-xl">
                  {/* Background image */}
                  <Image
                    src={mission.image}
                    alt={t(mission.imageAlt)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${mission.gradient}`}
                    aria-hidden="true"
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-xl font-bold">
                      {t(mission.titleKey)}
                    </h3>
                    <p className="mt-2 text-sm text-white/85 leading-relaxed">
                      {t(mission.descKey)}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
