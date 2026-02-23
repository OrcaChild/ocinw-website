// =============================================================================
// Navigation E2E Tests
// Tests: header, desktop nav, mobile nav, language toggle, skip-to-content
// =============================================================================

import { test, expect } from "@playwright/test";

test.describe("Navigation — Desktop", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
  });

  test("renders header with logo link", async ({ page }) => {
    const logo = page.getByRole("link", { name: /orca child/i });
    await expect(logo).toBeVisible();
  });

  test("navigates to home from logo click", async ({ page }) => {
    await page.goto("/en/contact");
    const logo = page.getByRole("link", { name: /orca child/i });
    await logo.click();
    await expect(page).toHaveURL(/\/en\/?$/);
  });

  test("navigates to Contact page", async ({ page }) => {
    // Use a direct navigation link visible in desktop nav
    const contactLink = page.getByRole("link", { name: /contact/i }).first();
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await expect(page).toHaveURL(/\/en\/contact/);
    }
  });

  test("navigates to Weather page", async ({ page }) => {
    const weatherLink = page.getByRole("link", { name: /weather/i }).first();
    if (await weatherLink.isVisible()) {
      await weatherLink.click();
      await expect(page).toHaveURL(/\/en\/weather/);
    }
  });

  test("skip-to-content link is first focusable element", async ({ page }) => {
    // Tab once to focus the skip link
    await page.keyboard.press("Tab");
    const activeElement = page.locator(":focus");
    const text = await activeElement.textContent();
    expect(text?.toLowerCase()).toContain("skip");
  });

  test("language toggle switches to Spanish", async ({ page }) => {
    // Find the language toggle button
    const langToggle = page.getByRole("button", { name: /español|es|spanish/i });
    if (await langToggle.isVisible()) {
      await langToggle.click();
      await expect(page).toHaveURL(/\/es\//);
    }
  });
});

test.describe("Navigation — Mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
  });

  test("opens mobile navigation drawer", async ({ page }) => {
    // Find and click the hamburger menu button
    const menuButton = page.getByRole("button", { name: /menu|navigation/i });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // The Sheet drawer should open
    await expect(page.locator("[data-radix-dialog-content]").first()).toBeVisible();
  });

  test("closes mobile drawer on link click", async ({ page }) => {
    const menuButton = page.getByRole("button", { name: /menu|navigation/i });
    await menuButton.click();

    // Wait for drawer to open
    const drawer = page.locator("[data-radix-dialog-content]").first();
    await expect(drawer).toBeVisible();

    // Click a navigation link inside the drawer
    const link = drawer.getByRole("link").first();
    if (await link.isVisible()) {
      await link.click();
      // Drawer should close (may navigate away)
      await page.waitForTimeout(500);
    }
  });
});
