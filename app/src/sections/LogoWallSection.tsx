import React from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from 'framer-motion';
import SectionLabel from '@/components/SectionLabel';

const logos = [
  'Stripe', 'Linear', 'Notion', 'Adobe', 'Vercel',
  'Miro', 'GitHub', 'Replit', 'HashiCorp', 'Loom',
];

const MarqueeItem = ({ children, speed = -1 }: { children: React.ReactNode, speed?: number }) => {
  const baseX = useMotionValue(0);
  
  // Create an infinite loop using wrap
  // Assuming a reasonably large container width and duplicated children for seamless loop
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = speed * (delta / 1000) * 10;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <motion.div className="flex whitespace-nowrap" style={{ x }}>
      <div className="flex shrink-0">
        {children}
      </div>
      <div className="flex shrink-0">
        {children}
      </div>
      <div className="flex shrink-0">
        {children}
      </div>
      <div className="flex shrink-0">
        {children}
      </div>
    </motion.div>
  );
};

const LogoWallSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Top Border Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-nexora-accent-blue/50 to-transparent shadow-[0_0_20px_rgba(59,106,255,0.8)]" />

      <div className="section-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <SectionLabel text="Trusted by Innovative Teams" />
        </motion.div>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden flex flex-col gap-8">
        
        {/* Left and Right Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* First Row (Moves Left) */}
        <MarqueeItem speed={-2}>
          {logos.map((name, i) => (
            <motion.span
              key={`${name}-1-${i}`}
              whileHover={{ 
                scale: 1.1, 
                color: '#fff',
                textShadow: '0 0 20px rgba(255,255,255,0.5)'
              }}
              className="px-12 text-3xl font-bold tracking-tighter text-white/20 transition-colors duration-300 cursor-default select-none uppercase"
            >
              {name}
            </motion.span>
          ))}
        </MarqueeItem>

        {/* Second Row (Moves Right) */}
        <MarqueeItem speed={1.5}>
          {[...logos].reverse().map((name, i) => (
            <motion.span
              key={`${name}-2-${i}`}
              whileHover={{ 
                scale: 1.1, 
                color: '#fff',
                textShadow: '0 0 20px rgba(255,255,255,0.5)'
              }}
              className="px-12 text-3xl font-bold tracking-tighter text-white/10 hover:text-white/30 transition-colors duration-300 cursor-default select-none uppercase"
            >
              {name}
            </motion.span>
          ))}
        </MarqueeItem>
      </div>
    </section>
  );
};

export default LogoWallSection;
