import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/locales";

// Next.js 16 renamed Middleware to Proxy (same runtime behaviour, new file/function name).
// This is the only place that decides which locale a visitor without a /bs, /en or /de
// prefix in the URL gets redirected to.
function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => part.trim().split(";")[0].toLowerCase());

  for (const lang of preferred) {
    const base = lang.split("-")[0];
    if (isLocale(base)) return base;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip Next internals, API routes, and anything that looks like a static file (has a dot in
    // the path — covers /public/* of any type: images, video, fonts, favicon.ico, robots.txt,
    // sitemap.xml, ...) so those are served as-is instead of getting a /bs /en /de prefix
    // redirected onto them. An earlier version only excluded a hardcoded list of image
    // extensions and missed video files — this catches every asset type instead.
    "/((?!_next|api|.*\\..*).*)",
  ],
};
