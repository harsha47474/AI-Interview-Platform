import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaRobot,
  FaTrophy,
  FaArrowRight,
  FaRedo,
  FaPrint,
  FaHistory,
  FaShareAlt,
  FaChevronDown,
  FaChevronUp,
  FaLightbulb,
  FaChartLine,
  FaQuoteLeft,
  FaBriefcase,
  FaClock,
  FaCheck,
  FaExclamationCircle,
  FaAward,
  FaStar,
} from "react-icons/fa";
import { BsCheck2Circle, BsLightningChargeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Step3Report = ({ report, onRetake }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [copied, setCopied] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  // Extract data safely regardless of envelope nesting
  const data = report?.data || report || {};
  const questionWiseScore = data?.questionWiseScore || [];

  const finalScore = Number(data?.finalScore ?? 0);
  const confidence = Number(data?.confidence ?? 0);
  const communication = Number(data?.communication ?? 0);
  const correctness = Number(data?.correctness ?? 0);

  const role = data?.role || "Software Engineer / Professional";
  const experience = data?.experience || "General Candidate";
  const mode = data?.mode || "Technical & Behavioral";
  const createdAt = data?.createdAt
    ? new Date(data.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  // Score tier calculation
  const getScoreTier = (score) => {
    if (score >= 8.5) {
      return {
        label: "Outstanding Performance",
        subtext: "Ready for senior-level industry placement",
        color: "text-emerald-600",
        badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        ringColor: "#10b981",
        gradient: "from-emerald-500 to-teal-600",
        ratingText: "Exceptional",
      };
    }
    if (score >= 7.0) {
      return {
        label: "Strong Performance",
        subtext: "Well prepared with minor polish needed",
        color: "text-green-600",
        badgeBg: "bg-green-50 text-green-700 border-green-200",
        ringColor: "#16a34a",
        gradient: "from-green-500 to-emerald-600",
        ratingText: "Competent",
      };
    }
    if (score >= 5.0) {
      return {
        label: "Moderate Performance",
        subtext: "Solid foundation, targeted practice recommended",
        color: "text-amber-600",
        badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
        ringColor: "#f59e0b",
        gradient: "from-amber-500 to-orange-500",
        ratingText: "Developing",
      };
    }
    return {
      label: "Needs Improvement",
      subtext: "Focus on fundamentals, confidence, and structure",
      color: "text-rose-600",
      badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
      ringColor: "#f43f5e",
      gradient: "from-rose-500 to-red-600",
      ratingText: "Beginner",
    };
  };

  const tier = getScoreTier(finalScore);

  // Dynamic feedback generator
  const getGeneratedInsights = () => {
    const strengths = [];
    const improvements = [];
    const recommendations = [];

    if (confidence >= 7) {
      strengths.push({
        title: "Poised & Confident Delivery",
        desc: "You maintained composure and articulated thoughts decisively without hesitating.",
      });
    } else {
      improvements.push({
        title: "Speaking Confidence & Cadence",
        desc: "Take a breath before answering. Reduce hesitations and project certainty in your statements.",
      });
    }

    if (communication >= 7) {
      strengths.push({
        title: "Clear & Structured Expression",
        desc: "Answers were structured logically, making complex concepts easy to follow.",
      });
    } else {
      improvements.push({
        title: "Answer Conciseness & Structure",
        desc: "Adopt the STAR (Situation, Task, Action, Result) method to keep responses focused.",
      });
    }

    if (correctness >= 7) {
      strengths.push({
        title: "Technical Accuracy & Relevance",
        desc: "Your answers directly addressed the core concepts with relevant domain depth.",
      });
    } else {
      improvements.push({
        title: "Technical Depth & Precision",
        desc: "Include concrete examples, trade-offs, and metrics to reinforce technical claims.",
      });
    }

    if (strengths.length === 0) {
      strengths.push({
        title: "Active Engagement & Attempt",
        desc: "Good effort in attempting questions under strict time constraints.",
      });
    }

    // Recommendations
    recommendations.push(
      "Review your recorded answers below and refine 1-2 minute elevator pitches for core competencies.",
      "Practice speaking out loud with timed drills to hone your pace under 60-90 second limits.",
      "Incorporate industry-standard terminology and real-world project anecdotes into technical answers."
    );

    return { strengths, improvements, recommendations };
  };

  const { strengths, improvements, recommendations } = getGeneratedInsights();

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Share / Copy Handler
  const handleShare = () => {
    const summary = `🎓 Colloquium AI Interview Report for ${role}\n` +
      `Overall Score: ${finalScore}/10 (${tier.ratingText})\n` +
      `Confidence: ${confidence}/10 | Communication: ${communication}/10 | Correctness: ${correctness}/10\n` +
      `Practice your interview skills with Colloquium AI!`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Filtered Questions
  const filteredQuestions = questionWiseScore.filter((q) => {
    if (filterDifficulty === "all") return true;
    if (filterDifficulty === "high") return (q.score || 0) >= 7;
    if (filterDifficulty === "low") return (q.score || 0) < 7;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-gray-800 py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
      {/* Top Header / Nav Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm print:hidden"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl shadow-xs">
            <FaRobot />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900">
                Colloquium AI Evaluation Report
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                <FaCheckCircle size={10} /> Completed
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Candidate:{" "}
              <span className="font-semibold text-gray-700">
                {userData?.name || "Candidate"}
              </span>{" "}
              • Generated on {createdAt}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition shadow-xs"
            title="Copy Report Summary"
          >
            {copied ? <FaCheck className="text-green-600" /> : <FaShareAlt />}
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition shadow-xs"
            title="Print or Save PDF"
          >
            <FaPrint />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>

          <button
            onClick={() => navigate("/interview/history")}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition shadow-xs"
          >
            <FaHistory />
            <span className="hidden sm:inline">History</span>
          </button>

          {onRetake ? (
            <button
              onClick={onRetake}
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
            >
              <FaRedo size={12} />
              <span>Practice Again</span>
            </button>
          ) : (
            <button
              onClick={() => navigate("/interview")}
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
            >
              <FaRedo size={12} />
              <span>Practice Again</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Main Report Container */}
      <main className="max-w-6xl mx-auto space-y-8">
        {/* HERO SECTION: Overall Score & Session Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden"
        >
          {/* Subtle Ambient Decorative Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-green-50/70 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-50/60 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Overall Radial Score Gauge */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
              <div className="relative w-44 h-44 flex items-center justify-center mb-3">
                {/* SVG Progress Ring */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={tier.ringColor}
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={
                      2 * Math.PI * 50 * (1 - Math.min(finalScore, 10) / 10)
                    }
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Score Number Display */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                    {finalScore.toFixed(1)}
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-gray-500">
                    out of 10
                  </span>
                </div>
              </div>

              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${tier.badgeBg} mb-1`}
              >
                <FaTrophy size={11} /> {tier.ratingText}
              </div>
              <p className="text-xs text-gray-500 max-w-[200px]">
                {Math.round((finalScore / 10) * 100)}% Overall Competency Match
              </p>
            </div>

            {/* Right: Detailed Summary & Profile Badges */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1.5">
                    <FaBriefcase size={11} className="text-green-600" />
                    {role}
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1.5">
                    <FaClock size={11} className="text-green-600" />
                    {experience}
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                    {mode} Interview
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {tier.label}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  {tier.subtext}. Your responses have been evaluated across key
                  interview metrics including communication clarity, technical
                  correctness, and real-time confidence under timed pressure.
                </p>
              </div>

              {/* Quick Session Stats Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs text-gray-500 block">Questions Answered</span>
                  <span className="text-lg font-bold text-gray-800">
                    {questionWiseScore.length} Questions
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs text-gray-500 block">Session Status</span>
                  <span className="text-lg font-bold text-green-600 flex items-center gap-1.5">
                    <BsCheck2Circle /> Verified
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl col-span-2 sm:col-span-1">
                  <span className="text-xs text-gray-500 block">AI Evaluation</span>
                  <span className="text-lg font-bold text-gray-800">Complete</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CORE COMPETENCY METRICS (Confidence, Communication, Correctness) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaChartLine className="text-green-600" />
              Core Competencies Breakdown
            </h3>
            <span className="text-xs text-gray-500">Scale: 0 to 10 Points</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric 1: Confidence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg font-bold">
                  <BsLightningChargeFill />
                </div>
                <span className="text-2xl font-extrabold text-gray-900">
                  {confidence.toFixed(1)}
                  <span className="text-sm font-normal text-gray-400">/10</span>
                </span>
              </div>

              <h4 className="font-bold text-gray-800 text-base mb-1">
                Confidence & Poise
              </h4>
              <p className="text-xs text-gray-500 mb-4">
                Evaluates vocal firmness, composure, hesitation rate, and delivery authority.
              </p>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(confidence * 10, 100)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2 font-medium">
                <span>Hesitant</span>
                <span>Balanced</span>
                <span className="text-blue-600 font-semibold">Authoritative</span>
              </div>
            </motion.div>

            {/* Metric 2: Communication */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg font-bold">
                  <FaQuoteLeft size={14} />
                </div>
                <span className="text-2xl font-extrabold text-gray-900">
                  {communication.toFixed(1)}
                  <span className="text-sm font-normal text-gray-400">/10</span>
                </span>
              </div>

              <h4 className="font-bold text-gray-800 text-base mb-1">
                Communication & Clarity
              </h4>
              <p className="text-xs text-gray-500 mb-4">
                Evaluates articulation, logical structuring, concise speech, and conversational flow.
              </p>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-purple-600 h-2.5 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(communication * 10, 100)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2 font-medium">
                <span>Vague</span>
                <span>Articulate</span>
                <span className="text-purple-600 font-semibold">Impactful</span>
              </div>
            </motion.div>

            {/* Metric 3: Correctness */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-lg font-bold">
                  <FaCheckCircle />
                </div>
                <span className="text-2xl font-extrabold text-gray-900">
                  {correctness.toFixed(1)}
                  <span className="text-sm font-normal text-gray-400">/10</span>
                </span>
              </div>

              <h4 className="font-bold text-gray-800 text-base mb-1">
                Technical Correctness
              </h4>
              <p className="text-xs text-gray-500 mb-4">
                Assesses domain knowledge depth, question understanding, and factual accuracy.
              </p>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(correctness * 10, 100)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2 font-medium">
                <span>Basic</span>
                <span>Accurate</span>
                <span className="text-green-600 font-semibold">Exemplary</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI INSIGHTS: STRENGTHS, IMPROVEMENTS & ACTION RECOMMENDATIONS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
                  <FaAward />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">
                  Key Strengths Identified
                </h3>
              </div>

              <div className="space-y-3">
                {strengths.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3"
                  >
                    <div className="mt-1 text-emerald-600 shrink-0">
                      <FaCheckCircle size={14} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center gap-1.5">
              <FaStar className="text-amber-400" /> Keep leveraging these strong qualities during your real interviews.
            </div>
          </motion.div>

          {/* Growth & Improvement Areas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
                  <FaLightbulb />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">
                  Targeted Growth Areas
                </h3>
              </div>

              <div className="space-y-3">
                {improvements.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100 flex items-start gap-3"
                  >
                    <div className="mt-1 text-amber-600 shrink-0">
                      <FaExclamationCircle size={14} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center gap-1.5">
              <FaLightbulb className="text-amber-500" /> Small refinements here can elevate your interview conversion rate.
            </div>
          </motion.div>
        </section>

        {/* ACTION RECOMMENDATIONS CHECKLIST */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-base font-bold">
              <FaCheckCircle />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Recommended Action Plan Before Your Next Interview
              </h3>
              <p className="text-xs text-gray-500">
                Actionable tips curated by AI based on your performance patterns
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className="bg-gray-50 p-4 rounded-xl border border-gray-200/80 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {rec}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* QUESTION-BY-QUESTION IN-DEPTH BREAKDOWN */}
        <section className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* Section Header & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Question-Wise Performance Breakdown
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Detailed evaluation, scores, candidate responses, and evaluator feedback
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl text-xs font-medium self-start sm:self-auto">
              <button
                onClick={() => setFilterDifficulty("all")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterDifficulty === "all"
                    ? "bg-white text-gray-900 font-semibold shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                All ({questionWiseScore.length})
              </button>
              <button
                onClick={() => setFilterDifficulty("high")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterDifficulty === "high"
                    ? "bg-white text-gray-900 font-semibold shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Score ≥ 7
              </button>
              <button
                onClick={() => setFilterDifficulty("low")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  filterDifficulty === "low"
                    ? "bg-white text-gray-900 font-semibold shadow-xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Needs Polish (&lt;7)
              </button>
            </div>
          </div>

          {/* Question List */}
          <div className="divide-y divide-gray-100 mt-4">
            {filteredQuestions.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <p className="text-sm">No questions match the selected filter.</p>
              </div>
            ) : (
              filteredQuestions.map((q, idx) => {
                const isExpanded =
                  expandedQuestion === idx ||
                  (expandedQuestion === null && idx === 0);
                const qScore = Number(q.score ?? 0);
                const qConfidence = Number(q.confidence ?? 0);
                const qComm = Number(q.communication ?? 0);
                const qCorr = Number(q.correctness ?? 0);

                const getDiffBadge = (diff) => {
                  const d = (diff || "medium").toLowerCase();
                  if (d === "easy") {
                    return "bg-blue-50 text-blue-700 border-blue-200";
                  }
                  if (d === "hard") {
                    return "bg-red-50 text-red-700 border-red-200";
                  }
                  return "bg-amber-50 text-amber-700 border-amber-200";
                };

                return (
                  <div key={idx} className="py-5 transition">
                    {/* Header Row */}
                    <div
                      onClick={() =>
                        setExpandedQuestion(isExpanded ? -1 : idx)
                      }
                      className="cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-2xl hover:bg-gray-50/80 transition"
                    >
                      <div className="flex items-start gap-3.5 flex-1">
                        <div className="w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          Q{idx + 1}
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getDiffBadge(
                                q.difficulty
                              )}`}
                            >
                              {(q.difficulty || "Standard").toUpperCase()}
                            </span>
                          </div>
                          <p className="font-semibold text-gray-800 text-sm sm:text-base leading-snug">
                            {q.question}
                          </p>
                        </div>
                      </div>

                      {/* Right: Score Badges & Expand Icon */}
                      <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 ml-11 md:ml-0">
                        <div className="flex items-center gap-2">
                          <div
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm border ${
                              qScore >= 8
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : qScore >= 6
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            Score: {qScore.toFixed(1)} / 10
                          </div>
                        </div>

                        <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-200/50 transition">
                          {isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Details Container */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-3 ml-0 sm:ml-12 pl-2 sm:pl-4 border-l-2 border-gray-200 space-y-4 pt-1 pb-2 overflow-hidden"
                        >
                          {/* Mini metrics bar */}
                          <div className="grid grid-cols-3 gap-2 max-w-md">
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-center">
                              <span className="text-[11px] text-gray-500 block">Confidence</span>
                              <span className="font-bold text-gray-800 text-sm">
                                {qConfidence.toFixed(1)}/10
                              </span>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-center">
                              <span className="text-[11px] text-gray-500 block">Communication</span>
                              <span className="font-bold text-gray-800 text-sm">
                                {qComm.toFixed(1)}/10
                              </span>
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-center">
                              <span className="text-[11px] text-gray-500 block">Correctness</span>
                              <span className="font-bold text-gray-800 text-sm">
                                {qCorr.toFixed(1)}/10
                              </span>
                            </div>
                          </div>

                          {/* Candidate Answer Transcript */}
                          {q.answer && (
                            <div className="bg-gray-50/80 rounded-xl p-3.5 border border-gray-200">
                              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                                Candidate's Verbal Response
                              </span>
                              <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                                "{q.answer}"
                              </p>
                            </div>
                          )}

                          {/* Evaluator AI Feedback */}
                          <div className="bg-green-50/70 border border-green-200 rounded-xl p-3.5 flex items-start gap-2.5">
                            <div className="text-green-600 mt-0.5 shrink-0">
                              <FaRobot size={15} />
                            </div>
                            <div>
                              <span className="text-[11px] font-bold text-green-900 uppercase tracking-wider block mb-0.5">
                                AI Evaluator Feedback
                              </span>
                              <p className="text-xs sm:text-sm text-green-900 font-medium leading-relaxed">
                                {q.feedback || "Good overall response addressing the core question."}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* BOTTOM ACTION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl print:hidden"
        >
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Ready to sharpen your interview readiness further?
            </h3>
            <p className="text-gray-400 text-sm max-w-xl">
              Consistency is key to acing real-life job interviews. Practice another session with new questions or explore your past performance history.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/interview/history")}
              className="px-5 py-3 rounded-xl bg-gray-800 text-gray-200 hover:bg-gray-700 font-semibold text-sm transition"
            >
              View Interview History
            </button>

            {onRetake ? (
              <button
                onClick={onRetake}
                className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-sm shadow-md transition flex items-center gap-2"
              >
                <span>Start New Interview</span>
                <FaArrowRight size={12} />
              </button>
            ) : (
              <button
                onClick={() => navigate("/interview")}
                className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-sm shadow-md transition flex items-center gap-2"
              >
                <span>Start New Interview</span>
                <FaArrowRight size={12} />
              </button>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Step3Report;