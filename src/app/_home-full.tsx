// BACKUP — full site homepage
// To restore: copy this file's contents into page.tsx
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import PlatformSection from "@/components/PlatformSection";
import CommunitySection from "@/components/CommunitySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BannerSection from "@/components/BannerSection";
import GetInvolvedSection from "@/components/GetInvolvedSection";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <IntroSection />
        <PlatformSection />
        <CommunitySection />
        <TestimonialsSection />
        <BannerSection />
        <GetInvolvedSection />
      </main>
    </>
  );
}
