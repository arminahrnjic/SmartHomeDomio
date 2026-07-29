import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { HowItWorks } from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <WhyUs />
      <FeaturedProducts />
      <HowItWorks />
    </main>
  );
}
