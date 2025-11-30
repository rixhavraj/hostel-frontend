import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./routes/Home.jsx";
import Rooms from "./routes/Room.jsx";
import Contact from "./routes/Contacts.jsx";
import AdminDashboard from "./routes/AdminDashboard.jsx";
import AdminLogin from "./routes/Adminlogin.jsx";
import PrivateRoute from "./admin/utils/privateRoute.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="*" element={<h1 className="text-center mt-20 text-3xl">404 - Page Not Found</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
