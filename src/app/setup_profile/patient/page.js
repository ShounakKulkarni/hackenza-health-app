"use client"

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
    allergies: "",
    medical_records: ""
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
      const response = await fakeDoctorSignupAPI(formData);
      if (response.success) {
        router.push("/dashboard/patient/");
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const fakeDoctorSignupAPI = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Doctor Profile Data Sent:", data);
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
          <h1 className="text-2xl font-bold text-gray-800">Create New Patient Profile</h1>
          <div></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4 text-left">
          {[
              { label: "Name", name: "name" },
              { label: "Phone", name: "phone" },
              { label: "Age", name: "age" },
              { label: "Gender", name: "gender" },
              { label: "Blood Group", name: "blood_group" },
              { label: "Allergies", name: "allergies" },
              { label: "Medical records", name: "medical_records" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-600">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  className="p-3 border rounded-lg w-full"
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            disabled={loading}
          >
            {loading ? "Submiting..." : "Submit"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
