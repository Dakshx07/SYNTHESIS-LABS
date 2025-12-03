import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Cpu, Zap, Search, Rocket, Activity, Lock, Database, Globe } from 'lucide-react';

const steps = [
  {
    id: "01",
    title: "IGNITION",
    subtitle: "STRATEGY_CORE",
    desc: "Deconstructing objectives. We analyze the market signal to noise ratio and establish a tactical roadmap.",
    metrics: ["MARKET_ANALYSIS", "USER_PERSONAS", "TECH_STACK_DEF"],
    icon: Search
  },
  {
    id: "02",
    title: "FUSION",
    subtitle: "DESIGN_SYNTHESIS",
    desc: "High-fidelity UX/UI prototyping. Forging the visual identity with atomic design principles and motion physics.",
    metrics: ["WIREFRAMES", "MOTION_STUDIES", "DESIGN_SYSTEM"],
    icon: Zap
  },
  {
    id: "03",
    title: "CALIBRATION",
    subtitle: "ENGINEERING",
    desc: "Full-stack development. Component-driven architecture optimized for 60FPS performance and SEO.",
    metrics: ["REACT/NEXT.JS", "WEBGL/THREE.JS", "PERF_OPTIMIZATION"],
    icon: Cpu
  },
  {
    id: "04",
    title: "LAUNCH",
    subtitle: "GLOBAL_DEPLOY",
    desc: "Deployment to edge networks. We ensure scalability, security, and monitor post-launch core vitals.",
    metrics: ["CI/CD_PIPELINE", "ANALYTICS", "SCALE_AUTO"],
    icon: Rocket
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120
    }
  }
};

const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="py-32 bg-black text-white relative overflow-hidden border-t border-white/10">
      {/* Background Matrix */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-indigo animate-pulse" />
              <span className="font-mono text-indigo text-xs tracking-[0.2em] animate-pulse drop-shadow-[0_0_8px_rgba(51,255,0,0.5)] text-[#33FF00]">EXECUTION_PROTOCOL</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(51,255,0,0.3)]">
              PHASE SHIFT
            </h2>
          </motion.div>
          <div className="hidden md:block font-mono text-xs text-gray-500 text-right">
            <div className="mb-1">SYSTEM_STATUS: <span className="text-white">OPTIMAL</span></div>
            <div>LATENCY: <span className="text-white">12ms</span></div>
          </div>
        </div>

        {/* Phase-Shift Accordion */}
        <motion.div
          className="flex flex-col lg:flex-row min-h-[800px] h-auto lg:h-[600px] w-full border-t border-b border-white/10 bg-black"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <ProcessPanel
              key={step.id}
              step={step}
              isActive={activeStep === index}
              index={index}
              onHover={() => setActiveStep(index)}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

interface ProcessPanelProps {
  step: typeof steps[0];
  isActive: boolean;
  index: number;
  onHover: () => void;
}

const ProcessPanel: React.FC<ProcessPanelProps> = ({ step, isActive, index, onHover }) => {
  return (
    <motion.div
      layout
      variants={panelVariants}
      onMouseEnter={onHover}
      onClick={onHover}
      className={`relative border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden cursor-crosshair transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
        ${isActive ? 'lg:flex-[3] flex-[3] bg-white/[0.02]' : 'lg:flex-[1] flex-[1] bg-black hover:bg-white/[0.01]'}
      `}
    >
      {/* Active Indicator Line */}
      <motion.div
        className={`absolute top-0 left-0 w-full h-[2px] lg:w-[2px] lg:h-full bg-gradient-to-b from-grad-start to-grad-end z-20`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between">

        {/* Top Header */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className={`font-mono text-xs tracking-widest mb-2 transition-colors duration-300 ${isActive ? 'text-indigo' : 'text-gray-600'}`}>
              STEP_{step.id}
            </span>
            <motion.div
              className="origin-left"
              animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.5 }}
            >
              <step.icon size={20} className={isActive ? 'text-white' : 'text-gray-600'} />
            </motion.div>
          </div>

          {/* Collapsed Vertical Text (Desktop) */}
          {!isActive && (
            <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 rotate-90 origin-center whitespace-nowrap">
              <span className="font-mono text-xs tracking-[0.3em] text-gray-700 uppercase">{step.title}</span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="relative mt-auto">
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h3 className="text-4xl md:text-6xl font-bold font-sans text-white mb-4 tracking-tighter">
                  {step.title}
                </h3>

                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] flex-1 bg-white/10" />
                  <span className="font-mono text-indigo text-xs tracking-widest">{step.subtitle}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <p className="text-gray-400 font-sans text-lg leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Technical Schematic Box */}
                  <div className="border border-white/10 p-4 bg-black/50">
                    <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                      <span className="text-[10px] font-mono text-gray-500">SCHEMATIC_DATA</span>
                      <Activity size={12} className="text-indigo" />
                    </div>
                    <div className="space-y-2">
                      {step.metrics.map((metric, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-indigo rounded-full" />
                          <span className="font-mono text-xs text-gray-400">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Collapsed Title */}
          {!isActive && (
            <div className="lg:hidden mt-4">
              <h3 className="text-2xl font-bold text-gray-600">{step.title}</h3>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Process;