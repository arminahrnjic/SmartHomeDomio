import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Interaktivna stanja (modal/drawer) treba provjeriti odvojeno od "mirne" stranice —
// axe iz pages.spec.ts hvata samo default stanje pri učitavanju.
test.describe("Accessibility — cart drawer (open state)", () => {
  test("open, empty cart drawer has no a11y violations", async ({ page }) => {
    await page.goto("/bs");
    await page.getByRole("button", { name: "Korpa" }).click();
    await expect(page.getByRole("dialog", { name: "Korpa" })).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("open cart drawer with an item has no a11y violations", async ({ page }) => {
    await page.goto("/bs/proizvodi/smart-curtain-robot");
    await page.getByRole("button", { name: "Dodaj u korpu" }).click();
    await expect(page.getByRole("dialog", { name: "Korpa" })).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
