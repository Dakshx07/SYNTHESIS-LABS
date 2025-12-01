import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Check, Star, Zap, Shield, Cpu, ChevronRight, Hexagon } from 'lucide-react';

const plans = [
   {
      tier: "TIER_01",
      name: "Basic Plan",
      price: "₹2,000",
      features: [
         "1-Page Custom Website",
         "Mobile Responsive Core",
         "Basic Motion Physics",
         "SEO Indexing",
         "Rapid Deployment"
      ],
      highlight: false,
      icon: Zap,
      accent: "border-blue-500/50",
      glow: "shadow-blue-500/20"
   },
   {
      tier: "TIER_02",
      name: "Standard Plan",
      price: "₹6,000",
      recommended: true,
      features: [
         "Full Custom Architecture",
         "PWA Capabilities",
         "60FPS Fluid Motion",
         "Universal Responsiveness",
         "CMS Integration",
         "Scalability Ready"
      ],
      highlight: true,
      icon: Cpu,
      accent: "border-indigo/80",
      glow: "shadow-indigo/40"
   },
   {
      tier: "TIER_03",
      name: "Premium Plan",
      price: "₹12,000",
      features: [
         "Advanced Web Application",
         "WebGL / 3D Immersion",
         "High-Performance API",
         "Core Vitals Optimization",
         "Custom Digital Tools",
         "Future-Proof Stack"
      ],
      highlight: false,
      icon: Shield,
      accent: "border-purple-500/50",
      glow: "shadow-purple-500/20"
   }
];

const containerVariants: Variants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.15,
         delayChildren: 0.2
      }
   }
};

const cardVariants: Variants = {
   hidden: { opacity: 0, y: 50, scale: 0.95 },
   visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
         type: "spring",
         damping: 20,
         stiffness: 100
      }
   }
};

const Services: React.FC<{ onSelectPlan?: (plan: string) => void }> = ({ onSelectPlan }) => {
   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

   const handleScrollToContact = (planName?: string) => {
      if (planName && onSelectPlan) {
         onSelectPlan(planName);
      }
      const element = document.getElementById('contact');
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
      }
   };

   return (
      <motion.section
         id="tiers"
         className="py-32 px-6 bg-black text-white relative overflow-hidden border-t border-white/10"
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-10%" }}
         transition={{ duration: 0.8 }}
      >
         {/* Background Grid Texture */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20 pointer-events-none" />
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

         <div className="max-w-[1920px] mx-auto relative z-10">

            {/* Cyberpunk Header */}
            <div className="relative mb-24 grid grid-cols-1 md:grid-cols-2 items-end gap-8 border-b border-white/10 pb-8">
               <div className="absolute -bottom-[1px] left-0 w-32 h-[3px] bg-indigo" />

               <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
               >
                  <div className="flex items-center gap-3 mb-4">
                     <Hexagon size={12} className="text-[#33FF00] animate-pulse fill-current" />
                     <span className="font-mono text-[#33FF00] text-xs tracking-[0.2em] drop-shadow-[0_0_8px_rgba(51,255,0,0.5)]">
                     /// SYSTEM_UPGRADE_AVAILABLE
                     </span>
                  </div>
                  <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-none uppercase">
                     DEPLOYMENT<br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">TIERS</span>
                  </h2>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-right hidden md:block"
               >
                  <p className="font-mono text-xs text-gray-500 max-w-sm ml-auto leading-relaxed border-r-2 border-white/10 pr-4">
                     SELECT ENGAGEMENT PROTOCOL.<br />
                     <span className="text-white">SCALABLE ARCHITECTURES</span> DETECTED FOR<br />
                     EVERY STAGE OF GROWTH.
                  </p>
               </motion.div>
            </div>

            {/* Tactical Module Selector (Cards) */}
            <motion.div
               className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1600px] mx-auto"
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, margin: "-100px" }}
            >
               {plans.map((plan, index) => (
                  <ServiceModule
                     key={index}
                     plan={plan}
                     onSelect={() => handleScrollToContact(plan.name)}
                     index={index}
                     hovered={hoveredIndex === index}
                     onHover={() => setHoveredIndex(index)}
                     onLeave={() => setHoveredIndex(null)}
                     dimmed={hoveredIndex !== null && hoveredIndex !== index}
                  />
               ))}
            </motion.div>

            {/* Footer Action */}
            <div className="mt-20 flex justify-center">
               <button
                  onClick={() => handleScrollToContact()}
                  className="group relative px-8 py-3 bg-white/5 border border-white/10 hover:border-indigo/50 overflow-hidden transition-all duration-300"
               >
                  <div className="absolute inset-0 bg-indigo/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="relative flex items-center gap-4">
                     <span className="font-mono text-xs text-gray-400 group-hover:text-white tracking-widest transition-colors">INITIATE_CUSTOM_PROTOCOL</span>
                     <ChevronRight size={14} className="text-indigo" />
                  </div>
               </button>
            </div>

         </div>
      </motion.section>
   );
};

interface ServiceModuleProps {
   plan: typeof plans[0];
   onSelect: () => void;
   index: number;
   hovered: boolean;
   onHover: () => void;
   onLeave: () => void;
   dimmed: boolean;
}

const ServiceModule: React.FC<ServiceModuleProps> = ({ plan, onSelect, index, hovered, onHover, onLeave, dimmed }) => {
   return (
      <motion.div
         variants={cardVariants}
         onMouseEnter={onHover}
         onMouseLeave={onLeave}
         className={`relative group h-full transition-all duration-500 ease-out ${dimmed ? 'opacity-40 scale-95 grayscale' : 'opacity-100 scale-100'}`}
      >
         {/* Holographic Border Structure */}
         <div className={`absolute inset-0 border ${plan.recommended ? 'border-indigo' : 'border-white/10'} bg-black/40 backdrop-blur-xl transition-all duration-300 group-hover:border-opacity-100 group-hover:bg-black/60 [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)]`}>
            {/* Animated Glow Border */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] ${plan.glow}`} />
         </div>

         {/* Recommended Pulse */}
         {plan.recommended && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
               <div className="bg-indigo text-black px-4 py-1 text-[10px] font-bold font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(106,13,173,0.8)] animate-pulse">
                  CORE_RECOMMENDED
               </div>
            </div>
         )}

         {/* Card Content */}
         <div className="relative z-10 p-8 h-full flex flex-col [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)]">

            {/* Top Meta */}
            <div className="flex justify-between items-start mb-8 border-b border-white/5 pb-6">
               <div className="flex flex-col">
                  <span className={`font-mono text-[10px] tracking-widest mb-1 ${plan.recommended ? 'text-indigo' : 'text-gray-600 group-hover:text-white transition-colors'}`}>
                     {plan.tier}
                  </span>
                  <h3 className="text-2xl font-bold font-sans text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                     {plan.name}
                  </h3>
               </div>
               <div className={`p-2 rounded border border-white/10 bg-white/5 ${plan.recommended ? 'text-indigo' : 'text-gray-500 group-hover:text-white'}`}>
                  <plan.icon size={20} />
               </div>
            </div>

            {/* Price Display */}
            <div className="mb-8">
               <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter tabular-nums">{plan.price}</span>
               </div>
               <div className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent mt-4" />
            </div>

            {/* Features List */}
            <div className="space-y-4 flex-grow mb-8">
               {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 group/item">
                     <div className={`mt-1 w-1.5 h-1.5 rounded-none rotate-45 ${plan.recommended ? 'bg-indigo' : 'bg-gray-700 group-hover:bg-white transition-colors'}`} />
                     <span className="text-sm text-gray-400 group-hover/item:text-gray-200 transition-colors font-mono leading-relaxed">
                        {feature}
                     </span>
                  </div>
               ))}
            </div>

            {/* Action Button */}
            <div className="mt-auto">
               <button
                  onClick={onSelect}
                  className={`w-full py-4 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 border relative overflow-hidden group/btn
                ${plan.recommended
                        ? 'bg-indigo/10 border-indigo text-white hover:bg-indigo hover:shadow-[0_0_20px_rgba(106,13,173,0.4)]'
                        : 'bg-transparent border-white/10 text-gray-500 hover:text-white hover:border-white/40 hover:bg-white/5'
                     }
              `}
               >
                  <span className="relative z-10 flex justify-center items-center gap-2">
                     ACTIVATE <ChevronRight size={10} className="transition-transform group-hover/btn:translate-x-1" />
                  </span>
               </button>
            </div>

         </div>

         {/* Decorative Corner Accents */}
         <div className={`absolute bottom-0 right-0 w-6 h-6 border-b border-r ${plan.recommended ? 'border-indigo' : 'border-white/20'} transition-colors duration-300`} />
         <div className="absolute bottom-[20px] right-0 w-[20px] h-[1px] bg-current opacity-20 rotate-45 origin-right" />
      </motion.div>
   );
};

export default Services;