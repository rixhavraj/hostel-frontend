import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion as M, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiBell, FiSearch, FiUser } from "react-icons/fi";
import { MdHotel } from "react-icons/md";
import axios from "axios";
import API_URL from "../api";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const s = await axios.get(`${API_URL}/api/settings`);
        setSettings(s.data);
      } catch {}
    };
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <AnimatePresence>
        {settings?.showAnnouncement && settings?.announcement && (
          <M.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary text-white text-xs font-bold py-2 px-4 flex justify-center items-center gap-2 overflow-hidden"
          >
            <FiBell className="animate-pulse" />
            <span className="uppercase tracking-wide">{settings.announcement}</span>
          </M.div>
        )}
      </AnimatePresence>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav py-3" : "bg-white py-4 border-b border-gray-100"
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary">
            <div className="bg-primary text-white p-1.5 rounded-lg">
              <MdHotel size={24} />
            </div>
            <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Nexify
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/rooms" className="nav-link">Room</NavLink>
            <NavLink to="/gallery" className="nav-link">Gallery</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/rooms" className="btn-primary py-2 px-6 text-sm rounded-full">
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <M.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="container mx-auto py-4 flex flex-col gap-2">
                <NavLink to="/" className="block px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Home</NavLink>
                <NavLink to="/rooms" className="block px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Room</NavLink>
                <NavLink to="/gallery" className="block px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Gallery</NavLink>
                <NavLink to="/contact" className="block px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Contact</NavLink>
                
                <div className="px-4 pt-2">
                  <Link to="/rooms" className="btn-primary w-full justify-center" onClick={() => setMobileOpen(false)}>Book Now</Link>
                </div>
              </div>
            </M.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
