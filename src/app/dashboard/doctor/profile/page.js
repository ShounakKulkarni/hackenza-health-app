"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfileDoctor() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    credentials: "",
    license: "",
    specialization: "",
    experience: "",
    ratings: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fakeUpdateDoctorProfile(formData);
      if (response.success) {
        router.push("/dashboard/doctor");
      } else {
        setError("Update failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  // Fake backend API function (replace with real API later)
  const fakeUpdateDoctorProfile = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Doctor Profile Updated:", data);
        resolve({ success: true });
      }, 1000);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[40rem] text-center">
        <div className="flex justify-between w-full">
          <Link href="/">
            <button className="text-2xl">⬅</button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Edit Doctor Profile</h1>
          <div></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4 text-left">
            {[
              { label: "Name", name: "name" },
              { label: "Phone", name: "phone" },
              { label: "Age", name: "age" },
              { label: "Medical Credentials", name: "credentials" },
              { label: "License No.", name: "license" },
              { label: "Specialization", name: "specialization" },
              { label: "Experience", name: "experience" },
              { label: "Ratings", name: "ratings" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-600">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  className="p-3 border rounded-lg w-full"
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
