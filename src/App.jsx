import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./routes/Home.jsx";
import Rooms from "./routes/Room.jsx";
import Gallery from "./routes/Gallery.jsx";
import Contact from "./routes/Contacts.jsx";
import AdminDashboard from "./routes/AdminDashboard.jsx";
import AdminLogin from "./routes/Adminlogin.jsx";
import PrivateRoute from "./admin/utils/privateRoute.jsx";
import NotFound from "./routes/NotFound.jsx";
import ServerLoader from "./components/ServerLoader.jsx";

export default function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  useEffect(() => {
    // Only scroll to top if there isn't a hash in the URL (like #booking-form)
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPath && <Navbar />}
      <main className="flex-1">
        <ServerLoader>
          <Routes>
            {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="*" element={<NotFound />} />
          </Routes>
        </ServerLoader>
      </main>
      {!isAdminPath && <Footer />}
    </div>
  );
}
