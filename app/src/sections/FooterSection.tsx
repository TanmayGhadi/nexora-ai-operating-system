import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Twitter, Linkedin, Github, MessageCircle } from 'lucide-react';
import Logo from '@/components/Logo';

const footerLinks = {
  Product: ['Overview', 'AI Agents', 'Workflows', 'Analytics', 'Integrations', 'Security'],
  Company: ['About', 'Careers', 'Blog', 'Partners', 'Press', 'Contact'],
  Resources: ['Docs', 'API Reference', 'Guides', 'Help Center', 'Community', 'Status'],
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FooterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <footer className="relative bg-black border-t border-white/[0.06] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_bottom,rgba(59,106,255,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="section-container relative z-10 py-16 lg:py-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr] gap-12 lg:gap-8"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants}>
            <Logo />
            <p className="mt-6 text-sm text-nexora-text-muted max-w-[280px] leading-relaxed">
              The AI Operating System for the future of work. Built to automate. Designed to scale.
            </p>
            <div className="flex gap-4 mt-8">
              {[
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Github, label: 'GitHub' },
                { Icon: MessageCircle, label: 'Discord' },
              ].map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  whileHover={{ scale: 1.1, y: -2, color: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                  href={`#${label.toLowerCase()}`}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-nexora-text-muted hover:bg-white/10 hover:border-white/20 transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={itemVariants}>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-6">
                {category}
              </h4>
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-nexora-text-secondary hover:text-white transition-colors duration-200 relative group"
                    >
                      <span>{link}</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full opacity-50" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold text-white mb-3">
              Stay ahead of the curve
            </h4>
            <p className="text-sm text-nexora-text-secondary mb-6 leading-relaxed">
              Join 50,000+ pioneers getting the latest updates on AI automation.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-gradient-to-r from-nexora-accent-blue to-nexora-accent-purple rounded-xl opacity-0 group-focus-within:opacity-50 blur transition-opacity duration-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="relative w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:bg-black/80 transition-all duration-300"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-12 rounded-xl flex items-center justify-center flex-shrink-0 btn-primary p-0 relative overflow-hidden"
                aria-label="Subscribe"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10">
                  {submitted ? (
                    <motion.svg 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      width="18" height="18" viewBox="0 0 16 16" fill="none"
                    >
                      <path d="M3 8L6.5 11.5L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  ) : (
                    <ArrowRight size={18} />
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-nexora-success animate-pulse" />
            <span className="text-[13px] font-medium text-white/60 hover:text-white transition-colors cursor-pointer">
              All systems operational
            </span>
          </div>
          
          <p className="text-[13px] text-white/40">
            © 2026 Nexora Inc. All rights reserved.
          </p>

          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Security'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[13px] text-white/40 hover:text-white transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
