import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
// IntroSection ("Building Ward 5's Future Together") is intentionally not
// rendered right now — removed from the homepage per explicit request, but
// kept as-is at src/components/IntroSection.tsx in case it's needed again.
// import IntroSection from "@/components/IntroSection";
// UpcomingEventsSection is intentionally not rendered right now — removed from
// the homepage per explicit request ("will be re-used later"), but kept as-is
// at src/components/UpcomingEventsSection.tsx, along with EventMap.tsx and the
// .events-* rules in src/styles/events.css. To bring it back, uncomment the
// import and the <UpcomingEventsSection /> above <LetterSection /> below.
// import UpcomingEventsSection from "@/components/UpcomingEventsSection";
// VideoSection (the YouTube campaign video) is intentionally not rendered after
// the election — replaced by the thank-you letter, but kept as-is at
// src/components/VideoSection.tsx in case it's needed again.
// import VideoSection from "@/components/VideoSection";
import LetterSection from "@/components/LetterSection";
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
        <LetterSection />
        <PlatformSection />
        <CommunitySection />
        <TestimonialsSection />
        <BannerSection />
        <GetInvolvedSection />
      </main>
    </>
  );
}
