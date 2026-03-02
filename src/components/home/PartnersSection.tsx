import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Handshake, ArrowRight } from "lucide-react";

export function PartnersSection() {
  const t = useTranslations("home");

  return (
    <section className="bg-sand-50/50 px-4 py-20 dark:bg-white/[0.02] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {t("partnersHeading")}
        </h2>
        <p className="mt-3 text-muted-foreground">{t("partnersDescription")}</p>

        {/* Placeholder partner logos — will be replaced with real logos */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex size-20 items-center justify-center rounded-2xl bg-white/80 text-xs text-muted-foreground shadow-sm dark:bg-white/5"
              aria-hidden="true"
            >
              <Handshake className="size-8" />
            </div>
          ))}
        </div>

        <Button asChild variant="outline" className="mt-10 rounded-full px-6">
          <Link href="/contact">
            {t("partnersCta")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
