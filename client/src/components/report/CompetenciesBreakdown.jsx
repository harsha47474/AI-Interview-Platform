import React from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaQuoteLeft, FaCheckCircle } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";

/**
 * CompetenciesBreakdown - Renders the three core performance dimensions: Confidence, Communication, and Correctness
 */
const CompetenciesBreakdown = ({ confidence, communication, correctness }) => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FaChartLine className="text-green-600" />
          Core Competencies Breakdown
        </h3>
        <span className="text-xs text-gray-500">Scale: 0 to 10 Points</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Confidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold">
              <BsLightningChargeFill />
            </div>
            <span className="text-2xl font-extrabold text-gray-900">
              {confidence.toFixed(1)}
              <span className="text-sm font-normal text-gray-400">/10</span>
            </span>
          </div>

          <h4 className="font-bold text-gray-800 text-base mb-1">
            Confidence & Poise
          </h4>
          <p className="text-xs text-gray-500 mb-4">
            Evaluates vocal firmness, composure, hesitation rate, and delivery authority.
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(confidence * 10, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2 font-medium">
            <span>Hesitant</span>
            <span>Balanced</span>
            <span className="text-blue-600 font-semibold">Authoritative</span>
          </div>
        </motion.div>

        {/* Metric 2: Communication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg font-bold">
              <FaQuoteLeft size={14} />
            </div>
            <span className="text-2xl font-extrabold text-gray-900">
              {communication.toFixed(1)}
              <span className="text-sm font-normal text-gray-400">/10</span>
            </span>
          </div>

          <h4 className="font-bold text-gray-800 text-base mb-1">
            Communication & Clarity
          </h4>
          <p className="text-xs text-gray-500 mb-4">
            Evaluates articulation, logical structuring, concise speech, and conversational flow.
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(communication * 10, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2 font-medium">
            <span>Vague</span>
            <span>Articulate</span>
            <span className="text-purple-600 font-semibold">Impactful</span>
          </div>
        </motion.div>

        {/* Metric 3: Correctness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -4 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-lg font-bold">
              <FaCheckCircle />
            </div>
            <span className="text-2xl font-extrabold text-gray-900">
              {correctness.toFixed(1)}
              <span className="text-sm font-normal text-gray-400">/10</span>
            </span>
          </div>

          <h4 className="font-bold text-gray-800 text-base mb-1">
            Technical Correctness
          </h4>
          <p className="text-xs text-gray-500 mb-4">
            Assesses domain knowledge depth, question understanding, and factual accuracy.
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-green-600 h-2.5 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(correctness * 10, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2 font-medium">
            <span>Basic</span>
            <span>Accurate</span>
            <span className="text-green-600 font-semibold">Exemplary</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetenciesBreakdown;
