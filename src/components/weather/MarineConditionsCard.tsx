"use client";

import { useTranslations } from "next-intl";
import { Waves } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MarineConditions } from "@/lib/types/weather";
import {
  formatWaveHeight,
  formatWavePeriod,
  formatWindDirection,
} from "@/lib/utils/weather-format";

type MarineConditionsCardProps = {
  marine: MarineConditions;
};

export function MarineConditionsCard({ marine }: MarineConditionsCardProps) {
  const t = useTranslations("weather");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Waves className="size-5 text-teal-500" aria-hidden="true" />
          {t("marineConditions")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">{t("waveHeight")}</p>
            <p className="text-lg font-semibold">{formatWaveHeight(marine.waveHeight)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t("wavePeriod")}</p>
            <p className="text-lg font-semibold">{formatWavePeriod(marine.wavePeriod)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t("swellHeight")}</p>
            <p className="text-lg font-semibold">{formatWaveHeight(marine.swellHeight)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t("swellPeriod")}</p>
            <p className="text-lg font-semibold">{formatWavePeriod(marine.swellPeriod)}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs text-muted-foreground">{t("swellDirection")}</p>
            <p className="text-lg font-semibold">
              {formatWindDirection(marine.swellDirection)} ({Math.round(marine.swellDirection)}°)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
