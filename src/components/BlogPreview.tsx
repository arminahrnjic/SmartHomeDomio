import Link from "next/link";

// Placeholder naslovi — zamijeniti stvarnim člancima iz /content/blog kad budu napisani.
const POSTS = [
  {
    slug: "pametne-zavjese-jutarnja-rutina",
    title: "5 razloga zašto pametne zavjese mijenjaju jutarnju rutinu",
    excerpt: "Kako automatsko otvaranje zavjesa uz prirodno svjetlo utiče na budnost i raspoloženje.",
  },
  {
    slug: "airbnb-pametna-kontrola",
    title: "Kako pripremiti Airbnb apartman za pametnu kontrolu na daljinu",
    excerpt: "Praktičan vodič za vlasnike apartmana koji žele manje glavobolje oko gostiju.",
  },
  {
    slug: "wifi-ili-daljinski",
    title: "WiFi ili daljinski: koja kontrola vam zapravo treba",
    excerpt: "Poređenje dvije varijante kontrole i za koga je koja stvarno pogodna.",
  },
];

export function BlogPreview() {
  return (
    <section id="blog" className="w-full bg-bg-alt px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold tracking-tight text-text">
            Sa bloga
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-bg p-6 transition-transform hover:scale-[1.02]"
            >
              <div className="h-36 rounded-xl bg-gradient-to-br from-bg-alt to-border" />
              <h3 className="text-base font-semibold text-text">{post.title}</h3>
              <p className="text-sm text-text-muted">{post.excerpt}</p>
              <span className="text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                Čitaj više →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
