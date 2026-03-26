import { FiMessageCircle, FiTrash2, FiMail, FiPhone, FiCalendar } from "react-icons/fi";
import API_URL from "../../api";
import axios from "axios";

export default function BookingsTab({ bookings, fetchData }) {
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${API_URL}/api/bookings/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (err) {
      alert("Error updating status");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/bookings/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (err) {
      alert("Error deleting booking");
    }
  };

  const openWhatsApp = (phone, name, roomType) => {
    const msg = encodeURIComponent(`Hello ${name}, this is RPH Hostel Admin. Regarding your booking for ${roomType}...`);
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${msg}`, "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50">
        <h2 className="text-2xl font-black text-slate-800">Reservation Requests</h2>
        <p className="text-slate-500 text-sm">Review and manage student bookings</p>
      </div>

      <div className="block lg:hidden space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white/80 p-6 rounded-[2.5rem] border border-white shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-black text-slate-800 flex items-center gap-2">
                  {b.name}
                  <button 
                    onClick={() => openWhatsApp(b.mobile, b.name, b.roomType)}
                    className="text-green-500"
                  >
                    <FiMessageCircle size={18} />
                  </button>
                </h4>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mt-1">{b.roomType || 'No Room Type'}</p>
              </div>
              <select 
                value={b.status} 
                onChange={(e) => updateStatus(b._id, e.target.value)}
                className={`text-[10px] font-black uppercase tracking-wider py-1.5 px-3 rounded-full border-none ring-1 ring-slate-100 ${
                  b.status === 'confirmed' ? 'bg-green-100 text-green-600' : 
                  b.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                }`}
              >
                <option value="new">New</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-[11px] font-medium text-slate-500">
              <div className="flex items-center gap-2"><FiPhone /> {b.mobile}</div>
              <div className="flex items-center gap-2"><FiCalendar /> {b.moveInDate}</div>
              <div className="flex items-center gap-2 col-span-2"><FiMail /> {b.email || 'N/A'}</div>
            </div>

            <button 
              onClick={() => deleteBooking(b._id)}
              className="w-full py-3 bg-red-50 text-red-500 rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <FiTrash2 /> Delete Request
            </button>
          </div>
        ))}
      </div>

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr className="text-left text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <th className="px-6">Student Details</th>
              <th className="px-6">Room Type</th>
              <th className="px-6">Move-in Date</th>
              <th className="px-6">Status</th>
              <th className="px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group">
                <td className="px-6 py-5 rounded-l-[2rem] border-y border-l border-white/50">
                  <div className="flex flex-col gap-1">
                    <span className="font-black text-slate-800 flex items-center gap-2">
                       {b.name}
                       <button 
                         onClick={() => openWhatsApp(b.mobile, b.name, b.roomType)}
                         className="text-green-500 hover:text-green-600 transition-colors"
                         title="Chat on WhatsApp"
                       >
                         <FiMessageCircle size={18} />
                       </button>
                    </span>
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                       <span className="flex items-center gap-1"><FiPhone /> {b.mobile}</span>
                       <span className="flex items-center gap-1"><FiMail /> {b.email || 'N/A'}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 border-y border-white/50">
                  <span className="text-sm font-bold text-slate-600">{b.roomType || 'N/A'}</span>
                </td>
                <td className="px-6 py-5 border-y border-white/50">
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
                    <FiCalendar className="text-blue-500" /> {b.moveInDate}
                  </span>
                </td>
                <td className="px-6 py-5 border-y border-white/50">
                  <select 
                    value={b.status} 
                    onChange={(e) => updateStatus(b._id, e.target.value)}
                    className={`text-[10px] font-black uppercase tracking-wider py-1.5 px-3 rounded-full border-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                      b.status === 'confirmed' ? 'bg-green-100 text-green-600' : 
                      b.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-5 text-right rounded-r-[2rem] border-y border-r border-white/50 font-bold">
                   <button 
                     onClick={() => deleteBooking(b._id)}
                     className="text-slate-300 hover:text-red-500 transition-colors p-2"
                   >
                     <FiTrash2 size={18} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
