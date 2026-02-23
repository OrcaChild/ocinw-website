"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Waves } from "lucide-react";
import type { TideData } from "@/lib/types/tides";
import { fetchHourlyTides } from "@/lib/api/tides";
import { formatTideHeight, formatTime } from "@/lib/utils/weather-format";
import type { ChartDataPoint } from "./TideChartInner";

// Lazy-load Recharts to avoid SSR issues (Recharts uses window/document)
import dynamic from "next/dynamic";

const LazyChart = dynamic(() => import("./TideChartInner"), {
  ssr: false,
  loading: () => <Skeleton className="h-[250px] w-full" />,
});

export type { ChartDataPoint };

type TideChartProps = {
  tides: TideData;
};

export function TideChart({ tides }: TideChartProps) {
  const t = useTranslations("weather");
  const locale = useLocale();
  const unitFt = t("unitFt");
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadHourly() {
      setLoading(true);
      try {
        const hourly = await fetchHourlyTides(tides.station.id);
        if (cancelled) return;

        const now = Date.now();
        const cutoff = now + 24 * 60 * 60 * 1000;
        const filtered = hourly.filter((p) => {
          const pTime = new Date(p.time).getTime();
          return pTime >= now - 60 * 60 * 1000 && pTime <= cutoff;
        });

        const data: ChartDataPoint[] = filtered.map((p) => ({
          time: p.time,
          timeLabel: formatTime(p.time, locale),
          height: Math.round(p.height * 100) / 100,
        }));

        setChartData(data);
      } catch {
        // Fallback: use hi/lo predictions as chart points
        const data: ChartDataPoint[] = tides.predictions.slice(0, 8).map((p) => ({
          time: p.time,
          timeLabel: formatTime(p.time, locale),
          height: Math.round(p.height * 100) / 100,
        }));
        if (!cancelled) setChartData(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadHourly();
    return () => { cancelled = true; };
  }, [tides.station.id, tides.predictions, locale]);

  // Hi/Lo annotations
  const annotations = tides.predictions
    .filter((p) => {
      const pTime = new Date(p.time).getTime();
      return pTime >= Date.now() && pTime <= Date.now() + 24 * 60 * 60 * 1000;
    })
    .slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Waves className="size-5 text-ocean-500" aria-hidden="true" />
          {t("tideChart")}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {t("tideStation")}: {tides.station.name} · 24h view
        </p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-[250px] w-full" />
        ) : chartData.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {t("tideUnavailable")}
          </p>
        ) : (
          <div aria-label={t("tideChartLabel")} role="img">
            <LazyChart chartData={chartData} nowLabel={t("now")} locale={locale} unitFt={unitFt} />

            {/* Hi/Lo annotations below chart */}
            {annotations.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-3">
                {annotations.map((a) => (
                  <span
                    key={a.time}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      a.type === "H"
                        ? "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
                        : "bg-ocean-100 text-ocean-800 dark:bg-ocean-900 dark:text-ocean-200"
                    }`}
                  >
                    {a.type === "H" ? t("highTide") : t("lowTide")}{" "}
                    {formatTideHeight(a.height, unitFt)} at {formatTime(a.time, locale)}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
