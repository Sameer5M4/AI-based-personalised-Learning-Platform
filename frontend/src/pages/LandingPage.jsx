import React from "react";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-5 bg-gray-800 shadow-lg">
        <h1 className="text-2xl font-bold text-cyan-400">AI Learning Platform</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features" className="hover:text-cyan-300">Features</a></li>
            <li><a href="#reviews" className="hover:text-cyan-300">Reviews</a></li>
            <li><a href="#contact" className="hover:text-cyan-300">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-center py-20 px-6"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-cyan-400">
          Discover Your AI-Powered Learning Path
        </h2>
        <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
          A personalized AI-driven learning platform to help students across various domains find the best career paths, courses, and projects.
        </p>
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          onClick={() => window.location.href = '/login'}
          className="cursor-pointer mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg"
        >
          Get Started
        </motion.button>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="px-10 py-16 pb-20 grid md:grid-cols-3 gap-8 text-center">
        <motion.div className="p-6 bg-gray-800 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
          <h2 className="text-xl font-semibold text-cyan-300">AI-Powered Career Paths</h2>
          <p className="text-gray-400 mt-2">Get personalized career paths based on your skills and interests.</p>
        </motion.div>
        <motion.div className="p-6 bg-gray-800 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
          <h2 className="text-xl font-semibold text-cyan-300">Top Online Courses</h2>
          <p className="text-gray-400 mt-2">Access the best courses from various platforms to upskill yourself.</p>
        </motion.div>
        <motion.div className="p-6 bg-gray-800 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
          <h2 className="text-xl font-semibold text-cyan-300">Project Recommendations</h2>
          <p className="text-gray-400 mt-2">Work on projects that match your career goals and skill level.</p>
        </motion.div>
      </section>

      {/* AI Chat Assistant */}
      {/* <section className="px-10 py-16 text-center">
        <h2 className="text-3xl font-bold text-cyan-400">AI Learning Assistant</h2>
        <p className="text-gray-400 mt-4">Ask questions, get recommendations, and receive guidance from our AI-powered assistant.</p>
      </section> */}

      {/* Reviews Section */}
      <section id="reviews" className="px-10 py-16 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold text-cyan-400">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <motion.div className="p-6 bg-gray-700 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <p className="text-gray-300">“This platform transformed my learning experience! Highly recommended.”</p>
            <h3 className="text-cyan-300 mt-2">- Alex R.</h3>
          </motion.div>
          <motion.div className="p-6 bg-gray-700 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <p className="text-gray-300">“AI-powered career guidance helped me find the perfect path.”</p>
            <h3 className="text-cyan-300 mt-2">- Priya K.</h3>
          </motion.div>
          <motion.div className="p-6 bg-gray-700 rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <p className="text-gray-300">“The best platform for personalized learning with AI!”</p>
            <h3 className="text-cyan-300 mt-2">- John D.</h3>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="text-center py-6 bg-gray-800">
        <p className="text-gray-400">&copy; 2025 AI Learning Platform. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-cyan-400 hover:text-cyan-300">Twitter</a>
          <a href="#" className="text-cyan-400 hover:text-cyan-300">LinkedIn</a>
          <a href="#" className="text-cyan-400 hover:text-cyan-300">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;