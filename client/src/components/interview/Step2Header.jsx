import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaCheck, FaClock } from "react-icons/fa";

/**
 * Step2Header - Top status bar displaying interview session metadata, question progress dots, and timer badge
 */
const Step2Header = ({
  displayName,
  questions = [],
  currentIndex,
  phase,
  timeLeft,
  isUrgent,
  isWarning,
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl w-full mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-4 mb-6 flex flex-wrap items-center justify-between gap-4"
    >
      {/* Brand & Mode */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl shadow-xs">
          <FaRobot />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-gray-800 text-base">
              Colloquium AI Studio
            </h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
              Live Session
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Candidate:{" "}
            <span className="font-semibold text-gray-700">{displayName}</span>
          </p>
        </div>
      </div>

      {/* Question Progress Dots */}
      <div className="flex items-center gap-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 ${
              i === currentIndex
                ? "w-8 h-8 bg-green-600 text-white shadow-xs scale-105 ring-2 ring-green-300 ring-offset-1"
                : i < currentIndex
                ? "w-7 h-7 bg-green-100 text-green-700"
                : "w-7 h-7 bg-gray-100 text-gray-400"
            }`}
          >
            {i < currentIndex ? <FaCheck size={10} /> : i + 1}
          </div>
        ))}
      </div>

      {/* Timer / Status Pill */}
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-300 ${
            isUrgent
              ? "bg-red-50 text-red-600 border-red-300 animate-pulse"
              : isWarning
              ? "bg-amber-50 text-amber-600 border-amber-300"
              : "bg-gray-50 text-gray-700 border-gray-200"
          }`}
        >
          <FaClock
            className={
              isUrgent ? "text-red-500 animate-spin" : "text-gray-400"
            }
          />
          <span>
            {phase === "listening"
              ? `${timeLeft}s remaining`
              : phase === "asking"
              ? "AI speaking..."
              : phase === "submitting"
              ? "Evaluating..."
              : phase === "feedback"
              ? "Feedback ready"
              : "Ready"}
          </span>
        </div>
      </div>
    </motion.header>
  );
};

export default Step2Header;
