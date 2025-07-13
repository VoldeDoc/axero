import LandingPageLayout from "@/components/Layout/LandingPageLayout";
import Testimonials from "./Testimonials";
import ChatButton from "./Tools/AiChat";
import HeroSection from "@/components/Ui/HeroSection";
import TestimonialsCards from "@/components/Ui/TestimonialCard";
import PlatformOverview from "@/components/Ui/PlatformOverview";
import IntegrationsShowcase from "@/components/Ui/Integrations";
import CopilotShowcase from "@/components/Ui/CopilotShowCase";
import MobileAppShowcase from "@/components/Ui/MobileAppUse";
import SecurityHighlight from "@/components/Ui/SecurityHilights";

export default function Home() {
  return (
    <LandingPageLayout>
      <>
        {/* Components */}
        <HeroSection/>
        <TestimonialsCards/>
        <PlatformOverview/>
        <IntegrationsShowcase/>
        <CopilotShowcase/>
        <ChatButton />
        <SecurityHighlight/>
        <MobileAppShowcase/>
        <Testimonials/>
      </>
    </LandingPageLayout>
  );
}