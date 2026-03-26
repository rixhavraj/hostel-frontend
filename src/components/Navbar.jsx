import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiBell } from "react-icons/fi";
import { MdHotel } from "react-icons/md";
import axios from "axios";
import API_URL from "../api";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/settings`);
        setSettings(res.data);
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    };
    fetchSettings();
    // Refresh every 30 seconds for "instant" updates feel
    const interval = setInterval(fetchSettings, 30000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/rooms", label: "Rooms" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
  ];

  const linkClass = ({ isActive }) =>
    `relative px-1 py-1 text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
    }`;

  const isHome = location.pathname === "/";

  return (
    <>
      {/* Hot Section / Announcement Bar */}
      <AnimatePresence>
        {settings?.showAnnouncement && settings?.announcement && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-blue-600 text-white py-2 px-4 text-center text-[11px] md:text-xs font-bold tracking-wide relative z-[60]"
          >
            <div className="flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap">
               <FiBell className="animate-bounce" />
               <span className="uppercase">{settings.announcement}</span>
               <FiBell className="animate-bounce" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/50"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200 group-hover:scale-110 transition-transform duration-200">
              <MdHotel size={20} />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              A1 <span className="text-blue-600">Hostel</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={linkClass}>
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <a
              href={isHome ? "#booking-form" : "/#booking-form"}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <FiX size={18} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <FiMenu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-slate-100 bg-white"
            >
              <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 gap-1">
                {navLinks.map(({ to, label, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <a
                  href={isHome ? "#booking-form" : "/#booking-form"}
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary mt-2 justify-center py-2.5"
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
