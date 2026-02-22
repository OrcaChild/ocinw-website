import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Waves, Home } from "lucide-react";

export default function NotFoundPage() {
  const t = useTranslations("error");
  const tNav = useTranslations("nav");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <Waves
        className="size-20 text-ocean-300 dark:text-ocean-700"
        aria-hidden="true"
      />
      <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        {t("notFoundTitle")}
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        {t("notFoundMessage")}
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          <Home className="size-4" />
          {t("notFoundGoHome")}
        </Link>
      </Button>

      <div className="mt-12">
        <h2 className="mb-4 text-sm font-semibold text-muted-foreground">
          {t("notFoundPopularHeading")}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/about">{tNav("about")}</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/volunteer">{tNav("volunteer")}</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/donate">{tNav("donate")}</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/contact">{tNav("contact")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
