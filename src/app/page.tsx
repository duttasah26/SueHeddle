import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import StatsStrip from "@/components/StatsStrip";
import AboutSection from "@/components/AboutSection";
import PlatformSection from "@/components/PlatformSection";
import CredentialsSection from "@/components/CredentialsSection";
import CommunityBanner from "@/components/CommunityBanner";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <StatsStrip />
        <AboutSection />
        <PlatformSection />
        <CredentialsSection />
        <CommunityBanner />
        <GetInvolvedSection />
      </main>
      <SiteFooter />
    </>
  );
}
