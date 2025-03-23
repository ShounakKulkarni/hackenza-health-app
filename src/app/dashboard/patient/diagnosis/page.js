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
  const [verified, setVerified] = useState("No");
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
      setVerified("No");
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
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('/img/background.jpg')" }}
    >
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[40rem] text-black">
        <h1 className="text-3xl font-bold mb-6 text-center border-b pb-4">New Diagnosis</h1>

        <div className="space-y-4 text-left">
          <div>
            <label className="block font-semibold">Symptoms</label>
            <textarea
              name="symptoms"
              className="w-full p-3 border rounded-lg bg-[#E3F7FE] text-black resize-none"
              placeholder="Enter symptoms..."
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Severity</label>
              <select
                name="severity"
                className="w-full p-3 border rounded-lg bg-[#E3F7FE] text-black"
                onChange={handleChange}
                required
              >
                <option value="">Select Severity</option>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold">Duration</label>
              <input
                type="text"
                name="duration"
                className="w-full p-3 border rounded-lg bg-[#E3F7FE] text-black"
                placeholder="Enter duration..."
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold">Progress</label>
            <select
              name="progress"
              className="w-full p-3 border rounded-lg bg-[#E3F7FE] text-black"
              onChange={handleChange}
              required
            >
              <option value="">Select Progress</option>
              <option value="Improved">Improved</option>
              <option value="Worsened">Worsened</option>
              <option value="Same">Same</option>
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-[#5AB9EA] text-white font-semibold rounded-lg hover:bg-blue-600 mt-6"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        ) : (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block font-semibold">Response</label>
              <textarea
                className="w-full p-3 border rounded-lg bg-[#E3F7FE] text-black resize-none"
                value={response || "Not Verified"}
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold">Clinician Assigned</label>
              <input
                className="w-full p-3 border rounded-lg bg-[#E3F7FE] text-black"
                value={clinician}
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold">Verified</label>
              <input
                className="w-full p-3 border rounded-lg bg-[#E3F7FE] text-black"
                value={verified}
                readOnly
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
