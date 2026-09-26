import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

// Modular interview sub-components
import SpeechRecognitionFallback from "./interview/SpeechRecognitionFallback";
import Step2Header from "./interview/Step2Header";
import InterviewerVideoCard from "./interview/InterviewerVideoCard";
import InterviewControls from "./interview/InterviewControls";
import LiveTranscriptCard from "./interview/LiveTranscriptCard";
import InterviewTipsCard from "./interview/InterviewTipsCard";

const SR =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

/**
 * Step2Interview - Orchestrator for real-time live AI interview session
 */
function Step2Interview({ interviewData, onCompleteInterview }) {
  const { interviewId, candidateName, questions = [] } = interviewData || {};
  const displayName = candidateName || interviewData?.userName || "Candidate";

  // Session state
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | asking | listening | submitting | feedback | submitFailed | done
  const [transcript, setTranscript] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("female");

  // Stable refs for speech recognition & submissions
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

  // Synchronize avatar video playback with the asking phase
  useEffect(() => {
    if (!videoRef.current) return;
    if (phase === "asking") {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [phase, selectedAvatar]);

  // Sends the user's recorded answer to the backend
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

  // Finalizes the current answer and submits
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

  // Phase: Asking - Text-to-speech for the current question
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
    utterance.onerror = next; // Ensures interview never stalls if voice API fails
    speechSynthesis.speak(utterance);

    return () => {
      cancelled = true;
      speechSynthesis.cancel();
    };
  }, [index, phase, question.question]);

  // Phase: Listening - Mic activated, continuous speech recognition, timer countdown
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

  // Phase: Feedback - Shows evaluator feedback, transitions to next question or concludes
  useEffect(() => {
    if (phase !== "feedback") return;

    const t = setTimeout(async () => {
      if (index + 1 < questions.length) {
        setIndex((i) => i + 1);
        setPhase("asking");
      } else {
        setPhase("done");

        try {
          const res = await axios.post(
            "http://localhost:3000/api/interview/finish",
            { interviewId },
            { withCredentials: true }
          );

          console.log("Final interview result:", res.data);
          onCompleteInterview?.(res.data);
        } catch (error) {
          console.error("Failed to finish interview:", error);
        }
      }
    }, 3000);

    return () => clearTimeout(t);
  }, [phase, index, questions.length, interviewId, onCompleteInterview]);

  // Replay question audio
  const handleReplayQuestion = () => {
    if (phase === "asking" || phase === "submitting" || phase === "feedback") return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(question.question);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  // Browser compatibility fallback
  if (!SR) {
    return <SpeechRecognitionFallback />;
  }

  // Timer styling & ratios
  const totalLimit = question?.timeLimit || 30;
  const timeRatio = totalLimit > 0 ? timeLeft / totalLimit : 0;
  const isUrgent = timeLeft <= 5 && phase === "listening";
  const isWarning = timeLeft <= 12 && !isUrgent && phase === "listening";

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-gray-800 flex flex-col justify-between py-6 px-4 md:px-8">
      {/* Top Session Status Bar */}
      <Step2Header
        displayName={displayName}
        questions={questions}
        currentIndex={index}
        phase={phase}
        timeLeft={timeLeft}
        isUrgent={isUrgent}
        isWarning={isWarning}
      />

      {/* Main Arena */}
      <main className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
        {/* Left Column: Video Arena & Controls */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <InterviewerVideoCard
            videoRef={videoRef}
            selectedAvatar={selectedAvatar}
            onSelectAvatar={setSelectedAvatar}
            phase={phase}
            questionIndex={index}
            totalQuestions={questions.length}
            question={question}
            onReplayQuestion={handleReplayQuestion}
          />

          <InterviewControls
            phase={phase}
            error={error}
            index={index}
            feedback={feedback}
            timeLeft={timeLeft}
            timeRatio={timeRatio}
            isUrgent={isUrgent}
            isWarning={isWarning}
            onStart={() => {
              setError("");
              setPhase("asking");
            }}
            onSkipToAnswer={() => setPhase("listening")}
            onSubmitAnswer={finishAnswer}
            onRetrySubmit={() => sendAnswer(lastPayloadRef.current)}
          />
        </section>

        {/* Right Column: Live Transcript & Pro Tips */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <LiveTranscriptCard transcript={transcript} phase={phase} />
          <InterviewTipsCard />
        </section>
      </main>
    </div>
  );
}

export default Step2Interview;