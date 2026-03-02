"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCw, Home } from "lucide-react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: Props) {
  const t = useTranslations("error");

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <AlertTriangle
        className="size-16 text-destructive"
        aria-hidden="true"
      />
      <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight">
        {t("errorTitle")}
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        {t("errorMessage")}
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={reset} className="rounded-full">
          <RotateCw className="size-4" />
          {t("errorReset")}
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/">
            <Home className="size-4" />
            {t("errorGoHome")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
