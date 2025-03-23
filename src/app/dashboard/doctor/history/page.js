"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReportsHistory() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fake function to simulate backend GET request
  const fetchReportsHistory = async (doctorId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: "101", date: "05/02/25", patientName: "Animesh Cena" },
          { id: "102", date: "03/01/25", patientName: "Divyam Orton" },
          { id: "103", date: "06/12/24", patientName: "Keshav Jha" },
        ]);
      }, 1000);
    });
  };

  useEffect(() => {
    const doctorId = "D123"; // Assume doctor ID is available (Replace with actual logic)
    fetchReportsHistory(doctorId).then((data) => {
      setReports(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-center text-gray-500 text-lg">Loading...</p>;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/img/background.jpg')" }}
    >
      <div className="bg-[#F9FCFF] p-12 rounded-3xl shadow-2xl w-[50rem] text-center relative">
        {/* Home Button */}
        <button
          className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => router.push("/dashboard/doctor")}
        >
          Home
        </button>

        <div className="flex justify-between items-center w-full mb-6 border-b-2 border-[#E3F2FD] pb-4">
          <h1 className="text-3xl font-bold text-[#4A5568]">Reports History</h1>
        </div>
        
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#E3F2FD] text-[#4A5568]">
              <th className="p-3 text-center">Date</th>
              <th className="p-3 text-center">Patient Name</th>
              <th className="p-3 text-center">Query</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr
                key={report.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-[#F0FAFF]" : "bg-[#E3F7FE]"
                }`}
              >
                <td className="p-3 text-[#4A5568] text-center">{report.date}</td>
                <td className="p-3 text-[#4A5568] text-center">{report.patientName}</td>
                <td className="p-3 text-center">
                  <Link
                    href={`/dashboard/doctor/history/${report.id}`}
                    className="text-blue-500 font-semibold hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
