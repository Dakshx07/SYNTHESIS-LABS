import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black z-10 perspective-1000">
      {/* Organic Sculptural Form (Canvas) */}
      <OrganicRibbon />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(106,13,173,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(106,13,173,0.05)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      <motion.div 
        style={{ opacity: opacityText }}
        className="relative z-10 text-center px-4 mix-blend-screen"
      >
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-mono text-indigo text-xs md:text-sm tracking-[0.2em] mb-8"
          >
            <TypewriterText text="EST. 2024 — INTERACTIVE ARCHITECTURE" />
          </motion.div>
          
          <div className="mb-2 relative">
            <HeroTitle text="SYNTHESIS" delay={0.4} />
          </div>
          
          <div className="mb-12 relative">
             <LabsTitle />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-6"
          >
            <DirectionalButton 
              text="INITIATE PROTOCOL" 
              primary 
              onClick={() => handleScrollTo('contact')}
            />
            <DirectionalButton 
              text="VIEW ARCHIVE" 
              onClick={() => handleScrollTo('archive')}
            />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-10 flex items-center gap-4 mix-blend-difference">
        <motion.div 
          className="w-[1px] h-20 bg-gray-800 relative overflow-hidden"
        >
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/3 bg-indigo"
            animate={{ top: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        <span className="text-gray-500 font-mono text-xs rotate-90 origin-left translate-y-[-10px]">SCROLL</span>
      </div>
    </div>
  );
};

// --- Advanced Text Animations ---

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayText}</span>;
};

const HeroTitle = ({ text, delay }: { text: string; delay: number }) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay }
    }
  };

  const child: Variants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      rotateX: -90, 
      filter: "blur(20px)",
      transformPerspective: 1000
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        damping: 12, 
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  return (
    <motion.h1
      className="text-6xl md:text-9xl font-bold font-sans tracking-tighter leading-none overflow-visible flex justify-center perspective-1000 text-white"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, index) => (
        <motion.span 
          key={index} 
          variants={child}
          className="inline-block origin-bottom pb-2"
          whileHover={{ 
            scale: 1.1, 
            rotate: Math.random() * 10 - 5,
            y: -10,
            color: '#6A0DAD',
            transition: { duration: 0.2 } 
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// Robust Gradient Title for "LABS" to ensure visibility and uniqueness
const LabsTitle = () => {
  return (
    <div className="relative flex justify-center items-center">
      {/* Main Text */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)", y: 50 }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
        transition={{ delay: 0.8, duration: 1.2, ease: "circOut" }}
        className="relative z-10 text-6xl md:text-9xl font-bold font-sans tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-grad-start to-grad-end"
      >
        LABS
      </motion.h1>
      
      {/* Holographic Glow Layer */}
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: [0, 0.4, 0.2] }}
         transition={{ delay: 1.2, duration: 2, repeat: Infinity, repeatType: "reverse" }}
         className="absolute z-0 text-6xl md:text-9xl font-bold font-sans tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-grad-start to-grad-end blur-xl"
      >
        LABS
      </motion.div>

      {/* Subtle Floating Animation Container */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

// --- Magnetic Directional Button Component ---
interface DirectionalButtonProps {
  text: string;
  primary?: boolean;
  onClick?: () => void;
  submit?: boolean;
}

export const DirectionalButton: React.FC<DirectionalButtonProps> = ({ text, primary = false, onClick, submit = false }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = (clientX - (left + width / 2)) * 0.2; // Magnetic pull strength
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeaveButton = (e: React.MouseEvent) => {
    setPosition({ x: 0, y: 0 });
    handleMouseLeave(e);
  }

  // Directions: 0: top, 1: right, 2: bottom, 3: left
  const getDirection = (e: React.MouseEvent, item: HTMLElement) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left - (rect.width / 2);
    const y = e.clientY - rect.top - (rect.height / 2);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const direction = getDirection(e, ref.current);
    const overlay = ref.current.querySelector('.btn-overlay') as HTMLElement;
    if (!overlay) return;

    overlay.style.transition = 'none';
    
    switch(direction) {
      case 0: overlay.style.top = '-100%'; overlay.style.left = '0'; break;
      case 1: overlay.style.top = '0'; overlay.style.left = '100%'; break;
      case 2: overlay.style.top = '100%'; overlay.style.left = '0'; break;
      case 3: overlay.style.top = '0'; overlay.style.left = '-100%'; break;
    }

    void overlay.offsetWidth;

    overlay.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
    overlay.style.top = '0';
    overlay.style.left = '0';
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const direction = getDirection(e, ref.current);
    const overlay = ref.current.querySelector('.btn-overlay') as HTMLElement;
    if (!overlay) return;

    overlay.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
    
    switch(direction) {
      case 0: overlay.style.top = '-100%'; overlay.style.left = '0'; break;
      case 1: overlay.style.top = '0'; overlay.style.left = '100%'; break;
      case 2: overlay.style.top = '100%'; overlay.style.left = '0'; break;
      case 3: overlay.style.top = '0'; overlay.style.left = '-100%'; break;
    }
  };

  return (
    <motion.button 
      ref={ref}
      type={submit ? "submit" : "button"}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveButton}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative px-8 py-4 overflow-hidden group border transition-colors duration-300 ${primary ? 'border-indigo/50' : 'border-white/20'}`} 
      data-hoverable
    >
      {/* Overlay Layer - Liquid Gradient */}
      <div className={`btn-overlay absolute inset-0 w-full h-full bg-gradient-to-r from-grad-start to-grad-end z-0 pointer-events-none`} style={{ top: '-100%', left: 0 }} />
      
      {/* Content Layer */}
      <span className={`relative font-mono text-xs font-bold tracking-widest z-10 transition-colors duration-300 flex items-center gap-2 ${primary ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
        {primary && <span className="w-1.5 h-1.5 bg-indigo group-hover:bg-white rounded-full transition-colors" />}
        {text}
      </span>
    </motion.button>
  );
};

// --- Procedural Organic Ribbon Canvas ---
const OrganicRibbon: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; 
      ctx.fillRect(0, 0, width, height);
      
      ctx.lineWidth = 2;
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#FF6B6B');
      gradient.addColorStop(1, '#9F6BFF');
      ctx.strokeStyle = gradient;

      ctx.beginPath();
      
      for (let i = 0; i < 5; i++) {
        const amplitude = 100 + i * 20;
        const frequency = 0.002 + i * 0.001;
        const speed = time * (0.5 + i * 0.1);
        
        ctx.moveTo(0, height / 2);
        for (let x = 0; x < width; x+=5) {
          const y = height / 2 + 
            Math.sin(x * frequency + speed) * amplitude * Math.sin(time * 0.2) +
            Math.cos(x * 0.005 - speed) * 50;
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      time += 0.02;
      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />;
};

export default Hero;