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
    return <p className="text-center text-gray-500 mt-10 text-lg">Loading...</p>;
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('/img/background.jpg')" }}
    >
      <div className="p-10 rounded-2xl shadow-2xl w-[40rem] text-black bg-white">
        <div className="flex justify-between w-full mb-4">
          <Link href="/">
            <button className="text-2xl">⬅</button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 text-center">Doctor Profile</h1>
          <div></div>
        </div>
        <form className="space-y-6 text-left">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-lg">Name</label>
              <input
                type="text"
                className="p-3 rounded-lg text-black bg-[#E3F7FE] w-full"
                value={doctor.name}
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-lg">Phone</label>
              <input
                type="text"
                className="p-3 rounded-lg text-black bg-[#E3F7FE] w-full"
                value={doctor.phone}
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-lg">Age</label>
              <input
                type="text"
                className="p-3 rounded-lg text-black bg-[#E3F7FE] w-full"
                value={doctor.age}
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-lg">Medical Credentials</label>
              <input
                type="text"
                className="p-3 rounded-lg text-black bg-[#E3F7FE] w-full"
                value={doctor.credentials}
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-lg">License No.</label>
              <input
                type="text"
                className="p-3 rounded-lg text-black bg-[#E3F7FE] w-full"
                value={doctor.license}
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-lg">Specialization</label>
              <input
                type="text"
                className="p-3 rounded-lg text-black bg-[#E3F7FE] w-full"
                value={doctor.specialization}
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-lg">Experience</label>
              <input
                type="text"
                className="p-3 rounded-lg text-black bg-[#E3F7FE] w-full"
                value={doctor.experience}
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-lg">Ratings</label>
              <input
                type="text"
                className="p-3 rounded-lg text-black bg-[#E3F7FE] w-full"
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
