import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = ['Product', 'Solutions', 'Resources', 'Docs', 'Pricing'];

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="section-container w-full flex justify-center">
          <div 
            className={`w-full max-w-6xl flex items-center justify-between px-6 transition-all duration-500 rounded-2xl ${
              scrolled 
                ? 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-3' 
                : 'bg-transparent py-2'
            }`}
          >
            <Logo />

            <div className="hidden lg:flex items-center gap-8 relative">
              {navLinks.map((link) => (
                <div 
                  key={link} 
                  className="relative"
                  onMouseEnter={() => setHoveredLink(link)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    className={`relative z-10 text-[14px] font-medium transition-colors duration-300 px-3 py-1.5 ${
                      hoveredLink === link ? 'text-white' : 'text-nexora-text-secondary'
                    }`}
                  >
                    {link}
                  </a>
                  {hoveredLink === link && (
                    <motion.div
                      layoutId="navHoverIndicator"
                      className="absolute inset-0 bg-white/10 rounded-full -z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#pricing"
                className="text-[14px] font-medium text-nexora-text-secondary hover:text-white transition-colors duration-300"
              >
                Sign In
              </a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#pricing"
                className="relative group overflow-hidden rounded-full p-[1px]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-nexora-accent-blue via-nexora-accent-purple to-nexora-accent-blue rounded-full opacity-70 group-hover:opacity-100 animate-spin-slow transition-opacity duration-300" />
                <div className="relative bg-black text-white text-[13px] font-medium py-2 px-6 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-black/50 backdrop-blur-sm">
                  Get Started
                </div>
              </motion.a>
            </div>

            <button
              className="lg:hidden text-white p-2 relative z-10"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[300px] bg-[#0A0A0F]/95 backdrop-blur-2xl border-l border-white/10 p-8 pt-28 flex flex-col gap-6"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  href={`#${link.toLowerCase()}`}
                  className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </motion.a>
              ))}
              <hr className="border-white/10 my-2" />
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                href="#pricing"
                className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </motion.a>
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
                href="#pricing"
                className="btn-primary text-center justify-center mt-4"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
