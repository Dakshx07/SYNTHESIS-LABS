import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const stages = [
  { threshold: 0, label: "BOOT_SEQUENCE", sub: "INIT_KERNEL" },
  { threshold: 40, label: "NEURAL_HANDSHAKE", sub: "UPLINK_EST" },
  { threshold: 80, label: "SYNTHESIS_LABS", sub: "READY" }
];

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(stages[0]);
  const [displayLabel, setDisplayLabel] = useState("");
  
  // High-Speed Progress Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const diff = 100 - prev;
        // Faster increments: jumps by 2-8% per tick
        const inc = Math.floor(Math.random() * 6) + 2; 
        const next = Math.min(prev + inc, 100);
        
        if (next === 100) {
          clearInterval(timer);
          // Very short hold at 100% for punchiness
          setTimeout(onComplete, 400); 
        }
        return next;
      });
    }, 40); // Fast tick rate (40ms)
    return () => clearInterval(timer);
  }, [onComplete]);

  // Stage Updater
  useEffect(() => {
    const newStage = stages.slice().reverse().find(s => progress >= s.threshold) || stages[0];
    if (newStage.label !== currentStage.label) {
      setCurrentStage(newStage);
    }
  }, [progress, currentStage.label]);

  // Faster Block Decryption Animation
  useEffect(() => {
    let iteration = 0;
    const target = currentStage.label;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const blocks = "█▓▒░";
    
    const interval = setInterval(() => {
      setDisplayLabel(
        target
          .split("")
          .map((letter, index) => {
            if (index < iteration) return letter;
            if (index < iteration + 2) return blocks[Math.floor(Math.random() * blocks.length)];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= target.length) clearInterval(interval);
      iteration += 1; // Decrypts much faster (1 char per tick)
    }, 30);

    return () => clearInterval(interval);
  }, [currentStage]);

  // Curtain Column Variants
  const columnVariants = {
    initial: { height: "100%" },
    exit: (i: number) => ({
      height: "0%",
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay: i * 0.05 // Tighter stagger
      }
    })
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col md:flex-row cursor-wait font-mono text-white pointer-events-none">
      
      {/* Background Audio/Texture (Visual Only) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
        <DataRain />
      </div>

      {/* 5 Vertical Columns Shutter */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          custom={i}
          variants={columnVariants}
          initial="initial"
          exit="exit"
          className="relative w-full md:w-1/5 h-full bg-black border-r border-gray-900 overflow-hidden flex flex-col justify-between p-4"
        >
           <div className="text-[10px] text-gray-700 opacity-50">COL_0{i}</div>
           <div className="h-full w-[1px] bg-gray-900/50 mx-auto" />
           <div className="text-[10px] text-gray-700 opacity-50 text-right">SYNC</div>
        </motion.div>
      ))}

      {/* Centered Content Layer */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center z-20"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <div className="relative w-full max-w-4xl px-6">
          
          <div className="flex justify-between items-end border-b border-indigo/30 pb-4 mb-8">
             <div className="flex flex-col">
                <span className="text-[10px] text-indigo tracking-widest mb-1">PROCESS</span>
                <span className="text-xs text-gray-400 tracking-[0.2em]">{currentStage.sub}</span>
             </div>
             <div className="text-right">
                <div className="text-4xl md:text-6xl font-bold font-sans tabular-nums leading-none">
                  {progress < 100 ? `0${progress}`.slice(-2) : 100}%
                </div>
             </div>
          </div>

          <div className="overflow-hidden min-h-[4rem] md:min-h-[8rem] flex items-center justify-center">
             <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 text-center">
                {displayLabel}
             </h1>
          </div>

          <div className="mt-8">
             <div className="w-full h-[2px] bg-gray-900 relative overflow-hidden">
                <motion.div 
                   className="absolute top-0 left-0 h-full bg-indigo shadow-[0_0_15px_rgba(106,13,173,0.8)]"
                   initial={{ width: 0 }}
                   animate={{ width: `${progress}%` }}
                />
             </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

// Background "Data Rain" Component
const DataRain = () => {
  const [drops, setDrops] = useState<{id: number, left: number, delay: number, speed: number}[]>([]);

  useEffect(() => {
    const count = 15;
    const newDrops = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      speed: 1 + Math.random() * 2
    }));
    setDrops(newDrops);
  }, []);

  return (
    <div className="w-full h-full relative">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute top-[-100px] text-[10px] md:text-xs text-indigo/20 font-mono writing-vertical"
          style={{
            left: `${drop.left}%`,
            animation: `dataRain ${drop.speed}s linear infinite`,
            animationDelay: `${drop.delay}s`,
            writingMode: 'vertical-rl'
          }}
        >
          {Array.from({ length: 10 }).map(() => "01"[Math.floor(Math.random() * 2)]).join(" ")}
        </div>
      ))}
    </div>
  );
};

export default Preloader;