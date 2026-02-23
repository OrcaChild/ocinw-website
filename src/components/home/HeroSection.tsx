import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Heart, Users, ChevronDown } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("home");

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-ocean-50 via-background to-background px-4 py-20 text-center dark:from-ocean-900/30">
      {/* Decorative background circles */}
      <div
        className="absolute -left-32 -top-32 size-96 rounded-full bg-ocean-100/40 blur-3xl dark:bg-ocean-800/20"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 size-96 rounded-full bg-teal-100/40 blur-3xl dark:bg-teal-800/20"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {t("subtitle")}
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/volunteer">
              <Users className="size-5" aria-hidden="true" />
              {t("ctaVolunteer")}
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/donate">
              <Heart className="size-5" aria-hidden="true" />
              {t("ctaDonate")}
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex animate-bounce flex-col items-center text-muted-foreground motion-reduce:animate-none">
        <span className="text-xs">{t("heroScrollHint")}</span>
        <ChevronDown className="mt-1 size-4" aria-hidden="true" />
      </div>
    </section>
  );
}
