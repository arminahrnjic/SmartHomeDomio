import { getDictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/locales";

export function AnnouncementBar({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  return (
    <div className="w-full bg-text px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
      {dict.announcement}
    </div>
  );
}
