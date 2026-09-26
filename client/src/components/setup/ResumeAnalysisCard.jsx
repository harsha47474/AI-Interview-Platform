import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

/**
 * ResumeAnalysisCard - Displays parsed resume results (role, experience, skills, projects)
 */
const ResumeAnalysisCard = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 space-y-4"
    >
      <div className="flex items-center gap-2">
        <FaCheckCircle className="text-green-600" />
        <h3 className="font-bold text-gray-800">AI Resume Analysis</h3>
      </div>

      {/* Role & Experience */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-xs text-gray-500">Detected Role</p>
          <p className="font-semibold text-gray-800 mt-1">
            {analysis.role}
          </p>
        </div>

        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-xs text-gray-500">Experience</p>
          <p className="font-semibold text-gray-800 mt-1">
            {analysis.experience}
          </p>
        </div>
      </div>

      {/* Skills */}
      {analysis.skills && analysis.skills.length > 0 && (
        <div className="bg-white border rounded-xl p-4">
          <h4 className="font-semibold text-gray-700 mb-3">
            Detected Skills
          </h4>

          <div className="flex flex-wrap gap-2">
            {analysis.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {analysis.projects && analysis.projects.length > 0 && (
        <div className="bg-white border rounded-xl p-4">
          <h4 className="font-semibold text-gray-700 mb-3">
            Projects Detected
          </h4>

          <div className="space-y-2">
            {analysis.projects.map((project) => (
              <div
                key={project}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <FaCheckCircle className="text-green-500 text-xs shrink-0" />
                <span>{project}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ResumeAnalysisCard;
