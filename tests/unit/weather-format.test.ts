// =============================================================================
// Weather Format Utility Tests — 90% coverage target
// Source: src/lib/utils/weather-format.ts
// =============================================================================

import {
  formatTemperature,
  formatWindSpeed,
  formatWindDirection,
  formatTideHeight,
  formatUvIndex,
  formatPrecipitation,
  formatWaveHeight,
  formatWavePeriod,
  formatTime,
  formatDate,
  formatRelativeTime,
} from "@/lib/utils/weather-format";

// ---------------------------------------------------------------------------
// formatTemperature
// ---------------------------------------------------------------------------

describe("formatTemperature", () => {
  it("rounds and appends °F", () => {
    expect(formatTemperature(72)).toBe("72°F");
  });

  it("rounds 72.6 up to 73°F", () => {
    expect(formatTemperature(72.6)).toBe("73°F");
  });

  it("rounds 72.4 down to 72°F", () => {
    expect(formatTemperature(72.4)).toBe("72°F");
  });

  it("handles negative temperatures", () => {
    expect(formatTemperature(-5.3)).toBe("-5°F");
  });

  it("handles zero", () => {
    expect(formatTemperature(0)).toBe("0°F");
  });
});

// ---------------------------------------------------------------------------
// formatWindSpeed
// ---------------------------------------------------------------------------

describe("formatWindSpeed", () => {
  it("returns rounded speed with default mph unit", () => {
    expect(formatWindSpeed(15)).toBe("15 mph");
  });

  it("rounds to nearest integer", () => {
    expect(formatWindSpeed(15.7)).toBe("16 mph");
  });

  it("accepts custom unit string", () => {
    expect(formatWindSpeed(10, "km/h")).toBe("10 km/h");
  });

  it("handles zero speed", () => {
    expect(formatWindSpeed(0)).toBe("0 mph");
  });
});

// ---------------------------------------------------------------------------
// formatWindDirection
// ---------------------------------------------------------------------------

describe("formatWindDirection", () => {
  it("returns N for 0 degrees", () => {
    expect(formatWindDirection(0)).toBe("N");
  });

  it("returns N for 360 degrees (wraps via modulo)", () => {
    expect(formatWindDirection(360)).toBe("N");
  });

  it("returns E for 90 degrees", () => {
    expect(formatWindDirection(90)).toBe("E");
  });

  it("returns S for 180 degrees", () => {
    expect(formatWindDirection(180)).toBe("S");
  });

  it("returns W for 270 degrees", () => {
    expect(formatWindDirection(270)).toBe("W");
  });

  it("returns NE for 45 degrees", () => {
    expect(formatWindDirection(45)).toBe("NE");
  });

  it("returns SW for 225 degrees", () => {
    expect(formatWindDirection(225)).toBe("SW");
  });

  it("returns NNE for approximately 22.5 degrees", () => {
    expect(formatWindDirection(22.5)).toBe("NNE");
  });

  it("returns SSE for 157.5 degrees", () => {
    expect(formatWindDirection(157.5)).toBe("SSE");
  });
});

// ---------------------------------------------------------------------------
// formatTideHeight
// ---------------------------------------------------------------------------

describe("formatTideHeight", () => {
  it("returns height to 1 decimal with default ft unit", () => {
    expect(formatTideHeight(2.5)).toBe("2.5 ft");
  });

  it("accepts custom unit string", () => {
    expect(formatTideHeight(2.5, "pies")).toBe("2.5 pies");
  });

  it("handles negative tide heights", () => {
    expect(formatTideHeight(-0.3)).toBe("-0.3 ft");
  });

  it("handles zero", () => {
    expect(formatTideHeight(0)).toBe("0.0 ft");
  });

  it("always shows 1 decimal place", () => {
    expect(formatTideHeight(5)).toBe("5.0 ft");
  });
});

// ---------------------------------------------------------------------------
// formatUvIndex
// ---------------------------------------------------------------------------

describe("formatUvIndex", () => {
  it("returns Low for UV 0-2", () => {
    expect(formatUvIndex(0)).toEqual({ value: "0", level: "Low", levelEs: "Bajo" });
    expect(formatUvIndex(2)).toEqual({ value: "2", level: "Low", levelEs: "Bajo" });
  });

  it("returns Moderate for UV 3-5", () => {
    expect(formatUvIndex(3)).toEqual({ value: "3", level: "Moderate", levelEs: "Moderado" });
    expect(formatUvIndex(5)).toEqual({ value: "5", level: "Moderate", levelEs: "Moderado" });
  });

  it("returns High for UV 6-7", () => {
    expect(formatUvIndex(6)).toEqual({ value: "6", level: "High", levelEs: "Alto" });
    expect(formatUvIndex(7)).toEqual({ value: "7", level: "High", levelEs: "Alto" });
  });

  it("returns Very High for UV 8-10", () => {
    expect(formatUvIndex(8)).toEqual({ value: "8", level: "Very High", levelEs: "Muy alto" });
    expect(formatUvIndex(10)).toEqual({ value: "10", level: "Very High", levelEs: "Muy alto" });
  });

  it("returns Extreme for UV 11+", () => {
    expect(formatUvIndex(11)).toEqual({ value: "11", level: "Extreme", levelEs: "Extremo" });
    expect(formatUvIndex(15)).toEqual({ value: "15", level: "Extreme", levelEs: "Extremo" });
  });

  it("rounds value to integer string", () => {
    const result = formatUvIndex(5.7);
    expect(result.value).toBe("6");
  });

  it("handles boundary value 2.5 as Moderate", () => {
    const result = formatUvIndex(2.5);
    expect(result.level).toBe("Moderate");
  });
});

// ---------------------------------------------------------------------------
// formatPrecipitation
// ---------------------------------------------------------------------------

describe("formatPrecipitation", () => {
  it("returns rounded percentage with % sign", () => {
    expect(formatPrecipitation(45)).toBe("45%");
  });

  it("handles 0%", () => {
    expect(formatPrecipitation(0)).toBe("0%");
  });

  it("handles 100%", () => {
    expect(formatPrecipitation(100)).toBe("100%");
  });

  it("rounds decimals", () => {
    expect(formatPrecipitation(33.7)).toBe("34%");
  });
});

// ---------------------------------------------------------------------------
// formatWaveHeight
// ---------------------------------------------------------------------------

describe("formatWaveHeight", () => {
  it("converts meters to feet", () => {
    const result = formatWaveHeight(1);
    expect(result).toBe("3.3 ft");
  });

  it("returns 1 decimal with default ft unit", () => {
    const result = formatWaveHeight(0.5);
    expect(result).toMatch(/^\d+\.\d ft$/);
  });

  it("accepts custom unit string", () => {
    expect(formatWaveHeight(1, "pies")).toBe("3.3 pies");
  });

  it("handles zero", () => {
    expect(formatWaveHeight(0)).toBe("0.0 ft");
  });
});

// ---------------------------------------------------------------------------
// formatWavePeriod
// ---------------------------------------------------------------------------

describe("formatWavePeriod", () => {
  it("returns seconds with 1 decimal and s suffix", () => {
    expect(formatWavePeriod(8.5)).toBe("8.5s");
  });

  it("handles integer input", () => {
    expect(formatWavePeriod(12)).toBe("12.0s");
  });

  it("handles zero", () => {
    expect(formatWavePeriod(0)).toBe("0.0s");
  });
});

// ---------------------------------------------------------------------------
// formatTime
// ---------------------------------------------------------------------------

describe("formatTime", () => {
  it("formats ISO string to time with AM/PM", () => {
    const result = formatTime("2026-02-22T15:00:00");
    expect(result).toMatch(/3:00\s*PM/i);
  });

  it("handles midnight", () => {
    const result = formatTime("2026-02-22T00:00:00");
    expect(result).toMatch(/12:00\s*AM/i);
  });

  it("respects locale parameter", () => {
    const enResult = formatTime("2026-02-22T15:00:00", "en-US");
    const esResult = formatTime("2026-02-22T15:00:00", "es");
    // Both should format the time; exact format varies by locale
    expect(enResult).toBeTruthy();
    expect(esResult).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// formatDate
// ---------------------------------------------------------------------------

describe("formatDate", () => {
  it("formats ISO string to short date", () => {
    const result = formatDate("2026-02-22T12:00:00");
    // Should contain day of week abbreviation and month
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(3);
  });

  it("respects locale parameter", () => {
    const enResult = formatDate("2026-02-22T12:00:00", "en-US");
    const esResult = formatDate("2026-02-22T12:00:00", "es");
    expect(enResult).toBeTruthy();
    expect(esResult).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// formatRelativeTime
// ---------------------------------------------------------------------------

describe("formatRelativeTime", () => {
  beforeEach(() => {
    // Fix time to 2026-02-22T12:00:00Z for deterministic tests
    vi.spyOn(Date, "now").mockReturnValue(new Date("2026-02-22T12:00:00Z").getTime());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 'in Xh Ym' for future times in English", () => {
    const result = formatRelativeTime("2026-02-22T14:15:00Z", "en");
    expect(result).toBe("in 2h 15m");
  });

  it("returns 'Xm ago' for past times in English", () => {
    const result = formatRelativeTime("2026-02-22T11:30:00Z", "en");
    expect(result).toBe("30m ago");
  });

  it("returns 'en Xh Ym' for future times in Spanish", () => {
    const result = formatRelativeTime("2026-02-22T14:15:00Z", "es");
    expect(result).toBe("en 2h 15m");
  });

  it("returns 'hace Xm' for past times in Spanish", () => {
    const result = formatRelativeTime("2026-02-22T11:30:00Z", "es");
    expect(result).toBe("hace 30m");
  });

  it("shows only minutes when less than 1 hour", () => {
    const result = formatRelativeTime("2026-02-22T12:45:00Z", "en");
    expect(result).toBe("in 45m");
  });

  it("shows hours and minutes when >= 1 hour", () => {
    const result = formatRelativeTime("2026-02-22T15:30:00Z", "en");
    expect(result).toBe("in 3h 30m");
  });

  it("handles es-MX locale as Spanish", () => {
    const result = formatRelativeTime("2026-02-22T14:00:00Z", "es-MX");
    expect(result).toMatch(/^en /);
  });
});
