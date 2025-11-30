import { useState } from "react";
import axios from "axios";

export default function Home() {

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [roomType, setRoomType] = useState("Single Room");
  const [moveInDate, setMoveInDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:5000/api/bookings", {
            name: fullName,
            mobile,
            roomType,
            moveInDate
        });

        alert("Booking request submitted!");
        console.log(res.data);

        // optional: clear fields
        setFullName("");
        setMobile("");
        setRoomType("Single Room");
        setMoveInDate("");

    } catch (err) {
        console.error(err);
        alert("Something went wrong");
    }
};


  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-16">
      {/* Hero */}
      <section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Clean & Affordable{" "}
            <span className="text-blue-600">Hostel Rooms</span> in Greater Noida
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-900 font-bold">
            <ul className="list-disc list-inside">
              <li>Fully furnished and comfortable rooms with study tables.</li>
              <li>Attached and non-attached washrooms available.</li>
              <li>High-speed Wi-Fi to keep you connected at all times.</li>
              <li>24/7 security and CCTV surveillance for your safety.</li>
              <li>Regular housekeeping and maintenance services.</li>
              <li>Common areas for socializing and relaxation.</li>
            </ul>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#booking"
              className="inline-flex items-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700"
            >
              Check Availability
            </a>
            <a
              href="/rooms"
              className="inline-flex items-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:ring-1 hover:ring-slate-300"
            >
              View Room Types
            </a>
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
            alt="Bright hostel room with wooden bunk beds"
            className="h-full w-full rounded-xl object-cover shadow-md"
            loading="lazy"
          />
        </div>
      </section>

      {/* Room preview */}
      <section aria-labelledby="room-preview">
        <div className="flex items-center justify-between gap-4">
          <h2
            id="room-preview"
            className="text-2xl font-semibold tracking-tight"
          >
            Room Types Preview
          </h2>
          <a href="/rooms" className="text-sm font-semibold text-blue-600 hover:underline">
            View all rooms
          </a>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "2-Sharing Room",
              price: "₹10,000 / month",
              img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
            },
            {
              title: "3-Sharing Room",
              price: "₹7,000 / month",
              img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
            },
            {
              title: "4-Sharing Dorm",
              price: "₹5,000 / month",
              img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
            },
          ].map((room) => (
            <article
              key={room.title}
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100"
            >
              <img
                src={room.img}
                alt={room.title}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold">{room.title}</h3>
                <p className="text-sm text-slate-600">{room.price}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Wi-Fi · Attached washroom · Housekeeping
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section aria-labelledby="amenities">
        <h2 id="amenities" className="text-2xl font-semibold tracking-tight">
          Amenities Highlights
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {[
            "High-speed Wi-Fi",
            "24/7 Security & CCTV",
            "Mess / Cafeteria",
            "Laundry Service",
            "RO Drinking Water",
            "Parking for bikes",
          ].map((item) => (
            <div
              key={item}
              className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-100"
            >
              <p className="text-sm font-medium text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking lead form */}
      <section
        id="booking"
        aria-labelledby="booking-heading"
        className="rounded-2xl bg-blue-50 p-6 md:p-8"
      >
        <h2
          id="booking-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Check Availability
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          Share your details and preferred move-in date. Our team will confirm
          availability and call you back.
        </p>

        <form onSubmit={handleSubmit}
          className="mt-4 grid gap-4 md:grid-cols-2"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Mobile Number</label>
            <input
              type="tel"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Preferred Room Type</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option>Single Room</option>
              <option>2-Sharing Room</option>
              <option>4-Sharing Dorm</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Tentative Move-in Date</label>
            <input
              type="date"
              required
              value={moveInDate}
              onChange={(e) => setMoveInDate(e.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            />
          </div>
          <div className="md:col-span-2 flex justify-end ">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 cursor-pointer"
            >
              Submit Request
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
