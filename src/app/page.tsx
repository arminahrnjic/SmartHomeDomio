import { Hero } from "@/components/Hero";
import { WhyUs } from "@/components/WhyUs";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <WhyUs />
    </main>
  );
}
