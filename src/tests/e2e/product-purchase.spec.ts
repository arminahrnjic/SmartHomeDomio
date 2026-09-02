import { test, expect } from "@playwright/test";

// Curtain Robot (Double) — WiFi je default varijanta (339 KM), Remote je jeftinija (259 KM),
// solarni punjač je add-on (+39 KM). Vidi CLAUDE.md "Struktura jednog proizvoda".
test.describe("Product page — Smart Curtain Robot (Double)", () => {
  test("defaults to the WiFi variant, marked as recommended", async ({ page }) => {
    await page.goto("/bs/proizvodi/smart-curtain-robot");

    const wifiOption = page.getByRole("button", { name: /Puna kontrola/ });
    await expect(wifiOption).toBeVisible();
    await expect(wifiOption.getByText("Preporučeno")).toBeVisible();
    await expect(page.getByTestId("product-total-price")).toHaveText("339 KM");
  });

  test("switching to Remote updates the price", async ({ page }) => {
    await page.goto("/bs/proizvodi/smart-curtain-robot");

    await page.getByRole("button", { name: /Osnovna kontrola/ }).click();
    await expect(page.getByTestId("product-total-price")).toHaveText("259 KM");
  });

  test("adding the solar charger add-on increases the price", async ({ page }) => {
    await page.goto("/bs/proizvodi/smart-curtain-robot");

    await page.getByRole("checkbox").check();
    await expect(page.getByTestId("product-total-price")).toHaveText("378 KM"); // 339 + 39
  });

  test("increasing quantity updates the total price", async ({ page }) => {
    await page.goto("/bs/proizvodi/smart-curtain-robot");

    await page.getByRole("button", { name: "Povećaj količinu" }).click();
    await expect(page.getByTestId("product-total-price")).toHaveText("678 KM"); // 339 x 2
  });

  test("adding to cart opens the drawer with the selected item", async ({ page }) => {
    await page.goto("/bs/proizvodi/smart-curtain-robot");

    await page.getByRole("button", { name: /Osnovna kontrola/ }).click();
    await page.getByRole("button", { name: "Dodaj u korpu" }).click();

    const drawer = page.getByRole("dialog", { name: "Korpa" });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText("Smart Curtain Robot", { exact: false })).toBeVisible();
    await expect(drawer.getByText("Osnovna kontrola", { exact: false })).toBeVisible();
    await expect(drawer.getByTestId("cart-line-total")).toHaveText("259 KM");

    await expect(page.getByRole("button", { name: "Dodano u korpu ✓" })).toBeVisible();
  });

  test("cart badge reflects item count and quantity controls update the subtotal", async ({ page }) => {
    await page.goto("/bs/proizvodi/smart-curtain-robot");
    await page.getByRole("button", { name: "Dodaj u korpu" }).click();

    const cartButton = page.getByRole("button", { name: "Korpa" });
    await expect(cartButton).toContainText("1");

    const drawer = page.getByRole("dialog", { name: "Korpa" });
    await drawer.getByRole("button", { name: "Povećaj količinu" }).click();
    await expect(cartButton).toContainText("2");
    await expect(drawer.getByTestId("cart-line-total")).toHaveText("678 KM");
    await expect(drawer.getByTestId("cart-subtotal")).toHaveText("678 KM");
  });

  test("removing the only item shows the empty cart state", async ({ page }) => {
    await page.goto("/bs/proizvodi/smart-curtain-robot");
    await page.getByRole("button", { name: "Dodaj u korpu" }).click();

    const drawer = page.getByRole("dialog", { name: "Korpa" });
    await drawer.getByRole("button", { name: "Ukloni iz korpe" }).click();
    await expect(drawer.getByText("Korpa je prazna.")).toBeVisible();
  });
});
