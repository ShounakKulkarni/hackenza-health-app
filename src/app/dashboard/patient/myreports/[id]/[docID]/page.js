"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProfileDoctor() {
  const { id } = useParams(); // Get doctor ID from URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctor() {
      const data = await fakeFetchDoctor(id); // Fake API call
      setDoctor(data);
      setLoading(false);
    }
    fetchDoctor();
  }, [id]);

  // Fake API function (Replace with real API call later)
  const fakeFetchDoctor = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: "Dr. John Doe",
          phone: "+91 9876543210",
          age: "45",
          credentials: "MBBS, MD",
          license: "12345-XYZ",
          specialization: "Cardiology",
          experience: "15 years",
          ratings: "4.8",
        });
      }, 1000);
    });
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

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
        <form className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                className="p-3 border rounded-lg w-full bg-gray-200"
                value={doctor.name}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600">Phone</label>
              <input
                type="text"
                name="phone"
                className="p-3 border rounded-lg w-full bg-gray-200"
                value={doctor.phone}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600">Age</label>
              <input
                type="text"
                name="age"
                className="p-3 border rounded-lg w-full bg-gray-200"
                value={doctor.age}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600">Medical Credentials</label>
              <input
                type="text"
                name="credentials"
                className="p-3 border rounded-lg w-full bg-gray-200"
                value={doctor.credentials}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600">License No.</label>
              <input
                type="text"
                name="license"
                className="p-3 border rounded-lg w-full bg-gray-200"
                value={doctor.license}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600">Specialization</label>
              <input
                type="text"
                name="specialization"
                className="p-3 border rounded-lg w-full bg-gray-200"
                value={doctor.specialization}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600">Experience</label>
              <input
                type="text"
                name="experience"
                className="p-3 border rounded-lg w-full bg-gray-200"
                value={doctor.experience}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-600">Ratings</label>
              <input
                type="text"
                name="ratings"
                className="p-3 border rounded-lg w-full bg-gray-200"
                value={doctor.ratings}
                readOnly
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
