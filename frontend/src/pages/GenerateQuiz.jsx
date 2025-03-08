import React, { useState } from "react";
import axios from "axios";

const GenerateQuiz = () => {
    const [interestedSkill, setInterestedSkill] = useState("");
    const [selfAssessedLevel, setSelfAssessedLevel] = useState("");
    const [goal, setGoal] = useState("");
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerateQuiz = async () => {
        if (!interestedSkill.trim()) {
            setError("Please enter an interested skill.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await axios.post("http://127.0.0.1:5000/generate_quiz", {
                interested_skill: interestedSkill,
                self_assessed_level: selfAssessedLevel,
                goal: goal,
            });

            console.log("API Response:", response.data); // Debugging API response

            if (response.data && response.data.questions?.assessment?.questions) {
                setQuiz({ 
                    skill: response.data.skill,
                    questions: response.data.questions.assessment.questions, // Extracting correct array
                });
            } else {
                setError("Invalid quiz format received. Please try again.");
                setQuiz(null);
            }
        } catch (err) {
            setError("Failed to fetch quiz. Please try again.");
            setQuiz(null);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Generate a Quiz</h2>

            <div className="mb-4">
                <label className="block font-semibold">Interested Skill:</label>
                <input
                    type="text"
                    value={interestedSkill}
                    onChange={(e) => setInterestedSkill(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="e.g., Python, JavaScript"
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Self-Assessed Level:</label>
                <select
                    value={selfAssessedLevel}
                    onChange={(e) => setSelfAssessedLevel(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                >
                    <option value="">Select Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Goal:</label>
                <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                    placeholder="e.g., Job preparation, Skill improvement"
                />
            </div>

            <button
                onClick={handleGenerateQuiz}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate Quiz"}
            </button>

            {error && <p className="text-red-500 mt-3">{error}</p>}

            {quiz && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Quiz for {quiz.skill}</h3>
                    <ul className="list-none mt-2">
                        {quiz.questions.map((q, index) => (
                            <li key={index} className="mb-4 p-3 border rounded-lg shadow-sm">
                                <p className="font-medium">{index + 1}. {q.question}</p>
                                <ul className="mt-2">
                                    {q.options.map((option, optIndex) => (
                                        <li key={optIndex} className="ml-4">
                                            <label className="flex items-center">
                                                <input type="radio" name={`question-${index}`} className="mr-2" />
                                                {option}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </li> 
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GenerateQuiz;
