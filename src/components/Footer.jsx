import { Link } from "react-router-dom";
import { motion as M, useInView } from "framer-motion";
import { useRef } from "react";
import { FiInstagram, FiFacebook, FiMail, FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";
import { MdHotel } from "react-icons/md";

const YEAR = new Date().getFullYear();

const links = {
  Quick: [
    { label: "Home", to: "/" },
    { label: "Room Types", to: "/rooms" },
    { label: "Contact Us", to: "/contact" },
    { label: "Check Availability", href: "/#booking-form" },
  ],
  Support: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
};

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <footer style={{ background: "#06060e" }}>
      {/* CTA band */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #c026d3 100%)" }}>
        {/* shimmer stripe */}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,.05) 10px,rgba(255,255,255,.05) 20px)" }} />
        <div className="relative mx-auto max-w-6xl px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Ready to move in?</h2>
            <p className="text-white/60 text-sm mt-1">Book your room today — limited seats available!</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/#booking-form" className="btn-primary" style={{ background: "white", color: "#4f46e5" }}>
              Book Now <FiArrowRight />
            </a>
            <a href="https://wa.me/919708169442" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-white/30 text-white text-sm font-bold hover:bg-white/10 transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <M.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-4 py-14"
      >
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl text-white"
                style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}>
                <MdHotel size={22} />
              </div>
              <span className="text-xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                A1 <span style={{ background: "linear-gradient(135deg, #818cf8, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hostel</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              Clean, affordable, and safe hostel rooms in Greater Noida — built for students and working professionals.
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <a href="tel:+919708169442" className="flex items-center gap-2 transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                <FiPhone size={14} className="text-indigo-400" /> +91 9098765477
              </a>
              <a href="mailto:a1hostel@official.in" className="flex items-center gap-2 transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.5)" }}>
                <FiMail size={14} className="text-indigo-400" /> a1hostel@official.in
              </a>
              <p className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                <FiMapPin size={14} className="text-indigo-400 shrink-0" /> Plot 12, Student Area, Greater Noida, UP 201310
              </p>
            </div>

            <div className="mt-5 flex gap-3">
              {[
                { icon: <FiInstagram />, href: "#", label: "Instagram" },
                { icon: <FiFacebook />, href: "#", label: "Facebook" },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg,#6366f1,#ec4899)"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">{group} Links</h3>
              <ul className="space-y-2.5">
                {items.map(({ label, to, href }) => (
                  <li key={label}>
                    {to ? (
                      <Link to={to} className="text-sm transition-all hover:text-indigo-400 hover:translate-x-1 inline-flex" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {label}
                      </Link>
                    ) : (
                      <a href={href} className="text-sm transition-all hover:text-indigo-400 hover:translate-x-1 inline-flex" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.2)" }}>
          <p>© {YEAR} A1 Hostel. All rights reserved.</p>
          <p>
            Designed &amp; built by{" "}
            <a href="rixhavraj.github.io/portfolio/" target="_blank" rel="noreferrer"
              className="font-bold transition-colors hover:text-indigo-400" style={{ color: "rgba(129,140,248,0.8)" }}>
              Rishav
            </a>
          </p>
        </div>
      </M.div>
    </footer>
  );
}
