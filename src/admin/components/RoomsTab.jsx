import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import API_URL from "../../api";
import axios from "axios";

export default function RoomsTab({ rooms, fetchData }) {
  const [modal, setModal] = useState({ show: false, mode: 'add', data: null });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const roomData = {
      title: formData.get("title"),
      price: formData.get("price"),
      capacity: formData.get("capacity"),
      description: formData.get("description"),
      tag: formData.get("tag"),
    };

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const roomData = {
        title: formData.get("title"),
        price: Number(formData.get("price")),
        capacity: Number(formData.get("capacity")),
        description: formData.get("description"),
        tag: formData.get("tag"),
      };

      if (modal.mode === 'add') {
        await axios.post(`${API_URL}/api/rooms`, roomData, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.patch(`${API_URL}/api/rooms/${modal.data._id}`, roomData, { headers: { Authorization: `Bearer ${token}` } });
      }
      
      // Explicitly wait for fetchData to finish
      await fetchData();
      setModal({ show: false, mode: 'add', data: null });
      alert(modal.mode === 'add' ? "Room created successfully!" : "Room updated successfully!");
    } catch (err) {
      alert("Error saving room: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/rooms/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (err) {
      alert("Error deleting room");
    }
  };

  const handleFileUpload = async (e, roomId) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/api/rooms/${roomId}/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      alert("Error uploading image");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Inventory</h2>
          <p className="text-slate-500 text-sm">Manage hostel room types and pricing</p>
        </div>
        <button
          onClick={() => setModal({ show: true, mode: 'add', data: null })}
          className="btn-primary"
        >
          <FiPlus /> Create Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white/80 rounded-[2.5rem] border border-white overflow-hidden shadow-xl hover:shadow-2xl transition-all group">
            <div className="h-48 bg-slate-100 relative overflow-hidden">
              {room.images?.[0] ? (
                <img src={room.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300"><FiImage size={40} /></div>
              )}
              <div className="absolute top-4 left-4"><span className="badge badge-blue">{room.tag}</span></div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-black text-slate-800">{room.title}</h4>
                <p className="text-blue-600 font-black">₹{room.price}</p>
              </div>
              <p className="text-slate-500 text-xs mb-6 line-clamp-2">{room.description}</p>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setModal({ show: true, mode: 'edit', data: room })}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 p-3 rounded-2xl text-slate-600 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <FiEdit2 /> Edit
                </button>
                <div className="relative">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, room._id)} title="Add Image" />
                  <button className="bg-blue-50 hover:bg-blue-100 p-3 rounded-2xl text-blue-600 text-xs transition-colors"><FiUpload /></button>
                </div>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="bg-red-50 hover:bg-red-100 p-3 rounded-2xl text-red-500 text-xs transition-colors"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl relative">
            <button onClick={() => setModal({ show: false })} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"><FiX size={24} /></button>
            <h3 className="text-2xl font-black mb-6">{modal.mode === 'add' ? 'Add New Room' : 'Edit Room'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="title" defaultValue={modal.data?.title} placeholder="Room Title" required className="input-field" />
              <div className="grid grid-cols-2 gap-4">
                <input name="price" type="number" defaultValue={modal.data?.price} placeholder="Price (₹)" required className="input-field" />
                <input name="capacity" type="number" defaultValue={modal.data?.capacity} placeholder="Capacity" required className="input-field" />
              </div>
              <input name="tag" defaultValue={modal.data?.tag} placeholder="Tag (e.g. Popular)" className="input-field" />
              <textarea name="description" defaultValue={modal.data?.description} placeholder="Description" rows={3} className="input-field py-3" />
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-lg">
                {loading ? 'Processing...' : modal.mode === 'add' ? 'Create Room' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
