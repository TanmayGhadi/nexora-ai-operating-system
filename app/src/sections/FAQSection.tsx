import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';

const faqs = [
  {
    question: 'What is Nexora?',
    answer:
      'Nexora is an AI operating system that unifies your data, agents, and workflows into one intelligent platform. It helps teams build, automate, and scale their operations with the power of artificial intelligence.',
  },
  {
    question: 'How does the pricing work?',
    answer:
      'We offer simple, transparent pricing based on the number of AI agents and tasks you need. Choose between monthly or yearly billing, with a 20% discount for annual plans. Enterprise customers can contact us for custom pricing.',
  },
  {
    question: 'Can I integrate my own data?',
    answer:
      'Absolutely. Nexora connects with 500+ tools and platforms including databases, cloud storage, APIs, and popular SaaS applications. Our API also allows custom integrations.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'Security is our top priority. Nexora is SOC 2 Type II certified, GDPR compliant, and uses enterprise-grade encryption for data at rest and in transit. We offer SSO, audit logs, and role-based access control.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes, you can cancel your subscription at any time with no cancellation fees. Your data remains accessible for 30 days after cancellation, and you can export everything before leaving.',
  },
];

const FAQItem = ({ faq, index, activeIndex, setActiveIndex }: any) => {
  const isActive = activeIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="border-t border-white/[0.08] last:border-b"
    >
      <button
        onClick={() => setActiveIndex(isActive ? null : index)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isActive}
      >
        <span className={`text-base font-medium pr-4 transition-colors duration-300 ${isActive ? 'text-nexora-accent-blue' : 'text-white group-hover:text-white/80'}`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-nexora-accent-blue/10 text-nexora-accent-blue' : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/70'}`}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-nexora-text-secondary leading-relaxed pr-12">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 lg:py-48 bg-black overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(59,106,255,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 lg:gap-20">
          
          {/* Left Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel text="FAQ" className="mb-6" />
              <h2 className="text-[clamp(40px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                Any questions?<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexora-accent-blue to-nexora-accent-purple">We've got answers.</span>
              </h2>
              <p className="mt-6 text-lg text-nexora-text-secondary leading-relaxed max-w-[380px]">
                Everything you need to know about Nexora. Can't find what you're looking for? Contact our support team.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10"
            >
              <a href="#docs" className="inline-flex items-center gap-2 text-[15px] font-medium text-white/70 hover:text-white transition-colors duration-300 group bg-white/5 px-6 py-3 rounded-full border border-white/10 hover:border-white/20 backdrop-blur-md">
                View documentation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Accordion */}
          <div className="flex flex-col">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                faq={faq} 
                index={index} 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex} 
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
