"use client"

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
        <div className="flex justify-center mb-4">
          <img src="/cloud-health-icon.png" alt="Virtual Care" className="w-20 h-20" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">VIRTUAL <span className="text-teal-500">CARE</span></h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 rounded-lg font-semibold hover:bg-teal-600 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <p className="text-gray-600">Don't have an account?</p>
          <div className="flex flex-col space-y-2">
            <Link href="/signup-doctor">
              <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition">
                Sign Up as Doctor
              </button>
            </Link>
            <Link href="/signup-patient">
              <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 transition">
                Sign Up as Patient
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
