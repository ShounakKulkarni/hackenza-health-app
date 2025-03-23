"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Fake API call to simulate backend request
      const response = await fakeSignupAPI(email, password, "Doctor");

      if (response.success) {
        router.push("/setup_profile/doctor");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  // Fake backend API function (replace with actual API call later)
  const fakeSignupAPI = async (email, password, role) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Signup Data Sent:", { email, password, role });
        resolve({ success: true });
      }, 1000);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('/img/background.jpg')" }}>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg text-black placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="text-left">
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg text-black placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 rounded-lg font-semibold transition"
            style={{ backgroundColor: "#5680E9" }}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-4">
          <p className="text-gray-600">Already have an account?</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-2 text-white py-2 px-4 rounded-lg font-semibold transition"
            style={{ backgroundColor: "#5AB9EA" }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
