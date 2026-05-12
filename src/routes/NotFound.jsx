import { motion as M } from "framer-motion";
import { Link } from "react-router-dom";
import { FiWifiOff, FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] section-dark flex flex-col items-center justify-center relative overflow-hidden px-4 pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 top-0 h-full z-0 overflow-hidden pointer-events-none">
         <div className="orb orb-1" style={{ top: '20%', left: '10%', opacity: 0.15 }} />
         <div className="orb orb-2" style={{ bottom: '20%', right: '10%', opacity: 0.1 }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Connection Lost Sticker */}
        <M.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 6 }}
          transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.1 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          className="relative mb-12 cursor-pointer"
        >
          {/* Glowing aura */}
          <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-40 rounded-3xl" />
          
          {/* Sticker Body */}
          <div 
            className="relative bg-slate-50 w-44 h-44 rounded-3xl shadow-2xl flex flex-col items-center justify-center"
            style={{ 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 10px rgba(255,255,255,0.05), inset 0 -5px 15px rgba(0,0,0,0.1)",
              border: "2px solid rgba(255,255,255,0.8)"
            }}
          >
            {/* Sticker peeling effect simulation */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white to-transparent opacity-50 rounded-tr-3xl" />
            
            <M.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <FiWifiOff size={64} className="text-rose-500 mb-3 drop-shadow-md" />
            </M.div>
            <span className="text-slate-800 font-black text-sm uppercase tracking-widest bg-slate-200 px-3 py-1 rounded-full">
              Lost
            </span>
          </div>
        </M.div>

        {/* Text Content */}
        <M.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="section-label">Error 404</span>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Page Not Found
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
            Looks like you've wandered off the grid. The page you're looking for doesn't exist or the connection was lost.
          </p>

          <Link to="/" className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-lg shadow-xl shadow-indigo-500/20">
            <FiHome size={20} /> Back to Home
          </Link>
        </M.div>
      </div>
    </div>
  );
}
