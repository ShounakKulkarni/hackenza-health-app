"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function DiagnosisReport() {
  const { id } = useParams(); // Get diagnosis ID from URL
  const router = useRouter();
  const [diagnosis, setDiagnosis] = useState(null);
  const [doctorId, setDoctorId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiagnosis() {
      const data = await fakeFetchDiagnosis(id); // Fake API call
      setDiagnosis(data);
      setDoctorId(data.doctorId); // Get doctor ID
      setLoading(false);
    }
    fetchDiagnosis();
  }, [id]);

  // Fake API function (Replace with real API call later)
  const fakeFetchDiagnosis = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          symptoms: "Fever and cough",
          severity: "Moderate",
          duration: "3 days",
          progress: "Worsened",
          response: "Prescribed antibiotics and rest.",
          clinician: "Dr. Jane Smith - General Physician",
          verified: false, // Example: Unverified
          doctorId: "12345", // Fake doctor ID
        });
      }, 1000);
    });
  };

  if (loading) {
    return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('/img/background.jpg')" }}
    >
      <div className="p-10 rounded-2xl shadow-2xl w-[55rem] text-black bg-white relative">
        {/* Back Button */}
        <button
          className="absolute top-4 left-4 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
          onClick={() => router.push("/dashboard/doctor/history")}
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold mb-6 border-b-2 pb-4 text-center">
          Diagnosis Report
        </h1>

        <div className="space-y-6 text-left">
          <div>
            <label className="block font-semibold text-lg">Symptoms</label>
            <textarea
              className="w-full p-3 rounded-lg text-black bg-[#E3F7FE] resize-none"
              value={diagnosis.symptoms}
              readOnly
              rows={3}
            />
          </div>

          {/* Duration, Severity, and Progress Side by Side */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-lg">Duration</label>
              <input
                className="w-full p-3 rounded-lg text-black bg-[#E3F7FE]"
                value={diagnosis.duration}
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-lg">Severity</label>
              <input
                className="w-full p-3 rounded-lg text-black bg-[#E3F7FE]"
                value={diagnosis.severity}
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-lg">Progress</label>
              <input
                className="w-full p-3 rounded-lg text-black bg-[#E3F7FE]"
                value={diagnosis.progress}
                readOnly
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-lg">Response</label>
            <textarea
              className="w-full p-3 rounded-lg text-black bg-[#E3F7FE] resize-none"
              value={diagnosis.response}
              readOnly
              rows={3}
            />
          </div>

          <div>
            <label className="block font-semibold text-lg">Clinician Assigned</label>
            <input
              className="w-full p-3 rounded-lg text-black bg-[#E3F7FE]"
              value={diagnosis.clinician}
              readOnly
            />
          </div>

          <div>
            <label className="block font-semibold text-lg">Verification Status</label>
            <input
              className={`w-full p-3 rounded-lg ${diagnosis.verified ? "bg-green-200" : "bg-red-200"}`}
              value={diagnosis.verified ? "Verified" : "Unverified"}
              readOnly
            />
          </div>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 w-full"
          style={{ backgroundColor: "#5680E9" }}
          onClick={() => window.location.href = `/dashboard/patient/myreports/${id}/${doctorId}`}
        >
          View Clinician Profile
        </button>
      </div>
    </div>
  );
}
