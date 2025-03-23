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
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/img/background.jpg')" }}
    >
      <div className="bg-[#F9FCFF] p-12 rounded-3xl shadow-2xl w-[50rem] text-center">
        <div className="flex justify-between items-center w-full mb-6 border-b-2 border-[#E3F2FD] pb-4">
          <h1 className="text-3xl font-bold text-[#4A5568]">My Diagnosis</h1>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#E3F2FD] text-[#4A5568]">
              <th className="p-3 text-center">Date</th>
              <th className="p-3 text-center">Verification Status</th>
              <th className="p-3 text-center">View</th>
            </tr>
          </thead>
          <tbody>
            {diagnoses.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-gray-500 p-4 text-lg text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              diagnoses.map((diag, index) => (
                <tr
                  key={diag.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-[#F0FAFF]" : "bg-[#E3F7FE]"
                  }`}
                >
                  <td className="p-3 text-[#4A5568] text-center">{diag.date}</td>
                  <td
                    className={`p-3 font-semibold text-center ${
                      diag.status === "Unverified" ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {diag.status}
                  </td>
                  <td className="p-3 text-center">
                    <Link
                      href={`/dashboard/patient/myreports/${diag.id}`}
                      className="text-blue-500 font-semibold hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
