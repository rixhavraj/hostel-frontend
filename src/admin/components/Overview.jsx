import { motion as Motion } from "framer-motion";
import { FiTrendingUp, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

export default function Overview({ data }) {
  const stats = [
    { label: "New Requests", value: data.bookings.filter(b => b.status === 'new').length, icon: <FiClock />, color: "bg-orange-500" },
    { label: "Confirmed", value: data.bookings.filter(b => b.status === 'confirmed').length, icon: <FiCheckCircle />, color: "bg-green-500" },
    { label: "Cancelled", value: data.bookings.filter(b => b.status === 'cancelled').length, icon: <FiXCircle />, color: "bg-red-500" },
    { label: "Total Rooms", value: data.rooms.length, icon: <FiTrendingUp />, color: "bg-blue-500" },
    { label: "Total Messages", value: data.messages?.length || 0, icon: <FiTrendingUp />, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-8 p-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50 flex items-center gap-5"
          >
            <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-800">{stat.value}</h4>
            </div>
          </Motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/60 backdrop-blur-md p-8 rounded-[3rem] border border-white shadow-xl shadow-slate-200/50">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-600 rounded-full" /> Recent Requests
          </h3>
          <div className="space-y-4">
            {data.bookings.slice(0, 5).map((b, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/40 rounded-2xl border border-white/50">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500">{b.name.charAt(0)}</div>
                   <div>
                     <p className="font-bold text-slate-800 text-sm">{b.name}</p>
                     <p className="text-xs text-slate-500">{b.roomType}</p>
                   </div>
                </div>
                <span className={`badge ${b.status === 'new' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'} text-[10px]`}>
                  {b.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[3rem] text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
          <div className="relative z-10 flex flex-col h-full">
             <h3 className="text-2xl font-bold mb-2">Hospitality Manager</h3>
             <p className="text-blue-100 text-sm mb-8">Maintain excellence in every stay.</p>
             <div className="mt-auto">
                <div className="text-4xl font-black mb-1">100%</div>
                <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">Uptime Score</p>
             </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
