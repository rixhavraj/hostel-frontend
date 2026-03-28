import { useState, useEffect } from "react";
import Sidebar from "../../../../admin/src/components/Sidebar";
import axios from "axios";
import API_URL from "../../api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);


  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get(`${API_URL}/api/rooms`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      setRooms(res.data);
    };
    fetchRooms();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Rooms</h1>

        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Capacity</th>
              <th className="p-3 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r._id} className="border-b">
                <td className="p-3">{r.title}</td>
                <td className="p-3">{r.capacity}</td>
                <td className="p-3">₹{r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
