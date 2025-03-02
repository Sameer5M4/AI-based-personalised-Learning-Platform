import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

const ProgressBar = ({ progress }) => {
  return (
    <div className="relative w-full bg-gray-300 rounded-full h-6 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: `${progress}%` }} 
        transition={{ duration: 1 }}
        className="h-full bg-gradient-to-r from-green-400 to-blue-500 text-white flex items-center justify-center text-sm font-semibold">
        {progress}%
      </motion.div>
    </div>
  );
};

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [completedCheckpoints, setCompletedCheckpoints] = useState([true, true, false, false, false, false, false, false]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-900"}>
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-5 shadow-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <h1 className="text-2xl font-bold">AI Learning Dashboard</h1>
        <button 
          onClick={toggleDarkMode} 
          className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Profile & Settings */}
      <section className="px-10 py-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-cyan-300">User Profile</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">John Doe</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Edit Profile</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-blue-600 dark:text-cyan-300">Settings</h2>
          <button className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">Account Settings</button>
        </div>
      </section>

      {/* Career Paths & Progress Tracking */}
      <section className="px-10 py-8">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-cyan-300">Your Learning Progress</h2>
        <div className="mt-4 bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-blue-500 dark:text-cyan-300">Web Development Course</h3>
          <p className="text-gray-600 dark:text-gray-400">A comprehensive course covering HTML, CSS, JavaScript, React, and backend development.</p>
          <ProgressBar progress={50} />
        </div>
      </section>

      {/* Course Roadmap */}
      <section className="px-10 py-8">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-cyan-300">Course Roadmap</h2>
        <div className="relative flex justify-center items-center mt-8">
          <div className="relative w-full h-40 flex items-center">
            {[...Array(8)].map((_, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.2 }} 
                onClick={() => alert(`Checkpoint ${index + 1}: ${completedCheckpoints[index] ? 'Completed' : 'Not Completed'}`)}
                className={`absolute bg-${completedCheckpoints[index] ? 'green' : 'red'}-500 text-white rounded-full p-2 shadow-lg cursor-pointer`} 
                style={{ left: `${index * 12}%`, top: index % 2 === 0 ? "10px" : "50px" }}>
                <FaMapMarkerAlt size={20} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;