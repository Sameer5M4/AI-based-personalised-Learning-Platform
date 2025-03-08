import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { FaArrowRight } from "react-icons/fa";
import "../assets/skillSelector"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GenerateLoader from "../components/GenerateLoader";


export default function CareerPath() {
  const [selectedOptions, setSelectedOptions] = useState({
    skill: '',
    level: null,
    careerAspiration: [],
    learningStyle: [],
  });
  const [loading, setLoading] = useState(false);
  const [skillsData, setSkillsData] = useState([]); // Stores CSV data
  const [query, setQuery] = useState(""); // User input
  const [filteredSkills, setFilteredSkills] = useState([]); // Filtered results
  const [stop, setStop] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [onQuiz, setOnQuiz] = useState(false);
  const navigate = useNavigate();



  // Load skills from CSV on mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/DataSet.csv"); // Ensure correct path
        if (!response.ok) throw new Error("Failed to load file");

        const text = await response.text();
        const skills = text.split("\n").map(skill => skill.trim()).filter(skill => skill);
        setSkillsData(skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  // Filter results when user types
  useEffect(() => {
    if (!stop) {
      if (!query) {
        setFilteredSkills([]);
        return;
      }

      const filtered = skillsData
        .filter(skill => skill.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => a.toLowerCase().indexOf(query) - b.toLowerCase().indexOf(query)) // Prioritize closer matches
        .slice(0, 6); // Limit to top 6 results

      setFilteredSkills(filtered);
    } else {
      setStop(false);

    }
  }, [query, skillsData]);

  // Handle skill selection
  const handleSelectInput = (skill) => {
    setQuery(skill);
    setFilteredSkills([]);
    setStop(true);
  };


  const handleSelect = (category, value) => {
    setSelectedOptions((prev) => {
      if (category === "level") {
        return { ...prev, level: value };
      }

      const isSelected = prev[category].includes(value);
      const updatedSelection = isSelected
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];

      return { ...prev, [category]: updatedSelection };
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Skill:", query);
    console.log("level", selectedOptions.level)
    console.log("goal", selectedOptions.careerAspiration)
    if (selectedOptions.level != null && selectedOptions.careerAspiration.length > 0 && selectedOptions.learningStyle.length > 0) {
      try {
        const response = await axios.post("http://127.0.0.1:5000/generate_quiz", {
          skill: query,
          level: selectedOptions.level,
          goal: selectedOptions.careerAspiration[0],
        });

        if (response.data) {
          setQuiz({
            questions: response.data.questions, // Extracting correct array
          });
          const msg = {
            'skill': query,
            'level': selectedOptions.level,
            'goal': selectedOptions.careerAspiration[0],
            'questions': response.data.questions,
          }
          console.log(JSON.stringify(response.data.questions))
          localStorage.setItem("quizData", JSON.stringify(response.data.questions)); // Store in localStorage
          localStorage.setItem("evaluateQuiz", JSON.stringify(msg));
          
          setTimeout(() => {setLoading(false);navigate("/quiz") }, 2000);
          // Navigate to the Quiz page
        } else {
          setQuiz(null);
        }
      } catch (err) {
        setQuiz(null);
      }
    } else {
      alert('All Fields are Required!')
    }

  };

  return (
    <>
      {loading && <GenerateLoader />}

      <motion.div
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
        className="flex flex-col gap-4 m-3 ml-70 bg-white/50 rounded-xl min-h-[calc(100vh-1.5rem)] transition-transform duration-300 shadow-lg"
      >
        <p className="text-2xl font-bold m-10 ml-26 mb-0">Learning Path Generator</p>
        <div className="flex gap-4 justify-center">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-1/3 flex flex-col gap-6 items-center rounded-xl  pt-6 ml-10"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Search Input */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Want to Learn a Skill ... Try now"
                className="border-2 border-gray-500 text-xl w-full h-12 px-4 ml-15 rounded-lg focus:outline-none"
              />

              {/* Suggestions Dropdown */}
              {filteredSkills.length > 0 && (
                <div className="absolute top-full left-15 w-full bg-white shadow-lg overflow-hidden  border-gray-300 rounded-lg mt-1 z-10">
                  {filteredSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-blue-100 cursor-pointer flex items-center gap-2 border-b my-1"
                      onClick={() => handleSelectInput(skill)}
                    >
                      <span className="text-gray-600">🔍</span> {skill}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex shadow flex-wrap justify-between gap-2 border-2 border-gray-500 w-full ml-30 p-3 rounded-xl">
              {["AI & ML", "Data Science", "DL", "Pharmacists", "Cybersecurity", "AeroDynamics", "FinTech", "GIT", "Electronics", "Big Data Analytics", "Web Development", "Marketing", "Health", "Cultural Management", "Cloud Computing", "Medicine", "Creative Writing", "UX/UI Designer"].map((skill) => (
                <Button key={skill} name={skill} />
              ))}
            </div>
          </motion.div>

          <div className="w-3/4 flex flex-col gap-10 items-center justify-center p-6 pt-9 h-full rounded-xl">
            {/* Level Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative flex flex-wrap items-center justify-center gap-4 w-[80%] py-6 pt-8 border-2 border-gray-500 rounded-xl"
            >
              <p className="absolute left-6 -top-4.5 py-0.5 text-xl bg-white font-semibold text-purple-700 px-6 rounded-full border-2">
                Level
              </p>
              {["Newbie", "Beginner", "Intermediate", "Advanced"].map((level) => (
                <Button key={level} name={level} isSelected={selectedOptions.level === level} onClick={() => handleSelect("level", level)} />
              ))}
            </motion.div>

            {/* Career Aspiration Selection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative flex flex-wrap items-center justify-center gap-4 w-[80%] py-6 pt-8 border-2 border-gray-500 rounded-xl"
            >
              <p className="absolute left-6 -top-4.5 text-xl bg-white font-semibold text-red-700 px-6 py-0.5 rounded-full border-2">
                Career Aspiration
              </p>
              {["Job Preparation", "Skill Enhancement", "Career Switch", "Freelance Opportunity", "Teaching"].map((aspiration) => (
                <Button key={aspiration} name={aspiration} isSelected={selectedOptions.careerAspiration.includes(aspiration)} onClick={() => handleSelect("careerAspiration", aspiration)} />
              ))}
            </motion.div>

            {/* Learning Style Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative flex flex-wrap items-center justify-center gap-4 w-[80%] py-6 pt-8 border-2 border-gray-500 rounded-xl"
            >
              <p className="absolute left-6 -top-4.5 py-0.5 text-xl bg-white font-semibold text-indigo-700 px-6 rounded-full border-2">
                Learning Style
              </p>
              {["Videos", "Text & Docs", "Hands-on-Projects", "Mixed"].map((style) => (
                <Button key={style} name={style} isSelected={selectedOptions.learningStyle.includes(style)} onClick={() => handleSelect("learningStyle", style)} />
              ))}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="ml-auto mr-20 -mt-4 group"
            >
              <button onClick={handleSubmit} className="flex items-center gap-2 cursor-pointer hover:scale-105 bg-purple-500 text-white px-8 text-xl font-bold py-2.5 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300">
                Continue <FaArrowRight className="transition-transform duration-300 group-hover:rotate-30" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>

  );
}
