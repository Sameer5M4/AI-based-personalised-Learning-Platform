import React, { useState, useEffect } from "react";

const defaultQuestions = [
  { id: 1, text: "Your Education Level or Academic Background?", options: ["High School", "Undergraduate", "Graduate", "Postgraduate", "Working Professional", "Other"] },
  { id: 2, text: "What is your major or field of education?", options: ["Medical Science", "Arts", "Business", "Technology", "Social Sciences", "Other"] },
  { id: 3, text: "What would you say is your strongest skill?", options: ["Entrepreneurial Mindset", "Coding", "Analytical and Diagnostic Skills", "Research and Problem-Solving", "Design", "Other"] },
  { id: 4, text: "What is your area of technical expertise?", options: ["Programming", "Artificial Intelligence & Data Science", "Graphic Design", "Medical Researcher", "Marketing & Sales", "Other"] },
  { id: 5, text: "What are your current learning interests?", options: ["AI/ML and Data Science", "Business Strategy", "Creative Arts", "Doctor (MBBS/MD)", "Cultural Activities", "Other"] },
  { id: 6, text: "What is your future career goal?", options: ["AI/ML Engineer", "Designer", "Doctor (MBBS/MD)", "Entrepreneurship & Business Strategy", "Researcher", "Other"] },
  { id: 7, text: "What are your study preferences?", options: ["Self-Study", "Group Study", "Workshops and Hackathons", "Online Courses", "Offline Classes", "Other"] },
  { id: 8, text: "What is your preferred learning style?", options: ["Visual", "Auditory", "Reading/Writing", "Kinesthetic", "Other"] },
  { id: 9, text: "How do you handle problem-solving challenges?", options: ["Logical Thinking", "Creative Thinking", "Collaboration", "Independent Research", "Other"] },
  { id: 10, text: "What motivates you to learn new things?", options: ["Curiosity", "Career Growth", "Innovation", "Passion", "Other"] },
];

export default function QuizApp() {
  const [questions, setQuestions] = useState(defaultQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const selectOption = (questionId, option) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
  };

  const nextQuestion = () => {
    if (currentQuestion < defaultQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-white flex flex-col justify-center items-center transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      {/* Top Section: Close, Progress Bar, Timer */}
      <div className="w-full flex items-center justify-between p-4">
        {/* Close Button */}
        <button className="cursor-pointer text-white font-bold text-lg bg-red-500 px-4 py-2 rounded-lg" onClick={() => {setIsVisible(false);window.location.href="/dashboard"}}>Close</button>
        
        {/* Progress Bar */}
        <div className="w-2/5 bg-gray-300 h-3 rounded-full overflow-hidden relative">
          <div
            className="bg-blue-500 h-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / defaultQuestions.length) * 100}%` }}
          ></div>
        </div>
        
        {/* Timer */}
        <div className="flex items-centertext-lg font-semibold">
          <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg shadow-md">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-md text-2xl">
              {Math.floor(timeLeft / 60)}
            </div>
            <span className="text-2xl font-bold">:</span>
            <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-md text-2xl">
              {(timeLeft % 60).toString().padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* Question Section */}
      <div className="w-full flex-1 flex flex-col justify-center items-center px-8 transition-all duration-500 ease-in-out opacity-100 translate-y-0">
        <p className="text-2xl font-semibold text-center mb-6">{questions[currentQuestion]?.text}</p>
        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
          {questions[currentQuestion]?.options.map((option) => (
            <button
              key={option}
              className={`p-4 border rounded-lg text-lg transition-all duration-200 ${selectedOptions[questions[currentQuestion]?.id] === option ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-300"}`}
              onClick={() => selectOption(questions[currentQuestion]?.id, option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex justify-between items-center p-4 shadow-md">
        <button className="px-4 py-2 text-lg font-semibold bg-gray-300 rounded-lg" onClick={prevQuestion} disabled={currentQuestion === 0}>Back</button>
        {currentQuestion < questions.length - 1 ? (
          <button className="px-4 py-2 bg-blue-500 text-lg font-semibold text-white rounded-lg" onClick={nextQuestion}>Next</button>
        ) : (
          <button className="px-4 py-2 bg-green-500 text-lg font-semibold text-white rounded-lg" onClick={() => console.log("Submit")}>Submit</button>
        )}
      </div>
    </div>
  );
}
