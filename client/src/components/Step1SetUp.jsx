import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaFileUpload,
  FaCheckCircle,
  FaBriefcase,
  FaGraduationCap,
  FaMicrophone,
  FaSpinner,
} from "react-icons/fa";
import axios from "axios";

const Step1SetUp = ({ onStartInterview }) => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [projects, setProjects] = useState([]);
  const [mode, setMode] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzedData, setAnalyzedData] = useState(false);
  const [analysis, setAnalysis] = useState(null);

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
        "http://localhost:3000" + "/api/interview/resume",
        formData,
        { withCredentials: true },
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
    }

    // TODO: Api call ( for time being this is timeout function )
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzedData(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] px-5 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
              <FaRobot size={22} />
            </div>
            <span className="text-green-600 font-semibold">Colloquium AI</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 leading-tight">
            Start your <span className="text-green-600">AI Interview</span>
          </h1>

          <p className="text-gray-500 mt-4 max-w-lg">
            Practice realistic interviews with an AI interviewer designed to
            help you improve your communication, technical knowledge, and
            interview confidence.
          </p>

          <div className="grid gap-4 mt-8">
            {[
              {
                icon: <FaRobot />,
                title: "AI Powered Interview",
                desc: "Get realistic questions and intelligent feedback.",
              },
              {
                icon: <FaMicrophone />,
                title: "Voice Based Interaction",
                desc: "Answer naturally just like a real interview.",
              },
              {
                icon: <FaCheckCircle />,
                title: "Instant Evaluation",
                desc: "Understand your strengths and areas to improve.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15 }}
                whileHover={{ x: 5 }}
                className="bg-white p-5 rounded-xl border border-gray-200
                           flex items-center gap-4 shadow-sm"
              >
                <div
                  className="w-11 h-11 shrink-0 rounded-lg bg-green-50
                                text-green-600 flex items-center justify-center"
                >
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
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

          {/* ROLE */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-gray-700">
              Interview Role
            </label>

            <div className="relative mt-2">
              <FaBriefcase className="absolute left-4 top-4 text-gray-400" />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full appearance-none border border-gray-200
                           rounded-xl py-3 pl-11 pr-4 outline-none
                           focus:border-green-500"
              >
                <option value="">Select your role</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>Data Scientist</option>
                <option>AI/ML Engineer</option>
                <option>Software Engineer</option>
              </select>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-gray-700">
              Experience Level
            </label>

            <div className="relative mt-2">
              <FaGraduationCap className="absolute left-4 top-4 text-gray-400" />

              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full appearance-none border border-gray-200
                           rounded-xl py-3 pl-11 pr-4 outline-none
                           focus:border-green-500"
              >
                <option value="">Select experience</option>
                <option>Fresher</option>
                <option>0 - 1 Years</option>
                <option>1 - 3 Years</option>
                <option>3 - 5 Years</option>
                <option>5+ Years</option>
              </select>
            </div>
          </div>

          {/* MODE */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700">
              Interview Mode
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {[
                "Technical Interview",
                "HR Interview",
                "Behavioral Interview",
                "Mixed Interview",
              ].map((item) => (
                <motion.button
                  key={item}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setMode(item)}
                  className={`p-3 rounded-xl border text-sm text-left transition
                    ${
                      mode === item
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 text-gray-600 hover:border-green-300"
                    }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>

          {/* RESUME */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Resume
              <span className="text-gray-400 font-normal"> PDF Format</span>
            </label>

            <label
              className="mt-2 border-2 border-dashed border-gray-200
                         hover:border-green-400 rounded-xl p-6
                         flex flex-col items-center justify-center
                         cursor-pointer transition"
            >
              {analyzing ? (
                <>
                  <FaSpinner className="text-green-600 text-2xl animate-spin" />
                  <p className="text-sm text-gray-600 mt-3">
                    Analyzing your resume...
                  </p>
                </>
              ) : analyzedData ? (
                <>
                  <FaCheckCircle className="text-green-600 text-3xl" />
                  <p className="text-sm font-medium text-green-600 mt-2">
                    Resume analyzed successfully
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {resumeFile?.name}
                  </p>
                  <button
                    onClick={() => setAnalyzedData(false)}
                    className="text-sm text-white bg-green-600 p-2 rounded-lg mt-2"
                  >
                    Remove the file
                  </button>
                </>
              ) : (
                <>
                  <FaFileUpload className="text-gray-400 text-2xl" />
                  <p className="text-sm text-gray-600 mt-3">
                    Upload your resume (Optional)
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PDF</p>
                </>
              )}

              {!analyzing && !analyzedData && (
                <input
                  type="file"
                  accept=".pdf"
                  required
                  onChange={handleResume}
                  className="hidden"
                />
              )}
            </label>
          </div>

          {analyzedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-4"
            >
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600" />
                <h3 className="font-bold text-gray-800">AI Resume Analysis</h3>
              </div>

              {/* Role & Experience */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">Detected Role</p>
                  <p className="font-semibold text-gray-800 mt-1">
                    {analysis.role}
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">Experience</p>
                  <p className="font-semibold text-gray-800 mt-1">
                    {analysis.experience}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white border rounded-xl p-4">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Detected Skills
                </h4>

                <div className="flex flex-wrap gap-2">
                  {analysis.skills?.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-green-100 text-green-700
                       rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="bg-white border rounded-xl p-4">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Projects Detected
                </h4>

                <div className="space-y-2">
                  {analysis.projects?.map((project) => (
                    <div
                      key={project}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <FaCheckCircle className="text-green-500 text-xs" />
                      {project}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* START */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              onStartInterview({ role, experience, mode });
            }}
            disabled={!role || !experience || !mode || analyzing}
            className="w-full mt-6 py-3 rounded-xl bg-green-600
                       hover:bg-green-700 text-white font-semibold
                       disabled:bg-gray-300 disabled:cursor-not-allowed
                       transition"
          >
            Start Interview
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Step1SetUp;
