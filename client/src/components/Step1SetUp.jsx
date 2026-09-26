import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

// Modular setup sub-components
import Step1Features from "./setup/Step1Features";
import RoleSelector from "./setup/RoleSelector";
import ExperienceSelector from "./setup/ExperienceSelector";
import ModeSelector from "./setup/ModeSelector";
import ResumeUploader from "./setup/ResumeUploader";
import ResumeAnalysisCard from "./setup/ResumeAnalysisCard";

/**
 * Step1SetUp - Main orchestrator for interview configuration and resume analysis
 */
const Step1SetUp = ({ onStartInterview }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  // Form states
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [projects, setProjects] = useState([]);
  const [mode, setMode] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState([]);

  // Async loading & analysis states
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzedData, setAnalyzedData] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle PDF resume file upload & automatic AI extraction
  const handleResume = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);
    setAnalyzing(true);
    setAnalyzedData(false);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const result = await axios.post(
        "http://localhost:3000/api/interview/resume",
        formData,
        { withCredentials: true }
      );
      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");
      setAnalysis(result.data);
      setAnalyzedData(true);
      setAnalyzing(false);
    } catch (error) {
      console.log(error);
      setAnalyzing(false);
    }
  };

  // Remove uploaded resume
  const handleRemoveResume = () => {
    setAnalyzedData(false);
    setResumeFile(null);
    setAnalysis(null);
  };

  // Generate questions & commence interview
  const handleStartInterview = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/interview/generate-questions",
        { role, experience, mode, resumeText, projects, skills },
        { withCredentials: true }
      );

      if (userData) {
        dispatch(setUserData({ ...userData, credits: res.data.creditsLeft }));
      }

      console.log(res.data);
      setLoading(false);
      onStartInterview(res.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] px-5 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Side AI Highlights */}
        <Step1Features />

        {/* Right Side Setup Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7"
        >
          <h2 className="text-2xl font-bold text-gray-800">Interview Setup</h2>
          <p className="text-sm text-gray-500 mt-1 mb-7">
            Customize your interview before getting started.
          </p>

          {/* Role selector dropdown */}
          <RoleSelector value={role} onChange={setRole} />

          {/* Experience level dropdown */}
          <ExperienceSelector value={experience} onChange={setExperience} />

          {/* Interview mode (Technical / HR) */}
          <ModeSelector mode={mode} onSelectMode={setMode} />

          {/* Resume Upload Dropzone */}
          <ResumeUploader
            analyzing={analyzing}
            analyzedData={analyzedData}
            resumeFile={resumeFile}
            onResumeUpload={handleResume}
            onRemoveResume={handleRemoveResume}
          />

          {/* AI Resume Analysis Preview */}
          {analyzedData && <ResumeAnalysisCard analysis={analysis} />}

          {/* Submit / Start Button */}
          {loading ? (
            <div className="mt-6 flex flex-col items-center justify-center">
              <FaSpinner className="text-green-600 text-2xl animate-spin" />
              <p className="text-sm text-gray-600 mt-3">
                Analyzing your resume...
              </p>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartInterview}
              disabled={!role || !experience || !mode || analyzing}
              className="w-full mt-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              Start Interview
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Step1SetUp;
