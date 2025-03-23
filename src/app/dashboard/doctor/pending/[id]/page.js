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

  if (loading)
    return <p className="text-center text-gray-500 text-lg">Loading...</p>;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: "url('/img/background.jpg')" }}
    >
      <div className="p-10 rounded-2xl shadow-2xl w-[55rem] text-black bg-white">
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
              onChange={(e) => setDiagnosis({ ...diagnosis, response: e.target.value })}
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
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 w-full"
          style={{ backgroundColor: "#5680E9" }}
          onClick={handleApprove}
        >
          Approve
        </button>
      </div>
    </div>
  );
}