import React from "react";
import { motion } from "framer-motion";
import { FaVolumeUp } from "react-icons/fa";
import femaleAiVideo from "../../assets/Videos/female-ai.mp4";
import maleAiVideo from "../../assets/Videos/male-ai.mp4";

/**
 * InterviewerVideoCard - Video viewport with AI avatars, voice wave animations, and current question prompt
 */
const InterviewerVideoCard = ({
  videoRef,
  selectedAvatar,
  onSelectAvatar,
  phase,
  questionIndex,
  totalQuestions,
  question,
  onReplayQuestion,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col"
    >
      {/* Video Viewport */}
      <div className="relative w-full aspect-video bg-gray-950 flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={selectedAvatar === "female" ? femaleAiVideo : maleAiVideo}
          className="w-full h-full object-cover"
          loop
          playsInline
          muted
        />

        {/* Ambient Glow Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

        {/* Status Indicator Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-white">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              phase === "asking"
                ? "bg-green-400 animate-ping"
                : phase === "listening"
                ? "bg-emerald-400 animate-pulse"
                : phase === "submitting"
                ? "bg-amber-400 animate-bounce"
                : "bg-gray-400"
            }`}
          />
          <span className="font-medium capitalize">
            {phase === "asking"
              ? "Interviewer Speaking"
              : phase === "listening"
              ? "Listening for Answer"
              : phase === "submitting"
              ? "Analyzing Response"
              : phase === "feedback"
              ? "Feedback Stage"
              : "Interviewer Ready"}
          </span>
        </div>

        {/* Avatar Selector Switcher */}
        <div className="absolute top-4 right-4 flex items-center bg-black/60 backdrop-blur-md rounded-xl p-1 border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => onSelectAvatar("female")}
            className={`px-2.5 py-1 rounded-lg font-medium transition ${
              selectedAvatar === "female"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-white/80 hover:text-white"
            }`}
          >
            Elena
          </button>
          <button
            type="button"
            onClick={() => onSelectAvatar("male")}
            className={`px-2.5 py-1 rounded-lg font-medium transition ${
              selectedAvatar === "male"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-white/80 hover:text-white"
            }`}
          >
            Marcus
          </button>
        </div>

        {/* Speaking Voice Waves Overlay */}
        {phase === "asking" && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white text-xs">
            <div className="flex items-center gap-2">
              <FaVolumeUp className="text-green-400" />
              <span>Speaking question aloud...</span>
            </div>
            <div className="flex items-center gap-1">
              {[16, 24, 12, 28, 18, 22, 14].map((h, idx) => (
                <motion.div
                  key={idx}
                  animate={{ height: [8, h, 6] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.7,
                    delay: idx * 0.1,
                  }}
                  className="w-1 bg-green-400 rounded-full"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QUESTION DISPLAY PANEL */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-lg">
              Question {questionIndex + 1} of {totalQuestions}
            </span>
            {question?.difficulty && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 border border-gray-200">
                {question.difficulty}
              </span>
            )}
          </div>

          {phase !== "idle" && (
            <button
              type="button"
              onClick={onReplayQuestion}
              title="Listen to question again"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-green-600 transition px-2 py-1 rounded-lg hover:bg-gray-50"
            >
              <FaVolumeUp />
              <span>Repeat Voice</span>
            </button>
          )}
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
          {phase === "idle"
            ? "Are you ready to begin your interview?"
            : question?.question}
        </h2>
      </div>
    </motion.div>
  );
};

export default InterviewerVideoCard;
