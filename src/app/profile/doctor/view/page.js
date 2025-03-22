"use client"

import { useState } from "react";
import Link from "next/link";

export default function ProfileDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    credentials: "",
    license: "",
    specialization: "",
    experience: "",
    ratings: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor Sign Up Data:", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[40rem] text-center">
        <div className="flex justify-between w-full">
          <Link href="/">
            <button className="text-2xl">⬅</button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Doctor Profile</h1>
          <div></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <label className="block text-gray-600">Name</label>
              <textarea
                type="text"
                name="name"
                className="p-3 border rounded-lg w-full"
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600">Phone</label>
              <textarea
                type="text"
                name="phone"
                className="p-3 border rounded-lg w-full"
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600">Age</label>
              <textarea
                type="text"
                name="age"
                className="p-3 border rounded-lg w-full"
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600">Medical Credentials</label>
              <textarea
                type="text"
                name="credentials"
                className="p-3 border rounded-lg w-full"
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600">Specialization</label>
              <textarea
                type="text"
                name="specialization"
                className="p-3 border rounded-lg w-full"
                onChange={handleChange}
                required
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600">Experience</label>
              <textarea
                type="text"
                name="experience"
                className="p-3 border rounded-lg w-full"
                onChange={handleChange}
                required
                readOnly
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
