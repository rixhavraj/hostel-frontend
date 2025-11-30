import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    newBookings: 0,
    confirmedBookings: 0,
    availableRooms:0,
  });

  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const b = await axios.get("http://localhost:5000/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const r = await axios.get("http://localhost:5000/api/rooms", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setBookings(b.data);
        setRooms(r.data);

        // Compute Stats
        const total = b.data.length;
        const confirmed = b.data.filter((x) => x.status === "confirmed").length;
        const newReq = b.data.filter((x) => x.status === "new").length;

        setStats({
          totalBookings: total,
          newBookings: newReq,
          confirmedBookings: confirmed,
          availableRooms: 200-total,
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* ---- Stats Cards ---- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-500">Total Bookings</p>
          <p className="text-3xl font-bold">{stats.totalBookings}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-500">New Bookings</p>
          <p className="text-3xl font-bold">{stats.newBookings}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-500">Available Rooms</p>
          <p className="text-3xl font-bold">{stats.availableRooms}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <p className="text-gray-500">Confirmed Bookings</p>
          <p className="text-3xl font-bold">{stats.confirmedBookings}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ---- Bookings Table ---- */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Bookings</h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th>Room</th>
                <th>Phone no.</th>
                <th>Move-In</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b">
                  <td className="py-2">{b.name}</td>
                  <td>{b.roomType}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${b.status === "confirmed"
                          ? "bg-green-500"
                          : b.status === "new"
                            ? "bg-blue-500"
                            : "bg-gray-500"
                        }`}
                    >
                      {b.mobile}
                    </span>
                  </td>
                  <td>{b.moveInDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---- Rooms Table ---- */}
        <div className="bg-white shadow rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Rooms</h2>
            <button className="bg-black text-white px-3 py-1 rounded">#booking</button>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Title</th>
                <th>Capacity</th>
              </tr>
            </thead>

            <tbody>
              <div>
                {Array.isArray(rooms) ? (
                  rooms.map(room => <RoomCard key={room.id} {...room} />)
                ) : (
                  <p>No rooms available</p>
                )}
              </div>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
