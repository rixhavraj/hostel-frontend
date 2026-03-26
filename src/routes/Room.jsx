import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiCheck, FiArrowRight, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
    <div className="overflow-x-hidden min-h-screen bg-slate-50">
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
            <span className="badge badge-blue mb-4">
              <FiStar size={11} style={{ color: "#f59e0b" }} /> Transparent Pricing
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3">
              All <span className="gradient-text">Room Types</span>
            </h1>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto text-base md:text-lg">
              Choose the room that fits your budget and lifestyle. No hidden fees, no brokerage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div
            className="grid gap-8 md:grid-cols-3"
          >
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <motion.article
                  key={room._id}
                  variants={fadeUp}
                  className="card-hover group relative overflow-hidden rounded-2xl bg-white shadow-md ring-2 ring-slate-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={room.images?.[0] || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80"}
                      alt={`${room.title} — RPH Hostel Greater Noida`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {room.tag && (
                      <span className="absolute top-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full bg-blue-600 shadow">
                        {room.tag}
                      </span>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <p className="text-3xl font-extrabold text-white">₹{room.price}</p>
                      <p className="text-xs text-white/70">/ month</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">{room.title}</h2>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">{room.description || "Clean, comfortable room with all basic amenities included."}</p>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
                        <span>Capacity: {room.capacity}</span>
                        <span className={room.availableBeds === 0 ? "text-red-500" : "text-green-600"}>
                            {room.availableBeds} Beds Left
                        </span>
                    </div>
                    <a
                      href={`/#booking-form?roomType=${encodeURIComponent(room.title)}`}
                      className="btn-primary w-full justify-center py-3 rounded-xl text-sm"
                      style={{ display: "flex" }}
                    >
                      Book This Room <FiArrowRight />
                    </a>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="col-span-3 text-center py-20 grayscale opacity-50">
                <p className="text-xl font-medium text-slate-500">No rooms listed yet.</p>
              </div>
            )}
          </div>
        )}

        {/* CTA note */}
        {!loading && rooms.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center p-8 rounded-2xl bg-white border border-slate-100 shadow-sm"
          >
            <p className="text-slate-700 font-medium">
              Not sure which room to pick?{" "}
              <Link to="/contact" className="text-blue-600 font-semibold hover:underline">
                Contact us
              </Link>{" "}
              and we'll help you find the perfect fit.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
