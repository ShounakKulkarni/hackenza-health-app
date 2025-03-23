"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";


export default function DoctorDashboard() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[50rem] text-center">
        <div className="flex justify-between items-center w-full mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Virtual Care</h1>
          <button className="text-red-500 font-semibold hover:underline" onClick={() => router.push("/login")}>Logout</button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Link href="patient/diagnosis">
            <div className="p-6 bg-blue-100 rounded-lg text-center cursor-pointer hover:bg-blue-200 shadow-md">
              <img src="/icons/diagnosis.png" alt="New Diagnosis" className="mx-auto mb-2 w-12 h-12" />
              <p className="text-lg font-semibold text-gray-700">New Diagnosis</p>
            </div>
          </Link>
          <Link href="patient/myreports">
            <div className="p-6 bg-green-100 rounded-lg text-center cursor-pointer hover:bg-green-200 shadow-md">
              <img src="/icons/history.png" alt="Diagnosis History" className="mx-auto mb-2 w-12 h-12" />
              <p className="text-lg font-semibold text-gray-700">My Reports</p>
            </div>
          </Link>
          <Link href="patient/profile" className="col-span-2">
            <div className="p-6 bg-yellow-100 rounded-lg text-center cursor-pointer hover:bg-yellow-200 shadow-md">
              <img src="/icons/profile.png" alt="Profile" className="mx-auto mb-2 w-12 h-12" />
              <p className="text-lg font-semibold text-gray-700">Profile</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}