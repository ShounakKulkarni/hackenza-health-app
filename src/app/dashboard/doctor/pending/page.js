"use client";

import Link from "next/link";

export default function PendingReports() {
  const reports = [
    { date: "05/02/25", postedBy: "Animesh Cena" },
    { date: "03/01/25", postedBy: "Divyam Orton" },
    { date: "06/12/24", postedBy: "Keshav Jha" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[40rem] text-center">
        <div className="flex justify-between items-center w-full mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Pending Reports</h1>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-300">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Posted By</th>
              <th className="p-2 text-left">Query</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 bg-gray-200">{report.date}</td>
                <td className="p-2 bg-gray-200">{report.postedBy}</td>
                <td className="p-2 bg-gray-200">
                  <Link href="#" className="text-blue-500">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
