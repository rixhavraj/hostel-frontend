const API_URL = import.meta.env.MODE === "development" 
  ? import.meta.env.VITE_API_URL0 || "http://localhost:5000" 
  : import.meta.env.VITE_API_URL;

export default API_URL;
