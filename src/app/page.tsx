import AboutSection from "@/components/LandingPage/AboutSection";
import HeroSection from "@/components/LandingPage/HeroSection";
import Info from "@/components/LandingPage/Info";
import Services from "@/components/LandingPage/Services";
import Navbar from "@/components/LandingPage/Navbar";
import Testimonials from "@/components/LandingPage/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.97] antialiased">
      <Navbar />
      <HeroSection/>
      <Services />
      <Info />
      {/* <Testimonials /> */}
      <AboutSection/>

    </main>
  );
}
