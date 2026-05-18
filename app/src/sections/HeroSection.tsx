import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import HeroScene from '@/components/3d/HeroScene';

const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,106,255,0.15)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />
      
      {/* 3D Scene Background */}
      <HeroScene />

      {/* Content */}
      <div className="section-container relative z-10 w-full pt-32 pb-20 pointer-events-none">
        <div className="max-w-xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionLabel text="Introducing Nexora 2.0" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-[clamp(40px,6vw,80px)] font-extrabold leading-[1.05] tracking-[-0.04em]"
          >
            The <span className="text-gradient-hero bg-clip-text text-transparent bg-gradient-to-r from-white to-nexora-accent-blue">AI Operating</span>
            <br />
            System for Work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6 text-lg text-nexora-text-secondary leading-relaxed max-w-[480px] backdrop-blur-sm bg-black/10 p-2 rounded-lg"
          >
            Unify your data, agents, and workflows in one intelligent platform.
            Build, automate, and scale with the power of AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="#pricing" className="btn-primary group relative">
              <span className="relative z-10 flex items-center gap-2">
                Start for Free
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
            </a>
            <a href="#pricing" className="btn-secondary group relative overflow-hidden backdrop-blur-md">
              <span className="relative z-10">Book a Demo</span>
              <div className="absolute inset-0 bg-nexora-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 flex flex-wrap gap-6"
          >
            {['No credit card', '14-day free trial', 'Cancel anytime'].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-nexora-text-muted">
                <Check size={14} className="text-nexora-success" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
