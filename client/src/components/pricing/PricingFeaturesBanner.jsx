import React from "react";
import { motion } from "framer-motion";
import { FaRegClock, FaBolt, FaShieldAlt, FaRobot } from "react-icons/fa";

const PERKS = [
  {
    icon: <FaRegClock />,
    title: "Credits Never Expire",
    desc: "Use your interview credits at your own pace. There are no recurring monthly lock-ins or expiration dates.",
  },
  {
    icon: <FaBolt />,
    title: "Instant Account Activation",
    desc: "Credits update in your account immediately upon checkout so you can start practicing right away.",
  },
  {
    icon: <FaRobot />,
    title: "Full Evaluation Suite",
    desc: "Every credit-backed session includes AI speech synthesis, live transcription, and full scorecard breakdowns.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Private & Confidential",
    desc: "Your interview answers, speech records, and uploaded resumes remain private and secure.",
  },
];

/**
 * PricingFeaturesBanner - Highlight cards emphasizing transparency, non-expiring credits, and platform security
 */
const PricingFeaturesBanner = () => {
  return (
    <div className="mt-16 sm:mt-24 pt-12 border-t border-gray-200/80">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h3 className="text-2xl font-bold text-gray-900">
          Everything You Need to Ace Your Next Role
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Clear, straightforward terms so you can focus 100% on your preparation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PERKS.map((perk, index) => (
          <motion.div
            key={perk.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-start"
          >
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-lg mb-4">
              {perk.icon}
            </div>
            <h4 className="font-bold text-gray-800 text-sm mb-1.5">
              {perk.title}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              {perk.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingFeaturesBanner;
