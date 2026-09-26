import React from "react";
import { FaMicrophoneSlash } from "react-icons/fa";

/**
 * SpeechRecognitionFallback - Displayed when browser does not support Web Speech Recognition
 */
const SpeechRecognitionFallback = () => {
  return (
    <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
        <div className="w-14 h-14 mx-auto rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-2xl mb-4">
          <FaMicrophoneSlash />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Speech Recognition Required
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Your current browser does not support Web Speech Recognition. Please
          use a modern Chromium-based browser such as Google Chrome or Microsoft
          Edge to complete your interview.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-black transition"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default SpeechRecognitionFallback;
