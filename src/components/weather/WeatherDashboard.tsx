"use client";

// =============================================================================
// Weather & Tides Dashboard — Main client component
// Combines all weather/tide sub-components into a single dashboard.
// =============================================================================

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { RefreshCw, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGeolocation } from "@/lib/hooks/useGeolocation";
import { useWeather } from "@/lib/hooks/useWeather";
import { useTides } from "@/lib/hooks/useTides";
import { findNearestStation } from "@/lib/utils/geo";
import { TIDE_STATIONS } from "@/lib/data/socal-beaches";
import { LocationSelector } from "./LocationSelector";
import { CurrentConditions } from "./CurrentConditions";
import { MarineConditionsCard } from "./MarineConditionsCard";
import { TideStatus } from "./TideStatus";
import { TideChart } from "./TideChart";
import { DailyForecast } from "./DailyForecast";
import { SafetyAdvisory } from "./SafetyAdvisory";
import { StationSwitcher } from "./StationSwitcher";

export function WeatherDashboard() {
  const t = useTranslations("weather");
  const geo = useGeolocation();
  const weather = useWeather(geo.latitude, geo.longitude);

  // Station override — null means "use nearest"
  const [stationOverride, setStationOverride] = useState<string | null>(null);
  const tides = useTides(geo.latitude, geo.longitude, stationOverride);

  // Figure out which station is nearest (for the switcher label)
  const nearestStation =
    geo.latitude !== null && geo.longitude !== null
      ? findNearestStation(geo.latitude, geo.longitude, TIDE_STATIONS)
      : null;

  const handleStationSelect = useCallback((stationId: string) => {
    // If selecting the nearest station, clear the override
    if (nearestStation && stationId === nearestStation.id) {
      setStationOverride(null);
    } else {
      setStationOverride(stationId);
    }
  }, [nearestStation]);

  const isLoading = weather.status === "loading" || tides.status === "loading";

  return (
    <div className="space-y-6">
      {/* Location selector */}
      <LocationSelector
        locationName={geo.locationName}
        hasLocation={geo.hasLocation}
        loading={geo.loading}
        error={geo.error}
        onRequestLocation={geo.requestLocation}
        onSetZipCode={geo.setZipCode}
        onSelectBeach={geo.setManualLocation}
      />

      {/* No location selected state */}
      {!geo.hasLocation && !geo.loading ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <MapPin className="size-12 text-muted-foreground/50" aria-hidden="true" />
          <div>
            <h2 className="font-heading text-xl font-semibold">{t("noLocationSelected")}</h2>
            <p className="mt-2 text-muted-foreground">{t("noLocationMessage")}</p>
          </div>
        </div>
      ) : null}

      {/* Loading state */}
      {isLoading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
          <Skeleton className="col-span-full h-[300px]" />
          <Skeleton className="col-span-full h-[400px]" />
        </div>
      ) : null}

      {/* Error states */}
      {weather.status === "error" ? (
        <Alert variant="destructive">
          <AlertDescription>{t("dataUnavailable")}</AlertDescription>
        </Alert>
      ) : null}
      {tides.status === "error" ? (
        <Alert variant="destructive">
          <AlertDescription>{t("tideUnavailable")}</AlertDescription>
        </Alert>
      ) : null}

      {/* Data display */}
      {weather.status === "success" ? (
        <>
          {/* Refresh button */}
          <div className="flex items-center justify-end gap-2">
            <span className="text-xs text-muted-foreground">
              {t("lastUpdated", {
                time: new Date(weather.data.fetchedAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                }),
              })}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                weather.refetch();
                tides.refetch();
              }}
              className="gap-1"
            >
              <RefreshCw className="size-3.5" aria-hidden="true" />
              {t("refreshData")}
            </Button>
          </div>

          {/* Current conditions + Tide status row */}
          <div className="grid gap-6 lg:grid-cols-2">
            <CurrentConditions weather={weather.data.current} />
            {tides.status === "success" ? (
              <TideStatus tides={tides.data} />
            ) : null}
          </div>

          {/* Marine conditions (if available — hidden for inland locations) */}
          {weather.data.marine ? (
            <MarineConditionsCard marine={weather.data.marine} />
          ) : null}

          {/* Station switcher — shown when tide data is loaded */}
          {tides.status === "success" ? (
            <StationSwitcher
              currentStationId={tides.data.station.id}
              currentStationName={tides.data.station.name}
              isNearest={stationOverride === null}
              onSelectStation={handleStationSelect}
            />
          ) : null}

          {/* Tide chart */}
          {tides.status === "success" ? (
            <TideChart tides={tides.data} />
          ) : null}

          {/* 7-day forecast */}
          <DailyForecast daily={weather.data.daily} />

          {/* Safety & best times */}
          <SafetyAdvisory uvIndex={weather.data.current.uvIndex} />
        </>
      ) : null}
    </div>
  );
}
