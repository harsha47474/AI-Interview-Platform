import React from "react";
import { motion } from "framer-motion";
import {
  FaAward,
  FaCheckCircle,
  FaStar,
  FaLightbulb,
  FaExclamationCircle,
} from "react-icons/fa";

/**
 * ReportAiInsights - Side-by-side strengths and improvement growth areas derived from performance
 */
const ReportAiInsights = ({ strengths = [], improvements = [] }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Key Strengths */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
              <FaAward />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">
              Key Strengths Identified
            </h3>
          </div>

          <div className="space-y-3">
            {strengths.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3"
              >
                <div className="mt-1 text-emerald-600 shrink-0">
                  <FaCheckCircle size={14} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center gap-1.5">
          <FaStar className="text-amber-400" /> Keep leveraging these strong qualities during your real interviews.
        </div>
      </motion.div>

      {/* Growth & Improvement Areas */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
              <FaLightbulb />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">
              Targeted Growth Areas
            </h3>
          </div>

          <div className="space-y-3">
            {improvements.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100 flex items-start gap-3"
              >
                <div className="mt-1 text-amber-600 shrink-0">
                  <FaExclamationCircle size={14} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center gap-1.5">
          <FaLightbulb className="text-amber-500" /> Small refinements here can elevate your interview conversion rate.
        </div>
      </motion.div>
    </section>
  );
};

export default ReportAiInsights;
