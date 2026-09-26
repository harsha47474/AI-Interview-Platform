import React from "react";
import { motion } from "framer-motion";
import { FaChartBar, FaFileAlt } from "react-icons/fa";
import evalimg from "../../assets/ai-ans.png";
import resume from "../../assets/resume.png";
import pdf from "../../assets/pdf.png";
import history from "../../assets/history.png";

const CAPABILITIES = [
  {
    image: evalimg,
    icon: <FaChartBar />,
    title: "AI Answer Evaluation",
    desc: "Get intelligent feedback on your answers with insights into clarity, relevance, confidence, and overall performance.",
  },
  {
    image: resume,
    icon: <FaFileAlt />,
    title: "Resume Based Interview",
    desc: "Let AI analyze your resume and generate personalized interview questions based on your skills and experience.",
  },
  {
    image: pdf,
    icon: <FaFileAlt />,
    title: "Downloadable PDF Report",
    desc: "Download a detailed interview report containing your performance, scores, feedback, and improvement areas.",
  },
  {
    image: history,
    icon: <FaChartBar />,
    title: "History & Analytics",
    desc: "Track your interview history and monitor your progress with useful performance analytics over time.",
  },
];

/**
 * HomeCapabilities - Showcase cards explaining platform AI features and benefits
 */
const HomeCapabilities = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-green-600 mb-2">
          Advanced AI Capabilities
        </p>
        <h2 className="text-3xl font-bold text-gray-800">
          Smarter interviews,{" "}
          <span className="text-green-600">better insights</span>
        </h2>
        <p className="text-gray-500 mt-3">
          Powerful tools to help you prepare, evaluate, and improve.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CAPABILITIES.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="group flex gap-5 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg hover:border-green-300 transition-all duration-300"
          >
            <img
              src={item.image}
              alt=""
              className="w-24 h-24 object-cover rounded-xl"
            />

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-600 text-lg">{item.icon}</span>
                <h3 className="font-bold text-gray-800">{item.title}</h3>
              </div>

              <p className="text-sm text-gray-500 leading-6">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HomeCapabilities;
