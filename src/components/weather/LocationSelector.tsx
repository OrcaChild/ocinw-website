"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Navigation, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { POPULAR_BEACHES } from "@/lib/data/socal-beaches";
import { isValidSoCalZip } from "@/lib/api/geolocation";

type LocationSelectorProps = {
  locationName: string | null;
  hasLocation: boolean;
  loading: boolean;
  error: string | null;
  onRequestLocation: () => void;
  onSetZipCode: (zip: string) => void;
  onSelectBeach: (lat: number, lon: number, name: string) => void;
};

export function LocationSelector({
  locationName,
  hasLocation,
  loading,
  error,
  onRequestLocation,
  onSetZipCode,
  onSelectBeach,
}: LocationSelectorProps) {
  const t = useTranslations("weather");
  const [zip, setZip] = useState("");
  const [showBeaches, setShowBeaches] = useState(!hasLocation);

  function handleZipSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidSoCalZip(zip) && !/^\d{5}$/.test(zip)) {
      return;
    }
    onSetZipCode(zip);
  }

  if (hasLocation && !showBeaches) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-ocean-500" aria-hidden="true" />
          <span className="font-medium">
            {t("locationBar")}: <span className="text-ocean-600 dark:text-ocean-400">{locationName ?? t("locationBar")}</span>
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowBeaches(true)}
        >
          {t("changeLocation")}
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-6 p-6">
        {/* GPS Button */}
        <div className="text-center">
          <p className="mb-3 text-sm text-muted-foreground">
            {t("locationExplain")}
          </p>
          <Button
            onClick={() => {
              onRequestLocation();
              setShowBeaches(false);
            }}
            disabled={loading}
            className="gap-2"
          >
            <Navigation className="size-4" aria-hidden="true" />
            {loading ? t("useMyLocation") + "..." : t("useMyLocation")}
          </Button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">{t("or")}</span>
          </div>
        </div>

        {/* ZIP Code Input */}
        <form onSubmit={handleZipSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <label htmlFor="zip-code-input" className="sr-only">
              {t("zipPlaceholder")}
            </label>
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="zip-code-input"
              type="text"
              inputMode="numeric"
              pattern="\d{5}"
              maxLength={5}
              value={zip}
              onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
              placeholder={t("zipPlaceholder")}
              className="pl-9"
            />
          </div>
          <Button type="submit" variant="secondary" disabled={zip.length !== 5}>
            {t("zipSubmit")}
          </Button>
        </form>

        {/* Error Message */}
        {error ? (
          <p className="text-center text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        {/* Popular Beaches */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            {t("popularBeaches")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {POPULAR_BEACHES.map((beach) => (
              <Button
                key={beach.name}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  onSelectBeach(beach.latitude, beach.longitude, beach.name);
                  setShowBeaches(false);
                }}
              >
                {beach.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Back button if already has location */}
        {hasLocation ? (
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBeaches(false)}
            >
              {t("cancel")}
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
