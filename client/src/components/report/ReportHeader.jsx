import React from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaCheckCircle,
  FaCheck,
  FaShareAlt,
  FaPrint,
  FaHistory,
  FaRedo,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * ReportHeader - Top navigation bar for the evaluation report with export, print, and retake actions
 */
const ReportHeader = ({
  candidateName,
  createdAt,
  copied,
  onShare,
  onPrint,
  onRetake,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm print:hidden"
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl shadow-xs">
          <FaRobot />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-gray-900">
              Colloquium AI Evaluation Report
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
              <FaCheckCircle size={10} /> Completed
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Candidate:{" "}
            <span className="font-semibold text-gray-700">
              {candidateName || "Candidate"}
            </span>{" "}
            • Generated on {createdAt}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onShare}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition shadow-xs"
          title="Copy Report Summary"
        >
          {copied ? <FaCheck className="text-green-600" /> : <FaShareAlt />}
          <span>{copied ? "Copied!" : "Share"}</span>
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition shadow-xs"
          title="Print or Save PDF"
        >
          <FaPrint />
          <span className="hidden sm:inline">Print / PDF</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/interview/history")}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition shadow-xs"
        >
          <FaHistory />
          <span className="hidden sm:inline">History</span>
        </button>

        <button
          type="button"
          onClick={onRetake ? onRetake : () => navigate("/interview")}
          className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
        >
          <FaRedo size={12} />
          <span>Practice Again</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ReportHeader;
