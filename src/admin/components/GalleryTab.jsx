import { FiPlus, FiTrash2, FiImage, FiX } from "react-icons/fi";
import API_URL from "../../api";
import axios from "axios";
import { useState } from "react";

export default function GalleryTab({ gallery, fetchData }) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
     const file = e.target.files[0];
     if (!file) return;
     const caption = window.prompt("Enter a caption for this photo:");
     if (caption === null) return;

     const formData = new FormData();
     formData.append("image", file);
     formData.append("caption", caption);

     setLoading(true);
     try {
       const token = localStorage.getItem("token");
       await axios.post(`${API_URL}/api/gallery`, formData, {
         headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
       });
       fetchData();
     } catch (err) {
       alert("Error uploading to gallery");
     } finally {
       setLoading(false);
     }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photo from gallery?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/gallery/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (err) {
      alert("Error deleting photo");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Lifestyle Gallery</h2>
          <p className="text-slate-500 text-sm">Showcase the hostel experience</p>
        </div>
        <div className="relative">
          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUpload} disabled={loading} />
          <button className="btn-primary" disabled={loading}>
            <FiPlus /> {loading ? 'Uploading...' : 'Add Photo'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {gallery.map((img) => (
          <div key={img._id} className="aspect-square rounded-[2rem] border border-white overflow-hidden shadow-lg relative group">
            <img src={img.url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
               <p className="text-white text-[10px] font-bold mb-2 uppercase tracking-widest">{img.caption}</p>
               <button 
                 onClick={() => handleDelete(img._id)}
                 className="bg-white/20 hover:bg-red-500 p-3 rounded-2xl text-white transition-colors backdrop-blur-md"
               >
                 <FiTrash2 size={20} />
               </button>
            </div>
          </div>
        ))}
        {gallery.length === 0 && (
          <div className="col-span-full py-20 bg-white/40 rounded-[3rem] border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
             <FiImage size={48} className="mb-4" />
             <p className="font-bold">No gallery items yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
