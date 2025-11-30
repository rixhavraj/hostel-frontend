import {useState} from "react";
import axios from "axios";

export default function Login(){
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const handleLogin=async(e)=>{
        e.preventDefault();
    try{
        const res=await
        axios.post("http://localhost:5000/api/auth/login",{
            email,
            password,
        });
        localStorage.setItem("token", res.data.token);
        window.location.href="/admin/dashboard";
    }catch{
        alert("Invalid credentials");
    }
};

 return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Admin Login</h2>
        <input
          className="border p-2 w-full rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}