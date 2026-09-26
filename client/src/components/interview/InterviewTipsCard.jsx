import React from "react";
import { FaLightbulb } from "react-icons/fa";
import confiImg from "../../assets/confi.png";
import aiAnsImg from "../../assets/ai-ans.png";

/**
 * InterviewTipsCard - Displays interview pro-tips and best practices (STAR method, steady cadence)
 */
const InterviewTipsCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-green-600 text-lg">
          <FaLightbulb />
        </span>
        <h3 className="font-bold text-gray-800 text-sm">
          Interview Performance Tips
        </h3>
      </div>

      <div className="space-y-3 text-xs text-gray-600">
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <img
            src={confiImg}
            alt="Confidence"
            className="w-8 h-8 object-cover rounded-lg shrink-0"
          />
          <div>
            <p className="font-semibold text-gray-800">STAR Method</p>
            <p className="text-gray-500 mt-0.5">
              Structure examples with Situation, Task, Action, and Measurable Result.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <img
            src={aiAnsImg}
            alt="Evaluation"
            className="w-8 h-8 object-cover rounded-lg shrink-0"
          />
          <div>
            <p className="font-semibold text-gray-800">Steady Cadence</p>
            <p className="text-gray-500 mt-0.5">
              Speak clearly without rushing; silence under 5s is fine to pause and think.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewTipsCard;
