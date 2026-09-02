import { test, expect } from "@playwright/test";

// MobileNav (hamburger meni) je md:hidden — postoji samo ispod 768px, zato ovi testovi
// eksplicitno postavljaju uzak viewport umjesto da se oslanjaju na projektov default.
test.use({ viewport: { width: 375, height: 812 } });

test.describe("Mobile navigation", () => {
  test("hamburger dugme je vidljivo, desktop nav nije", async ({ page }) => {
    await page.goto("/bs");

    await expect(page.getByRole("button", { name: "Meni" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Proizvodi", exact: true })).not.toBeVisible();
  });

  test("klik na hamburger otvara meni sa sva tri linka", async ({ page }) => {
    await page.goto("/bs");

    const menuButton = page.getByRole("button", { name: "Meni" });
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await menuButton.click();

    const nav = page.locator("#mobile-nav");
    await expect(nav).toBeVisible();
    await expect(nav.getByRole("link", { name: "Proizvodi" })).toHaveAttribute("href", "/bs/proizvodi");
    await expect(nav.getByRole("link", { name: "O nama" })).toHaveAttribute("href", "/bs/o-nama");
    await expect(nav.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/bs#blog");

    await expect(page.getByRole("button", { name: "Zatvori meni" })).toHaveAttribute("aria-expanded", "true");
  });

  test("klik na link navigira i zatvara meni", async ({ page }) => {
    await page.goto("/bs");
    await page.getByRole("button", { name: "Meni" }).click();

    await page.locator("#mobile-nav").getByRole("link", { name: "O nama" }).click();

    await expect(page).toHaveURL(/\/bs\/o-nama$/);
    await expect(page.locator("#mobile-nav")).toBeHidden();
  });

  test("klik izvan menija (overlay) ga zatvara", async ({ page }) => {
    await page.goto("/bs");
    await page.getByRole("button", { name: "Meni" }).click();
    await expect(page.locator("#mobile-nav")).toBeVisible();

    // Klik ispod panela, na overlay koji prekriva ostatak stranice.
    await page.mouse.click(200, 700);

    await expect(page.locator("#mobile-nav")).toBeHidden();
  });

  test("Escape zatvara meni", async ({ page }) => {
    await page.goto("/bs");
    await page.getByRole("button", { name: "Meni" }).click();
    await expect(page.locator("#mobile-nav")).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(page.locator("#mobile-nav")).toBeHidden();
    await expect(page.getByRole("button", { name: "Meni" })).toHaveAttribute("aria-expanded", "false");
  });

  test("dugme za meni nestaje na desktop širini", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/bs");

    await expect(page.getByRole("button", { name: "Meni" })).not.toBeVisible();
    await expect(page.getByRole("link", { name: "Proizvodi", exact: true })).toBeVisible();
  });
});
