import { useState, useEffect } from "react";
import axios from "axios";
{/*import { motion } from "framer-motion";*/}
import { FiMail, FiLock, FiArrowRight, FiShield } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import API_URL from "../api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/admin");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      setError("Invalid admin credentials. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 hero-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-4xl shadow-2xl overflow-hidden border border-white">
          <div className="bg-blue-600 p-8 text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
              <FiShield size={32} />
            </div>
            <h1 className="text-2xl font-bold">Admin <span className="text-blue-200">Portal</span></h1>
            <p className="text-blue-100/80 text-sm mt-1">Authorized Access Only</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold text-center border border-red-100"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative group">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10" />
                  <input
                    type="email"
                    required
                    className="input-field py-3"
                    style={{ paddingLeft: "2.75rem" }}
                    placeholder="admin@rphhostel.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                <div className="relative group">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10" />
                  <input
                    type="password"
                    required
                    className="input-field py-3"
                    style={{ paddingLeft: "2.75rem" }}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-2xl justify-center text-lg shadow-xl shadow-blue-200"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <>Sign In <FiArrowRight /></>
              )}
            </button>

            <p className="text-center text-[10px] text-slate-400 font-medium">
              Forgot your password? Please contact system administrator.
            </p>
          </form>
        </div>
        
        <p className="text-center mt-8 text-slate-400 text-sm">
          &copy; 2024 A1 Hostel Management System
        </p>
      </motion.div>
    </div>
  );
}