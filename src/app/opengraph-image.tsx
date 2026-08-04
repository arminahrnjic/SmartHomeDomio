import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/siteConfig";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          background: "linear-gradient(135deg, #1E8E6A 0%, #157255 100%)",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 34, color: "rgba(255,255,255,0.85)" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
