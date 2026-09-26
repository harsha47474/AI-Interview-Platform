import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import {
  FaHistory,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaBriefcase,
  FaTrophy,
  FaPlay,
} from "react-icons/fa";

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
              onClick={() => navigate("/interview")}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-sm shadow-sm transition self-start sm:self-auto"
            >
              <FaPlay size={11} />
              <span>New Interview</span>
            </button>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-3 border-green-600 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-gray-500 text-sm">Loading interview records...</p>
            </div>
          ) : interviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {interviews.map((item, idx) => {
                const score = Number(item.finalScore?.toFixed(1) || 0);
                const dateStr = item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recent";

                return (
                  <motion.div
                    key={item._id || idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -3 }}
                    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                          {item.mode || "Technical"} Mode
                        </span>

                        <span className="text-xs text-gray-400">{dateStr}</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-5">
                        <span className="flex items-center gap-1">
                          <FaBriefcase className="text-gray-400" />
                          {item.experience}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FaCheckCircle className="text-green-500" />
                          {item.questions?.length || 0} Questions
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-amber-500">
                          <FaTrophy size={13} />
                        </div>
                        <div>
                          <span className="text-[11px] text-gray-400 block font-medium">
                            Score
                          </span>
                          <span className="text-base font-bold text-gray-800">
                            {score} / 10
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(`/report/${item._id}`)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold transition"
                      >
                        <span>View Report</span>
                        <FaArrowRight size={10} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 mx-auto flex items-center justify-center text-2xl mb-4">
                <FaHistory />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                No Interview History Yet
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                You haven't completed any interviews yet. Take your first AI interview to see your detailed performance report here.
              </p>
              <button
                onClick={() => navigate("/interview")}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-sm transition"
              >
                <FaPlay size={11} />
                <span>Start Your First Interview</span>
              </button>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}