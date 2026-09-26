import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const EXPERIENCE_OPTIONS = [
  "Fresher",
  "0 - 1 Years",
  "1 - 3 Years",
  "3 - 5 Years",
  "5+ Years",
];

/**
 * ExperienceSelector - Dropdown for picking candidate experience level
 */
const ExperienceSelector = ({ value, onChange }) => {
  return (
    <div className="mb-5">
      <label className="text-sm font-semibold text-gray-700">
        Experience Level
      </label>

      <div className="relative mt-2">
        <FaGraduationCap className="absolute left-4 top-4 text-gray-400" />

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-green-500"
        >
          <option value="">Select experience</option>
          {EXPERIENCE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExperienceSelector;
