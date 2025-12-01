import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Code2, Cpu, Globe, Zap, Layers, Boxes } from 'lucide-react';

const capabilities = [
  { id: '01', title: 'CREATIVE DEVELOPMENT', desc: 'WebGL, React, Three.js, GLSL Shaders', icon: Code2 },
  { id: '02', title: 'MOTION ARCHITECTURE', desc: 'GSAP, Lenis, Framer Motion, 60FPS', icon: Zap },
  { id: '03', title: 'SYSTEM DESIGN', desc: 'Scalable Component Libraries, Design Tokens', icon: Boxes },
  { id: '04', title: 'IMMERSIVE 3D', desc: 'R3F, WebGL, Procedural Generation, Vertex Shaders', icon: Globe },
  { id: '05', title: 'UI ENGINEERING', desc: 'Pixel-perfect CSS, Micro-interactions', icon: Layers },
  { id: '06', title: 'PERFORMANCE OPT', desc: 'Core Vitals, Bundle Analysis, Lazy Loading', icon: Cpu },
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
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 100,
      duration: 0.6
    }
  }
};

const Capabilities: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section id="protocol" className="relative py-32 px-6 bg-black overflow-hidden">

      {/* Parallax Atmospheric Blobs */}
      <motion.div style={{ y: yBg }} className="absolute top-0 right-0 w-[800px] h-[800px] bg-grad-start rounded-full blur-[150px] opacity-10 pointer-events-none" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }} className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-grad-end rounded-full blur-[120px] opacity-10 pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-[1920px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-800 pb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-indigo font-mono text-xs tracking-widest mb-2 block animate-pulse drop-shadow-[0_0_8px_rgba(51,255,0,0.5)] text-[#33FF00]">&gt; SYSTEM_PROTOCOL</span>
            <h2 className="text-5xl md:text-7xl font-sans font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(51,255,0,0.3)]">
              METHODS &<br />CAPABILITIES
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mt-8 md:mt-0 font-mono text-xs text-gray-500 max-w-sm text-right"
          >
            ENGINEERING THE GAP BETWEEN ART AND UTILITY.
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-gray-800"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {capabilities.map((cap, index) => (
            <CapabilityCard key={cap.id} data={cap} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

interface CapabilityCardProps {
  data: typeof capabilities[0];
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({ data }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative border-r border-b border-gray-800 p-12 min-h-[300px] flex flex-col justify-between overflow-hidden transition-colors"
      data-hoverable
    >
      {/* Directional Hover Effect Background (Bottom Up for simplicity in grid) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

      {/* Internal Glow on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(106,13,173,0.15),transparent)] pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start">
        <span className="font-mono text-gray-600 text-xs group-hover:text-indigo transition-colors">/ {data.id}</span>
        <data.icon className="text-gray-600 group-hover:text-white transition-colors duration-300" size={24} />
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
          {data.title}
        </h3>
        <p className="text-gray-400 font-mono text-sm leading-relaxed border-l border-gray-800 pl-4 group-hover:border-indigo transition-colors duration-300">
          {data.desc}
        </p>
      </div>
    </motion.div>
  );
};

export default Capabilities;