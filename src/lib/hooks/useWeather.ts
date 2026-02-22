"use client";

// =============================================================================
// useWeather Hook — Fetches and caches weather data for a location
// =============================================================================

import { useCallback, useEffect, useReducer, useRef } from "react";
import type { WeatherData } from "@/lib/types/weather";
import { getWeatherData } from "@/lib/api/weather";

type WeatherState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: WeatherData }
  | { status: "error"; message: string };

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; data: WeatherData }
  | { type: "FETCH_ERROR"; message: string }
  | { type: "RESET" };

function reducer(_state: WeatherState, action: Action): WeatherState {
  switch (action.type) {
    case "FETCH_START":
      return { status: "loading" };
    case "FETCH_SUCCESS":
      return { status: "success", data: action.data };
    case "FETCH_ERROR":
      return { status: "error", message: action.message };
    case "RESET":
      return { status: "idle" };
  }
}

export function useWeather(latitude: number | null, longitude: number | null) {
  const [fetchState, dispatch] = useReducer(reducer, { status: "idle" });
  const fetchIdRef = useRef(0);

  useEffect(() => {
    if (latitude === null || longitude === null) return;

    const id = ++fetchIdRef.current;
    dispatch({ type: "FETCH_START" });

    getWeatherData(latitude, longitude).then(
      (data) => {
        if (fetchIdRef.current === id) {
          dispatch({ type: "FETCH_SUCCESS", data });
        }
      },
      (err: unknown) => {
        if (fetchIdRef.current === id) {
          dispatch({
            type: "FETCH_ERROR",
            message: err instanceof Error ? err.message : "Failed to load weather data",
          });
        }
      },
    );
  }, [latitude, longitude]);

  const refetch = useCallback(() => {
    if (latitude === null || longitude === null) return;

    const id = ++fetchIdRef.current;
    dispatch({ type: "FETCH_START" });

    getWeatherData(latitude, longitude).then(
      (data) => {
        if (fetchIdRef.current === id) {
          dispatch({ type: "FETCH_SUCCESS", data });
        }
      },
      (err: unknown) => {
        if (fetchIdRef.current === id) {
          dispatch({
            type: "FETCH_ERROR",
            message: err instanceof Error ? err.message : "Failed to load weather data",
          });
        }
      },
    );
  }, [latitude, longitude]);

  const hasCoords = latitude !== null && longitude !== null;
  const state = hasCoords ? fetchState : ({ status: "idle" } as const);

  return { ...state, refetch };
}
