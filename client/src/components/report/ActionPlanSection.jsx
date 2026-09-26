import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

/**
 * ActionPlanSection - Numbered checklist of recommended practice steps curated by AI
 */
const ActionPlanSection = ({ recommendations = [] }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-base font-bold">
          <FaCheckCircle />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">
            Recommended Action Plan Before Your Next Interview
          </h3>
          <p className="text-xs text-gray-500">
            Actionable tips curated by AI based on your performance patterns
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="bg-gray-50 p-4 rounded-xl border border-gray-200/80 flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              {i + 1}
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {rec}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default ActionPlanSection;
