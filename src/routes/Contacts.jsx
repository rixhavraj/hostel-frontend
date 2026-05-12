import axios from "axios";
import { useState } from "react";
import { motion as M } from "framer-motion";
import {
  FiPhone, FiMail, FiMapPin, FiMessageCircle, FiSend, FiCheck
} from "react-icons/fi";
import API_URL from "../api";
import AnimatedBg from "../components/AnimatedBg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const contactInfo = [
  {
    icon: <FiPhone size={22} />,
    label: "Phone",
    value: "+91 9708169442",
    link: "tel:+919708169442",
    color: "#6366f1",
  },
  {
    icon: <FiMessageCircle size={22} />,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    link: "https://wa.me/919708169442?text=Hi%2C%20I%20want%20to%20check%20room%20availability.",
    color: "#14b8a6",
  },
  {
    icon: <FiMail size={22} />,
    label: "Email",
    value: "a1hostel@official.in",
    link: "mailto:a1hostel@official.in",
    color: "#ec4899",
  },
  {
    icon: <FiMapPin size={22} />,
    label: "Address",
    value: "Plot 12, Student Area, Greater Noida",
    link: "https://maps.google.com",
    color: "#f59e0b",
  },
];

export default function Contacts() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/contact`, form);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-hidden section-dark min-h-screen flex flex-col relative pb-32">
      <div className="absolute inset-0 top-[-20%] h-[120%] z-0 overflow-hidden pointer-events-none">
         <div className="orb orb-1" style={{ top: '10%', left: '-10%', opacity: 0.2 }} />
         <div className="orb orb-2" style={{ top: '40%', right: '-10%', opacity: 0.2 }} />
      </div>

      {/* Header */}
      <section className="relative pt-32 pb-16 px-4 z-10">
        <div className="mx-auto max-w-6xl text-center">
          <M.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="section-label">We're Here to Help</span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <div className="divider mx-auto mb-6" />
            <p className="text-white/60 max-w-xl mx-auto text-lg">
              Have questions? Call, WhatsApp, or drop a message. We usually respond within a few hours.
            </p>
          </M.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 z-10 w-full flex-1">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          
          {/* Left: Contact info + Map */}
          <M.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map(({ icon, label, value, link, color }) => (
                <M.a
                  key={label}
                  variants={fadeUp}
                  href={link}
                  target={link.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="glass rounded-2xl p-5 flex flex-col gap-4 group transition-all hover:-translate-y-1 hover:bg-white/5"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" 
                    style={{ background: `${color}20`, color: color, border: `1px solid ${color}40` }}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                      {value}
                    </p>
                  </div>
                </M.a>
              ))}
            </div>

            {/* Map */}
            <M.div variants={fadeUp} className="glass rounded-3xl p-2 overflow-hidden shadow-2xl">
              <div className="rounded-2xl overflow-hidden h-[300px] w-full bg-slate-800">
                <iframe
                  title="RPH Hostel location on Google Maps"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.3735893783647!2d77.49634531508078!3d28.46483798247671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef1764e57ec5%3A0x2f4892cec3a3d921!2sGreater%20Noida!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                />
              </div>
            </M.div>
          </M.div>

          {/* Right: Contact Form */}
          <M.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-full"
          >
            <div className="glass-dark rounded-3xl shadow-2xl p-8 md:p-12 h-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-white mb-8 text-center" style={{ fontFamily: "'Outfit', sans-serif" }}>Send Us a Message</h2>

              {sent ? (
                <M.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-5 py-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.4)" }}>
                    <FiCheck size={36} className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Message Sent!</h3>
                  <p className="text-white/60 mb-4 text-sm">Thank you. We'll get back to you shortly.</p>
                  <button onClick={() => setSent(false)} className="btn-secondary text-sm">
                    Send Another
                  </button>
                </M.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-white/70">Your Name</label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange} required
                      placeholder="Rahul Sharma" className="input-field bg-white/5 text-white placeholder-white/30 border-white/10"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-white/70">Email Address</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange} required
                      placeholder="rahul@example.com" className="input-field bg-white/5 text-white placeholder-white/30 border-white/10"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-white/70">Message</label>
                    <textarea
                      name="message" rows={5} value={form.message} onChange={handleChange} required
                      placeholder="Hi, I'd like to know about room availability..."
                      className="input-field bg-white/5 text-white placeholder-white/30 border-white/10 resize-none"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 rounded-xl text-base mt-4">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <FiSend />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </M.div>
        </div>
      </div>
    </div>
  );
}
