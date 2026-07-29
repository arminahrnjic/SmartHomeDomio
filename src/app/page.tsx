import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";
import { FeaturedProducts } from "@/components/FeaturedProducts";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <WhyUs />
      <FeaturedProducts />
    </main>
  );
}
