import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import PlatformSection from "@/components/PlatformSection";
import CommunitySection from "@/components/CommunitySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CommunityBanner from "@/components/CommunityBanner";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <PlatformSection />
        <CommunitySection />
        <TestimonialsSection />
        <CommunityBanner />
        <GetInvolvedSection />
      </main>
      <SiteFooter />
    </>
  );
}
