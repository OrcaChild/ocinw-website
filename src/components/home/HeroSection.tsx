import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Heart, Users, ChevronDown } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("home");

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src="/images/hero/coastal-golden-hour.jpg"
        alt={t("heroImageAlt")}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Warm gradient overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 drop-shadow-md sm:text-xl">
          {t("subtitle")}
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="w-full rounded-full px-8 text-base shadow-lg sm:w-auto"
          >
            <Link href="/volunteer">
              <Users className="size-5" aria-hidden="true" />
              {t("ctaVolunteer")}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="w-full rounded-full border-white/30 bg-white/20 px-8 text-base text-white shadow-lg backdrop-blur-sm hover:bg-white/30 sm:w-auto"
          >
            <Link href="/donate">
              <Heart className="size-5" aria-hidden="true" />
              {t("ctaDonate")}
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 z-10 flex animate-bounce flex-col items-center text-white/70 motion-reduce:animate-none">
        <span className="text-xs">{t("heroScrollHint")}</span>
        <ChevronDown className="mt-1 size-4" aria-hidden="true" />
      </div>

      {/* Organic wave divider at bottom */}
      <div className="absolute bottom-0 left-0 z-10 w-full" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          className="block w-full fill-background"
          preserveAspectRatio="none"
        >
          <path d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
