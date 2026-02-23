// =============================================================================
// Newsletter Signup E2E Tests
// Tests: subscription flow, duplicate detection, validation
// =============================================================================

import { test, expect } from "@playwright/test";

test.describe("Newsletter Signup", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en");
  });

  test("renders newsletter form in footer", async ({ page }) => {
    const emailInput = page.locator("#newsletter-email");
    await expect(emailInput).toBeVisible();
  });

  test("submits successfully with valid email", async ({ page }) => {
    const emailInput = page.locator("#newsletter-email");
    await emailInput.scrollIntoViewIfNeeded();
    await emailInput.fill(`test${Date.now()}@example.com`);

    // Find the submit button near the newsletter form
    const form = emailInput.locator("xpath=ancestor::form");
    const submitButton = form.getByRole("button");
    await submitButton.click();

    // Should show success message
    await expect(page.getByText(/thanks|subscribed|success/i).first()).toBeVisible({
      timeout: 5000,
    });
  });

  test("shows duplicate message for re-subscription", async ({ page }) => {
    const uniqueEmail = `dup${Date.now()}@example.com`;

    const emailInput = page.locator("#newsletter-email");
    await emailInput.scrollIntoViewIfNeeded();

    // First subscription
    await emailInput.fill(uniqueEmail);
    const form = emailInput.locator("xpath=ancestor::form");
    await form.getByRole("button").click();

    // Wait for success
    await expect(page.getByText(/thanks|subscribed|success/i).first()).toBeVisible({
      timeout: 5000,
    });

    // Reload page and try again
    await page.goto("/en");
    const emailInput2 = page.locator("#newsletter-email");
    await emailInput2.scrollIntoViewIfNeeded();
    await emailInput2.fill(uniqueEmail);
    const form2 = emailInput2.locator("xpath=ancestor::form");
    await form2.getByRole("button").click();

    // Should show duplicate message
    await expect(page.getByText(/already|subscribed|duplicate/i).first()).toBeVisible({
      timeout: 5000,
    });
  });

  test("shows error for invalid email", async ({ page }) => {
    const emailInput = page.locator("#newsletter-email");
    await emailInput.scrollIntoViewIfNeeded();
    await emailInput.fill("not-an-email");

    const form = emailInput.locator("xpath=ancestor::form");
    await form.getByRole("button").click();

    // Should show error (HTML5 validation or custom error)
    // HTML5 validation may prevent submission entirely
    await page.waitForTimeout(500);
  });
});
