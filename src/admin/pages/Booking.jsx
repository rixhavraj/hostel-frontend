import { useEffect, useState } from "react";
import Sidebar from "../../../../admin/src/components/Sidebar";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${API_URL}/api/bookings`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setBookings(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Bookings</h1>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Room</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b">
                <td className="p-3">{b.fullName}</td>
                <td className="p-3">{b.roomType}</td>
                <td className="p-3 capitalize">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
