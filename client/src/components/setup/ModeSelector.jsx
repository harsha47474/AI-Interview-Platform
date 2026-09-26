import React from "react";
import { motion } from "framer-motion";

const MODES = ["Technical", "HR"];

/**
 * ModeSelector - Toggle buttons for selecting Technical or HR interview mode
 */
const ModeSelector = ({ mode, onSelectMode }) => {
  return (
    <div className="mb-6">
      <label className="text-sm font-semibold text-gray-700">
        Interview Mode
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        {MODES.map((item) => (
          <motion.button
            key={item}
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectMode(item)}
            className={`p-3 rounded-xl border text-sm text-left transition ${
              mode === item
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-200 text-gray-600 hover:border-green-300"
            }`}
          >
            {item}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;
