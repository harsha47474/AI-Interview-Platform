import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaHistory,
  FaRobot,
  FaMicrophone,
  FaClock,
  FaChartBar,
  FaFileAlt,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import evalimg from "../assets/ai-ans.png";
import resume from "../assets/resume.png";
import pdf from "../assets/pdf.png";
import history from "../assets/history.png";
import Footer from "../components/Footer";

const Home = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar />

      <main className="flex flex-col items-center justify-center pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex gap-2 text-center ml-5">
            <FaRobot size={20} className="text-5xl" />
            <p className="text-sm text-gray-500 mb-2">
              Colloquium: AI Smart Interview Platform
            </p>
          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            Welcome{userData?.name ? `, ${userData.name}` : ""} 👋
          </h1>

          <p className="text-gray-500 mt-3 mb-8 bg-green-200 px-2 rounded-full">
            Practice interviews with your AI interviewer.
          </p>

          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white shadow-md"
            >
              <FaPlay />
              Start Interview
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-700 border shadow-sm"
            >
              <FaHistory />
              Show History
            </motion.button>
          </div>
        </motion.div>
      </main>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6"
      >
        {[
          {
            step: "Step 1",
            title: "Role & Experience Selection",
            desc: "Choose your interview role and experience level to get a personalized interview.",
            icon: <FaRobot />,
          },
          {
            step: "Step 2",
            title: "Smart Voice Interview",
            desc: "Interact naturally with an AI interviewer through a realistic voice-based interview.",
            icon: <FaMicrophone />,
          },
          {
            step: "Step 3",
            title: "Timer Based Simulation",
            desc: "Experience a real interview environment with time limits that keep you focused.",
            icon: <FaClock />,
          },
        ].map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.15 }}
            whileHover={{ y: -8 }}
            className="group bg-white rounded-2xl p-6 border border-gray-200
                 shadow-sm hover:shadow-xl hover:border-green-300
                 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold text-green-600">
                {item.step}
              </span>

              <div
                className="w-11 h-11 rounded-xl bg-green-50 text-green-600
                        flex items-center justify-center text-lg
                        group-hover:bg-green-600 group-hover:text-white
                        transition-all duration-300"
              >
                {item.icon}
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500 leading-6">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Advanced AI Capabilities */}
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
          {[
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
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group flex gap-5 bg-white rounded-2xl p-6 border
                   border-gray-200 shadow-sm hover:shadow-lg
                   hover:border-green-300 transition-all duration-300"
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
      <Footer />
    </div>
  );
};

export default Home;
