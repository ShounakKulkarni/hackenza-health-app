"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ReportsHistory() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[40rem] text-center">
        <div className="flex justify-between items-center w-full mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Reports History</h1>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Patient Name</th>
              <th className="p-2 text-left">Query</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b">
                <td className="p-2 bg-gray-200">{report.date}</td>
                <td className="p-2 bg-gray-200">{report.patientName}</td>
                <td className="p-2 bg-gray-200">
                  <Link href={`/dashboard/doctor/history/${report.id}`} className="text-blue-500">
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
