import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/config/siteConfig";
import { isLocale } from "@/i18n/locales";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = isLocale(lang) ? getPostBySlug(slug, lang) : undefined;
  const title = post?.title ?? siteConfig.name;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "linear-gradient(135deg, #1E8E6A 0%, #157255 100%)",
        }}
      >
        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.75)", marginBottom: 16 }}>
          {`${siteConfig.name} — Blog`}
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...size }
  );
}
