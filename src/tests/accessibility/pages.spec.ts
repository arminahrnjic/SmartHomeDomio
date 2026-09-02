import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Automatska a11y provjera (axe-core) protiv WCAG 2.0/2.1 A i AA pravila.
 * Ovo hvata mehaničke propuste (kontrast, nedostajući alt tekst, aria greške,
 * label/name problemi...) — ne zamjenjuje ručnu provjeru tastature i screen readera,
 * ali je dobar "safety net" da se ništa očigledno ne pokvari usput.
 *
 * Testira se svaka stranica u sva tri jezika (bs/en/de) jer je sadržaj lokalizovan
 * i struktura DOM-a (npr. dužina teksta, prisustvo downgrade_note-a) može varirati.
 */
const LOCALES = ["bs", "en", "de"] as const;

const PATHS = [
  { name: "Home", path: "" },
  { name: "Products listing", path: "/proizvodi" },
  { name: "Curtain Robot (Double)", path: "/proizvodi/smart-curtain-robot" },
  { name: "Curtain Robot (Single)", path: "/proizvodi/smart-curtain-robot-single" },
  { name: "Solar charger", path: "/proizvodi/solarni-punjac" },
  { name: "About us", path: "/o-nama" },
  { name: "Terms of use", path: "/uslovi-koristenja" },
  { name: "Privacy policy", path: "/politika-privatnosti" },
  { name: "Return policy", path: "/politika-povrata" },
  { name: "Blog listing", path: "/blog" },
  { name: "Blog post", path: "/blog/pametne-zavjese-jutarnja-rutina" },
];

for (const locale of LOCALES) {
  test.describe(`Accessibility — ${locale}`, () => {
    for (const { name, path } of PATHS) {
      test(`${name} has no automatically detectable a11y violations`, async ({ page }) => {
        await page.goto(`/${locale}${path}`);

        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();

        expect(results.violations, formatViolations(results.violations)).toEqual([]);
      });
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatViolations(violations: any[]) {
  return violations
    .map(
      (v) =>
        `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n: { target: string[] }) => n.target.join(" ")).join("\n  ")}`
    )
    .join("\n\n");
}
