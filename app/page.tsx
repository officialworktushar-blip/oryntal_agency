import Hero from "@/components/home/Hero";
import SocialProof from "@/components/home/SocialProof";
import VideoSection from "@/components/home/VideoSection";
import ServicesTabs from "@/components/home/ServicesTabs";
import HowItWorks from "@/components/home/HowItWorks";
import FinalCta from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <VideoSection />
      <ServicesTabs />
      <HowItWorks />
      <FinalCta />
    </>
  );
}
