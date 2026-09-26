import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Step3Report from "../components/Step3Report";
import Navbar from "../components/Navbar";
import { FaSpinner, FaArrowLeft } from "react-icons/fa";

export default function InterviewReport() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { interviewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/interview/report/${interviewId}`,
          {
            withCredentials: true,
          }
        );
        setReportData(response.data);
      } catch (err) {
        console.error("Error fetching interview report:", err);
        setError("Failed to load interview report. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (interviewId) {
      fetchReportData();
    }
  }, [interviewId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600 font-medium">Loading interview evaluation report...</p>
        </div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Report Not Found</h2>
            <p className="text-sm text-gray-500 mb-6">
              {error || "Could not retrieve the requested interview report."}
            </p>
            <button
              onClick={() => navigate("/interview/history")}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition"
            >
              <FaArrowLeft size={12} />
              <span>Back to History</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <Step3Report report={reportData} />
    </div>
  );
}