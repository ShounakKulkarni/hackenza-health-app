"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PendingReports() {
  const [reports, setReports] = useState([]);
  const router = useRouter();

  // Fake function to simulate backend API call
  const fetchPendingReports = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, date: "05/02/25", postedBy: "Animesh Cena" },
          { id: 2, date: "03/01/25", postedBy: "Divyam Orton" },
          { id: 3, date: "06/12/24", postedBy: "Keshav Jha" },
        ]);
      }, 1000);
    });
  };

  useEffect(() => {
    const getReports = async () => {
      const data = await fetchPendingReports();
      setReports(data);
    };
    getReports();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('/img/background.jpg')" }}
    >
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-[50rem] text-center relative">
        {/* Home Button */}
        <button
          className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => router.push("/dashboard/doctor")}
        >
          Home
        </button>

        <div className="flex justify-between items-center w-full mb-6 border-b-2 pb-4">
          <h1 className="text-3xl font-bold text-black">Pending Reports</h1>
        </div>
        
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#D6F1FF] text-black">
              <th className="p-3 text-center">Date</th>
              <th className="p-3 text-center">Posted By</th>
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
                <td className="p-3 text-black text-center">{report.date}</td>
                <td className="p-3 text-black text-center">{report.postedBy}</td>
                <td className="p-3 text-center">
                  <Link
                    href={`/dashboard/doctor/pending/${report.id}`}
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
