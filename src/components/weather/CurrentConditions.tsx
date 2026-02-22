"use client";

import { useTranslations } from "next-intl";
import {
  Droplets,
  Eye,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CurrentWeather } from "@/lib/types/weather";
import {
  formatTemperature,
  formatWindSpeed,
  formatWindDirection,
  formatUvIndex,
} from "@/lib/utils/weather-format";
import { WeatherIcon } from "./WeatherIcon";

type CurrentConditionsProps = {
  weather: CurrentWeather;
};

export function CurrentConditions({ weather }: CurrentConditionsProps) {
  const t = useTranslations("weather");
  const uv = formatUvIndex(weather.uvIndex);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="size-5 text-sand-500" aria-hidden="true" />
          {t("currentConditions")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Main temperature display */}
        <div className="flex items-center gap-4">
          <WeatherIcon iconName={weather.weatherIcon} className="size-16 text-ocean-500" aria-hidden="true" />
          <div>
            <p className="font-heading text-5xl font-bold">
              {formatTemperature(weather.temperature)}
            </p>
            <p className="text-muted-foreground">
              {weather.weatherDescription}
            </p>
          </div>
        </div>

        {/* Detail grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <DetailItem
            icon={<Thermometer className="size-4" aria-hidden="true" />}
            label={t("feelsLike")}
            value={formatTemperature(weather.feelsLike)}
          />
          <DetailItem
            icon={<Droplets className="size-4" aria-hidden="true" />}
            label={t("humidity")}
            value={`${weather.humidity}%`}
          />
          <DetailItem
            icon={<Wind className="size-4" aria-hidden="true" />}
            label={t("wind")}
            value={`${formatWindSpeed(weather.windSpeed)} ${formatWindDirection(weather.windDirection)}`}
          />
          <DetailItem
            icon={<Wind className="size-4" aria-hidden="true" />}
            label={t("windGusts")}
            value={formatWindSpeed(weather.windGusts)}
          />
          <DetailItem
            icon={<Eye className="size-4" aria-hidden="true" />}
            label={t("uvIndex")}
            value={`${uv.value} (${uv.level})`}
          />
          <DetailItem
            icon={<Droplets className="size-4" aria-hidden="true" />}
            label={t("precipitation")}
            value={`${weather.precipitation} in`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
