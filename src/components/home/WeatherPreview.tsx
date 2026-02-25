import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function WeatherPreview() {
  const t = useTranslations("home");

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="group relative overflow-hidden rounded-3xl shadow-md">
          {/* Background image */}
          <Image
            src="/images/textures/sand-ripples.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 960px"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-ocean-700/85 to-teal-700/70"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative flex flex-col items-center gap-4 p-10 text-center text-white sm:p-14">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              {t("weatherHeading")}
            </h2>
            <p className="max-w-xl text-white/85 leading-relaxed">
              {t("weatherDescription")}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-2 rounded-full bg-white px-8 text-ocean-700 shadow-lg hover:bg-white/90"
            >
              <Link href="/weather">
                {t("weatherCta")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
