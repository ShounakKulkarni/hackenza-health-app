"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function DiagnosisReport() {
  const router = useRouter();
  const { id } = useParams(); // Get report ID from URL
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fake function to simulate backend GET request
  const fetchDiagnosisReport = async (reportId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          symptoms: "Fever and cough",
          severity: "Moderate",
          duration: "3 days",
          progress: "Worsened",
          response: "Prescribed antibiotics and rest.",
          clinician: "Dr. Jane Smith - General Physician",
          verified: false,
        });
      }, 1000);
    });
  };

  // Fake function to simulate backend PUT request
  const approveDiagnosis = async (reportId, updatedResponse) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Diagnosis ${reportId} updated in backend with response:`, updatedResponse);
        resolve(true);
      }, 1000);
    });
  };

  useEffect(() => {
    if (id) {
      fetchDiagnosisReport(id).then((data) => {
        setDiagnosis(data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleApprove = async () => {
    if (diagnosis) {
      await approveDiagnosis(id, diagnosis.response);
      router.push("/dashboard/doctor/pending"); // Redirect after approval
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

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
          <textarea
            className="w-full p-2 border rounded-lg bg-white"
            value={diagnosis.response}
            onChange={(e) => setDiagnosis({ ...diagnosis, response: e.target.value })}
          />
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Clinician Assigned</label>
          <input className="w-full p-2 border rounded-lg bg-gray-200" value={diagnosis.clinician} readOnly />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4"
          onClick={handleApprove}
        >
          Approve
        </button>
      </div>
    </div>
  );
}
