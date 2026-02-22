"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, ShieldCheck, Anchor, Binoculars, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatUvIndex } from "@/lib/utils/weather-format";

type SafetyAdvisoryProps = {
  uvIndex: number;
};

export function SafetyAdvisory({ uvIndex }: SafetyAdvisoryProps) {
  const t = useTranslations("weather");
  const uv = formatUvIndex(uvIndex);
  const showWarning = uvIndex > 5;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-ocean-500" aria-hidden="true" />
          {t("bestTimes")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showWarning ? (
          <div
            className="flex items-start gap-3 rounded-lg border border-sand-300 bg-sand-50 p-3 dark:border-sand-700 dark:bg-sand-950"
            role="alert"
          >
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-sand-600" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium">{t("safetyAdvisory")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("uvWarning", { level: uv.level })}
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <ActivityCard
            icon={<Anchor className="size-5 text-teal-500" aria-hidden="true" />}
            title={t("bestTidePooling")}
            description={t("bestTidePoolingDesc")}
          />
          <ActivityCard
            icon={<Anchor className="size-5 text-ocean-500" aria-hidden="true" />}
            title={t("bestSurfing")}
            description={t("bestSurfingDesc")}
          />
          <ActivityCard
            icon={<Trash2 className="size-5 text-kelp-500" aria-hidden="true" />}
            title={t("bestCleanup")}
            description={t("bestCleanupDesc")}
          />
          <ActivityCard
            icon={<Binoculars className="size-5 text-sand-600" aria-hidden="true" />}
            title={t("bestWildlife")}
            description={t("bestWildlifeDesc")}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg border p-3">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
