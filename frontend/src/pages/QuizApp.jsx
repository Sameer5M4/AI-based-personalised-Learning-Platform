import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenerateLoader from "../components/GenerateLoader"
import axios from "axios";

const defaultQuestions = [
  { id: 1, text: "Your Education Level or Academic Background?", options: ["High School", "Undergraduate", "Graduate", "Postgraduate", "Working Professional", "Other"] },
  { id: 2, text: "What is your major or field of education?", options: ["Medical Science", "Arts", "Business", "Technology", "Social Sciences", "Other"] },
  { id: 3, text: "What would you say is your strongest skill?", options: ["Entrepreneurial Mindset", "Coding", "Analytical and Diagnostic Skills", "Research and Problem-Solving", "Design", "Other"] },
];

export default function QuizApp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(() => {
    const storedQuiz = localStorage.getItem("quizData");
    return storedQuiz ? JSON.parse(storedQuiz) : defaultQuestions;
  });
  const [evaluateQuiz, setEvaluateQuiz] = useState(() => {
    const evaluate = localStorage.getItem("evaluateQuiz");
    return evaluate ? JSON.parse(evaluate) : {};
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
    '6': '',
    '7': '',
    '8': '',
    '9': '',
    '10': '',
  });
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
    const updatedOptions = { ...selectedOptions, [questionId]: option };
    setSelectedOptions(updatedOptions);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const updatedQuiz = { ...evaluateQuiz, 'selected_options': Object.values(selectedOptions) };
    setEvaluateQuiz(updatedQuiz);
    console.log(updatedQuiz)
    try {
      const response = await axios.post("http://127.0.0.1:5000/evaluate_quiz", {
        skill: updatedQuiz.skill,
        level: updatedQuiz.level,
        goal: updatedQuiz.goal,
        questions: updatedQuiz.questions,
        selected_options: updatedQuiz.selected_options
      });
      console.log(response.data["estimated_time"]);

      const response2 = await axios.post("http://127.0.0.1:5000/generate_path", {
        skill: updatedQuiz.skill,
        level: updatedQuiz.level,
        goal: updatedQuiz.goal,
        duration_weeks: 8,
        estimated_hours: response.data["estimated_time"]
      });
      console.log(response2.data)
      try {
        const response = await axios.post("http://localhost:5000/api/courses", {
          courseId: response2.data.courseId,
          courseName: response2.data.coursename,
          category: "development",
          duration: response.data["estimated_time"],
          remaining: response.data["estimated_time"],
          roadmapId: response2.data.roadmapData,
        });
        alert("Course and Roadmap added successfully!");
        console.log(response.data);
      } catch (error) {
        console.error("Error adding course:", error.response?.data || error.message);
        alert("Failed to add course");
      }
      localStorage.setItem("roadmap", JSON.stringify(response2.data));
      setTimeout(() => { setLoading(false); navigate(`/courses/${response2.data.courseId}`) }, 10000);

    } catch (err) {
      console.log('Error occured at evaluation of quiz', err);
    }
  }
  return (
    <>
      {loading && <GenerateLoader />}

      <div className={`fixed top-0 left-0 w-full h-full bg-white flex flex-col justify-center items-center transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        {/* Top Section: Close, Progress Bar, Timer */}
        <div className="w-full flex items-center justify-between p-4">
          {/* Close Button */}
          <button className="cursor-pointer text-white font-bold text-lg bg-red-500 px-4 py-2 rounded-lg"
            onClick={() => { setIsVisible(false); navigate("/dashboard"); }}>
            Close
          </button>

          {/* Progress Bar */}
          <div className="w-2/5 bg-gray-300 h-3 rounded-full overflow-hidden relative">
            <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
          </div>

          {/* Timer */}
          <div className="flex items-center text-lg font-semibold">
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
        <div className="w-full flex-1 flex flex-col justify-center items-center px-8">
          <p className="text-2xl font-semibold text-center mb-6">{questions[currentQuestion]?.question}</p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            {questions[currentQuestion]?.options.map((option) => (
              <button key={option} className={`p-4 border rounded-lg text-lg ${selectedOptions[questions[currentQuestion]?.id] === option ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-300"}`} onClick={() => selectOption(questions[currentQuestion]?.id, option)}>
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
            <button className="px-4 py-2 bg-green-500 text-lg font-semibold text-white rounded-lg" onClick={handleSubmit}>Submit</button>
          )}
        </div>

      </div>
    </>

  );
}
