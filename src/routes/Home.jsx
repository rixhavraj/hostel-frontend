import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  motion as M,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import API_URL from "../api";
import axios from "axios";
import {
  FiWifi, FiShield, FiDroplet, FiHome, FiStar,
  FiArrowRight, FiPhone, FiMessageCircle, FiCheck,
  FiMapPin, FiClock,
} from "react-icons/fi";
import {
  MdOutlineLocalLaundryService, MdOutlineDirectionsBike,
  MdOutlineFoodBank, MdOutlineSecurity,
} from "react-icons/md";
import AnimatedBg from "../components/AnimatedBg";
import Snowfall from "../components/Snowfall";

/* ── helpers ── */
const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };
const fadeIn  = { hidden: { opacity: 0 },        show: { opacity: 1 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } };

function Section({ children, className = "", delay = 0, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <M.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: delay } } }}
      className={className}
      {...rest}
    >
      {children}
    </M.div>
  );
}

function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 2000, stiffness: 60, damping: 25 });
  const [display, setDisplay] = useState(0);
  useEffect(() => { if (inView) mv.set(target); }, [inView, target, mv]);
  useEffect(() => spring.onChange((v) => setDisplay(Math.round(v))), [spring]);
  return <span ref={ref} className="stat-number">{display}{suffix}</span>;
}

/* ── data ── */
const amenities = [
  { icon: <FiWifi size={22} />,                     label: "High-Speed Wi-Fi",    color: "#6366f1" },
  { icon: <MdOutlineSecurity size={22} />,           label: "24/7 CCTV Security",  color: "#ec4899" },
  { icon: <MdOutlineFoodBank size={22} />,           label: "Mess / Cafeteria",    color: "#14b8a6" },
  { icon: <MdOutlineLocalLaundryService size={22} />, label: "Laundry Service",    color: "#f59e0b" },
  { icon: <FiDroplet size={22} />,                   label: "RO Drinking Water",   color: "#06b6d4" },
  { icon: <MdOutlineDirectionsBike size={22} />,     label: "Bike Parking",        color: "#a78bfa" },
  { icon: <FiHome size={22} />,                      label: "Housekeeping",        color: "#34d399" },
  { icon: <FiShield size={22} />,                    label: "Safe & Secure",       color: "#f97316" },
];

const testimonials = [
  { name: "Rahul Sharma",  role: "CSE Student, GNIOT",       text: "Best hostel in Greater Noida. Wi-Fi is super fast and staff is very helpful. Highly recommend!", rating: 5 },
  { name: "Priya Singh",   role: "B.Tech, GL Bajaj",         text: "Clean rooms, hygienic food, and 24/7 security — everything a student needs. Mess food is actually good!", rating: 5 },
  { name: "Aditya Kumar",  role: "Working Professional",     text: "Affordable and comfortable. Staff maintains everything well. 2-sharing room was worth every rupee.", rating: 4 },
];

const rules = [
  "In-time (Curfew): 10:00 PM",
  "Parents/Guardians entry only in common area",
  "No noise/parties after 11:00 PM",
  "Electricity bill based on sub-meter usage",
  "Refund policy as per signed agreement",
];

const nearby = [
  { place: "City University",  dist: "1.2 km", icon: "🎓" },
  { place: "Metro Station",    dist: "500 m",  icon: "🚆" },
  { place: "Medical Center",   dist: "2 km",   icon: "🏥" },
  { place: "Shopping Mall",    dist: "800 m",  icon: "🛍️" },
];

/* ════════════════════════════════════════════ */
export default function Home() {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ fullName: "", email: "", mobile: "", roomType: "", moveInDate: "" });
  const [loading, setLoading] = useState(false);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/rooms`);
        setRooms(res.data);
        const rt = searchParams.get("roomType");
        if (rt) setForm(f => ({ ...f, roomType: rt }));
        else if (res.data.length > 0) setForm(f => ({ ...f, roomType: res.data[0].title }));
      } catch (err) { console.error("Error fetching rooms:", err); }
      finally { setRoomsLoading(false); }
    };
    fetchRooms();
  }, [searchParams]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const scrollToBooking = (roomTitle) => {
    setForm(p => ({ ...p, roomType: roomTitle }));
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await axios.post(`${API_URL}/api/bookings`, {
        name: form.fullName, email: form.email, mobile: form.mobile,
        roomType: form.roomType, moveInDate: form.moveInDate,
      });
      showToast("✅ Booking request submitted! We'll call you soon.");
      setForm({ fullName: "", email: "", mobile: "", roomType: rooms[0]?.title || "", moveInDate: "" });
    } catch { showToast("❌ Something went wrong. Please try again.", "error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="overflow-x-hidden">
      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <M.div key="toast" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
            className={`toast ${toast.type === "success" ? "toast-success" : "toast-error"}`}>
            {toast.msg}
          </M.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="hero-bg relative min-h-[100dvh] flex flex-col items-center justify-between overflow-hidden">
        <AnimatedBg />
        <Snowfall count={30} />

        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-32 pb-12 text-center flex-1 flex flex-col justify-center">
          <M.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge badge-glow mb-8 inline-flex">
              <FiStar className="text-yellow-400" size={12} />
              Trusted by 500+ Students in Greater Noida
            </span>
          </M.div>

          <M.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl md:text-7xl font-black leading-tight text-white mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Your Home{" "}
            <span className="gradient-text">Away From Home</span>
            <br />
            <span className="text-3xl md:text-4xl font-bold text-white/60">in Greater Noida</span>
          </M.h1>

          <M.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Clean, safe &amp; fully-furnished hostel rooms with high-speed Wi-Fi,
            nutritious meals, and 24/7 security — starting at just{" "}
            <span className="text-indigo-400 font-bold">₹5,000/month</span>.
          </M.p>

          <M.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <a href="#booking-form" className="btn-primary text-base px-8 py-4">
              Book Now <FiArrowRight />
            </a>
            <a href="/rooms" className="btn-secondary text-base px-8 py-4">
              View Rooms
            </a>
            <a href="https://wa.me/919708169442" target="_blank" rel="noreferrer" className="btn-glow text-base px-8 py-4">
              <FiMessageCircle /> WhatsApp Us
            </a>
          </M.div>

        </div>

        {/* Bottom floating cards */}
        <div className="relative z-10 w-full pb-16 pt-12 mt-auto">
          <div className="mx-auto max-w-5xl px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🛡️", label: "24/7 Security" },
              { icon: "📶", label: "High-Speed Wi-Fi" },
              { icon: "🍽️", label: "Mess Included" },
              { icon: "💰", label: "From ₹5,000/mo" },
            ].map((item, i) => (
              <M.div key={item.label}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="glass rounded-2xl px-4 py-3 flex items-center gap-3"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-white/80 text-sm font-semibold">{item.label}</span>
              </M.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS SECTION
      ══════════════════════════════════════ */}
      <section className="section-dark relative overflow-hidden py-24 border-b border-white/5">
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <Section className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { target: 500, suffix: "+", label: "Happy Residents" },
              { target: rooms.length || 3, suffix: "+", label: "Room Types" },
              { target: 24, suffix: "/7", label: "Security" },
              { target: 5, suffix: "★", label: "Google Rating" },
            ].map(({ target, suffix, label }) => (
              <M.div key={label} variants={fadeUp} className="flex flex-col items-center gap-2">
                <Counter target={target} suffix={suffix} />
                <p className="text-white/40 text-sm font-semibold">{label}</p>
              </M.div>
            ))}
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ROOMS SECTION
      ══════════════════════════════════════ */}
      <section className="section-light py-32">
        <div className="mx-auto max-w-6xl px-4">
          <Section>
            <M.div variants={fadeUp} className="flex flex-col items-center text-center mb-16 gap-3">
              <span className="section-label">Featured Choices</span>
              <h2 className="section-title section-title-dark">Popular Room Types</h2>
              <div className="divider mx-auto" />
              <a href="/rooms" className="flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors mt-2">
                View all catalog <FiArrowRight />
              </a>
            </M.div>

            {roomsLoading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[1,2,3].map(i => (
                  <div key={i} className="card-light p-0 overflow-hidden">
                    <div className="skeleton h-52 w-full" />
                    <div className="p-5 space-y-3">
                      <div className="skeleton h-5 w-3/4" />
                      <div className="skeleton h-4 w-full" />
                      <div className="skeleton h-10 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-3">
                {rooms.slice(0, 3).map((room) => (
                  <M.article key={room._id} variants={scaleIn}
                    className="card-light group overflow-hidden"
                    whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={room.images?.[0] || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        alt={room.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="price-tag">{room.tag || "Available"}</span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <p className="text-3xl font-black text-white">₹{room.price}</p>
                        <p className="text-xs text-white/60 font-semibold">/ month</p>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{room.title}</h3>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{room.description || "Fully furnished and comfortable rooms with high-speed Wi-Fi and security."}</p>
                      <button
                        onClick={() => scrollToBooking(room.title)}
                        className="btn-primary w-full justify-center text-sm py-3"
                      >
                        Book Now <FiArrowRight />
                      </button>
                    </div>
                  </M.article>
                ))}
              </div>
            )}
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════
          AMENITIES SECTION (dark)
      ══════════════════════════════════════ */}
      <section className="section-gradient py-32">
        <div className="mx-auto max-w-6xl px-4">
          <Section>
            <M.div variants={fadeUp} className="text-center mb-20">
              <span className="section-label">Everything Included</span>
              <h2 className="section-title section-title-light mx-auto">World-Class Amenities</h2>
              <div className="divider mx-auto mt-6" />
              <p className="text-white/50 mt-6 max-w-xl mx-auto text-base">All essentials bundled in your monthly rent — no hidden charges.</p>
            </M.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {amenities.map(({ icon, label, color }) => (
                <M.div key={label} variants={scaleIn} className="amenity-box">
                  <div className="amenity-icon" style={{ background: `${color}20`, borderColor: `${color}30` }}>
                    <span style={{ color }}>{icon}</span>
                  </div>
                  <p className="text-sm font-bold text-white/80">{label}</p>
                </M.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════
          RULES & NEARBY (light)
      ══════════════════════════════════════ */}
      <section className="section-white py-32">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-16">
          {/* Rules */}
          <Section delay={0}>
            <M.div variants={fadeUp}>
              <div className="text-center mb-10">
                <span className="section-label mx-auto" style={{ color: "#6366f1" }}>Important Info</span>
                <h2 className="section-title section-title-dark text-3xl">Hostel Rules &amp; Policies</h2>
                <div className="divider mx-auto mt-4" />
              </div>
              <ul className="space-y-6 max-w-sm mx-auto md:max-w-none text-left">
                {rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <FiCheck size={14} className="text-indigo-600" />
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </M.div>
          </Section>

          {/* Nearby */}
          <Section delay={0.1}>
            <M.div variants={fadeUp}>
              <div className="text-center mb-10">
                <span className="section-label mx-auto" style={{ color: "#ec4899" }}>Location Perks</span>
                <h2 className="section-title section-title-dark text-3xl">Nearby Places</h2>
                <div className="divider mx-auto mt-4" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {nearby.map((p) => (
                  <div key={p.place} className="card-light p-4 flex items-center gap-3 group cursor-default">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{p.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{p.place}</p>
                      <p className="text-xs text-indigo-500 font-bold uppercase tracking-widest flex items-center gap-1">
                        <FiMapPin size={10} /> {p.dist}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </M.div>
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS (dark)
      ══════════════════════════════════════ */}
      <section className="section-dark py-32">
        <div className="mx-auto max-w-6xl px-4">
          <Section>
            <M.div variants={fadeUp} className="text-center mb-20">
              <span className="section-label">What Residents Say</span>
              <h2 className="section-title section-title-light mx-auto">Real Reviews</h2>
              <div className="divider mx-auto mt-6" />
            </M.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <M.div key={t.name} variants={fadeUp} transition={{ delay: i * 0.1 }} className="testimonial-card">
                  <div className="stars mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <FiStar key={j} size={14} fill="#f59e0b" stroke="none" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-5">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{t.name}</p>
                      <p className="text-white/40 text-xs">{t.role}</p>
                    </div>
                  </div>
                </M.div>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOOKING FORM
      ══════════════════════════════════════ */}
      <section id="booking-form" className="section-gradient py-32">
        <div className="mx-auto max-w-4xl px-4">
          <Section>
            <M.div variants={fadeUp} className="text-center mb-16">
              <span className="section-label">Easy Booking</span>
              <h2 className="section-title section-title-light">Reserve Your Room Today</h2>
              <div className="divider mx-auto mt-6" />
              <p className="text-white/50 mt-6 text-base">Fill the form and we'll call you within 24 hours.</p>
            </M.div>

            <M.form
              variants={scaleIn}
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8 text-left shadow-2xl"
            >
              {[
                { name: "fullName",   label: "Full Name",      type: "text",  placeholder: "Rahul Sharma" },
                { name: "email",      label: "Email Address",  type: "email", placeholder: "rahul@example.com" },
                { name: "mobile",     label: "Mobile Number",  type: "tel",   placeholder: "+91 9XXXXXXXXX" },
                { name: "moveInDate", label: "Move-in Date",   type: "date",  placeholder: "" },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-white/70">{label}</label>
                  <input
                    type={type} name={name} value={form[name]}
                    onChange={handleChange} required
                    className="input-field bg-white/5 text-white placeholder-white/30 border-white/10"
                    placeholder={placeholder}
                    style={{ colorScheme: "dark" }}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-white/70">Room Type</label>
                <select 
                  name="roomType" 
                  value={form.roomType || ""} 
                  onChange={handleChange} 
                  required
                  className="input-field bg-white/5 text-white border-white/10"
                >
                  <option value="" disabled className="bg-slate-900 text-white/50">Select Room Type</option>
                  {rooms.map(r => (
                    <option key={r._id} value={r.title} className="bg-slate-900 text-white">
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <p className="text-white/40 text-xs mb-2 flex items-center gap-1"><FiClock size={11} /> We respond within 24 hrs</p>
              </div>

              <button type="submit" disabled={loading}
                className="md:col-span-2 btn-primary w-full justify-center py-4 text-base"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Submit Booking Request <FiArrowRight />
                  </span>
                )}
              </button>
            </M.form>
          </Section>
        </div>
      </section>
    </div>
  );
}
