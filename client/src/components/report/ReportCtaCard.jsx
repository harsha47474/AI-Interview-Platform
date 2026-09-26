import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * ReportCtaCard - Bottom banner encouraging candidate to view history or start another interview practice session
 */
const ReportCtaCard = ({ onRetake }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gray-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl print:hidden"
    >
      <div className="space-y-1 text-center md:text-left">
        <h3 className="text-xl sm:text-2xl font-bold">
          Ready to sharpen your interview readiness further?
        </h3>
        <p className="text-gray-400 text-sm max-w-xl">
          Consistency is key to acing real-life job interviews. Practice another session with new questions or explore your past performance history.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/interview/history")}
          className="px-5 py-3 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 font-semibold text-sm transition"
        >
          View Interview History
        </button>

        <button
          type="button"
          onClick={onRetake ? onRetake : () => navigate("/interview")}
          className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-sm shadow-md transition flex items-center gap-2"
        >
          <span>Start New Interview</span>
          <FaArrowRight size={12} />
        </button>
      </div>
    </motion.div>
  );
};

export default ReportCtaCard;
