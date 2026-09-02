import { test, expect } from "@playwright/test";

test.describe("Home page (bs)", () => {
  test("redirects to the default locale and renders the hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/bs$/);

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Vaš dom, pametniji od danas.");
    await expect(page.getByRole("link", { name: "Kupi odmah" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Pogledaj proizvod", exact: true })).toBeVisible();
  });

  test("header nav links point to the right pages", async ({ page }) => {
    await page.goto("/bs");

    const header = page.getByRole("banner");
    await expect(header.getByRole("link", { name: "Proizvodi" })).toHaveAttribute("href", "/bs/proizvodi");
    await expect(header.getByRole("link", { name: "O nama" })).toHaveAttribute("href", "/bs/o-nama");
    await expect(header.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/bs#blog");
  });

  test("hero CTA 'Kupi odmah' leads to the product listing", async ({ page }) => {
    await page.goto("/bs");
    await page.getByRole("link", { name: "Kupi odmah" }).click();
    await expect(page).toHaveURL(/\/bs\/proizvodi$/);
  });

  test("hero CTA 'Pogledaj proizvod' leads to the curtain robot page", async ({ page }) => {
    await page.goto("/bs");
    await page.getByRole("link", { name: "Pogledaj proizvod", exact: true }).click();
    await expect(page).toHaveURL(/\/bs\/proizvodi\/smart-curtain-robot$/);
  });

  test("featured product card navigates to its product page", async ({ page }) => {
    await page.goto("/bs");
    await page.getByRole("link", { name: /Smart Curtain Robot/ }).first().click();
    await expect(page).toHaveURL(/\/bs\/proizvodi\/smart-curtain-robot/);
  });

  test("cart starts empty", async ({ page }) => {
    await page.goto("/bs");
    await page.getByRole("button", { name: "Korpa" }).click();

    const drawer = page.getByRole("dialog", { name: "Korpa" });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText("Korpa je prazna.")).toBeVisible();
  });
});

test.describe("Language switching", () => {
  test("switching to English updates the URL and the page content", async ({ page }) => {
    await page.goto("/bs");
    await page.getByRole("combobox", { name: "Jezik" }).selectOption("en");

    await expect(page).toHaveURL(/\/en$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Your home, smarter as of today.");
    await expect(page.getByRole("link", { name: "Buy now" })).toBeVisible();
  });

  test("switching to German updates the URL and the page content", async ({ page }) => {
    await page.goto("/bs");
    await page.getByRole("combobox", { name: "Jezik" }).selectOption("de");

    await expect(page).toHaveURL(/\/de$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Ihr Zuhause, ab heute smarter.");
    await expect(page.getByRole("link", { name: "Jetzt kaufen" })).toBeVisible();
  });

  test("switching language keeps the current sub-page (deep link)", async ({ page }) => {
    await page.goto("/bs/proizvodi/smart-curtain-robot");
    await page.getByRole("combobox", { name: "Jezik" }).selectOption("en");
    await expect(page).toHaveURL(/\/en\/proizvodi\/smart-curtain-robot$/);
  });
});
