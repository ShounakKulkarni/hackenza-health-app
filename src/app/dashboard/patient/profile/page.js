"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePatient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
    blood_grp: "",
    email: "",
    allergies: "",
    medical_records: "",
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
        router.push("/dashboard/patient");
      } else {
        setError("Update failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const fakeUpdateDoctorProfile = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Doctor Profile Updated:", data);
        resolve({ success: true });
      }, 1000);
    });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/img/background.jpg')" }}
    >
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[40rem] text-center">
        <div className="flex justify-between w-full">
          <Link href="/">
            <button className="text-2xl">⬅</button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Patient Profile
          </h1>
          <div></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4 text-left">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Phone", name: "phone", type: "text" },
              { label: "Age", name: "age", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-600">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  className="p-3 border border-gray-400 rounded-lg w-full text-black placeholder-gray-500"
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            {/* Gender Dropdown */}
            <div>
              <label className="block text-gray-600">Gender</label>
              <select
                name="gender"
                className="p-3 border border-gray-400 rounded-lg w-full text-black placeholder-gray-500"
                onChange={handleChange}
                required
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Blood Group Dropdown */}
            <div>
              <label className="block text-gray-600">Blood Group</label>
              <select
                name="blood_grp"
                className="p-3 border border-gray-400 rounded-lg w-full text-black placeholder-gray-500"
                onChange={handleChange}
                required
              >
                <option value=""></option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Allergies Field */}
            <div>
              <label className="block text-gray-600">Allergies</label>
              <input
                type="text"
                name="allergies"
                className="p-3 border border-gray-400 rounded-lg w-full text-black placeholder-gray-500"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Full-width Medical Records Field */}
          <div className="text-left">
            <label className="block text-gray-600">Medical Records</label>
            <input
              type="text"
              name="medical_records"
              className="p-3 border border-gray-400 rounded-lg w-full text-black placeholder-gray-500"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            style={{ backgroundColor: "#5AB9EA" }}
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
