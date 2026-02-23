// =============================================================================
// Accessibility Tests — axe-core on all pages
// Zero WCAG 2.1 AA violations required
// =============================================================================

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = [
  { path: "/en", name: "Homepage" },
  { path: "/en/about", name: "About" },
  { path: "/en/about/mission", name: "Mission" },
  { path: "/en/about/team", name: "Team" },
  { path: "/en/contact", name: "Contact" },
  { path: "/en/weather", name: "Weather" },
  { path: "/en/privacy", name: "Privacy" },
  { path: "/en/terms", name: "Terms" },
];

test.describe("Accessibility — Desktop (1280x720)", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  for (const { path, name } of pages) {
    test(`${name} page (${path}) has zero axe-core violations`, async ({
      page,
    }) => {
      await page.goto(path);
      // Wait for content to load
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();

      expect(
        results.violations,
        `${name} page has accessibility violations:\n${results.violations
          .map(
            (v) =>
              `- ${v.id}: ${v.description} (${v.nodes.length} instance${v.nodes.length === 1 ? "" : "s"})`,
          )
          .join("\n")}`,
      ).toEqual([]);
    });
  }
});

test.describe("Accessibility — Mobile (375x812)", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  for (const { path, name } of pages) {
    test(`${name} page (${path}) has zero axe-core violations on mobile`, async ({
      page,
    }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa"])
        .analyze();

      expect(
        results.violations,
        `${name} page (mobile) has accessibility violations:\n${results.violations
          .map(
            (v) =>
              `- ${v.id}: ${v.description} (${v.nodes.length} instance${v.nodes.length === 1 ? "" : "s"})`,
          )
          .join("\n")}`,
      ).toEqual([]);
    });
  }
});
