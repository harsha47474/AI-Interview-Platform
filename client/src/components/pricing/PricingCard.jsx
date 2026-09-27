import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaStar, FaArrowRight } from "react-icons/fa";
import { BsCoin } from "react-icons/bs";

/**
 * PricingCard - Individual pricing tier card with plan specs, features list, and purchase CTA
 */
const PricingCard = ({ plan, index, onSelectPlan }) => {
  const isPopular = plan.popular;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
      whileHover={{ y: -6 }}
      className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
        isPopular
          ? "bg-white border-2 border-green-500 shadow-xl ring-4 ring-green-100/50"
          : "bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300"
      }`}
    >
      {/* Floating Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-green-600 text-white shadow-sm tracking-wide uppercase">
            <FaStar size={10} /> Most Popular
          </span>
        </div>
      )}

      <div>
        {/* Tier Name & Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isPopular
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {plan.badge || "Plan"}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 min-h-[38px] leading-relaxed mb-5">
          {plan.description}
        </p>

        {/* Price & Billing */}
        <div className="mb-5 pb-5 border-b border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {plan.price}
            </span>
            <span className="text-xs font-medium text-gray-400">
              {plan.price === "₹0" ? "/ trial" : "one-time"}
            </span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1 font-medium">
            {plan.billing || "No monthly recurring charges"}
          </p>
        </div>

        {/* Credits Highlight Pill */}
        <div className="mb-6 p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-600">Credits Included</span>
          <div className="flex items-center gap-1.5 font-bold text-sm text-gray-900">
            <BsCoin className="text-amber-500" size={16} />
            <span>{plan.credits.toLocaleString()}</span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="space-y-3 mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
            Included features:
          </p>
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600">
              <div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                <FaCheck size={9} />
              </div>
              <span className="leading-tight">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => onSelectPlan(plan)}
        className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
          isPopular
            ? "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-green-600/20"
            : plan.price === "₹0"
            ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
            : "bg-gray-900 hover:bg-black text-white shadow-sm"
        }`}
      >
        <span>{plan.buttonText || `Get ${plan.name}`}</span>
        <FaArrowRight size={11} />
      </motion.button>
    </motion.div>
  );
};

export default PricingCard;
