"use client";

import { useState } from "react";

export default function DiagnosisReport() {
  const [diagnosis] = useState({
    symptoms: "Fever and cough",
    severity: "Moderate",
    duration: "3 days",
    progress: "Worsened",
    response: "Prescribed antibiotics and rest.",
    clinician: "Dr. Jane Smith - General Physician",
    verified: true,
  });

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
      </div>
    </div>
  );
}
