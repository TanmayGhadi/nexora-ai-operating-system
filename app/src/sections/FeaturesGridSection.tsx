import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Zap, BarChart3, Workflow, Cpu, Bot, Users, Shield, Plug } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';

const features = [
  { icon: Zap, title: 'AI Automation', description: 'Automate repetitive tasks with intelligent AI agents.', color: '#3B6AFF' },
  { icon: BarChart3, title: 'Smart Analytics', description: 'Turn data into actionable insights in real-time.', color: '#7C3BFF' },
  { icon: Workflow, title: 'Neural Workflows', description: 'Visualize, build and scale powerful AI workflows.', color: '#3B6AFF' },
  { icon: Cpu, title: 'Real-time Processing', description: 'Process millions of events with low-latency AI.', color: '#4ECDC4' },
  { icon: Bot, title: 'AI Agents', description: 'Autonomous agents that think, act and deliver.', color: '#3B6AFF' },
  { icon: Users, title: 'Team Collaboration', description: 'Work together with your team in real-time.', color: '#7C3BFF' },
  { icon: Shield, title: 'Security First', description: 'Enterprise-grade security and compliance built-in.', color: '#4ECDC4' },
  { icon: Plug, title: 'API & Integrations', description: 'Connect with 500+ tools and platforms.', color: '#3B6AFF' },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative group perspective-[1000px] h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-[24px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div 
        className="relative h-full bg-black/40 backdrop-blur-md border border-white/[0.08] p-8 rounded-[24px] overflow-hidden transition-colors duration-500 group-hover:border-white/[0.2] group-hover:bg-black/60"
        style={{ transform: "translateZ(30px)" }}
      >
        {/* Hover Glow Effect */}
        <motion.div 
          className="absolute -inset-10 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none blur-3xl"
          style={{ 
            background: `radial-gradient(circle at center, ${feature.color}, transparent 60%)`,
            x: useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"])
          }}
        />

        <div className="relative z-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${feature.color}30, transparent)`,
              boxShadow: `inset 0 0 0 1px ${feature.color}40`,
            }}
          >
            <Icon size={26} style={{ color: feature.color }} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight mb-3 transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70">
            {feature.title}
          </h3>
          <p className="text-sm text-nexora-text-secondary leading-relaxed group-hover:text-white/80 transition-colors">
            {feature.description}
          </p>
        </div>
        
        {/* Animated Corner Border */}
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-white/50 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out" />
          <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-white/50 to-transparent translate-x-[100%] group-hover:translate-x-[-100%] transition-transform duration-1000 ease-in-out delay-150" />
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesGridSection: React.FC = () => {
  return (
    <section
      id="features"
      className="relative py-32 lg:py-48 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,59,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel text="Ecosystem" className="mb-4" />
            <h2 className="text-[clamp(40px,5vw,64px)] font-bold leading-[1.0] tracking-[-0.03em] text-white max-w-[600px]">
              Built for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexora-accent-blue to-nexora-accent-purple">Future of Work</span>
            </h2>
          </motion.div>
          <motion.a
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="#features"
            className="group flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 whitespace-nowrap bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 backdrop-blur-sm"
          >
            Explore all features
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGridSection;
