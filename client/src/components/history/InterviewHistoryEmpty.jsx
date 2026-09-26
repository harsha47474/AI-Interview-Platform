import React from "react";
import { FaHistory, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * InterviewHistoryEmpty - Empty state view shown when candidate has not completed any interviews yet
 */
const InterviewHistoryEmpty = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-md mx-auto shadow-sm">
      <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 mx-auto flex items-center justify-center text-2xl mb-4">
        <FaHistory />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        No Interview History Yet
      </h3>
      <p className="text-gray-500 text-sm mb-6">
        You haven't completed any interviews yet. Take your first AI interview to see your detailed performance report here.
      </p>
      <button
        type="button"
        onClick={() => navigate("/interview")}
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium text-sm transition"
      >
        <FaPlay size={11} />
        <span>Start Your First Interview</span>
      </button>
    </div>
  );
};

export default InterviewHistoryEmpty;
