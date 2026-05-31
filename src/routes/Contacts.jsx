import axios from "axios";
import { useState } from "react";
import { motion as M } from "framer-motion";
import {
  FiPhone, FiMail, FiMapPin, FiMessageCircle, FiSend, FiCheck
} from "react-icons/fi";
import API_URL from "../api";

const contactInfo = [
  {
    icon: <FiPhone size={22} />,
    label: "Phone",
    value: "+91 9708169442",
    link: "tel:+919708169442",
  },
  {
    icon: <FiMessageCircle size={22} />,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    link: "https://wa.me/919708169442?text=Hi%2C%20I%20want%20to%20check%20room%20availability.",
  },
  {
    icon: <FiMail size={22} />,
    label: "Email",
    value: "a1hostel@official.in",
    link: "mailto:a1hostel@official.in",
  },
  {
    icon: <FiMapPin size={22} />,
    label: "Address",
    value: "Plot 12, Student Area, Greater Noida",
    link: "https://maps.google.com",
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
    <div className="bg-gray-50 min-h-screen pb-32">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 pt-16 pb-12 mb-12">
        <div className="container mx-auto text-center px-4">
          <M.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4">We're Here to Help</span>
            <h1 className="text-4xl md:text-5xl font-black text-secondary mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Get in Touch
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              Have questions? Call, WhatsApp, or drop a message. We usually respond within a few hours.
            </p>
          </M.div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          
          {/* Left: Contact info + Map */}
          <M.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map(({ icon, label, value, link }) => (
                <a
                  key={label}
                  href={link}
                  target={link.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:shadow-lg hover:border-primary/50 transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-base font-bold text-secondary">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Map */}
            <div className="bg-white border border-gray-200 rounded-2xl p-2 overflow-hidden shadow-sm">
              <div className="rounded-xl overflow-hidden h-[300px] w-full bg-gray-100">
                <iframe
                  title="Location on Google Maps"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.3735893783647!2d77.49634531508078!3d28.46483798247671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef1764e57ec5%3A0x2f4892cec3a3d921!2sGreater%20Noida!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                />
              </div>
            </div>
          </M.div>

          {/* Right: Contact Form */}
          <M.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="h-full"
          >
            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 md:p-12 h-full flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-secondary mb-8 text-center" style={{ fontFamily: "'Outfit', sans-serif" }}>Send a Message</h2>

              {sent ? (
                <M.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-5 py-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                    <FiCheck size={36} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary" style={{ fontFamily: "'Outfit', sans-serif" }}>Message Sent!</h3>
                  <p className="text-gray-500 mb-6">Thank you. We'll get back to you shortly.</p>
                  <button onClick={() => setSent(false)} className="btn-secondary">
                    Send Another
                  </button>
                </M.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Your Name</label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange} required
                      placeholder="Rahul Sharma" className="input-field"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Email Address</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange} required
                      placeholder="rahul@example.com" className="input-field"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Message</label>
                    <textarea
                      name="message" rows={5} value={form.message} onChange={handleChange} required
                      placeholder="Hi, I'd like to know about room availability..."
                      className="input-field resize-none"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base mt-4">
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
