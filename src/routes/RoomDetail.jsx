import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";
import { FiStar, FiMapPin, FiWifi, FiCoffee, FiShield, FiCheckCircle } from "react-icons/fi";
import { MdOutlineKingBed, MdOutlineLocalLaundryService } from "react-icons/md";

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Booking Form State
  const [moveInDate, setMoveInDate] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/rooms`);
        const currentRoom = res.data.find(r => r._id === id);
        if (currentRoom) {
          setRoom(currentRoom);
        } else {
          navigate("/rooms");
        }
      } catch (err) {
        console.error("Error fetching room details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id, navigate]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleBooking = async () => {
    if (!moveInDate) {
      showToast("Please select a move-in date.", "error");
      return;
    }
    setBookingLoading(true);
    try {
      // Mocked user info since we don't have auth. In a real app, this comes from user session.
      await axios.post(`${API_URL}/api/bookings`, {
        name: "Guest User",
        email: "guest@example.com",
        mobile: "9999999999",
        roomType: room.title,
        moveInDate: moveInDate,
      });
      showToast("Booking request sent! We will contact you shortly.");
      setMoveInDate("");
    } catch (err) {
      showToast("Booking failed. Please try again later.", "error");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <span className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></span>
    </div>;
  }

  if (!room) return null;

  const mainImg = room.images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200";

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {toast && (
        <div className={`toast ${toast.type === "success" ? "toast-success" : "toast-error"}`}>
          {toast.msg}
        </div>
      )}

      <div className="container mx-auto pt-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex gap-2">
           <span className="hover:text-primary cursor-pointer" onClick={() => navigate("/")}>Home</span> {'>'} 
           <span className="hover:text-primary cursor-pointer" onClick={() => navigate("/rooms")}>Bangalore</span> {'>'} 
           <span className="text-gray-900 font-medium">{room.title}</span>
        </div>

        {/* Images Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 h-[400px] rounded-2xl overflow-hidden">
           <div className="md:col-span-2 h-full">
             <img src={mainImg} className="w-full h-full object-cover" alt={room.title} />
           </div>
           <div className="hidden md:flex flex-col gap-4 h-full">
              <div className="h-1/2 rounded-xl overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600" className="w-full h-full object-cover" alt="Room View 1" />
              </div>
              <div className="h-1/2 rounded-xl overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600" className="w-full h-full object-cover" alt="Room View 2" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
                    <span className="text-white font-bold">+12 Photos</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
             <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-secondary mb-2 flex items-center gap-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {room.title} 
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-bold">
                      <FiCheckCircle size={12} /> VERIFIED
                    </span>
                  </h1>
                  <p className="text-gray-500 flex items-center gap-2">
                     <FiMapPin /> {room.tag || "Koramangala, Bengaluru"}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                   <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg font-bold text-lg mb-1">
                     <FiStar size={16} /> 4.8
                   </div>
                   <span className="text-xs text-gray-400 underline cursor-pointer">(128 reviews)</span>
                </div>
             </div>

             {/* Nav Tabs */}
             <div className="flex gap-6 border-b border-gray-200 mt-8 mb-8 overflow-x-auto">
                {["Overview", "Rooms & Pricing", "Amenities", "Reviews", "Location"].map((tab, i) => (
                  <button key={tab} className={`pb-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${i === 0 ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-900"}`}>
                    {tab}
                  </button>
                ))}
             </div>

             <div className="mb-10">
               <h3 className="text-xl font-bold text-secondary mb-4">About this property</h3>
               <p className="text-gray-600 leading-relaxed">
                 {room.description || `${room.title} offers a perfect blend of comfort and community. Located in the heart of the city, it is close to major universities, tech parks and lifestyle hubs.`}
               </p>
               <p className="text-gray-600 leading-relaxed mt-4">
                 Capacity: {room.capacity} beds. Currently available: <strong className={room.availableBeds > 0 ? "text-green-600" : "text-red-500"}>{room.availableBeds} beds left.</strong>
               </p>
             </div>

             {/* Amenities Box Nexify Style */}
             <div className="bg-secondary rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Premium Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   <div className="flex flex-col items-center gap-2">
                     <FiShield size={28} className="text-gray-400" />
                     <span className="text-sm font-semibold">24/7 Security</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                     <FiWifi size={28} className="text-gray-400" />
                     <span className="text-sm font-semibold">High Speed WiFi</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                     <MdOutlineKingBed size={28} className="text-gray-400" />
                     <span className="text-sm font-semibold">Furnished Rooms</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                     <MdOutlineLocalLaundryService size={28} className="text-gray-400" />
                     <span className="text-sm font-semibold">Laundry Service</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Booking Sidebar */}
          <div className="w-full lg:w-1/3">
             <div className="bg-secondary rounded-3xl p-6 text-white sticky top-24 border border-gray-800 shadow-xl">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black">₹{room.price}</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-gray-800">for Single Room</p>
                
                <div className="mb-6">
                   <label className="block text-sm font-semibold text-gray-300 mb-2">Move in Date</label>
                   <input 
                     type="date" 
                     className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-white outline-none focus:border-primary transition-colors"
                     style={{ colorScheme: 'dark' }}
                     value={moveInDate}
                     onChange={(e) => setMoveInDate(e.target.value)}
                   />
                </div>

                <button 
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl mb-4 transition-colors disabled:opacity-50"
                >
                  {bookingLoading ? "Processing..." : "Book Now"}
                </button>
                
                <button className="w-full bg-transparent border border-gray-800 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl mb-6 transition-colors">
                  Save for Later
                </button>

                <div className="flex justify-between items-center text-sm border-t border-gray-800 pt-6">
                   <span className="text-gray-400">Have a coupon?</span>
                   <button className="text-primary font-bold hover:underline">Apply</button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
