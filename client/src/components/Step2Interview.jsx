import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaClock,
  FaMicrophone,
  FaMicrophoneSlash,
  FaCheckCircle,
  FaPlay,
  FaStop,
  FaRedo,
  FaVolumeUp,
  FaPaperPlane,
  FaSpinner,
  FaWaveSquare,
  FaLightbulb,
  FaExclamationTriangle,
  FaArrowRight,
  FaUser,
  FaCheck,
  FaRegDotCircle,
} from "react-icons/fa";
import axios from "axios";
import femaleAiVideo from "../assets/Videos/female-ai.mp4";
import maleAiVideo from "../assets/Videos/male-ai.mp4";
import confiImg from "../assets/confi.png";
import aiAnsImg from "../assets/ai-ans.png";
import techImg from "../assets/tech.png";
import hrImg from "../assets/HR.png";

const SR =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

function Step2Interview({ interviewData, onCompleteInterview }) {
  const { interviewId, candidateName, questions = [] } = interviewData || {};

  const displayName = candidateName || interviewData?.userName || "Candidate";

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [transcript, setTranscript] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("female");

  const answerRef = useRef("");
  const startedAtRef = useRef(0);
  const busyRef = useRef(false);
  const lastPayloadRef = useRef(null);
  const videoRef = useRef(null);

  const question = questions[index] || {
    question: "Preparing question...",
    timeLimit: 30,
    difficulty: "Medium",
  };

  // Synchronize video playback with the asking phase
  useEffect(() => {
    if (!videoRef.current) return;
    if (phase === "asking") {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [phase, selectedAvatar]);

  // Sends the answer to backend and gets the feedback
  const sendAnswer = useCallback(async (payload) => {
    setPhase("submitting");
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/interview/submit",
        payload,
        { withCredentials: true }
      );

      setFeedback(res.data.feedback);
      setPhase("feedback");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "An error occurred while submitting the answer."
      );

      setPhase("submitFailed");
    }
  }, []);

  // Finish answer function
  const finishAnswer = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;

    const limit = questions[index]?.timeLimit || 30;
    const elapsed = Math.round((Date.now() - startedAtRef.current) / 1000);
    const payload = {
      interviewId,
      questionIndex: index,
      answer: answerRef.current.trim(),
      timeTaken: Math.min(elapsed, limit),
    };

    lastPayloadRef.current = payload;
    sendAnswer(payload);
  }, [index, questions, interviewId, sendAnswer]);

  // Asking the questions (phase 1)
  useEffect(() => {
    if (phase !== "asking") return;
    let cancelled = false;
    const next = () => {
      if (!cancelled) setPhase("listening");
    };

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(question.question);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.onend = next;
    utterance.onerror = next; // so that the interview never gets stuck if speech fails
    speechSynthesis.speak(utterance);

    return () => {
      cancelled = true;
      speechSynthesis.cancel();
    };
  }, [index, phase, question.question]);

  // Listening Phase: mic on and countdown begins
  useEffect(() => {
    if (phase !== "listening") return;

    const limit = question.timeLimit || 30;
    const startedAt = Date.now();
    startedAtRef.current = startedAt;
    answerRef.current = "";
    busyRef.current = false;
    setTranscript("");
    setTimeLeft(limit);

    if (!SR) return;

    const rec = new SR();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;

    let saved = "";
    let silenceTimer;
    let active = true;

    rec.onresult = (e) => {
      let session = "";
      for (const r of e.results) session += r[0].transcript;
      const text = (saved + " " + session).trim();
      answerRef.current = text;
      setTranscript(text);
      clearTimeout(silenceTimer);
      silenceTimer = setTimeout(finishAnswer, 5000);
    };

    rec.onerror = (e) => {
      const fatal = [
        "not-allowed",
        "service-not-allowed",
        "audio-capture",
        "network",
        "bad-grammar",
        "language-not-supported",
      ];
      if (fatal.includes(e.error)) {
        active = false;
        setError("Microphone permission or speech recognition error.");
        setPhase("idle");
      }
    };

    rec.onend = () => {
      if (active) {
        saved = answerRef.current;
        try {
          rec.start();
        } catch {}
      }
    };

    try {
      rec.start();
    } catch {}

    const tick = setInterval(() => {
      const left = limit - Math.floor((Date.now() - startedAt) / 1000);
      setTimeLeft(Math.max(left, 0));
      if (left <= 0) finishAnswer();
    }, 250);

    return () => {
      active = false;
      clearInterval(tick);
      clearTimeout(silenceTimer);
      rec.onend = null;
      try {
        rec.abort();
      } catch {}
    };
  }, [phase, index, finishAnswer, question.timeLimit]);

  // Feedback phase
  useEffect(() => {
    if (phase !== "feedback") return;
    const t = setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex((i) => i + 1);
        setPhase("asking");
      } else {
        setPhase("done");
        onCompleteInterview?.();
      }
    }, 3000);
    return () => clearTimeout(t);
  }, [phase, index, questions.length, onCompleteInterview]);

  // Replay question audio if user wants to hear it again
  const handleReplayQuestion = () => {
    if (phase === "asking" || phase === "submitting" || phase === "feedback") return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(question.question);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  if (!SR) {
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
  }

  // Timer styling calculation
  const totalLimit = question?.timeLimit || 30;
  const timeRatio = totalLimit > 0 ? timeLeft / totalLimit : 0;
  const isUrgent = timeLeft <= 5 && phase === "listening";
  const isWarning = timeLeft <= 12 && !isUrgent && phase === "listening";

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-gray-800 flex flex-col justify-between py-6 px-4 md:px-8">
      {/* TOP STATUS BAR */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-4 mb-6 flex flex-wrap items-center justify-between gap-4"
      >
        {/* Brand & Mode */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl shadow-xs">
            <FaRobot />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-gray-800 text-base">
                Colloquium AI Studio
              </h1>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                Live Session
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Candidate: <span className="font-semibold text-gray-700">{displayName}</span>
            </p>
          </div>
        </div>

        {/* Question Progress Dots */}
        <div className="flex items-center gap-2">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`flex items-center justify-center rounded-lg text-xs font-bold transition-all duration-300 ${
                i === index
                  ? "w-8 h-8 bg-green-600 text-white shadow-xs scale-105 ring-2 ring-green-300 ring-offset-1"
                  : i < index
                  ? "w-7 h-7 bg-green-100 text-green-700"
                  : "w-7 h-7 bg-gray-100 text-gray-400"
              }`}
            >
              {i < index ? <FaCheck size={10} /> : i + 1}
            </div>
          ))}
        </div>

        {/* Timer / Status Pill */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-300 ${
              isUrgent
                ? "bg-red-50 text-red-600 border-red-300 animate-pulse"
                : isWarning
                ? "bg-amber-50 text-amber-600 border-amber-300"
                : "bg-gray-50 text-gray-700 border-gray-200"
            }`}
          >
            <FaClock
              className={
                isUrgent ? "text-red-500 animate-spin" : "text-gray-400"
              }
            />
            <span>
              {phase === "listening"
                ? `${timeLeft}s remaining`
                : phase === "asking"
                ? "AI speaking..."
                : phase === "submitting"
                ? "Evaluating..."
                : phase === "feedback"
                ? "Feedback ready"
                : "Ready"}
            </span>
          </div>
        </div>
      </motion.header>

      {/* MAIN INTERVIEW ARENA */}
      <main className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
        {/* LEFT COLUMN: INTERVIEWER CONSOLE (7 cols) */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          {/* AI INTERVIEWER VIDEO CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col"
          >
            {/* Viewport Box */}
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
                  onClick={() => setSelectedAvatar("female")}
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
                  onClick={() => setSelectedAvatar("male")}
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
                    Question {index + 1} of {questions.length}
                  </span>
                  {question.difficulty && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 border border-gray-200">
                      {question.difficulty}
                    </span>
                  )}
                </div>

                {phase !== "idle" && (
                  <button
                    onClick={handleReplayQuestion}
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
                  : question.question}
              </h2>
            </div>
          </motion.div>

          {/* INTERVIEW CONTROL & PHASE ACTIONS */}
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
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setError("");
                      setPhase("asking");
                    }}
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
                    onClick={() => setPhase("listening")}
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
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={finishAnswer}
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
                    onClick={() => sendAnswer(lastPayloadRef.current)}
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
        </section>

        {/* RIGHT COLUMN: CANDIDATE LIVE TRANSCRIBER & STUDIO ADVISOR (5 cols) */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          {/* LIVE TRANSCRIPTION MONITOR */}
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

          {/* INTERVIEW PRO TIPS CARD */}
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
        </section>
      </main>
    </div>
  );
}

export default Step2Interview;