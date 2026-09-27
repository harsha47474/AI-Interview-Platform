import React from "react";
import { motion } from "framer-motion";
import { BsCoin } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";

/**
 * PricingHeader - Title, tagline, and current user credit balance badge
 */
const PricingHeader = ({ currentCredits = 0 }) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs sm:text-sm font-semibold mb-4"
      >
        <FaCrown className="text-amber-500" />
        <span>Flexible Credit Plans</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight"
      >
        Simple, Transparent <span className="text-green-600">Pricing</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed"
      >
        Invest in your career confidence. Choose the credit package that fits
        your preparation schedule—credits never expire.
      </motion.p>

      {/* Current Balance Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-gray-200 shadow-xs text-xs sm:text-sm font-medium text-gray-700"
      >
        <span className="text-gray-400">Current Balance:</span>
        <div className="flex items-center gap-1.5 font-bold text-gray-900 bg-gray-50 px-2.5 py-1 rounded-xl border border-gray-100">
          <BsCoin className="text-amber-500" size={16} />
          <span>{currentCredits} Credits</span>
        </div>
      </motion.div>
    </div>
  );
};

export default PricingHeader;
