import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API_URL from "../api";

// Components
import Sidebar from "../admin/components/Sidebar.jsx";
import Overview from "../admin/components/Overview.jsx";
import RoomsTab from "../admin/components/RoomsTab.jsx";
import BookingsTab from "../admin/components/BookingsTab.jsx";
import GalleryTab from "../admin/components/GalleryTab.jsx";
import MessagesTab from "../admin/components/MessagesTab.jsx";
import SettingsTab from "../admin/components/SettingsTab.jsx";
import { FiMenu } from "react-icons/fi";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState({ rooms: [], bookings: [], gallery: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    setLoading(true);
    try {
      const h = { Authorization: `Bearer ${token}` };
      const [r, b, g] = await Promise.all([
        axios.get(`${API_URL}/api/rooms`),
        axios.get(`${API_URL}/api/bookings`, { headers: h }),
        axios.get(`${API_URL}/api/gallery`)
      ]);
      setData({ rooms: r.data, bookings: b.data, gallery: g.data });
    } catch (err) {
      if (err.response?.status === 401) navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) navigate("/admin/login");
    else fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50 hero-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden hero-bg relative">
      {/* Mobile Header (Hamburger) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/60 backdrop-blur-md border-b border-white px-4 flex items-center z-40">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200"
        >
          <FiMenu size={20} />
        </button>
        <span className="ml-4 font-black text-slate-800 tracking-tight">Admin Portal</span>
      </div>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }} 
        handleLogout={handleLogout} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative mt-16 lg:mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="pb-20" /* Extra space at bottom */
          >
            {activeTab === "overview" && <Overview data={data} />}
            {activeTab === "rooms" && <RoomsTab rooms={data.rooms} fetchData={fetchData} />}
            {activeTab === "bookings" && <BookingsTab bookings={data.bookings} fetchData={fetchData} />}
            {activeTab === "gallery" && <GalleryTab gallery={data.gallery} fetchData={fetchData} />}
            {activeTab === "messages" && <MessagesTab fetchData={fetchData} />}
            {activeTab === "settings" && <SettingsTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
