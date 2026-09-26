import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaMicrophone, FaClock } from "react-icons/fa";

const STEPS_DATA = [
  {
    step: "Step 1",
    title: "Role & Experience Selection",
    desc: "Choose your interview role and experience level to get a personalized interview.",
    icon: <FaRobot />,
  },
  {
    step: "Step 2",
    title: "Smart Voice Interview",
    desc: "Interact naturally with an AI interviewer through a realistic voice-based interview.",
    icon: <FaMicrophone />,
  },
  {
    step: "Step 3",
    title: "Timer Based Simulation",
    desc: "Experience a real interview environment with time limits that keep you focused.",
    icon: <FaClock />,
  },
];

/**
 * HomeSteps - 3-step walkthrough showing the interview platform flow
 */
const HomeSteps = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6"
    >
      {STEPS_DATA.map((item, index) => (
        <motion.div
          key={item.step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.15 }}
          whileHover={{ y: -8 }}
          className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-semibold text-green-600">
              {item.step}
            </span>

            <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-lg group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
              {item.icon}
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {item.title}
          </h3>

          <p className="text-sm text-gray-500 leading-6">{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HomeSteps;
