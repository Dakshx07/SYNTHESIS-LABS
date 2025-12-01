import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DirectionalButton } from './Hero';
import { Shield, Radio, Globe, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC<{ selectedPlan?: string | null }> = ({ selectedPlan }) => {
   const [formState, setFormState] = useState<'idle' | 'transmitting' | 'sent' | 'error'>('idle');
   const form = useRef<HTMLFormElement>(null);
   const [subject, setSubject] = useState('');

   useEffect(() => {
      if (selectedPlan) {
         setSubject(`Inquiry regarding: ${selectedPlan}`);
      }
   }, [selectedPlan]);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setFormState('transmitting');

      // Formspree Integration
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdkqeyal';

      if (form.current) {
         const formData = new FormData(form.current);

         try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
               method: 'POST',
               body: formData,
               headers: {
                  'Accept': 'application/json'
               }
            });

            if (response.ok) {
               setFormState('sent');
               setTimeout(() => setFormState('idle'), 5000);
               form.current.reset();
               setSubject(''); // Reset subject if needed
            } else {
               const data = await response.json();
               console.error('Formspree error:', data);
               setFormState('error');
               setTimeout(() => setFormState('idle'), 5000);
            }
         } catch (error) {
            console.error('Network error:', error);
            setFormState('error');
            setTimeout(() => setFormState('idle'), 5000);
         }
      }
   };

   return (
      <motion.section
         id="contact"
         className="py-32 px-6 bg-black text-white min-h-screen flex flex-col justify-center border-t border-grid relative overflow-hidden perspective-1000"
         initial={{ opacity: 0, x: -100 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true, margin: "-10%" }}
         transition={{ duration: 1, ease: "easeOut" }}
      >

         {/* Background Atmosphere */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-indigo-dim to-transparent opacity-20 pointer-events-none blur-[100px]" />

         <div className="max-w-6xl mx-auto w-full z-10 relative">

            {/* Holographic Header */}
            <div className="mb-20 text-center relative">
               <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-gradient-to-b from-transparent via-indigo to-transparent h-24 blur-[1px]" />
               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-block border border-indigo/30 bg-black/50 backdrop-blur-sm px-6 py-2 rounded-full mb-8 shadow-[0_0_15px_rgba(51,255,0,0.2)]"
               >
                  <span className="font-mono text-indigo text-xs tracking-[0.3em] animate-pulse drop-shadow-[0_0_8px_rgba(51,255,0,0.5)] text-[#33FF00]">● SIGNAL_ACQUIRED</span>
               </motion.div>
               <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(51,255,0,0.3)]">
                  ESTABLISH UPLINK
               </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

               {/* Left: Enhanced Info Column */}
               <div className="lg:col-span-5 flex flex-col gap-6">
                  <h3 className="font-mono text-sm text-gray-400 mb-4 tracking-widest border-b border-white/10 pb-4 shadow-[0_4px_10px_rgba(51,255,0,0.1)]">
                     SECURE_CHANNELS
                  </h3>

                  <InfoCard
                     icon={Shield}
                     title="ENCRYPTION"
                     desc="End-to-end secure communication channels for sensitive project data."
                     delay={0}
                  />
                  <InfoCard
                     icon={Radio}
                     title="RESPONSE_TEAM"
                     desc="24/7 neural response team dedicated to immediate query resolution."
                     delay={0.1}
                  />
                  <InfoCard
                     icon={Globe}
                     title="GLOBAL_NODES"
                     desc="Distributed access points ensuring latency-free collaboration worldwide."
                     delay={0.2}
                  />
               </div>

               {/* Right: Holographic HUD Form */}
               <motion.div
                  className="lg:col-span-7 relative bg-black/40 backdrop-blur-md border border-white/10 p-1 rounded-xl shadow-2xl"
                  initial={{ rotateY: 10, opacity: 0 }}
                  whileInView={{ rotateY: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
               >
                  {/* Decorative HUD Corners */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-indigo" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-indigo" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-indigo" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-indigo" />

                  <div className="bg-black/80 p-8 md:p-12 rounded-lg relative overflow-hidden group min-h-[500px] flex flex-col justify-center">
                     {/* Scanline Effect */}
                     <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,rgba(0,0,0,0.5)_2px)] bg-[size:100%_4px] opacity-20 pointer-events-none" />

                     <AnimatePresence mode="wait">
                        {formState === 'sent' ? (
                           <motion.div
                              key="success"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex flex-col items-center justify-center text-center h-full"
                           >
                              <div className="w-20 h-20 rounded-full bg-[#33FF00]/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(51,255,0,0.3)]">
                                 <CheckCircle size={40} className="text-[#33FF00]" />
                              </div>
                              <h3 className="text-3xl font-bold text-white mb-2">SIGNAL ESTABLISHED</h3>
                              <p className="font-mono text-gray-400 text-sm">TRANSMISSION SUCCESSFUL. STANDBY FOR RESPONSE.</p>
                           </motion.div>
                        ) : formState === 'error' ? (
                           <motion.div
                              key="error"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex flex-col items-center justify-center text-center h-full"
                           >
                              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,0,0,0.3)]">
                                 <AlertCircle size={40} className="text-red-500" />
                              </div>
                              <h3 className="text-3xl font-bold text-white mb-2">TRANSMISSION FAILED</h3>
                              <p className="font-mono text-gray-400 text-sm">SIGNAL INTERFERENCE DETECTED. PLEASE RETRY.</p>
                              <button onClick={() => setFormState('idle')} className="mt-6 text-indigo hover:text-white underline font-mono text-xs">RE-INITIALIZE</button>
                           </motion.div>
                        ) : (
                           <motion.form
                              ref={form}
                              key="form"
                              initial={{ opacity: 1 }}
                              exit={{ opacity: 0, filter: "blur(10px)" }}
                              className="space-y-10 relative z-10"
                              onSubmit={handleSubmit}
                           >
                              <HoloInput label="IDENTITY_KEY" name="user_name" placeholder="ENTER NAME / ORG" />
                              <HoloInput label="COMMS_FREQUENCY" name="user_email" placeholder="EMAIL ADDRESS" type="email" />
                              <HoloInput
                                 label="MISSION_PARAMETERS"
                                 name="message"
                                 placeholder="BRIEFING DETAILS..."
                                 textarea
                                 value={subject}
                                 onChange={(e) => setSubject(e.target.value)}
                              />

                              <div className="pt-4 flex justify-end">
                                 <DirectionalButton
                                    text={formState === 'transmitting' ? "TRANSMITTING..." : "TRANSMIT_DATA"}
                                    primary
                                    submit={true}
                                 />
                              </div>
                           </motion.form>
                        )}
                     </AnimatePresence>
                  </div>
               </motion.div>
            </div>

         </div>
      </motion.section>
   );
};

const InfoCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => {
   return (
      <motion.div
         initial={{ opacity: 0, x: -20 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{ delay, duration: 0.5 }}
         className="flex items-start gap-4 p-6 border border-white/5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] hover:border-indigo/30 transition-all duration-300 group"
      >
         <div className="p-3 bg-white/5 rounded text-gray-400 group-hover:text-indigo group-hover:bg-indigo/10 transition-colors">
            <Icon size={20} />
         </div>
         <div>
            <h4 className="text-white font-bold font-mono text-sm tracking-widest mb-2 group-hover:text-indigo transition-colors">{title}</h4>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs">{desc}</p>
         </div>
      </motion.div>
   )
}

const HoloInput = ({ label, name, placeholder, type = "text", textarea = false, value, onChange }: { label: string; name: string; placeholder: string; type?: string; textarea?: boolean; value?: string; onChange?: (e: any) => void }) => {
   const [focused, setFocused] = useState(false);

   return (
      <div className="relative group">
         <div className="flex justify-between mb-2 font-mono text-[10px] tracking-widest">
            <label className={`transition-colors duration-300 ${focused ? 'text-indigo' : 'text-gray-500'}`}>{label}</label>
            <span className={`transition-opacity duration-300 ${focused ? 'opacity-100 text-indigo' : 'opacity-0'}`}>[ACTIVE]</span>
         </div>

         <div className="relative">
            {/* Laser Bracket Left */}
            <motion.div
               className="absolute top-0 left-0 w-[2px] bg-indigo"
               animate={{ height: focused ? '100%' : '0%' }}
               transition={{ duration: 0.3 }}
            />
            {/* Laser Bracket Right */}
            <motion.div
               className="absolute bottom-0 right-0 w-[2px] bg-indigo"
               animate={{ height: focused ? '100%' : '0%' }}
               transition={{ duration: 0.3 }}
            />

            {textarea ? (
               <textarea
                  required
                  name={name}
                  rows={2}
                  className="w-full bg-white/5 border-b border-white/10 text-white p-4 focus:outline-none focus:bg-indigo/5 transition-all resize-none placeholder-gray-700 font-sans"
                  placeholder={placeholder}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  value={value}
                  onChange={onChange}
               />
            ) : (
               <input
                  required
                  name={name}
                  type={type}
                  className="w-full bg-white/5 border-b border-white/10 text-white p-4 focus:outline-none focus:bg-indigo/5 transition-all placeholder-gray-700 font-sans"
                  placeholder={placeholder}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  value={value}
                  onChange={onChange}
               />
            )}

            {/* Bottom Glow Line */}
            <div className={`absolute bottom-0 left-0 h-[1px] bg-indigo shadow-[0_0_10px_#6A0DAD] transition-all duration-500 ${focused ? 'w-full' : 'w-0'}`} />
         </div>
      </div>
   );
};

export default Contact;