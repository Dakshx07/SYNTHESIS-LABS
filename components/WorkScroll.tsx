import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../types';
import { Github, ExternalLink, Terminal, Code2 } from 'lucide-react';

const projects: Project[] = [
  {
    id: '01',
    title: 'DAKSH HIRAN',
    category: 'PERSONAL PORTFOLIO',
    year: '2024',
    // Dark UI/UX Vibe
    image: '/project-daksh.png',
    link: 'https://daksh-hiran.vercel.app/',
    github: 'https://github.com/Dakshx07/Daksh-Portfolio-Project',
    description: 'High-fidelity dark mode portfolio featuring smooth framer-motion interactions and a distinct interactive aesthetic.',
    tags: ['REACT', 'FRAMER_MOTION', 'TAILWIND', 'VITE']
  },
  {
    id: '02',
    title: 'LAKSHIT SONI',
    category: 'CREATIVE PORTFOLIO',
    year: '2024',
    // Creative/Abstract/WebGL Vibe
    image: '/project-lakshit.png',
    link: 'https://lakshit-soni.vercel.app/',
    github: 'https://github.com/lakshitsoni26/architects-nexus',
    description: 'Immersive creative developer showcase with WebGL elements and a sleek, modern architectural layout.',
    tags: ['THREE.JS', 'WEBGL', 'GSAP', 'REACT']
  },
  {
    id: '03',
    title: 'SENTINEL AI',
    category: 'AI SECURITY',
    year: '2024',
    // Cybersecurity/Code Vibe
    image: '/project-sentinel.png',
    link: 'https://sentinellai.netlify.app/',
    github: 'https://github.com/Dakshx07/sentinel-back4app',
    description: 'Top 10 Finalist project. AI-driven security platform for codebase vulnerability detection with advanced monitoring.',
    tags: ['AI_MODELS', 'PYTHON', 'BACK4APP', 'SECURITY']
  },
  {
    id: '04',
    title: 'AYUCHAIN',
    category: 'BLOCKCHAIN HEALTH',
    year: '2024',
    // Medical/Doctor Vibe
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
    github: 'https://github.com/lakshitsoni26/MediTech',
    description: 'Blockchain-based prescription security platform combining AI verification with immutable records to prevent fraud.',
    tags: ['SOLIDITY', 'BLOCKCHAIN', 'REACT', 'SMART_CONTRACTS']
  },
];

const WorkScroll: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Scroll logic for card-based layout
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <motion.section
      id="archive"
      ref={targetRef}
      className="relative h-auto md:h-[300vh] bg-black text-white"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="relative md:sticky top-0 flex flex-col md:flex-row h-auto md:h-screen items-center overflow-hidden border-t border-b border-white/5 bg-black py-12 md:py-0">

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(106,13,173,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(106,13,173,0.05)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        {/* Section Label */}
        <div className="relative md:absolute top-0 md:top-12 left-0 md:left-12 z-20 mix-blend-screen pointer-events-none mb-12 md:mb-0 px-6 md:px-0 w-full md:w-auto">
          <div className="flex items-center gap-2 mb-2">
            <Terminal size={12} className="text-indigo animate-pulse drop-shadow-[0_0_8px_rgba(51,255,0,0.5)] text-[#33FF00]" />
            <span className="font-mono text-indigo text-xs tracking-widest drop-shadow-[0_0_8px_rgba(51,255,0,0.5)] text-[#33FF00]">DEPLOYED_UNITS</span>
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(51,255,0,0.3)]">ARCHIVE_LOGS</h2>
        </div>

        {/* Scroll Hint Indicator */}
        <div className="absolute bottom-12 left-12 z-20 hidden md:flex items-center gap-4 mix-blend-difference pointer-events-none">
          <div className="w-12 h-[1px] bg-white/50" />
          <span className="font-mono text-[10px] text-white/50 tracking-widest animate-pulse">SCROLL_HORIZONTAL</span>
        </div>

        <motion.div
          style={{ x: isMobile ? 0 : x }}
          className="flex flex-col md:flex-row gap-8 px-6 md:px-24 w-full md:w-max h-auto md:h-full items-center"
        >

          {/* Intro Spacer */}
          <div className="hidden md:block w-[10vw] flex-shrink-0" />

          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative w-full md:w-[45vw] flex-shrink-0 bg-black/40 border border-white/10 overflow-hidden rounded-md backdrop-blur-sm transition-all duration-500 hover:border-indigo/50 hover:bg-black/80 hover:shadow-[0_0_50px_rgba(106,13,173,0.1)]"
            >
              {/* Header Bar */}
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo animate-pulse rounded-full" />
                  <span className="font-mono text-[10px] text-indigo tracking-widest">UNIT_{project.id}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-gray-500 hidden md:inline-block">STATUS: ONLINE</span>
                  <span className="font-mono text-[10px] text-gray-300">{project.year}</span>
                </div>
              </div>

              {/* Viewport Image Area */}
              <div className="relative h-[250px] md:h-[350px] w-full border-b border-white/10 overflow-hidden bg-gray-900 group-hover:border-indigo/30 transition-colors duration-500">
                {/* Main Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out filter grayscale group-hover:grayscale-0"
                />

                {/* CRT/Scanline Overlay - Clears on Hover */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,rgba(0,0,0,0.8)_2px)] bg-[size:100%_4px] opacity-40 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                {/* Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-8 relative overflow-hidden">
                {/* Decorative background number */}
                <span className="absolute -right-4 -bottom-4 text-[150px] font-bold text-white/5 leading-none select-none pointer-events-none group-hover:text-indigo/5 transition-colors duration-500">
                  {project.id}
                </span>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {project.tags?.map((tag, i) => (
                    <span key={i} className="px-2 py-1 border border-indigo/30 rounded text-[10px] font-mono text-indigo bg-indigo/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-grad-start group-hover:to-grad-end transition-all duration-500 relative z-10 group-hover:translate-x-2">
                  {project.title}
                </h3>

                <div className="flex items-center gap-2 mb-6 relative z-10">
                  <Code2 size={12} className="text-gray-500" />
                  <p className="font-mono text-xs text-gray-400 tracking-wider">{project.category}</p>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-lg relative z-10 border-l-2 border-white/10 pl-4 group-hover:border-indigo transition-colors duration-500 group-hover:text-gray-300">
                  {project.description}
                </p>

                {/* Action Grid */}
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 border border-indigo/50 bg-indigo/10 text-center font-mono text-[10px] md:text-xs text-white hover:bg-indigo hover:text-white transition-all tracking-widest flex justify-center items-center gap-2"
                    >
                      <ExternalLink size={14} /> LIVE_DEMO
                    </a>
                  ) : (
                    <div className="py-3 border border-white/5 bg-white/5 text-center font-mono text-[10px] md:text-xs text-gray-600 tracking-widest flex justify-center items-center gap-2 cursor-not-allowed">
                      <ExternalLink size={14} /> OFFLINE
                    </div>
                  )}

                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 border border-white/10 bg-transparent text-center font-mono text-[10px] md:text-xs text-gray-400 hover:bg-white hover:text-black transition-all tracking-widest flex justify-center items-center gap-2"
                    >
                      <Github size={14} /> CODEBASE
                    </a>
                  ) : (
                    <div className="py-3 border border-white/5 bg-transparent text-center font-mono text-[10px] md:text-xs text-gray-600 tracking-widest flex justify-center items-center gap-2 cursor-not-allowed">
                      <Github size={14} /> RESTRICTED
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* End Spacer */}
          <div className="w-[10vw] flex-shrink-0" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WorkScroll;