import { useState, useEffect } from "react";
import axios from "axios";
import { FiMail, FiMessageSquare, FiTrash2, FiClock, FiUser, FiCheckCircle } from "react-icons/fi";
import API_URL from "../../api";

export default function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMessages();
    } catch (err) {
      alert("Error deleting message");
    }
  };

  if (loading) return <div className="flex justify-center p-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50">
        <h2 className="text-2xl font-black text-slate-800">Inquiry Messages</h2>
        <p className="text-slate-500 text-sm">Review queries sent from the contact form</p>
      </div>

      <div className="grid gap-4">
        {messages.map((m) => (
          <div key={m._id} className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-sm border border-white/50 hover:shadow-md transition-all group relative">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                    <FiUser />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 leading-none mb-1">{m.name}</h3>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <FiMail size={12} className="text-blue-500" /> {m.email}
                    </p>
                  </div>
                </div>
                
                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 italic text-slate-600 text-sm leading-relaxed relative">
                   <FiMessageSquare className="absolute -top-2 -left-2 text-blue-200" size={20} />
                   "{m.message}"
                </div>

                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                  <span className="flex items-center gap-1"><FiClock /> {new Date(m.createdAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1 text-green-500"><FiCheckCircle /> Received</span>
                </div>
              </div>

              <div className="flex md:flex-col gap-2">
                <button
                  onClick={() => deleteMessage(m._id)}
                  className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  title="Delete message"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="py-20 bg-white/40 rounded-[3rem] border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
            <FiMail size={48} className="mb-4 opacity-20" />
            <p className="font-bold">No messages received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
