import { siteConfig } from "@/config/siteConfig";

export function AnnouncementBar() {
  return (
    <div className="w-full bg-text px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
      Besplatna dostava u BiH &middot; 2 godine garancije &middot;{" "}
      <a href={`mailto:${siteConfig.contact.email}`} className="underline underline-offset-2">
        {siteConfig.contact.email}
      </a>
    </div>
  );
}
