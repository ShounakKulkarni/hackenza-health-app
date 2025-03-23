"use client";

import { useState } from "react";

export default function NewDiagnosis() {
  const [formData, setFormData] = useState({
    symptoms: "",
    severity: "",
    duration: "",
    progress: "",
  });
  const [response, setResponse] = useState(null);
  const [clinician, setClinician] = useState(null);
  const [verified, setVerified] = useState("No"); // Default "No"
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await fakePostDiagnosis(formData);
      const responseData = await fakeGetDiagnosisResponse();
      setResponse(responseData.response);
      setClinician(responseData.clinician);
      setVerified("No"); // Still "No"
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  // Fake API functions (replace with real API calls later)
  const fakePostDiagnosis = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Diagnosis submitted:", data);
        resolve({ success: true });
      }, 1500);
    });
  };

  const fakeGetDiagnosisResponse = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          response: "Pending review by a senior clinician.",
          clinician: "Dr. John Doe - Cardiologist",
        });
      }, 2000);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[40rem] text-center">
        <div className="flex justify-between items-center w-full mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">New Diagnosis</h1>
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Symptoms</label>
          <textarea
            name="symptoms"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter symptoms..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Severity</label>
          <div className="flex gap-4">
            {["Mild", "Moderate", "Severe"].map((level) => (
              <label key={level}>
                <input type="radio" name="severity" value={level} className="mr-1" onChange={handleChange} required/> {level}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Duration</label>
          <input
            type="text"
            name="duration"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter duration..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 text-left">
          <label className="block font-semibold">Progress</label>
          <div className="flex gap-4">
            {["Improved", "Worsened", "Same"].map((status) => (
              <label key={status}>
                <input type="radio" name="progress" value={status} className="mr-1" onChange={handleChange} required/> {status}
              </label>
            ))}
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {!submitted && (
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}

        {submitted && (
          <div>
            <div className="mt-4 text-left">
              <label className="block font-semibold">Response</label>
              <textarea className="w-full p-2 border rounded-lg bg-gray-200" value={response || "Not Verified"} readOnly />
            </div>
            <div className="mt-4 text-left">
              <label className="block font-semibold">Clinician Assigned</label>
              <input className="w-full p-2 border rounded-lg bg-gray-200" value={clinician} readOnly />
            </div>
            <div className="mt-4 text-left">
              <label className="block font-semibold">Verified</label>
              <input className="w-full p-2 border rounded-lg bg-gray-200" value={verified} readOnly />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
