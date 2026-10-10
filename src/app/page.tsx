import { Audience } from "@/components/landing/Audience";
import { FeaturesBento } from "@/components/landing/FeaturesBento";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Learning } from "@/components/landing/Learning";
import { Pricing } from "@/components/landing/Pricing";
import { Scenarios } from "@/components/landing/Scenarios";

export default function Home() {
  return (
    // Clip full-bleed overflow (scenario row, glow) at the viewport like the 1440 Figma frame.
    // One full-bleed underlay for the whole page: sections have no opaque backgrounds of their own.
    <main className="overflow-x-clip bg-(image:--gradient-page)">
      <Hero />
      <Scenarios />
      <FeaturesBento />
      <HowItWorks />
      <Learning />
      <Audience />
      <Pricing />
    </main>
  );
}
