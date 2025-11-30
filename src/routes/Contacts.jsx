import axios from "axios";
import { useState } from "react";

export default function Contacts() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/contact", {
        name,
        email,
        message,
      });

      alert("Message sent!");

      // Clear form
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Contact Us</h1>
        <p className="text-sm text-slate-600">
          Call, WhatsApp or drop a message. We usually respond within a few
          hours during working days.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {/* LEFT SIDE INFO */}
        <div className="space-y-3 text-sm text-slate-700">
          <p>Phone: <a href="tel:+911234567890">+91 12345 67890</a></p>
          <p>
            WhatsApp:{" "}
            <a
              href="https://wa.me/919708169442?text=Hi%2C%20I%20want%20to%20check%20room%20availability."
              target="_blank"
              className="text-blue-600"
            >
              Chat on WhatsApp
            </a>
          </p>
          <p>Email: info@hostelstay.in</p>
          <p>Address: Plot 12, Student Area, City, State, PIN Code</p>

          <iframe
            title="Hostel location"
            className="mt-3 h-56 w-full rounded-lg border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb="
          />
        </div>

        {/* RIGHT SIDE CONTACT FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
        >
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              rows="4"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
