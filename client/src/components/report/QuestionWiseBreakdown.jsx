import React from "react";
import QuestionAccordionItem from "./QuestionAccordionItem";

/**
 * QuestionWiseBreakdown - Filterable list of all questions with accordions showing speech transcripts and scores
 */
const QuestionWiseBreakdown = ({
  questions = [],
  filterDifficulty,
  onFilterChange,
  expandedQuestion,
  onToggleQuestion,
}) => {
  // Filter questions according to score criteria
  const filteredQuestions = questions.filter((q) => {
    if (filterDifficulty === "all") return true;
    if (filterDifficulty === "high") return (q.score || 0) >= 7;
    if (filterDifficulty === "low") return (q.score || 0) < 7;
    return true;
  });

  return (
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
            type="button"
            onClick={() => onFilterChange("all")}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterDifficulty === "all"
                ? "bg-white text-gray-900 font-semibold shadow-xs"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            All ({questions.length})
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("high")}
            className={`px-3 py-1.5 rounded-lg transition ${
              filterDifficulty === "high"
                ? "bg-white text-gray-900 font-semibold shadow-xs"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Score ≥ 7
          </button>
          <button
            type="button"
            onClick={() => onFilterChange("low")}
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

            return (
              <QuestionAccordionItem
                key={idx}
                index={idx}
                questionItem={q}
                isExpanded={isExpanded}
                onToggle={() => onToggleQuestion(isExpanded ? -1 : idx)}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default QuestionWiseBreakdown;
