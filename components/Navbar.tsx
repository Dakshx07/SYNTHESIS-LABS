import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Updated Links to match new section order: Archive -> Protocol -> Process -> Tiers -> Contact
  const links = ["ARCHIVE", "PROTOCOL", "PROCESS", "TIERS", "CONTACT"];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu if open
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 pointer-events-none">
        <motion.nav
          className={`pointer-events-auto px-6 md:px-8 py-4 rounded-full flex items-center justify-between gap-12 transition-all duration-500 border ${
            isScrolled 
              ? 'bg-black/40 backdrop-blur-md border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
              : 'bg-transparent border-transparent'
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brand - Significantly Larger */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' })}} className="flex items-center gap-4 group cursor-pointer mr-0 md:mr-8" data-hoverable>
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 bg-white rounded-full opacity-20 group-hover:scale-150 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-grad-start to-grad-end rounded-full animate-pulse" />
            </div>
            <span className="font-bold font-sans tracking-tight text-white text-xl md:text-2xl leading-none">
              SYNTHESIS
            </span>
          </a>

          {/* Desktop Links with Scramble Effect */}
          <div className="hidden md:flex gap-10 items-center">
            {links.map((link, i) => (
              <ScrambleLink 
                key={link} 
                text={link} 
                href={`#${link.toLowerCase()}`} 
                index={i} 
                onClick={(e) => handleScrollTo(e, link.toLowerCase())}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-white border border-white/20 rounded-full p-2 hover:bg-white hover:text-black transition-colors" 
            data-hoverable
          >
            <Menu size={20} />
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <div className="flex flex-col gap-8 text-center">
               {links.map((link, i) => (
                 <motion.a
                   key={link}
                   href={`#${link.toLowerCase()}`}
                   onClick={(e) => handleScrollTo(e, link.toLowerCase())}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className="text-4xl font-bold font-sans text-white hover:text-indigo transition-colors tracking-tighter"
                 >
                   {link}
                 </motion.a>
               ))}
            </div>
            
            <div className="absolute bottom-12 text-[10px] font-mono text-gray-600 tracking-widest">
               SYNTHESIS LABS MOBILE UPLINK
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ScrambleLink: React.FC<{ text: string; href: string; index: number; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }> = ({ text, href, index, onClick }) => {
  const [display, setDisplay] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  useEffect(() => {
    let interval: any;
    if (isHovering) {
      let i = 0;
      interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, index) => {
              if (index < i) return char;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        i += 1; // Faster scramble
        if (i >= text.length) clearInterval(interval);
      }, 30);
    } else {
      setDisplay(text);
    }
    return () => clearInterval(interval);
  }, [isHovering, text]);

  return (
    <a
      href={href}
      onClick={onClick}
      className="relative font-mono text-xs font-medium text-gray-400 hover:text-white transition-colors duration-300 tracking-widest py-2"
      data-hoverable
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className="text-indigo/50 mr-1 text-[10px] align-top">0{index + 1}</span>
      {display}
      <span className="absolute bottom-1 left-0 w-0 h-[1px] bg-indigo transition-all duration-300 hover:w-full" />
    </a>
  );
};

export default Navbar;