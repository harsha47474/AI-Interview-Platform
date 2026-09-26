import React from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaBriefcase, FaClock } from "react-icons/fa";
import { BsCheck2Circle } from "react-icons/bs";

/**
 * ReportHeroScore - Hero section displaying overall circular score gauge, tier badge, and session summary
 */
const ReportHeroScore = ({
  finalScore,
  tier,
  role,
  experience,
  mode,
  totalQuestions,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden"
    >
      {/* Subtle Ambient Decorative Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-green-50/70 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-50/60 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Overall Radial Score Gauge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
          <div className="relative w-44 h-44 flex items-center justify-center mb-3">
            {/* SVG Progress Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#e5e7eb"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke={tier.ringColor}
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 50}
                strokeDashoffset={
                  2 * Math.PI * 50 * (1 - Math.min(finalScore, 10) / 10)
                }
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Score Number Display */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                {finalScore.toFixed(1)}
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                out of 10
              </span>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${tier.badgeBg} mb-1`}
          >
            <FaTrophy size={11} /> {tier.ratingText}
          </div>
          <p className="text-xs text-gray-500 max-w-[200px]">
            {Math.round((finalScore / 10) * 100)}% Overall Competency Match
          </p>
        </div>

        {/* Right: Detailed Summary & Profile Badges */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1.5">
                <FaBriefcase size={11} className="text-green-600" />
                {role}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1.5">
                <FaClock size={11} className="text-green-600" />
                {experience}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                {mode} Interview
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {tier.label}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              {tier.subtext}. Your responses have been evaluated across key
              interview metrics including communication clarity, technical
              correctness, and real-time confidence under timed pressure.
            </p>
          </div>

          {/* Quick Session Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-500 block">Questions Answered</span>
              <span className="text-lg font-bold text-gray-800">
                {totalQuestions} Questions
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <span className="text-xs text-gray-500 block">Session Status</span>
              <span className="text-lg font-bold text-green-600 flex items-center gap-1.5">
                <BsCheck2Circle /> Verified
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl col-span-2 sm:col-span-1">
              <span className="text-xs text-gray-500 block">AI Evaluation</span>
              <span className="text-lg font-bold text-gray-800">Complete</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportHeroScore;
