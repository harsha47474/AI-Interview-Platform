import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaPlay, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * HomeHero - Welcome section with greeting, badge, and primary interview call-to-actions
 */
const HomeHero = ({ userName }) => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="flex gap-2 text-center ml-5">
          <FaRobot size={20} className="text-5xl" />
          <p className="text-sm text-gray-500 mb-2">
            Colloquium: AI Smart Interview Platform
          </p>
        </div>

        <h1 className="text-4xl font-bold text-gray-800">
          Welcome{userName ? `, ${userName}` : ""} 👋
        </h1>

        <p className="text-gray-500 mt-3 mb-8 bg-green-200 px-2 rounded-full">
          Practice interviews with your AI interviewer.
        </p>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white shadow-md cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/interview");
            }}
          >
            <FaPlay />
            Start Interview
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-700 border shadow-sm cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/interview/history");
            }}
          >
            <FaHistory />
            Show History
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
};

export default HomeHero;
