"use client";

import Link from "next/link";

export default function MyDiagnosis() {
  const diagnoses = [
    { date: "05/02/25", status: "Unverified" },
    { date: "03/01/25", status: "Verified" },
    { date: "06/12/24", status: "Verified" },
    { date: "04/10/24", status: "Verified" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[40rem] text-center">
        <div className="flex justify-between items-center w-full mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">My Diagnosis</h1>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-3 font-semibold border-b pb-2 text-left">
            <span>Date</span>
            <span>Verification Status</span>
            <span></span>
          </div>
          {diagnoses.map((diag, index) => (
            <div key={index} className="grid grid-cols-3 py-3 border-b text-left">
              <span>{diag.date}</span>
              <span className={diag.status === "Unverified" ? "text-red-500" : "text-green-500"}>
                {diag.status}
              </span>
              <Link href={`/diagnosis/${index}`} className="text-blue-500 hover:underline text-right">
                View
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
