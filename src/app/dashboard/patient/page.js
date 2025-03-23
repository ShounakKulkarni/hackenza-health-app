"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PatientDashboard() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/img/background.jpg')" }}
    >
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[50rem] text-center">
        <div className="flex justify-between items-center w-full mb-8 border-b pb-6">
          <h1 className="text-4xl font-bold text-gray-800">Virtual Care</h1>
          <button
            className="text-red-500 font-semibold hover:underline text-lg"
            onClick={() => router.push("/login")}
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <Link href="patient/diagnosis">
            <div
              className="p-8 rounded-lg text-center cursor-pointer shadow-md transition transform hover:scale-105"
              style={{ backgroundColor: "#5680E9" }}
            >
              <img
                src="/img/doctor_icon.png"
                alt="New Diagnosis"
                className="mx-auto mb-4 w-24 h-28"
              />
              <p className="text-xl font-semibold text-white">New Diagnosis</p>
            </div>
          </Link>

          <Link href="patient/myreports">
            <div
              className="p-8 rounded-lg text-center cursor-pointer shadow-md transition transform hover:scale-105"
              style={{ backgroundColor: "#84CEEB" }}
            >
              <img
                src="/img/report_icon.png"
                alt="Diagnosis History"
                className="mx-auto mb-4 w-24 h-28"
              />
              <p className="text-xl font-semibold text-white">My Reports</p>
            </div>
          </Link>

          <Link href="patient/profile" className="col-span-2">
            <div
              className="p-8 rounded-lg text-center cursor-pointer shadow-md transition transform hover:scale-105"
              style={{ backgroundColor: "#5AB9EA" }}
            >
              <img
                src="/img/profile_icon.png"
                alt="Profile"
                className="mx-auto mb-4 w-24 h-28"
              />
              <p className="text-xl font-semibold text-white">Profile</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
