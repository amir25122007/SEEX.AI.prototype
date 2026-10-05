import { Hero } from "@/components/landing/Hero";
import { Scenarios } from "@/components/landing/Scenarios";

export default function Home() {
  return (
    // Clip full-bleed overflow (scenario row, glow) at the viewport like the 1440 Figma frame.
    <main className="overflow-x-clip">
      <Hero />
      <Scenarios />
    </main>
  );
}
