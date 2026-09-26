import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaChevronDown, FaChevronUp } from "react-icons/fa";

const getDiffBadge = (diff) => {
  const d = (diff || "medium").toLowerCase();
  if (d === "easy") {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }
  if (d === "hard") {
    return "bg-red-50 text-red-700 border-red-200";
  }
  return "bg-amber-50 text-amber-700 border-amber-200";
};

/**
 * QuestionAccordionItem - Expandable question item showing score breakdown, spoken transcript, and AI feedback
 */
const QuestionAccordionItem = ({
  questionItem,
  index,
  isExpanded,
  onToggle,
}) => {
  const qScore = Number(questionItem.score ?? 0);
  const qConfidence = Number(questionItem.confidence ?? 0);
  const qComm = Number(questionItem.communication ?? 0);
  const qCorr = Number(questionItem.correctness ?? 0);

  return (
    <div className="py-5 transition">
      {/* Header Row */}
      <div
        onClick={onToggle}
        className="cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-2xl hover:bg-gray-50/80 transition"
      >
        <div className="flex items-start gap-3.5 flex-1">
          <div className="w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            Q{index + 1}
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getDiffBadge(
                  questionItem.difficulty
                )}`}
              >
                {(questionItem.difficulty || "Standard").toUpperCase()}
              </span>
            </div>
            <p className="font-semibold text-gray-800 text-sm sm:text-base leading-snug">
              {questionItem.question}
            </p>
          </div>
        </div>

        {/* Right: Score Badges & Expand Icon */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 ml-11 md:ml-0">
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm border ${
                qScore >= 8
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : qScore >= 6
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              Score: {qScore.toFixed(1)} / 10
            </div>
          </div>

          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-200/50 transition"
          >
            {isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </button>
        </div>
      </div>

      {/* Expandable Details Container */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 ml-0 sm:ml-12 pl-2 sm:pl-4 border-l-2 border-gray-200 space-y-4 pt-1 pb-2 overflow-hidden"
          >
            {/* Mini metrics bar */}
            <div className="grid grid-cols-3 gap-2 max-w-md">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-center">
                <span className="text-[11px] text-gray-500 block">Confidence</span>
                <span className="font-bold text-gray-800 text-sm">
                  {qConfidence.toFixed(1)}/10
                </span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-center">
                <span className="text-[11px] text-gray-500 block">Communication</span>
                <span className="font-bold text-gray-800 text-sm">
                  {qComm.toFixed(1)}/10
                </span>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-center">
                <span className="text-[11px] text-gray-500 block">Correctness</span>
                <span className="font-bold text-gray-800 text-sm">
                  {qCorr.toFixed(1)}/10
                </span>
              </div>
            </div>

            {/* Candidate Answer Transcript */}
            {questionItem.answer && (
              <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-200">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Candidate's Verbal Response
                </span>
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  "{questionItem.answer}"
                </p>
              </div>
            )}

            {/* Evaluator AI Feedback */}
            <div className="bg-green-50/70 border border-green-200 rounded-xl p-3.5 flex items-start gap-2.5">
              <div className="text-green-600 mt-0.5 shrink-0">
                <FaRobot size={15} />
              </div>
              <div>
                <span className="text-[11px] font-bold text-green-900 uppercase tracking-wider block mb-0.5">
                  AI Evaluator Feedback
                </span>
                <p className="text-xs sm:text-sm text-green-900 font-medium leading-relaxed">
                  {questionItem.feedback || "Good overall response addressing the core question."}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionAccordionItem;
