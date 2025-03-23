"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DiagnosisReport() {
  const { id } = useParams(); // Get diagnosis ID from URL
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
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[40rem] text-center">
        <div className="flex justify-between items-center w-full mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Diagnosis Report</h1>
        </div>

        <div className="mb-4 text-left">
          <label className="block font-semibold">Symptoms</label>
          <textarea className="w-full p-2 border rounded-lg bg-gray-200" value={diagnosis.symptoms} readOnly />
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Severity</label>
          <input className="w-full p-2 border rounded-lg bg-gray-200" value={diagnosis.severity} readOnly />
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Duration</label>
          <input className="w-full p-2 border rounded-lg bg-gray-200" value={diagnosis.duration} readOnly />
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Progress</label>
          <input className="w-full p-2 border rounded-lg bg-gray-200" value={diagnosis.progress} readOnly />
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Response</label>
          <textarea className="w-full p-2 border rounded-lg bg-gray-200" value={diagnosis.response} readOnly />
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Clinician Assigned</label>
          <input className="w-full p-2 border rounded-lg bg-gray-200" value={diagnosis.clinician} readOnly />
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Verification Status</label>
          <input
            className={`w-full p-2 border rounded-lg ${
              diagnosis.verified ? "bg-green-200" : "bg-red-200"
            }`}
            value={diagnosis.verified ? "Verified" : "Unverified"}
            readOnly
          />
        </div>

        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4"
          onClick={() => window.location.href = `/dashboard/patient/myreports/${id}/${doctorId}`} // Redirect to doctor's profile
        >
          View Clinician Profile
        </button>
      </div>
    </div>
  );
}
