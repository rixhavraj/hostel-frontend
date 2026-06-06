import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion as M } from "framer-motion";
import axios from "axios";
import API_URL from "../api";
import { FiSearch, FiCalendar, FiUsers, FiCheckCircle, FiShield, FiWifi, FiCoffee, FiStar, FiMapPin } from "react-icons/fi";
import { MdOutlineSecurity, MdOutlineKingBed } from "react-icons/md";
import FoodMenu from "../components/FoodMenu.jsx";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Search form state
  const [searchLocation, setSearchLocation] = useState("");
  const [stayType, setStayType] = useState("monthly"); // monthly or annual

  // Booking form state
  const [form, setForm] = useState({ fullName: "", email: "", mobile: "", roomType: "", moveInDate: "" });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleBookingChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      await axios.post(`${API_URL}/api/bookings`, {
        name: form.fullName, email: form.email, mobile: form.mobile,
        roomType: form.roomType || (rooms.length > 0 ? rooms[0].title : ""), moveInDate: form.moveInDate,
      });
      setToast({ msg: "Booking request submitted successfully!", type: "success" });
      setForm({ fullName: "", email: "", mobile: "", roomType: "", moveInDate: "" });
    } catch {
      setToast({ msg: "Something went wrong. Please try again.", type: "error" });
    } finally {
      setBookingLoading(false);
      setTimeout(() => setToast(null), 3500);
    }
  };

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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/rooms"); // Navigate to rooms list, we could pass search queries here
  };

  return (
    <div className="bg-white relative">
      {toast && (
        <div className={`toast ${toast.type === "success" ? "toast-success" : "toast-error"}`}>
          {toast.msg}
        </div>
      )}
      {/* ── HERO SECTION ── */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[600px] flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop" 
            alt="Modern living room"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/60"></div>
          
          <div className="relative z-10 text-center w-full max-w-4xl px-4">
            <M.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-md">
                <FiStar className="text-primary" /> PREMIUM STUDENT HOSTELS
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Your Home,<br />
                <span className="text-primary">Reimagined</span>
              </h1>
              <p className="text-xl text-gray-200 mb-12">
                Premium Student Hostels with Smart Living
              </p>
            </M.div>

            {/* Search Box */}
            <M.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 max-w-3xl mx-auto"
            >
              <div className="flex gap-4 mb-4">
                <button 
                  onClick={() => setStayType("monthly")}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${stayType === "monthly" ? "bg-primary text-white" : "text-white hover:bg-white/10"}`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setStayType("annual")}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${stayType === "annual" ? "bg-primary text-white" : "text-white hover:bg-white/10"}`}
                >
                  Annual
                </button>
              </div>

              <div className="bg-white rounded-xl p-2 flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <FiSearch className="text-gray-400" size={20} />
                  <div className="text-left w-full">
                    <p className="text-xs text-gray-500 font-bold uppercase">Where do you want to stay?</p>
                    <input 
                      type="text" 
                      placeholder="Search city, zone or landmark" 
                      className="w-full bg-transparent border-none outline-none text-sm font-semibold text-gray-800 placeholder-gray-400"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <FiCalendar className="text-gray-400" size={20} />
                  <div className="text-left w-full">
                    <p className="text-xs text-gray-500 font-bold uppercase">Move In Date</p>
                    <input type="date" className="w-full bg-transparent border-none outline-none text-sm font-semibold text-gray-800" />
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                  <FiUsers className="text-gray-400" size={20} />
                  <div className="text-left w-full">
                    <p className="text-xs text-gray-500 font-bold uppercase">Preference</p>
                    <select className="w-full bg-transparent border-none outline-none text-sm font-semibold text-gray-800">
                      <option>1 Room • 1 Guest</option>
                      <option>1 Room • 2 Guests</option>
                      <option>2 Rooms • 2 Guests</option>
                    </select>
                  </div>
                </div>

                <button onClick={handleSearch} className="btn-primary px-8 whitespace-nowrap">
                  Find Hostels
                </button>
              </div>
            </M.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES BANNER ── */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
               <div className="bg-primary/10 text-primary p-3 rounded-full shrink-0"><FiCheckCircle size={24} /></div>
               <div>
                 <h4 className="font-bold text-gray-900">Verified & Trusted</h4>
                 <p className="text-sm text-gray-500">All properties are verified for a safe stay.</p>
               </div>
            </div>
            <div className="flex items-start gap-4">
               <div className="bg-primary/10 text-primary p-3 rounded-full shrink-0"><FiCalendar size={24} /></div>
               <div>
                 <h4 className="font-bold text-gray-900">Flexible Stays</h4>
                 <p className="text-sm text-gray-500">Choose monthly, quarterly or annual stays.</p>
               </div>
            </div>
            <div className="flex items-start gap-4">
               <div className="bg-primary/10 text-primary p-3 rounded-full shrink-0"><MdOutlineSecurity size={24} /></div>
               <div>
                 <h4 className="font-bold text-gray-900">All Inclusive</h4>
                 <p className="text-sm text-gray-500">No hidden charges, everything included.</p>
               </div>
            </div>
            <div className="flex items-start gap-4">
               <div className="bg-primary/10 text-primary p-3 rounded-full shrink-0"><FiWifi size={24} /></div>
               <div>
                 <h4 className="font-bold text-gray-900">Smart Living</h4>
                 <p className="text-sm text-gray-500">Modern amenities for a better life.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED HOSTELS ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-primary font-bold text-sm tracking-wider uppercase mb-2">Explore the Best</p>
              <h2 className="text-4xl font-bold text-secondary" style={{ fontFamily: "'Outfit', sans-serif" }}>Featured Hostels</h2>
            </div>
            <button onClick={() => navigate("/rooms")} className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
              View All Hostels <FiSearch />
            </button>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton h-[400px] w-full rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {rooms.slice(0, 3).map((room) => (
                <M.div 
                  key={room._id} 
                  whileHover={{ y: -8 }}
                  className="bg-secondary rounded-2xl overflow-hidden shadow-lg border border-gray-800 text-white flex flex-col group cursor-pointer"
                  onClick={() => navigate(`/rooms/${room._id}`)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={room.images?.[0] || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"} 
                      alt={room.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">Premium</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{room.title}</h3>
                      <div className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded text-sm font-bold">
                        <FiStar className="text-yellow-400" size={14} /> 4.8
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm flex items-center gap-1 mb-6">
                      <FiMapPin /> {room.tag || "Koramangala, Bengaluru"}
                    </p>
                    
                    <div className="flex gap-4 mb-6 text-gray-400 text-sm">
                       <span className="flex items-center gap-1"><FiWifi /> WiFi</span>
                       <span className="flex items-center gap-1"><MdOutlineKingBed /> AC</span>
                       <span className="flex items-center gap-1"><FiCoffee /> Food</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-800">
                      <div className="flex items-baseline gap-1 text-primary">
                        <span className="text-xl font-black">₹{room.price}</span>
                        <span className="text-xs text-gray-400">/month</span>
                      </div>
                      <button className="text-sm font-bold bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                         View Details
                      </button>
                    </div>
                  </div>
                </M.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOD MENU ── */}
      <FoodMenu />

      {/* ── BOOKING FORM ── */}
      <section id="booking-form" className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-primary font-bold uppercase text-sm tracking-widest">Reserve Now</span>
            <h2 className="text-3xl font-bold text-secondary mt-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Book Your Stay
            </h2>
            <p className="text-gray-500 mt-4">Fill out the form below and we'll contact you shortly.</p>
          </div>

          <form onSubmit={handleBookingSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Full Name</label>
                <input
                  type="text" name="fullName" value={form.fullName} onChange={handleBookingChange} required
                  placeholder="Rahul Sharma" className="input-field"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Email Address</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleBookingChange} required
                  placeholder="rahul@example.com" className="input-field"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Mobile Number</label>
                <input
                  type="tel" name="mobile" value={form.mobile} onChange={handleBookingChange} required
                  placeholder="+91 9XXXXXXXXX" className="input-field"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Move-in Date</label>
                <input
                  type="date" name="moveInDate" value={form.moveInDate} onChange={handleBookingChange} required
                  className="input-field"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700">Room Type</label>
                <select 
                  name="roomType" 
                  value={form.roomType} 
                  onChange={handleBookingChange} 
                  required
                  className="input-field bg-white"
                >
                  <option value="" disabled>Select Room Type</option>
                  {rooms.map(r => (
                    <option key={r._id} value={r.title}>{r.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" disabled={bookingLoading} className="btn-primary w-full justify-center py-4 text-base mt-8">
              {bookingLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Booking Request"
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
