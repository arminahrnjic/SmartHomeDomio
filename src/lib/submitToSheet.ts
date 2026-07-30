export type SheetPayload =
  | { type: "newsletter"; email: string }
  | {
      type: "preorder";
      product: string;
      control: string;
      size: string;
      addons: string;
      total: number;
      email: string;
    };

// Google Apps Script Web App ne šalje CORS headere, pa se odgovor ne može
// pročitati (mode: "no-cors") — ako fetch ne baci grešku (npr. mreža nedostupna),
// smatramo da je upis u Sheet uspio.
export async function submitToSheet(payload: SheetPayload) {
  const endpoint = process.env.NEXT_PUBLIC_SHEETS_ENDPOINT;

  if (!endpoint) {
    throw new Error("SHEETS_ENDPOINT_NOT_CONFIGURED");
  }

  await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
}
