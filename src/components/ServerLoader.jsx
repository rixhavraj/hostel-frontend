import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API_URL from "../api";
import { MdOutlineStorage } from "react-icons/md";

export default function ServerLoader({ children }) {
  const [isReady, setIsReady] = useState(false);
  const [showLongWaitMessage, setShowLongWaitMessage] = useState(false);

  useEffect(() => {
    let longWaitTimer;
    let isMounted = true;
    
    const checkServer = async () => {
      try {
        await fetch(`${API_URL}/health`, { method: "GET" });
        if (isMounted) setIsReady(true);
      } catch (error) {
        console.warn("Server ping failed, proceeding with fallback", error);
        if (isMounted) setIsReady(true);
      }
    };

    longWaitTimer = setTimeout(() => {
      if (isMounted && !isReady) setShowLongWaitMessage(true);
    }, 3000);

    checkServer();

    // Fallback: force load after 45s so users aren't locked out completely if Render is ultra-slow
    const fallbackTimer = setTimeout(() => {
      if (isMounted) setIsReady(true);
    }, 45000);

    return () => {
      isMounted = false;
      clearTimeout(longWaitTimer);
      clearTimeout(fallbackTimer);
    };
  }, [isReady]);

  if (isReady) return children;

  return (
    <div className="fixed inset-0 z-[9999] section-dark flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 top-0 h-full z-0 overflow-hidden pointer-events-none">
         <div className="orb orb-1" style={{ top: '20%', left: '10%', opacity: 0.15 }} />
         <div className="orb orb-2" style={{ bottom: '20%', right: '10%', opacity: 0.1 }} />
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-40 rounded-full animate-pulse" />
          <div className="relative w-24 h-24 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-0 rounded-2xl border-2 border-indigo-500 border-t-transparent"
            />
            <MdOutlineStorage size={40} className="text-white" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Connecting to Cloud
        </h2>
        
        <div className="h-10 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!showLongWaitMessage ? (
              <motion.p 
                key="fast"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="text-white/60 text-sm md:text-base font-medium"
              >
                Establishing secure connection...
              </motion.p>
            ) : (
              <motion.p 
                key="slow"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-indigo-400 text-sm md:text-base font-medium"
              >
                Waking up free-tier backend<br/>(This might take up to 50 seconds)
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
