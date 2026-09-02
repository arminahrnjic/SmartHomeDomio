import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Isto obrazloženje kao cart-drawer.spec.ts: interaktivno stanje (otvoren meni) treba
// provjeriti odvojeno, i ovdje dodatno na mobilnom viewportu gdje MobileNav uopšte postoji
// (md:hidden — na desktop širini komponenta nije ni renderovana/vidljiva).
test.use({ viewport: { width: 375, height: 812 } });

test.describe("Accessibility — mobile nav (open state)", () => {
  test("zatvoren meni na mobilnom viewportu nema a11y grešaka", async ({ page }) => {
    await page.goto("/bs");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("otvoren mobilni meni nema a11y grešaka", async ({ page }) => {
    await page.goto("/bs");
    await page.getByRole("button", { name: "Meni" }).click();
    await expect(page.locator("#mobile-nav")).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
