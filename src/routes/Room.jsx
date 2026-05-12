import { useState, useEffect } from "react";
import { motion as M } from "framer-motion";
import { FiArrowRight, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } };

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/rooms`);
        setRooms(res.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="overflow-x-hidden min-h-screen section-dark pt-32 pb-24 relative">
      <div className="absolute inset-0 top-0 h-[800px] z-0 overflow-hidden pointer-events-none">
         <div className="orb orb-1" style={{ top: '10%', left: '-10%', opacity: 0.15 }} />
      </div>

      {/* Header */}
      <section className="relative px-4 mb-20 z-10">
        <div className="mx-auto max-w-6xl text-center flex flex-col items-center">
          <M.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <span className="badge badge-glow mb-6 inline-flex">
              <FiStar size={11} className="text-yellow-400" /> Transparent Pricing
            </span>
            <h1 className="text-5xl font-black text-white mt-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
              All <span className="gradient-text">Room Types</span>
            </h1>
            <div className="divider mx-auto mt-6" />
            <p className="mt-6 text-white/60 max-w-xl mx-auto text-lg">
              Choose the room that fits your budget and lifestyle. No hidden fees, no brokerage.
            </p>
          </M.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="mx-auto max-w-6xl px-4 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="w-12 h-12 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin"></span>
          </div>
        ) : (
          <M.div
            initial="hidden" animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-8 md:grid-cols-3"
          >
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <M.article
                  key={room._id}
                  variants={scaleIn}
                  className="card-light group overflow-hidden"
                  whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={room.images?.[0] || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80"}
                      alt={`${room.title} — RPH Hostel Greater Noida`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {room.tag && (
                      <div className="absolute top-3 left-3">
                        <span className="price-tag">{room.tag}</span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <p className="text-3xl font-black text-white">₹{room.price}</p>
                      <p className="text-xs text-white/60 font-semibold">/ month</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">{room.title}</h2>
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed font-bold whitespace-pre-line">
                      {room.description || "Clean, comfortable room with all basic amenities included."}
                    </p>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
                        <span>Capacity: {room.capacity}</span>
                        <span className={room.availableBeds === 0 ? "text-red-500" : "text-emerald-500"}>
                            {room.availableBeds} Beds Left
                        </span>
                    </div>
                    <a
                      href={`/#booking-form?roomType=${encodeURIComponent(room.title)}`}
                      className="btn-primary w-full justify-center py-3 text-sm"
                    >
                      Book This Room <FiArrowRight />
                    </a>
                  </div>
                </M.article>
              ))
            ) : (
              <div className="col-span-3 text-center py-20 opacity-50">
                <p className="text-xl font-medium text-white/50">No rooms listed yet.</p>
              </div>
            )}
          </M.div>
        )}

        {/* CTA note */}
        {!loading && rooms.length > 0 && (
          <M.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center p-8 rounded-3xl glass border border-white/10"
          >
            <p className="text-white/80 font-medium text-lg">
              Not sure which room to pick?{" "}
              <Link to="/contact" className="text-indigo-400 font-bold hover:underline">
                Contact us
              </Link>{" "}
              and we'll help you find the perfect fit.
            </p>
          </M.div>
        )}
      </section>
    </div>
  );
}
