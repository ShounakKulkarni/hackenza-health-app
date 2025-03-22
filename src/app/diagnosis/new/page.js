"use client";

import { useState } from "react";

export default function NewDiagnosis() {
  const [response, setResponse] = useState(null);
  const [clinician, setClinician] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setSubmitted(true);
    setTimeout(() => {
      setResponse("Diagnosis verified. Here is the response from backend.");
      setClinician("Dr. John Doe - Cardiologist"); // Simulating backend response
      setIsVerified(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[40rem] text-center">
        <div className="flex justify-between items-center w-full mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">New Diagnosis</h1>
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Symptoms</label>
          <textarea className="w-full p-2 border rounded-lg" placeholder="Enter symptoms..." />
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Severity</label>
          <div className="flex gap-4">
            <label><input type="radio" name="severity" className="mr-1" /> Mild</label>
            <label><input type="radio" name="severity" className="mr-1" /> Moderate</label>
            <label><input type="radio" name="severity" className="mr-1" /> Severe</label>
          </div>
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Duration</label>
          <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter duration..." />
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Progress</label>
          <div className="flex gap-4">
            <label><input type="radio" name="progress" className="mr-1" /> Improved</label>
            <label><input type="radio" name="progress" className="mr-1" /> Worsened</label>
            <label><input type="radio" name="progress" className="mr-1" /> Same</label>
          </div>
        </div>
        {!submitted && (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        )}
        {submitted && (
          <div>
          <div className="mt-4 text-left">
            <label className="block font-semibold">Response</label>
            <textarea
              className="w-full p-2 border rounded-lg bg-gray-200"
              value={response || "Not Verified"}
              readOnly
            />
          </div>
          <div className="mt-4 text-left">
            <label className="block font-semibold">Clinician Assigned</label>
            <input
              className="w-full p-2 border rounded-lg bg-gray-200"
              value={clinician}
              readOnly
            />
          </div>
          </div>
        )}
      </div>
    </div>
  );
}