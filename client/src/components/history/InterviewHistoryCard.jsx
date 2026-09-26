import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCheckCircle, FaTrophy, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * InterviewHistoryCard - Renders a single interview history card with score, role, and view report button
 */
const InterviewHistoryCard = ({ interview, index }) => {
  const navigate = useNavigate();
  const score = Number(interview.finalScore?.toFixed(1) || 0);
  const dateStr = interview.createdAt
    ? new Date(interview.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
            {interview.mode || "Technical"} Mode
          </span>

          <span className="text-xs text-gray-400">{dateStr}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {interview.role}
        </h3>

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-5">
          <span className="flex items-center gap-1">
            <FaBriefcase className="text-gray-400" />
            {interview.experience}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <FaCheckCircle className="text-green-500" />
            {interview.questions?.length || 0} Questions
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
          type="button"
          onClick={() => navigate(`/report/${interview._id}`)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold transition"
        >
          <span>View Report</span>
          <FaArrowRight size={10} />
        </button>
      </div>
    </motion.div>
  );
};

export default InterviewHistoryCard;
