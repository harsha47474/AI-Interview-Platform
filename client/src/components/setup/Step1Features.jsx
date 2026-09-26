import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaMicrophone, FaCheckCircle } from "react-icons/fa";

const FEATURE_LIST = [
  {
    icon: <FaRobot />,
    title: "AI Powered Interview",
    desc: "Get realistic questions and intelligent feedback.",
  },
  {
    icon: <FaMicrophone />,
    title: "Voice Based Interaction",
    desc: "Answer naturally just like a real interview.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Instant Evaluation",
    desc: "Understand your strengths and areas to improve.",
  },
];

/**
 * Step1Features - Left side presentation banner & AI feature highlights
 */
const Step1Features = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-center"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-green-100 text-green-600 rounded-xl">
          <FaRobot size={22} />
        </div>
        <span className="text-green-600 font-semibold">Colloquium AI</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 leading-tight">
        Start your <span className="text-green-600">AI Interview</span>
      </h1>

      <p className="text-gray-500 mt-4 max-w-lg">
        Practice realistic interviews with an AI interviewer designed to
        help you improve your communication, technical knowledge, and
        interview confidence.
      </p>

      <div className="grid gap-4 mt-8">
        {FEATURE_LIST.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.15 }}
            whileHover={{ x: 5 }}
            className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4 shadow-sm"
          >
            <div className="w-11 h-11 shrink-0 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
              {item.icon}
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Step1Features;
