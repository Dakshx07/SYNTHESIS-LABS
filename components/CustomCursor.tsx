import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Softer spring physics for a "fluid/underwater" cinematic feel
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('[data-hoverable]') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ 
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
          {/* Core Dot - Pure White for maximum Difference mode contrast */}
          <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          
          {/* Outer Ring - Hidden by default, expands on hover */}
          <motion.div 
            className="absolute border border-white rounded-full opacity-50"
            initial={{ width: 0, height: 0 }}
            animate={{ 
              width: isHovering ? 24 : 0, 
              height: isHovering ? 24 : 0,
              opacity: isHovering ? 1 : 0
            }}
          />

          {/* Magnetic Fields (Decorative lines) */}
          <motion.div
             className="absolute w-full h-[1px] bg-white"
             animate={{ 
                width: isHovering ? 40 : 0,
                opacity: isHovering ? 0.5 : 0 
             }}
          />
          <motion.div
             className="absolute h-full w-[1px] bg-white"
             animate={{ 
                height: isHovering ? 40 : 0,
                opacity: isHovering ? 0.5 : 0 
             }}
          />
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;