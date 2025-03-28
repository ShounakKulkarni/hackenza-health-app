"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
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
      // Mock backend API call (replace with an actual API call)
      const response = await fakeLoginAPI(email, password);

      if (response.success) {
        // Redirect based on role
        if (response.role === "Doctor") {
          router.push("/dashboard/doctor");
        } else if (response.role === "Patient") {
          router.push("/dashboard/patient");
        } else {
          setError("Invalid role received.");
        }
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  // Mock API function (replace with actual API call)
  const fakeLoginAPI = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "doctor@example.com") {
          resolve({ success: true, role: "Doctor" });
        } else if (email === "patient@example.com") {
          resolve({ success: true, role: "Patient" });
        } else {
          resolve({ success: false });
        }
      }, 1000);
    });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/img/background.jpg')" }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
      <div className="flex justify-center mb-4">
          <img src="/img/main_logo.png" alt="Virtual Care" className="w-60 h-50" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          VIRTUAL <span style={{ color: "#5680E9" }}>CARE</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg text-black placeholder-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg text-black placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full text-white py-2 rounded-lg font-semibold transition"
            style={{ backgroundColor: "#5680E9" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-4">
          <p className="text-gray-600">Don't have an account?</p>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => router.push("/signup/patient")}
              className="mt-2 text-white py-2 px-4 rounded-lg font-semibold transition"
              style={{ backgroundColor: "#5AB9EA" }}
            >
              Sign Up as Patient
            </button>
            <button
              onClick={() => router.push("/signup/doctor")}
              className="mt-2 text-white py-2 px-4 rounded-lg font-semibold transition"
              style={{ backgroundColor: "#5AB9EA" }}
            >
              Sign Up as Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}