import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaVolumeUp,
  FaPaperPlane,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRedo,
} from "react-icons/fa";
import techImg from "../../assets/tech.png";

/**
 * InterviewControls - Handles the dynamic actions and state displays throughout each phase of the interview
 */
const InterviewControls = ({
  phase,
  error,
  index,
  feedback,
  timeLeft,
  timeRatio,
  isUrgent,
  isWarning,
  onStart,
  onSkipToAnswer,
  onSubmitAnswer,
  onRetrySubmit,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <AnimatePresence mode="wait">
        {/* IDLE STATE */}
        {phase === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-sm text-red-700">
                <FaExclamationTriangle className="shrink-0 mt-0.5 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-start gap-4 p-4 rounded-xl bg-green-50/70 border border-green-200">
              <img
                src={techImg}
                alt="Tech"
                className="w-12 h-12 object-cover rounded-lg hidden sm:block shrink-0"
              />
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-gray-800 mb-1">
                  Instructions before you start:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-xs">
                  <li>The interviewer will articulate each question verbally.</li>
                  <li>Speak naturally when the microphone turns green.</li>
                  <li>Answers automatically submit upon 5s of silence or timer completion.</li>
                </ul>
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStart}
              className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center gap-3 shadow-md transition"
            >
              <FaPlay className="text-sm" />
              <span>
                {index === 0 && !error ? "Start Interview" : "Resume Interview"}
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* ASKING STATE */}
        {phase === "asking" && (
          <motion.div
            key="asking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200"
          >
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <FaVolumeUp />
              </div>
              <span>Interviewer is currently asking the question...</span>
            </div>
            <button
              type="button"
              onClick={onSkipToAnswer}
              className="text-xs font-semibold text-green-600 hover:text-green-700 underline px-2 py-1"
            >
              Skip & Answer Now
            </button>
          </motion.div>
        )}

        {/* LISTENING STATE */}
        {phase === "listening" && (
          <motion.div
            key="listening"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-green-700 font-medium">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-ping inline-block" />
                <span>Microphone Listening</span>
              </div>
              <span className="text-xs text-gray-500 font-mono">
                {timeLeft}s remaining
              </span>
            </div>

            {/* Visual Progress Bar for Timer */}
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <motion.div
                className={`h-full transition-all duration-300 ${
                  isUrgent
                    ? "bg-red-500"
                    : isWarning
                    ? "bg-amber-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${Math.max(0, timeRatio * 100)}%` }}
              />
            </div>

            <div className="flex gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSubmitAnswer}
                className="flex-1 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition"
              >
                <FaPaperPlane className="text-sm" />
                <span>Submit Answer</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* SUBMITTING STATE */}
        {phase === "submitting" && (
          <motion.div
            key="submitting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-6 flex flex-col items-center justify-center gap-3 text-center"
          >
            <FaSpinner className="text-green-600 text-3xl animate-spin" />
            <div>
              <h3 className="font-semibold text-gray-800">
                Evaluating Your Answer
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Our AI model is analyzing communication, correctness, and confidence...
              </p>
            </div>
          </motion.div>
        )}

        {/* FEEDBACK STATE */}
        {phase === "feedback" && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="p-5 rounded-xl bg-green-50 border border-green-200 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600 text-lg" />
                <span className="font-bold text-gray-800 text-sm">
                  AI Examiner Feedback
                </span>
              </div>
              <span className="text-xs text-green-700 font-medium bg-green-100 px-2 py-0.5 rounded-full">
                Next question starting...
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-medium bg-white p-4 rounded-xl border border-green-100 shadow-xs">
              "{feedback || "Good response. Proceeding to the next question."}"
            </p>
          </motion.div>
        )}

        {/* SUBMIT FAILED STATE */}
        {phase === "submitFailed" && (
          <motion.div
            key="failed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-5 rounded-xl bg-red-50 border border-red-200 space-y-3"
          >
            <div className="flex items-start gap-3">
              <FaExclamationTriangle className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800 text-sm">
                  Submission Interrupted
                </h4>
                <p className="text-xs text-red-600 mt-1">{error}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onRetrySubmit}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition"
            >
              <FaRedo />
              <span>Retry Submit</span>
            </button>
          </motion.div>
        )}

        {/* DONE STATE */}
        {phase === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-6 text-center space-y-3"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl shadow-xs">
              <FaCheckCircle />
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Interview Finished!
            </h3>
            <p className="text-sm text-gray-500">
              Generating your comprehensive performance assessment and feedback report...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InterviewControls;
