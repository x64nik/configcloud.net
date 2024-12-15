import AboutSection from "@/components/LandingPage/AboutSection";
import HeroSection from "@/components/LandingPage/HeroSection";
import Info from "@/components/LandingPage/Info";
import Services from "@/components/LandingPage/Services";
import Navbar from "@/components/LandingPage/Navbar";
import Testimonials from "@/components/LandingPage/Testimonials";
import LoginPage from "./(auth)/login/page";
import { FeatureSection } from "@/components/LandingPage/FeatureSection";
import { Footer } from "@/components/LandingPage/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.8] antialiased">
      <Navbar />
      <HeroSection/>
      <FeatureSection/>
      <Services />
      <Info />
      {/* <Testimonials /> */}
      <AboutSection/>
      <Footer />
      {/* <LoginPage/> */}

    </main>
  );
}
