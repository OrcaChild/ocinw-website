"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowDown, ArrowUp, Waves } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TideData } from "@/lib/types/tides";
import { formatTideHeight, formatTime, formatRelativeTime } from "@/lib/utils/weather-format";

type TideStatusProps = {
  tides: TideData;
};

export function TideStatus({ tides }: TideStatusProps) {
  const t = useTranslations("weather");
  const locale = useLocale();
  const unitFt = t("unitFt");
  const { currentTide, station } = tides;

  const isRising = currentTide.status === "rising";
  const StatusIcon = isRising ? ArrowUp : ArrowDown;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Waves className="size-5 text-ocean-500" aria-hidden="true" />
          {t("tideStatus")}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {t("tideStation")}: {station.name}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current status */}
        <div className="flex items-center gap-3">
          <StatusIcon
            className={`size-8 ${isRising ? "text-teal-500" : "text-ocean-500"}`}
            aria-hidden="true"
          />
          <div>
            <p className="text-lg font-semibold">
              {isRising ? t("tideRising") : t("tideFalling")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("currentHeight")}: {formatTideHeight(currentTide.currentEstimatedHeight, unitFt)}
            </p>
          </div>
        </div>

        {/* Next high/low */}
        <div className="grid grid-cols-2 gap-4">
          {currentTide.nextHigh ? (
            <div className="rounded-lg border p-3">
              <p className="text-xs font-medium text-muted-foreground">{t("nextHigh")}</p>
              <p className="mt-1 font-semibold">
                {formatTideHeight(currentTide.nextHigh.height, unitFt)}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatTime(currentTide.nextHigh.time, locale)}
              </p>
              <p className="text-xs text-ocean-500">
                {formatRelativeTime(currentTide.nextHigh.time, locale)}
              </p>
            </div>
          ) : null}
          {currentTide.nextLow ? (
            <div className="rounded-lg border p-3">
              <p className="text-xs font-medium text-muted-foreground">{t("nextLow")}</p>
              <p className="mt-1 font-semibold">
                {formatTideHeight(currentTide.nextLow.height, unitFt)}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatTime(currentTide.nextLow.time, locale)}
              </p>
              <p className="text-xs text-ocean-500">
                {formatRelativeTime(currentTide.nextLow.time, locale)}
              </p>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
