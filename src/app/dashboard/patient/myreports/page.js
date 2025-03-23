"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyDiagnosis() {
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    async function fetchDiagnoses() {
      const data = await fakeGetDiagnoses(); // Fake API call
      setDiagnoses(data);
    }
    fetchDiagnoses();
  }, []);

  // Fake API Function (Replace with real GET request later)
  const fakeGetDiagnoses = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, date: "05/02/25", status: "Unverified" },
          { id: 2, date: "03/01/25", status: "Verified" },
          { id: 3, date: "06/12/24", status: "Verified" },
          { id: 4, date: "04/10/24", status: "Verified" },
        ]);
      }, 1000);
    });
  };

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
          {diagnoses.length === 0 ? (
            <p className="text-gray-500 mt-4">Loading...</p>
          ) : (
            diagnoses.map((diag) => (
              <div key={diag.id} className="grid grid-cols-3 py-3 border-b text-left">
                <span>{diag.date}</span>
                <span className={diag.status === "Unverified" ? "text-red-500" : "text-green-500"}>
                  {diag.status}
                </span>
                <Link
                  href={`/dashboard/patient/myreports/${diag.id}`}
                  className="text-blue-500 hover:underline text-right"
                >
                  View
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
