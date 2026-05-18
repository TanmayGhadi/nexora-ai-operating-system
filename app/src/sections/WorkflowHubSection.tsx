import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Database, Cog, TrendingUp, Rocket } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';

const tabs = [
  {
    id: 0,
    number: '01',
    label: 'CONNECT',
    description: 'Unify all your data sources in one place',
    icon: Database,
    title: 'Connect Everything',
    content: 'Bring all your data together — databases, APIs, files, and cloud services converge into a single intelligent hub.',
    color: '#3B6AFF'
  },
  {
    id: 1,
    number: '02',
    label: 'AUTOMATE',
    description: 'Build intelligent workflows with AI agents',
    icon: Cog,
    title: 'Automate Anything',
    content: 'Create powerful workflows with AI agents that execute tasks autonomously, 24/7, without human intervention.',
    color: '#7C3BFF'
  },
  {
    id: 2,
    number: '03',
    label: 'OPTIMIZE',
    description: 'Analyze, learn and improve continuously',
    icon: TrendingUp,
    title: 'Optimize Continuously',
    content: 'AI-powered analytics identify bottlenecks and suggest improvements, helping your workflows get faster over time.',
    color: '#4ECDC4'
  },
  {
    id: 3,
    number: '04',
    label: 'SCALE',
    description: 'Scale effortlessly with enterprise-grade infra',
    icon: Rocket,
    title: 'Scale Infinitely',
    content: 'From startup to enterprise — our infrastructure scales with you. Handle millions of tasks without breaking a sweat.',
    color: '#3B6AFF'
  },
];

const PipelineVisualizer = ({ activeTab }: { activeTab: number }) => {
  return (
    <div className="relative w-full h-[400px] bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-3xl overflow-hidden flex items-center justify-center p-8">
      {/* Dynamic Background Glow */}
      <motion.div
        animate={{
          background: `radial-gradient(circle at center, ${tabs[activeTab].color}30, transparent 60%)`,
        }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 pointer-events-none opacity-50"
      />

      {/* Network Pipeline Lines */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M 100,200 C 200,200 300,100 400,200 C 500,300 600,200 700,200"
          fill="none"
          stroke="url(#gradientLine)"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <defs>
          <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={tabs[0].color} />
            <stop offset="33%" stopColor={tabs[1].color} />
            <stop offset="66%" stopColor={tabs[2].color} />
            <stop offset="100%" stopColor={tabs[3].color} />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Nodes */}
      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 rounded-2xl flex items-center justify-center mb-8 relative group"
              style={{
                background: `linear-gradient(135deg, ${tabs[activeTab].color}30, transparent)`,
                boxShadow: `0 0 30px ${tabs[activeTab].color}40`,
                border: `1px solid ${tabs[activeTab].color}50`,
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              {React.createElement(tabs[activeTab].icon, { 
                size: 40, 
                color: tabs[activeTab].color,
                className: "drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
              })}
            </motion.div>
            
            <h3 className="text-3xl font-bold text-white tracking-tight mb-4 drop-shadow-md">
              {tabs[activeTab].title}
            </h3>
            <p className="text-lg text-nexora-text-secondary leading-relaxed max-w-sm">
              {tabs[activeTab].content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Traveling Data Orbs */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            x: ['-200%', '200%'],
            y: [Math.sin(i) * 50, Math.cos(i) * -50],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.5,
          }}
          className="absolute w-2 h-2 rounded-full z-20 blur-[2px]"
          style={{
            background: tabs[activeTab].color,
            boxShadow: `0 0 10px 2px ${tabs[activeTab].color}`,
          }}
        />
      ))}
    </div>
  );
};

const WorkflowHubSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-32 lg:py-48 bg-black overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,106,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 lg:gap-20 items-center">
          
          {/* Left Column - Navigation */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel text="Workflow Pipeline" className="mb-6" />
              <h2 className="text-[clamp(40px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.03em] text-white mb-6">
                A new way to work.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexora-accent-blue to-nexora-accent-purple">Powered by AI.</span>
              </h2>
              <p className="text-lg text-nexora-text-secondary max-w-[400px] leading-relaxed mb-8">
                Nexora is more than a platform — it's your AI operating system. Connect everything. Automate anything. Achieve more.
              </p>
            </motion.div>

            {/* Tab Navigation */}
            <div className="flex flex-col gap-3 relative">
              {/* Animated active line indicator */}
              <motion.div 
                className="absolute left-0 w-1 bg-white rounded-full z-10"
                initial={false}
                animate={{
                  top: `${(activeTab * 100) / tabs.length}%`,
                  height: `${100 / tabs.length}%`
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              {tabs.map((tab, i) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`text-left p-5 rounded-2xl transition-all duration-300 ml-4 relative overflow-hidden group ${
                    activeTab === tab.id
                      ? 'bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/20'
                      : 'bg-transparent hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {/* Hover background slide */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <span className={`text-sm font-mono tracking-wider ${activeTab === tab.id ? 'text-white' : 'text-white/40'}`}>
                      {tab.number}
                    </span>
                    <span className={`text-lg font-semibold tracking-wide ${activeTab === tab.id ? 'text-white' : 'text-white/60'}`}>
                      {tab.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              href="#demo"
              className="inline-flex items-center gap-2 mt-10 text-[15px] font-medium text-nexora-accent-blue hover:text-white transition-colors duration-300 group ml-4"
            >
              See workflow in action
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </div>

          {/* Right Column - Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ perspective: "1000px" }}
          >
            <PipelineVisualizer activeTab={activeTab} />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default WorkflowHubSection;
