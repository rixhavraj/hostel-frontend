import { motion, AnimatePresence } from "framer-motion";
import { FiGrid, FiHome, FiCalendar, FiImage, FiLogOut, FiUser, FiMail, FiSettings, FiX } from "react-icons/fi";

export default function Sidebar({ activeTab, setActiveTab, handleLogout, isOpen, onClose }) {
  const menuItems = [
    { id: "overview", label: "Overview", icon: <FiGrid /> },
    { id: "rooms", label: "Rooms", icon: <FiHome /> },
    { id: "bookings", label: "Bookings", icon: <FiCalendar /> },
    { id: "messages", label: "Messages", icon: <FiMail /> },
    { id: "gallery", label: "Gallery", icon: <FiImage /> },
    { id: "settings", label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed inset-y-0 left-0 w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 p-6 z-[60] transition-transform duration-500 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
        >
          <FiX />
        </button>

        {/* Profile Section */}
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-200 text-white text-2xl font-bold">
            <FiUser />
          </div>
          <h3 className="font-bold text-slate-800">Hostel Admin</h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Owner Account</p>
          
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-sm font-bold mx-auto border border-transparent hover:border-red-100"
          >
            <FiLogOut /> Logout
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-200 translate-x-1"
                  : "text-slate-500 hover:bg-white/60 hover:text-blue-600 hover:translate-x-1"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-bold text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest opacity-60">
            RPH System v2.1
          </p>
        </div>
      </aside>
    </>
  );
}
