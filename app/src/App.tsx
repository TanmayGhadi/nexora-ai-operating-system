import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import HeroSection from '@/sections/HeroSection';
import LogoWallSection from '@/sections/LogoWallSection';
import FeaturesGridSection from '@/sections/FeaturesGridSection';
import WorkflowHubSection from '@/sections/WorkflowHubSection';
import DashboardShowcaseSection from '@/sections/DashboardShowcaseSection';
import PricingSection from '@/sections/PricingSection';
import FAQSection from '@/sections/FAQSection';
import FooterSection from '@/sections/FooterSection';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  useEffect(() => {
    // Wait for fonts to load before initializing animations
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <LogoWallSection />
        <FeaturesGridSection />
        <WorkflowHubSection />
        <DashboardShowcaseSection />
        <PricingSection />
        <FAQSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default App;
