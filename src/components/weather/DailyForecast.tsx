"use client";

import { useTranslations } from "next-intl";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DailyForecastEntry } from "@/lib/types/weather";
import {
  formatTemperature,
  formatPrecipitation,
  formatWindSpeed,
  formatDate,
  formatTime,
} from "@/lib/utils/weather-format";
import { getWeatherInfo } from "@/lib/data/weather-codes";
import { WeatherIcon } from "./WeatherIcon";

type DailyForecastProps = {
  daily: DailyForecastEntry[];
};

export function DailyForecast({ daily }: DailyForecastProps) {
  const t = useTranslations("weather");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="size-5 text-ocean-500" aria-hidden="true" />
          {t("forecast")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {daily.map((day) => {
            const info = getWeatherInfo(day.weatherCode);

            return (
              <div
                key={day.date}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                <WeatherIcon iconName={info.icon} className="size-8 shrink-0 text-ocean-500" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between">
                    <p className="font-medium">{formatDate(day.date)}</p>
                    <p className="text-sm">
                      <span className="font-semibold">{formatTemperature(day.tempMax)}</span>
                      {" / "}
                      <span className="text-muted-foreground">{formatTemperature(day.tempMin)}</span>
                    </p>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>{info.description}</span>
                    <span>💧 {formatPrecipitation(day.precipitationProbability)}</span>
                    <span>💨 {formatWindSpeed(day.windSpeedMax)}</span>
                    <span>
                      {t("sunrise")} {formatTime(day.sunrise)} · {t("sunset")} {formatTime(day.sunset)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
