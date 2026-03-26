import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiInstagram, FiFacebook, FiMail, FiPhone, FiMapPin, FiArrowRight } from "react-icons/fi";
import { MdHotel } from "react-icons/md";

const YEAR = new Date().getFullYear();

const links = {
  Quick: [
    { label: "Home", to: "/" },
    { label: "Room Types", to: "/rooms" },
    { label: "Contact Us", to: "/contact" },
    { label: "Check Availability", href: "/#booking" },
  ],
  Support: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* CTA Band */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #4c1d95 100%)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white">Ready to move in?</h2>
            <p className="text-blue-200 text-sm mt-1">Book your room today — limited seats available!</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/#booking" className="btn-primary bg-white text-blue-700 shadow-lg hover:bg-blue-50" style={{ background: "white", color: "#1d4ed8" }}>
              Book Now <FiArrowRight />
            </a>
            <a
              href="https://wa.me/919708169442"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 text-white">
                <MdHotel size={20} />
              </div>
              <span className="text-lg font-bold text-white">A1 <span className="text-blue-400">Hostel</span></span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-slate-400">
              Clean, affordable, and safe hostel rooms in Greater Noida — built for students and working professionals.
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <a href="tel:+919708169442" className="flex items-center gap-2 hover:text-white transition-colors">
                <FiPhone size={14} className="text-blue-400" /> +91 9098765477
              </a>
              <a href="mailto:a1hostel@official.in" className="flex items-center gap-2 hover:text-white transition-colors">
                <FiMail size={14} className="text-blue-400" /> a1hostel@official.in
              </a>
              <p className="flex items-center gap-2">
                <FiMapPin size={14} className="text-blue-400 shrink-0" /> Plot 12, Student Area, Greater Noida, UP 201310
              </p>
            </div>

            {/* Socials */}
            <div className="mt-5 flex gap-3">
              {[
                { icon: <FiInstagram />, href: "#", label: "Instagram" },
                { icon: <FiFacebook />, href: "#", label: "Facebook" },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">{group} Links</h3>
              <ul className="space-y-2.5">
                {items.map(({ label, to, href }) => (
                  <li key={label}>
                    {to ? (
                      <Link
                        to={to}
                        className="text-sm hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1"
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        className="text-sm hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1"
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {YEAR} A1 Hostel. All rights reserved.</p>
          <p>
            Designed &amp; built by{" "}
            <a
              href="https://portfolio-rishav-dev.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline font-medium"
            >
              Rixhav
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
