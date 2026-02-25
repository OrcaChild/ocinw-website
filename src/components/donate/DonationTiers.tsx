import { useTranslations } from "next-intl";
import {
  Trash2,
  BookOpen,
  Droplets,
  GraduationCap,
  TreePalm,
  Waves,
  Heart,
} from "lucide-react";

const tiers = [
  { key: "10", icon: Trash2 },
  { key: "25", icon: BookOpen },
  { key: "50", icon: Droplets },
  { key: "100", icon: GraduationCap },
  { key: "250", icon: TreePalm },
  { key: "500", icon: Waves },
] as const;

export function DonationTiers() {
  const t = useTranslations("donate");

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {t("tiersHeading")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          {t("tiersDescription")}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group rounded-2xl border border-border/50 bg-white/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white/5"
            >
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold text-primary">
                    {t(`tier${key}Amount`)}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t(`tier${key}Label`)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Custom amount card */}
          <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 sm:col-span-2 lg:col-span-3">
            <div className="flex items-center justify-center gap-3 text-center">
              <Heart
                className="size-5 text-primary"
                aria-hidden="true"
              />
              <div>
                <p className="font-heading text-lg font-bold text-primary">
                  {t("tierCustom")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("tierCustomLabel")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
