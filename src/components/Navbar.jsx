import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion as M, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiBell, FiArrowRight } from "react-icons/fi";
import { MdHotel } from "react-icons/md";
import axios from "axios";
import API_URL from "../api";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState(null);
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, r] = await Promise.all([
          axios.get(`${API_URL}/api/settings`),
          axios.get(`${API_URL}/api/rooms`),
        ]);
        setSettings(s.data);
        setRooms(r.data);
      } catch {}
    };
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <>
      {/* Announcement bar */}
      <AnimatePresence>
        {settings?.showAnnouncement && settings?.announcement && (
          <M.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative z-50 overflow-hidden"
            style={{ background: "linear-gradient(90deg, #6366f1 0%, #ec4899 100%)" }}
          >
            <div className="flex items-center justify-center gap-2 py-2 px-4 text-white text-xs font-bold tracking-wide whitespace-nowrap overflow-hidden">
              <FiBell className="animate-bounce flex-shrink-0" size={12} />
              <span className="uppercase">{settings.announcement}</span>
              <FiBell className="animate-bounce flex-shrink-0" size={12} />
            </div>
          </M.div>
        )}
      </AnimatePresence>

      <M.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`navbar ${scrolled ? "navbar-scrolled" : "navbar-top"}`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}>
              <MdHotel size={22} />
            </div>
            <span className="text-xl font-black text-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              A1 <span style={{ background: "linear-gradient(135deg, #818cf8, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hostel</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            <NavLink to="/rooms" className={linkClass}>Rooms</NavLink>
            <NavLink to="/gallery" className={linkClass}>Gallery</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
            <a href={isHome ? "#booking-form" : "/#booking-form"} className="btn-primary text-sm px-5 py-2.5">
              Book Now <FiArrowRight size={14} />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/5 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <M.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <FiX size={20} />
                </M.span>
              ) : (
                <M.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <FiMenu size={20} />
                </M.span>
              )}
            </AnimatePresence>
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <M.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-white/5"
              style={{ background: "rgba(6,6,20,0.95)", backdropFilter: "blur(20px)" }}
            >
              <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-1">
                {[
                  { to: "/", label: "Home", end: true },
                  { to: "/rooms", label: "Rooms" },
                  { to: "/gallery", label: "Gallery" },
                  { to: "/contact", label: "Contact" },
                ].map(({ to, label, end }) => (
                  <NavLink key={to} to={to} end={end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive ? "bg-indigo-500/20 text-indigo-400" : "text-white/70 hover:text-white hover:bg-white/5"}`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <a
                  href={isHome ? "#booking-form" : "/#booking-form"}
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary mt-3 justify-center py-3"
                >
                  Book Now <FiArrowRight size={14} />
                </a>
              </div>
            </M.div>
          )}
        </AnimatePresence>
      </M.header>
    </>
  );
}
