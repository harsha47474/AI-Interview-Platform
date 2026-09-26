import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaHistory, FaPlay } from "react-icons/fa";
import InterviewHistoryCard from "../components/history/InterviewHistoryCard";
import InterviewHistoryEmpty from "../components/history/InterviewHistoryEmpty";

/**
 * InterviewHistory - Page listing all previous interview assessments with scores and links
 */
export default function InterviewHistory() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:3000/api/interview/history",
          { withCredentials: true }
        );
        setInterviews(res.data.interviews || []);
      } catch (error) {
        console.error("Error fetching interview history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-green-600 font-semibold text-sm mb-1">
                <FaHistory />
                <span>Performance Record</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Interview History
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Review your past AI interview performances, scores, and evaluator feedback.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/interview")}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-sm shadow-sm transition self-start sm:self-auto"
            >
              <FaPlay size={11} />
              <span>New Interview</span>
            </button>
          </div>

          {/* Loading indicator */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-3 border-green-600 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-gray-500 text-sm">Loading interview records...</p>
            </div>
          ) : interviews.length > 0 ? (
            /* Card Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {interviews.map((item, idx) => (
                <InterviewHistoryCard
                  key={item._id || idx}
                  interview={item}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <InterviewHistoryEmpty />
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}