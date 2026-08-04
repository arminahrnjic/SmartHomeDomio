export type CoverTheme = "sunrise" | "home" | "compare";

const ICONS: Record<CoverTheme, React.ReactNode> = {
  sunrise: (
    <>
      <circle cx="12" cy="14" r="4" />
      <path d="M12 4v2M4.9 8.9l1.4 1.4M19.1 8.9l-1.4 1.4M3 18h18" />
    </>
  ),
  home: (
    <>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
    </>
  ),
  compare: (
    <>
      <path d="M3 9a12 12 0 0 1 18 0" />
      <path d="M6.5 12.5a7 7 0 0 1 11 0" />
      <path d="M10 16a3 3 0 0 1 4 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
    </>
  ),
};

export function CoverArt({
  theme,
  size = "sm",
  className = "",
}: {
  theme: CoverTheme;
  size?: "sm" | "lg";
  className?: string;
}) {
  const iconSize = size === "lg" ? 64 : 36;

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-primary to-primary-hover ${className}`}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeOpacity={0.5}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICONS[theme]}
      </svg>
    </div>
  );
}
