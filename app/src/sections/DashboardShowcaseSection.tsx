import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';

const features = [
  'Live metrics & analytics',
  'Real-time agent monitoring',
  'Custom dashboards',
  'Instant alerts & notifications',
];

const stats = [
  { label: 'Total Revenue', value: '$245,430', change: '+12.5%' },
  { label: 'Active Users', value: '1,423', change: '+5.2%' },
  { label: 'AI Agents', value: '128', change: '+23' },
  { label: 'Tasks', value: '2.4M', change: '+18.7%' },
];

const DashboardShowcaseSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [15, 2, -15]);
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [-15, 5, 15]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.9]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-48 bg-black overflow-hidden perspective-[2000px]"
    >
      <div className="absolute inset-0 ambient-blue-glow pointer-events-none opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nexora-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] gap-16 lg:gap-20 items-center">
          {/* Left - Dashboard Mockup with 3D Transform */}
          <motion.div
            style={{ 
              rotateX, 
              rotateY, 
              scale,
              transformStyle: "preserve-3d" 
            }}
            className="relative group w-full"
          >
            {/* Holographic glowing borders behind */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-nexora-accent-blue/30 via-transparent to-nexora-accent-purple/30 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-nexora-accent-blue/20 border border-white/10 bg-black/60 backdrop-blur-3xl transition-all duration-700 group-hover:border-nexora-accent-blue/50"
            >
              {/* Dashboard Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                <h3 className="text-lg font-semibold text-nexora-text-primary flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-nexora-success animate-pulse" />
                  Live Analytics Neural Core
                </h3>
                <span className="text-xs px-3 py-1.5 rounded-full bg-white/[0.05] text-nexora-text-secondary border border-white/[0.08] backdrop-blur-md">
                  Real-time synchronization
                </span>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 rounded-xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.02] hover:bg-white/[0.08] hover:border-nexora-accent-blue/30 transition-all duration-300"
                  >
                    <p className="text-xs text-nexora-text-muted mb-1">{stat.label}</p>
                    <p className="text-2xl lg:text-3xl font-light text-white tracking-tight">
                      {stat.value}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-nexora-success mt-2 bg-nexora-success/10 px-2 py-0.5 rounded-full">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 2L8 6H2L5 2Z" fill="currentColor" />
                      </svg>
                      {stat.change}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Chart Area */}
              <div className="px-6 pb-6 relative">
                {/* Floating UI Elements over chart */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-12 top-10 bg-black/80 backdrop-blur-xl border border-white/10 p-3 rounded-lg shadow-xl z-20 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded bg-nexora-accent-purple/20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-nexora-accent-purple animate-ping" />
                  </div>
                  <div>
                    <div className="text-xs text-nexora-text-secondary">AI Prediction</div>
                    <div className="text-sm text-white font-medium">+42% Growth</div>
                  </div>
                </motion.div>

                <div className="relative h-64 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent p-4 overflow-hidden border border-white/[0.05]">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between px-4 py-4 pointer-events-none opacity-20">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="border-t border-dashed border-white/[0.2] w-full" />
                    ))}
                  </div>

                  {/* SVG Chart */}
                  <svg className="w-full h-full relative z-10" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B6AFF" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3B6AFF" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3B6AFF" />
                        <stop offset="50%" stopColor="#7C3BFF" />
                        <stop offset="100%" stopColor="#4ECDC4" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 C50,75 80,50 120,45 C160,40 180,30 220,25 C260,20 300,35 340,15 C370,5 400,10 400,5 L400,100 L0,100 Z"
                      fill="url(#chartGrad)"
                      className="animate-pulse"
                    />
                    <path
                      d="M0,80 C50,75 80,50 120,45 C160,40 180,30 220,25 C260,20 300,35 340,15 C370,5 400,10 400,5"
                      fill="none"
                      stroke="url(#lineGrad)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Glow line */}
                    <path
                      d="M0,80 C50,75 80,50 120,45 C160,40 180,30 220,25 C260,20 300,35 340,15 C370,5 400,10 400,5"
                      fill="none"
                      stroke="url(#lineGrad)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      opacity="0.5"
                      filter="blur(4px)"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <SectionLabel text="Holographic Interface" className="mb-6" />
              
              <h2 className="text-[clamp(40px,5vw,56px)] font-bold leading-[1.1] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-6">
                Real-time visibility.<br/>Cinematic control.
              </h2>

              <p className="text-lg text-nexora-text-secondary leading-relaxed mb-10">
                Immerse yourself in a dynamic 3D command center. Monitor AI agents, visualize neural networks, and interact with your data in an environment that feels alive.
              </p>

              {/* Feature Checklist */}
              <div className="flex flex-col gap-5 mb-12">
                {features.map((feature, i) => (
                  <motion.div 
                    key={feature} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-nexora-accent-blue/50 group-hover:shadow-[0_0_15px_rgba(59,106,255,0.3)] transition-all">
                      <Check size={14} className="text-nexora-accent-blue" />
                    </div>
                    <span className="text-base text-nexora-text-primary font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div>
                <a href="#dashboard" className="btn-primary group">
                  <span className="relative z-10 flex items-center gap-2">
                    Enter the Matrix
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcaseSection;
