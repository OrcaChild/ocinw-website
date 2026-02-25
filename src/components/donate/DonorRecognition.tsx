import { useTranslations } from "next-intl";
import { Shell, Leaf, Waves, Fish } from "lucide-react";

const tiers = [
  { key: "TidePool", icon: Shell, gradient: "from-sky-400/20 to-teal-400/20" },
  { key: "KelpForest", icon: Leaf, gradient: "from-teal-400/20 to-emerald-400/20" },
  { key: "OpenOcean", icon: Waves, gradient: "from-blue-400/20 to-indigo-400/20" },
  { key: "OrcaCircle", icon: Fish, gradient: "from-indigo-400/20 to-purple-400/20" },
] as const;

export function DonorRecognition() {
  const t = useTranslations("donate");

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {t("recognitionHeading")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          {t("recognitionDescription")}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map(({ key, icon: Icon, gradient }) => (
            <div
              key={key}
              className="group relative overflow-hidden rounded-2xl border border-border/50 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 transition-opacity duration-300 group-hover:opacity-80`}
                aria-hidden="true"
              />
              <div className="relative">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm dark:bg-white/10">
                  <Icon
                    className="size-7 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold">
                  {t(`tier${key}`)}
                </h3>
                <p className="mt-1 text-lg font-semibold text-primary">
                  {t(`tier${key}Range`)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`tier${key}Description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
