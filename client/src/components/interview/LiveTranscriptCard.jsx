import React from "react";
import { motion } from "framer-motion";
import { FaMicrophone, FaWaveSquare } from "react-icons/fa";

/**
 * LiveTranscriptCard - Live speech-to-text transcript card with sound waves indicator
 */
const LiveTranscriptCard = ({ transcript, phase }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col h-full min-h-[340px]">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition ${
              phase === "listening"
                ? "bg-green-100 text-green-600 shadow-xs"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            <FaMicrophone />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-800">
              Live Response Stream
            </h3>
            <p className="text-xs text-gray-400">
              Speech-to-text transcript
            </p>
          </div>
        </div>

        {phase === "listening" && (
          <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full border border-green-200 text-xs font-semibold text-green-700">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Recording</span>
          </div>
        )}
      </div>

      {/* Transcript Canvas */}
      <div className="flex-1 bg-gray-50/80 rounded-xl p-4 border border-gray-100 overflow-y-auto flex flex-col justify-between">
        {transcript ? (
          <p className="text-sm text-gray-800 leading-relaxed font-normal whitespace-pre-wrap">
            {transcript}
            {phase === "listening" && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-green-600 animate-pulse align-middle" />
            )}
          </p>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400">
            <FaWaveSquare className="text-3xl mb-2 text-gray-300" />
            <p className="text-xs font-medium">
              {phase === "listening"
                ? "Start speaking your answer clearly. Your words will appear here in real time."
                : "Waiting for the question to finish..."}
            </p>
          </div>
        )}

        {/* Sound Wave Animation when recording */}
        {phase === "listening" && (
          <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs text-gray-400">
            <span>Audio Activity</span>
            <div className="flex items-center gap-1">
              {[12, 18, 8, 22, 14, 20, 10, 16].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [6, h, 6] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay: i * 0.08,
                  }}
                  className="w-1 bg-green-500 rounded-full"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveTranscriptCard;
