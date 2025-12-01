import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-black text-white py-20 overflow-hidden border-t border-white/10">
      
      {/* 3D Grid Floor */}
      <div className="absolute inset-0 z-0 opacity-20 perspective-1000">
         <div className="absolute bottom-0 w-full h-[150%] bg-[linear-gradient(transparent_1px,#6A0DAD_1px),linear-gradient(90deg,transparent_1px,#6A0DAD_1px)] bg-[size:40px_40px] [transform:rotateX(60deg)_translateY(200px)] pointer-events-none" />
         <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      <div className="max-w-[1920px] mx-auto px-8 relative z-10 flex flex-col items-center">
        
        {/* Massive Brand Text - Centered and Dominant */}
        <div 
          onClick={scrollToTop}
          className="relative group cursor-pointer select-none my-12"
          role="button"
          aria-label="Scroll to top"
        >
           <div className="absolute inset-0 bg-indigo blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-1000" />
           <h1 className="text-[12vw] md:text-[14vw] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 group-hover:to-indigo transition-all duration-500">
              SYNTHESIS
           </h1>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex justify-between items-end border-t border-white/10 pt-8 mt-12 font-mono text-[10px] md:text-xs text-gray-500">
           <div>
              <p>© 2024 SYNTHESIS LABS</p>
              <p>ALL SYSTEMS OPERATIONAL</p>
           </div>
           <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>PRIVACY_PROTOCOL</a>
              <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>TERMS_OF_ENGAGEMENT</a>
           </div>
           <div className="text-right">
              <p>DESIGNED & ENGINEERED</p>
              <p className="text-indigo">IN THE VOID</p>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;