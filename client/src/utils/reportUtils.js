/**
 * reportUtils.js - Helper functions for calculating report score tiers and generating AI insights
 */

/**
 * Calculates tier information (label, colors, badges) based on overall score (0-10)
 */
export const getScoreTier = (score) => {
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

/**
 * Generates structured strengths, growth opportunities, and recommendations based on competency scores
 */
export const getGeneratedInsights = (confidence, communication, correctness) => {
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

  recommendations.push(
    "Review your recorded answers below and refine 1-2 minute elevator pitches for core competencies.",
    "Practice speaking out loud with timed drills to hone your pace under 60-90 second limits.",
    "Incorporate industry-standard terminology and real-world project anecdotes into technical answers."
  );

  return { strengths, improvements, recommendations };
};
