import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config za Domio.
 * Dvije grupe testova, svaka u svom folderu:
 *  - src/tests/e2e            -> ključni korisnički tokovi (navigacija, jezici, korpa)
 *  - src/tests/accessibility  -> automatska a11y provjera (axe-core) po stranici/jeziku
 *
 * `npm run test:e2e`   -> samo e2e
 * `npm run test:a11y`  -> samo accessibility
 * `npm run test`       -> obje grupe
 */
export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  outputDir: "./test-results",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    // Fiksira Accept-Language na bosanski da proxy.ts uvijek redirektuje na /bs kad se testira
    // "/" bez prefiksa — inače test rezultat zavisi od OS/browser locale-a mašine koja pokreće testove.
    locale: "bs-BA",
  },

  projects: [
    {
      name: "e2e",
      testDir: "./src/tests/e2e",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "accessibility",
      testDir: "./src/tests/accessibility",
      use: {
        ...devices["Desktop Chrome"],
        // Fade-in-up scroll animacije (globals.css) traju 0.8s — bez ovoga axe povremeno
        // hvata stranicu usred animacije i lažno prijavljuje kontrast (opacity < 1) kao grešku.
        contextOptions: { reducedMotion: "reduce" },
      },
    },
  ],

  // Next.js dev server se automatski pali prije testova i gasi nakon njih.
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
