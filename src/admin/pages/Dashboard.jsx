import Sidebar from "../../../../admin/src/components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 space-y-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-sm text-gray-600">Total Bookings</p>
            <h2 className="text-2xl font-bold">128</h2>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-sm text-gray-600">New Bookings</p>
            <h2 className="text-2xl font-bold">32</h2>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-sm text-gray-600">Available Rooms</p>
            <h2 className="text-2xl font-bold">9</h2>
          </div>

          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-sm text-gray-600">Confirmed</p>
            <h2 className="text-2xl font-bold">74</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
