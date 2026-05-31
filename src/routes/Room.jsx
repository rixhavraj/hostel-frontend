import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";
import { FiSearch, FiStar, FiWifi, FiCheckCircle, FiCoffee } from "react-icons/fi";
import { MdOutlineKingBed } from "react-icons/md";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto pt-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex gap-2">
           <span className="hover:text-primary cursor-pointer">Home</span> {'>'} 
           <span className="hover:text-primary cursor-pointer">Search</span> {'>'} 
           <span className="text-gray-900 font-medium">All Hostels</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
           <div>
             <h1 className="text-3xl font-bold text-secondary mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Find Your Perfect Stay</h1>
             <p className="text-gray-500">{rooms.length} properties available</p>
           </div>
           
           <div className="flex gap-4">
              <select className="border border-gray-200 rounded-lg px-4 py-2 bg-white text-sm text-gray-700 outline-none">
                <option>Sort by: Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
             <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="font-bold text-gray-900">Filters</h3>
                   <button className="text-primary text-sm font-semibold">Clear All</button>
                </div>

                <div className="mb-6">
                   <h4 className="font-semibold text-gray-800 text-sm mb-3">Location</h4>
                   <div className="relative">
                     <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input type="text" placeholder="Search area..." className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm" />
                   </div>
                </div>

                <div className="mb-6">
                   <h4 className="font-semibold text-gray-800 text-sm mb-3">Stay Duration</h4>
                   <div className="space-y-2">
                     {["Monthly", "3 Months", "6 Months", "Annual"].map(dur => (
                       <label key={dur} className="flex items-center gap-3 cursor-pointer">
                         <input type="checkbox" className="w-4 h-4 rounded text-primary border-gray-300 focus:ring-primary" />
                         <span className="text-sm text-gray-600">{dur}</span>
                       </label>
                     ))}
                   </div>
                </div>

                <div className="mb-6">
                   <h4 className="font-semibold text-gray-800 text-sm mb-3">Room Type</h4>
                   <div className="space-y-2">
                     {["Single Sharing", "Double Sharing", "Triple Sharing"].map(type => (
                       <label key={type} className="flex items-center gap-3 cursor-pointer">
                         <input type="checkbox" className="w-4 h-4 rounded text-primary border-gray-300 focus:ring-primary" />
                         <span className="text-sm text-gray-600">{type}</span>
                       </label>
                     ))}
                   </div>
                </div>
                
                <button className="w-full btn-primary py-3">Apply Filters</button>
             </div>
          </div>

          {/* List Content */}
          <div className="w-full lg:w-3/4 flex flex-col gap-6">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl h-64 w-full flex overflow-hidden">
                   <div className="w-1/3 skeleton"></div>
                   <div className="w-2/3 p-6 flex flex-col gap-4">
                      <div className="h-6 w-1/2 skeleton"></div>
                      <div className="h-4 w-3/4 skeleton"></div>
                      <div className="h-4 w-1/4 skeleton mt-auto"></div>
                   </div>
                </div>
              ))
            ) : rooms.length > 0 ? (
              rooms.map((room) => (
                <div 
                  key={room._id} 
                  className="bg-secondary text-white border border-gray-800 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/rooms/${room._id}`)}
                >
                  <div className="w-full md:w-1/3 h-56 md:h-auto relative">
                    <img 
                      src={room.images?.[0] || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800"} 
                      alt={room.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                            {room.title}
                            {room.availableBeds > 0 && <FiCheckCircle className="text-green-500" size={16} title="Available" />}
                          </h2>
                          <p className="text-sm text-gray-400">{room.tag || "Koramangala, Bengaluru"}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded text-sm font-bold">
                          <FiStar className="text-yellow-400" size={14} /> 4.8
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><FiWifi /> WiFi</span>
                        <span className="flex items-center gap-1"><MdOutlineKingBed /> AC</span>
                        <span className="flex items-center gap-1"><FiCoffee /> Food</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end mt-6">
                      <div className="flex flex-col">
                        <span className="text-2xl font-black text-primary">₹{room.price}</span>
                        <span className="text-xs text-gray-400">/month</span>
                      </div>
                      <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500">
                No rooms available at the moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
