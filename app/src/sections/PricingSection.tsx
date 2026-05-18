import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Check, X, Shield, Sparkles } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';

interface PricingPlan {
  name: string;
  description: string;
  badge?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  cta: string;
  ctaStyle: 'primary' | 'secondary';
  featured?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: 'Pro',
    description: 'For growing teams',
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      'Up to 50 AI Agents',
      '100K Tasks / month',
      'Advanced Integrations',
      'Priority Support',
      'Custom Workflows',
    ],
    cta: 'Get Started',
    ctaStyle: 'secondary',
  },
  {
    name: 'Team',
    description: 'For scaling organizations',
    badge: 'MOST POPULAR',
    monthlyPrice: 99,
    yearlyPrice: 79,
    features: [
      'Everything in Pro',
      'Up to 200 AI Agents',
      '500K Tasks / month',
      'Team Collaboration',
      'SSO & Advanced Security',
      'Dedicated Account Manager',
      'Custom Integrations',
    ],
    cta: 'Get Started',
    ctaStyle: 'primary',
    featured: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Everything in Team',
      'Unlimited AI Agents',
      'Unlimited Tasks',
      'Custom AI Model Training',
      'On-premise Deployment',
      'SLA & 24/7 Support',
      'Custom Contracts',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'secondary',
  },
];

const PricingCard = ({ plan, isYearly, index, onSelect }: { plan: PricingPlan, isYearly: boolean, index: number, onSelect: (planName: string) => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const displayPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        zIndex: plan.featured ? 10 : 1
      }}
      className={`relative h-full perspective-[1000px] ${plan.featured ? 'md:-mt-4 md:mb-4' : ''}`}
    >
      {/* Glow Behind Featured Card */}
      {plan.featured && (
        <div className="absolute -inset-1 bg-gradient-to-r from-nexora-accent-blue via-nexora-accent-purple to-nexora-accent-blue opacity-50 blur-xl rounded-3xl animate-pulse" />
      )}

      {/* Badge */}
      {plan.badge && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
        >
          <span className="bg-gradient-to-r from-nexora-accent-blue to-nexora-accent-purple text-white text-[11px] font-bold py-1.5 px-4 rounded-full shadow-[0_0_20px_rgba(59,106,255,0.5)] border border-white/20 whitespace-nowrap">
            {plan.badge}
          </span>
        </motion.div>
      )}

      <div
        className={`relative h-full p-8 lg:p-10 rounded-[24px] overflow-hidden transition-colors duration-500 bg-black/60 backdrop-blur-xl border ${
          plan.featured ? 'border-nexora-accent-blue/50' : 'border-white/10 hover:border-white/20'
        }`}
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Spotlight hover effect */}
        <motion.div 
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"
          style={{ 
            background: `radial-gradient(600px circle at center, ${plan.featured ? 'rgba(124, 59, 255, 0.15)' : 'rgba(255,255,255,0.03)'}, transparent 40%)`,
            x: useTransform(mouseXSpring, [-0.5, 0.5], ["-20%", "20%"]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], ["-20%", "20%"])
          }}
        />

        <div className="relative z-10">
          <h3 className="text-[28px] font-semibold text-white tracking-tight">
            {plan.name}
          </h3>
          <p className="text-sm text-nexora-text-secondary mt-1 h-5">
            {plan.description}
          </p>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-1 h-14">
            {plan.name === 'Enterprise' ? (
              <span className="text-[clamp(32px,4vw,40px)] font-bold tracking-tight text-white">Custom</span>
            ) : (
              <>
                <motion.span 
                  key={displayPrice}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[clamp(32px,4vw,48px)] font-bold tracking-tight text-white"
                >
                  ${displayPrice}
                </motion.span>
                <span className="text-sm text-nexora-text-secondary">/month</span>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-white/[0.08]" />

          {/* Features */}
          <ul className="flex flex-col gap-4">
            {plan.features.map((feature, i) => (
              <motion.li 
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.featured ? 'bg-nexora-accent-blue/20' : 'bg-white/5'}`}>
                  <Check size={12} className={plan.featured ? 'text-nexora-accent-blue' : 'text-white/60'} />
                </div>
                <span className="text-sm text-nexora-text-primary/90">{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-10">
            <button 
              onClick={() => onSelect(plan.name)}
              className={`w-full flex items-center justify-center ${plan.featured ? 'btn-primary' : 'btn-secondary'} py-4 font-semibold rounded-2xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300`}
            >
              {plan.cta}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <section id="pricing" className="relative py-32 lg:py-48 bg-black overflow-hidden perspective-[1000px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(124,59,255,0.1)_0%,transparent_60%)] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel text="Simple, Transparent Pricing" className="mb-4" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(40px,5vw,64px)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
          >
            Built for people who <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexora-accent-blue to-nexora-accent-purple">build the future</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-nexora-text-secondary"
          >
            Choose the plan that fits your team. Scale as you grow.
          </motion.p>

          {/* Toggle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-12 bg-white/[0.02] border border-white/[0.05] inline-flex mx-auto p-2 rounded-full backdrop-blur-md"
          >
            <span className={`text-sm font-medium transition-colors px-4 py-2 rounded-full ${!isYearly ? 'text-white' : 'text-white/40'}`}>
              Monthly
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-[50px] h-[28px] rounded-full transition-colors duration-300 mx-2 shadow-inner bg-white/10"
              style={{ background: isYearly ? 'linear-gradient(135deg, #3B6AFF 0%, #7C3BFF 100%)' : 'rgba(255, 255, 255, 0.1)' }}
            >
              <motion.div
                animate={{ x: isYearly ? 24 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-[4px] w-[20px] h-[20px] rounded-full bg-white shadow-md"
              />
            </button>

            <span className={`text-sm font-medium transition-colors px-4 py-2 rounded-full flex items-center gap-2 ${isYearly ? 'text-white' : 'text-white/40'}`}>
              Yearly
              <span className="text-[10px] font-bold text-nexora-accent-blue bg-nexora-accent-blue/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Save 20%
              </span>
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              isYearly={isYearly} 
              index={index} 
              onSelect={(planName) => setSelectedPlan(planName)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Checkout Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md p-8 bg-[#0D0D15] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(59,106,255,0.3)] overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-nexora-accent-blue/10 blur-3xl pointer-events-none rounded-full" />
              
              <button 
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="text-center relative z-10">
                <div className="w-12 h-12 bg-nexora-accent-blue/10 rounded-2xl flex items-center justify-center text-nexora-accent-blue mx-auto mb-6">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Initialize {selectedPlan} Plan</h3>
                <p className="text-sm text-nexora-text-secondary mb-6">
                  You are about to launch your autonomous AI cluster. Let's configure your secure workspace.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-nexora-text-secondary uppercase tracking-wider font-semibold">Tier</span>
                    <span className="text-sm font-bold text-white">{selectedPlan}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-nexora-text-secondary uppercase tracking-wider font-semibold">Billing Cycle</span>
                    <span className="text-sm font-bold text-white">{isYearly ? 'Annual (-20%)' : 'Monthly'}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => {
                      alert(`Successfully initialized custom build cluster for the ${selectedPlan} tier! Deploying now...`);
                      setSelectedPlan(null);
                    }}
                    className="btn-primary w-full py-4 justify-center font-bold text-sm cursor-pointer rounded-2xl"
                  >
                    Confirm & Start Deployment
                  </button>
                  <button 
                    onClick={() => setSelectedPlan(null)}
                    className="btn-secondary w-full py-4 justify-center font-semibold text-sm cursor-pointer rounded-2xl"
                  >
                    Cancel Setup
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-nexora-text-muted">
                  <Shield size={12} className="text-nexora-success" />
                  <span>SOC-2 Certified • 256-bit Encrypted Setup</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PricingSection;
