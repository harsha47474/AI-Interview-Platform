import React, { useState } from "react";
import { useSelector } from "react-redux";

// Modular report sub-components
import ReportHeader from "./report/ReportHeader";
import ReportHeroScore from "./report/ReportHeroScore";
import CompetenciesBreakdown from "./report/CompetenciesBreakdown";
import ReportAiInsights from "./report/ReportAiInsights";
import ActionPlanSection from "./report/ActionPlanSection";
import QuestionWiseBreakdown from "./report/QuestionWiseBreakdown";
import ReportCtaCard from "./report/ReportCtaCard";

// Report calculation utilities
import { getScoreTier, getGeneratedInsights } from "../utils/reportUtils";

/**
 * Step3Report - Main evaluation assessment report orchestrator
 */
const Step3Report = ({ report, onRetake }) => {
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

  const tier = getScoreTier(finalScore);
  const { strengths, improvements, recommendations } = getGeneratedInsights(
    confidence,
    communication,
    correctness
  );

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Share / Copy Handler
  const handleShare = () => {
    const summary =
      `🎓 Colloquium AI Interview Report for ${role}\n` +
      `Overall Score: ${finalScore}/10 (${tier.ratingText})\n` +
      `Confidence: ${confidence}/10 | Communication: ${communication}/10 | Correctness: ${correctness}/10\n` +
      `Practice your interview skills with Colloquium AI!`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-gray-800 py-8 px-4 sm:px-6 lg:px-8 print:p-0 print:bg-white">
      {/* Top Header / Nav Bar */}
      <ReportHeader
        candidateName={userData?.name}
        createdAt={createdAt}
        copied={copied}
        onShare={handleShare}
        onPrint={handlePrint}
        onRetake={onRetake}
      />

      {/* Main Report Container */}
      <main className="max-w-6xl mx-auto space-y-8">
        {/* HERO SECTION: Overall Score Gauge & Session Metadata */}
        <ReportHeroScore
          finalScore={finalScore}
          tier={tier}
          role={role}
          experience={experience}
          mode={mode}
          totalQuestions={questionWiseScore.length}
        />

        {/* CORE COMPETENCY METRICS (Confidence, Communication, Correctness) */}
        <CompetenciesBreakdown
          confidence={confidence}
          communication={communication}
          correctness={correctness}
        />

        {/* AI INSIGHTS: STRENGTHS & TARGETED GROWTH AREAS */}
        <ReportAiInsights
          strengths={strengths}
          improvements={improvements}
        />

        {/* ACTION RECOMMENDATIONS CHECKLIST */}
        <ActionPlanSection recommendations={recommendations} />

        {/* QUESTION-BY-QUESTION IN-DEPTH BREAKDOWN */}
        <QuestionWiseBreakdown
          questions={questionWiseScore}
          filterDifficulty={filterDifficulty}
          onFilterChange={setFilterDifficulty}
          expandedQuestion={expandedQuestion}
          onToggleQuestion={setExpandedQuestion}
        />

        {/* BOTTOM ACTION CARD */}
        <ReportCtaCard onRetake={onRetake} />
      </main>
    </div>
  );
};

export default Step3Report;