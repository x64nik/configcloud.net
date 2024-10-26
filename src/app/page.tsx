import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import Info from "@/components/Info";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.97] antialiased bg-grid-white/[0.02]">
      <HeroSection/>
      <Services />
      <Info />
      {/* <Testimonials /> */}
      <AboutSection/>

    </main>
  );
}
