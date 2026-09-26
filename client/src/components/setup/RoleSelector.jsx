import React from "react";
import { FaBriefcase } from "react-icons/fa";

const ROLE_OPTIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "AI/ML Engineer",
  "Software Engineer",
];

/**
 * RoleSelector - Dropdown for picking target interview position
 */
const RoleSelector = ({ value, onChange }) => {
  return (
    <div className="mb-5">
      <label className="text-sm font-semibold text-gray-700">
        Interview Role
      </label>

      <div className="relative mt-2">
        <FaBriefcase className="absolute left-4 top-4 text-gray-400" />

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none border border-gray-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-green-500"
        >
          <option value="">Select your role</option>
          {ROLE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RoleSelector;
