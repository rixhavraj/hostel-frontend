import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiMail, FiPhone, FiMapPin, FiTwitter, FiLinkedin } from "react-icons/fi";
import { MdHotel } from "react-icons/md";

const YEAR = new Date().getFullYear();

const links = {
  Company: [
    { label: "About Us", to: "/contact" },
    { label: "Careers", to: "#" },
    { label: "Blog", to: "#" },
    { label: "Contact Us", to: "/contact" },
  ],
  Explore: [
    { label: "Find Hostels", to: "/rooms" },
    { label: "Cities", to: "/" },
    { label: "Amenities", to: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 border-b border-gray-800 pb-12 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2 pr-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary text-white p-1.5 rounded-lg">
                <MdHotel size={24} />
              </div>
              <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Nexify
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
              Your Home, Reimagined. Premium student hostels for modern students.
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-white font-bold text-sm mb-6">{group}</h3>
              <ul className="space-y-4">
                {items.map(({ label, to, href }) => (
                  <li key={label}>
                    {to ? (
                      <Link to={to} className="text-gray-400 text-sm hover:text-primary transition-colors">
                        {label}
                      </Link>
                    ) : (
                      <a href={href} className="text-gray-400 text-sm hover:text-primary transition-colors">
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
             <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
               <FiInstagram size={14} />
             </a>
             <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
               <FiFacebook size={14} />
             </a>
             <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
               <FiTwitter size={14} />
             </a>
             <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
               <FiLinkedin size={14} />
             </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {YEAR} Nexify Homes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
