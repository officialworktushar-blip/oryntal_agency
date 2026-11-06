import Hero from "@/components/home/Hero";
import SocialProof from "@/components/home/SocialProof";
import Integrations from "@/components/home/Integrations";
import VideoSection from "@/components/home/VideoSection";
import HowItWorks from "@/components/home/HowItWorks";
import FinalCta from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Integrations />
      <VideoSection />
      <HowItWorks />
      <FinalCta />
    </>
  );
}
