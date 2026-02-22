"use client";

import { useTranslations } from "next-intl";
import { Anchor, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TIDE_STATIONS } from "@/lib/data/socal-beaches";

type StationSwitcherProps = {
  currentStationId: string;
  currentStationName: string;
  isNearest: boolean;
  onSelectStation: (stationId: string) => void;
};

export function StationSwitcher({
  currentStationId,
  currentStationName,
  isNearest,
  onSelectStation,
}: StationSwitcherProps) {
  const t = useTranslations("weather");

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-card px-4 py-3">
      <Anchor className="size-4 text-teal-500" aria-hidden="true" />
      <span className="text-sm">
        {t("tideStation")}:{" "}
        <span className="font-medium text-teal-600 dark:text-teal-400">
          {currentStationName}
        </span>
        {isNearest ? (
          <span className="ml-1 text-xs text-muted-foreground">
            ({t("nearest")})
          </span>
        ) : null}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="ml-auto gap-1">
            {t("switchStation")}
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {TIDE_STATIONS.map((station) => (
            <DropdownMenuItem
              key={station.id}
              onClick={() => onSelectStation(station.id)}
              className={station.id === currentStationId ? "font-semibold" : ""}
            >
              {station.name}
              {station.id === currentStationId ? " ✓" : ""}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
