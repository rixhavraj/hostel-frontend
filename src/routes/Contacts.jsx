import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiPhone, FiMail, FiMapPin, FiMessageCircle, FiSend, FiCheck
} from "react-icons/fi";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const contactInfo = [
  {
    icon: <FiPhone size={20} />,
    label: "Phone",
    value: "+91 9708169442",
    link: "tel:+919708169442",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: <FiMessageCircle size={20} />,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    link: "https://wa.me/919708169442?text=Hi%2C%20I%20want%20to%20check%20room%20availability.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: <FiMail size={20} />,
    label: "Email",
    value: "a1hostel@official.in",
    link: "mailto:a1hostel@official.in",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: <FiMapPin size={20} />,
    label: "Address",
    value: "Plot 12, Student Area, Greater Noida, UP - 201310",
    link: "https://maps.google.com",
    color: "bg-orange-50 text-orange-600",
  },
];

import API_URL from "../api";

export default function Contacts() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

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
    <div className="overflow-x-hidden">
      {/* Header */}
      <section
        className="relative py-20 px-4"
        style={{ background: "linear-gradient(135deg, #dbeafe 0%, #ede9fe 60%, #fce7f3 100%)" }}
      >
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="mt-4 text-slate-600 max-w-lg mx-auto">
              Have questions? Call, WhatsApp, or drop a message. We usually respond within a few hours.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left: Contact info + Map */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="space-y-5"
          >
            {contactInfo.map(({ icon, label, value, link, color }) => (
              <motion.a
                key={label}
                variants={fadeUp}
                href={link}
                target={link.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 card-hover group"
              >
                <div className={`p-3 rounded-xl ${color} shrink-0`}>{icon}</div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Map */}
            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden shadow-md ring-1 ring-slate-100 mt-4">
              <iframe
                title="RPH Hostel location on Google Maps"
                className="w-full h-64 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.3735893783647!2d77.49634531508078!3d28.46483798247671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef1764e57ec5%3A0x2f4892cec3a3d921!2sGreater%20Noida!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              />
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl shadow-xl ring-1 ring-slate-100 p-7 md:p-10">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Send Us a Message</h2>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <FiCheck size={30} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Message Sent!</h3>
                  <p className="text-sm text-slate-500">We'll get back to you shortly.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="btn-secondary text-sm"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Rahul Sharma"
                      className="input-field"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="rahul@example.com"
                      className="input-field"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700">Message *</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Hi, I'd like to know about room availability for next month..."
                      className="input-field resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-3.5 rounded-xl text-base"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending…
                      </span>
                    ) : (
                      <>Send Message <FiSend /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
