import { useEffect } from "react";
import API_URL from "../api";

export default function ServerLoader({ children }) {
  useEffect(() => {
    // Ping the backend in the background to wake it up without blocking the UI
    const checkServer = async () => {
      try {
        await fetch(`${API_URL}/health`, { method: "GET" });
      } catch (error) {
        console.warn("Server ping failed", error);
      }
    };

    checkServer();
  }, []);

  // Return children immediately so the frontend loads and is SEO friendly
  return children;
}
