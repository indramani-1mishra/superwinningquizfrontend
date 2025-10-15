import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("⚠️ Enter email & password");

    try {
      const res = await axios.post("http://localhost:8000/api/admin/login", { email, password });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token); // ✅ store token consistently
        navigate("/admin/dashboard"); // redirect to dashboard
      } else {
        alert("❌ Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111] text-white p-4">
      <div className="bg-[#1f1f1f] p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center mt-2">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 rounded text-center text-black bg-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 "
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded text-center  text-black bg-gray-300 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 "
        />
        <button
          onClick={handleLogin}
          className="w-full bg-purple-700 hover:bg-purple-600 p-3 rounded text-white font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}
