// =============================================================================
// Weather Dashboard E2E Tests
// Tests: location selection, data display, ZIP input
// =============================================================================

import { test, expect } from "@playwright/test";

// Mock API responses for deterministic testing
const mockForecastResponse = {
  latitude: 34.01,
  longitude: -118.5,
  generationtime_ms: 0.5,
  utc_offset_seconds: -28800,
  timezone: "America/Los_Angeles",
  current: {
    time: "2026-02-22T12:00",
    interval: 900,
    temperature_2m: 68,
    relative_humidity_2m: 55,
    apparent_temperature: 66,
    precipitation: 0,
    weather_code: 0,
    wind_speed_10m: 8,
    wind_direction_10m: 270,
    wind_gusts_10m: 15,
    uv_index: 5,
  },
  hourly: {
    time: Array.from({ length: 24 }, (_, i) => `2026-02-22T${String(i).padStart(2, "0")}:00`),
    temperature_2m: Array(24).fill(68),
    precipitation_probability: Array(24).fill(0),
    weather_code: Array(24).fill(0),
    wind_speed_10m: Array(24).fill(8),
    wind_direction_10m: Array(24).fill(270),
    uv_index: Array(24).fill(5),
  },
  daily: {
    time: ["2026-02-22", "2026-02-23", "2026-02-24"],
    temperature_2m_max: [72, 74, 70],
    temperature_2m_min: [55, 57, 53],
    sunrise: ["2026-02-22T06:30", "2026-02-23T06:29", "2026-02-24T06:28"],
    sunset: ["2026-02-22T17:45", "2026-02-23T17:46", "2026-02-24T17:47"],
    precipitation_sum: [0, 0, 0],
    precipitation_probability_max: [10, 5, 15],
    wind_speed_10m_max: [15, 12, 18],
    uv_index_max: [6, 7, 5],
    weather_code: [1, 0, 2],
  },
};

const mockMarineResponse = {
  latitude: 34.01,
  longitude: -118.5,
  current: {
    time: "2026-02-22T12:00",
    wave_height: 1.2,
    wave_direction: 250,
    wave_period: 8.5,
    wind_wave_height: 0.5,
    swell_wave_height: 0.8,
    swell_wave_direction: 245,
    swell_wave_period: 12.3,
  },
};

const mockNoaaResponse = {
  predictions: [
    { t: "2026-02-22 03:15", v: "5.2", type: "H" },
    { t: "2026-02-22 09:30", v: "0.8", type: "L" },
    { t: "2026-02-22 15:45", v: "4.8", type: "H" },
    { t: "2026-02-22 21:00", v: "1.2", type: "L" },
  ],
};

test.describe("Weather Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    // Mock external API responses
    await page.route("**/api.open-meteo.com/**", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockForecastResponse),
      });
    });

    await page.route("**/marine-api.open-meteo.com/**", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockMarineResponse),
      });
    });

    await page.route("**/api.tidesandcurrents.noaa.gov/**", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockNoaaResponse),
      });
    });

    await page.route("**/nominatim.openstreetmap.org/**", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          address: { city: "Santa Monica", county: "Los Angeles County" },
        }),
      });
    });

    await page.goto("/en/weather");
  });

  test("renders weather page with location selector", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Should show location selection options
    await expect(page.getByText(/location|zip|beach/i).first()).toBeVisible();
  });

  test("shows beach quick-select buttons", async ({ page }) => {
    // Look for popular beach buttons
    await expect(page.getByRole("button", { name: /santa monica/i })).toBeVisible();
  });

  test("loads weather data on beach button click", async ({ page }) => {
    // Click Santa Monica beach button
    await page.getByRole("button", { name: /santa monica/i }).click();

    // Wait for weather data to load
    await expect(page.getByText(/68/)).toBeVisible({ timeout: 10000 });
  });

  test("shows current conditions after location selection", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /santa monica/i }).click();

    // Should show temperature
    await expect(page.getByText(/68°F/)).toBeVisible({ timeout: 10000 });
  });

  test("shows ZIP code input field", async ({ page }) => {
    const zipInput = page.locator("#zip-code-input");
    await expect(zipInput).toBeVisible();
  });

  test("page has correct heading", async ({ page }) => {
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
  });
});
