import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons
import styled from 'styled-components';
import CircularProgress from "./CircularProgress";

const Roadmap = ({ weeks }) => {
  const isLast = weeks.length;

  return (
    <div className="relative flex flex-col items-center justify-center w-1/2 mt-12">
      {weeks.map((week, index) => {
        const isEven = index % 2 === 0;

        return (
          <div key={index} className={`relative w-90 h-32 ${index > 0 ? "-mt-[0.35rem]" : ""}`}>
            {
              isLast !== (index + 1) ? (
                <>
                  {/* Curved Path */}
                  < div className={`absolute ${isEven ? "right-0 rounded-r-full border-l-0" : "left-0 rounded-l-full border-r-0"} w-28 h-32 border-6 border-blue-500 overflow-hidden flex gap-20`} > </div>
                  {/* Horizontal Line */}
                  <div className="right-25 absolute shadow-xl w-40 h-[0.35rem] bg-gray-300">
                    <div
                      className="h-full bg-blue-500  transition-all duration-500 ease-in-out"
                    // style={{ width: `${progress[index]}%` }}
                    ></div>
                  </div>

                </>
              ) : (
                <>
                  <div className="right-24 absolute w-40 h-[0.35rem] bg-gray-300">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500 ease-in-out"
                    // style={{ width: `${progress[index]}%` }}
                    ></div>
                  </div>
                </>
              )
            }
            {/* Week Circle */}
            <div className="flex relative justify-between">
              {isEven ? (
                <>
                  <div className="hover:bg-yellow-500 cursor-pointer hover:scale-110 transition-transform duration-400  shadow-xl ml-10 -mt-8 w-16 h-16 flex items-center justify-center text-white text-xl font-bold bg-purple-400 rounded-full">{week + index} </div>
                  <p className="text-gray-700 absolute ml-10 mt-8 font-semibold">Module {week + index}</p>
                  <div className="hover:bg-yellow-500 cursor-pointer hover:scale-110 transition-transform duration-400 shadow-xl mr-18 -mt-8 w-16 h-16 flex items-center justify-center text-white text-xl font-bold bg-purple-400 rounded-full">{week + index + 1} </div>
                  <p className="text-gray-700 absolute mr-18 right-0 mt-8 font-semibold">Module {week + index + 1}</p>

                </>
              ) : (
                <>
                  <div className="hover:bg-yellow-500 cursor-pointer hover:scale-110 transition-transform duration-400 shadow-xl ml-18 -mt-8 w-16 h-16 flex items-center justify-center text-white text-xl font-bold bg-purple-400 rounded-full">{week + index + 1} </div>
                  <p className="text-gray-700 absolute ml-18 mt-8 font-semibold">Module {week + index + 1}</p>
                  <div className="hover:bg-yellow-500 cursor-pointer hover:scale-110 transition-transform duration-400 shadow-xl mr-10 -mt-8 w-16 h-16 flex items-center justify-center text-white text-xl font-bold bg-purple-400 rounded-full">{week + index}</div>
                  <p className="text-gray-700 absolute mr-10 right-0 mt-8 font-semibold">Module {week + index}</p>


                </>
              )}
            </div>
          </div>
        );
      })}
    </div >
  );
};


const CourseDetails = ({ coursename }) => {
  const [course, setCourse] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState({}); // Tracks expanded weeks
  const [expandedModules, setExpandedModules] = useState({}); // Tracks expanded modules

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${coursename}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCourse();
  }, [coursename]);

  if (!course) return <p>Loading course details...</p>;

  const courseStructure = [
    {
      week: "1",
      modules: [
        {
          moduleId: "module 1",
          title: "Module 1: Introduction to Web Development",
          topics: [{
            name: "HTML Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "CSS Fundamentals",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "JavaScript",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 1 Quiz",
        },
        {
          moduleId: "module 2",
          title: "Module 2: Frontend Frameworks",
          topics: [{
            name: "React Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "Component Structure",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "State Management",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 2 Quiz",
        },
      ],
    },

    {
      week: "2",
      modules: [
        {
          moduleId: "module 3",
          title: "Module 3: Introduction to Web Development",
          topics: [{
            name: "HTML Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "CSS Fundamentals",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "JavaScript",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 1 Quiz",
        },
        {
          moduleId: "module 2",
          title: "Module 4: Frontend Frameworks",
          topics: [{
            name: "React Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "Component Structure",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "State Management",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 2 Quiz",
        },
      ],
    },

    {
      week: "3",
      modules: [
        {
          moduleId: "module 1",
          title: "Module 1: Introduction to Web Development",
          topics: [{
            name: "HTML Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "CSS Fundamentals",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "JavaScript",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 1 Quiz",
        },
        {
          moduleId: "module 2",
          title: "Module 2: Frontend Frameworks",
          topics: [{
            name: "React Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "Component Structure",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "State Management",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 2 Quiz",
        },
      ],
    },

    {
      week: "4",
      modules: [
        {
          moduleId: "module 1",
          title: "Module 1: Introduction to Web Development",
          topics: [{
            name: "HTML Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "CSS Fundamentals",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "JavaScript",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 1 Quiz",
        },
        {
          moduleId: "module 2",
          title: "Module 2: Frontend Frameworks",
          topics: [{
            name: "React Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "Component Structure",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "State Management",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 2 Quiz",
        },
      ],
    },

    {
      week: "5",
      modules: [
        {
          moduleId: "module 1",
          title: "Module 1: Introduction to Web Development",
          topics: [{
            name: "HTML Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "CSS Fundamentals",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "JavaScript",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 1 Quiz",
        },
        {
          moduleId: "module 2",
          title: "Module 2: Frontend Frameworks",
          topics: [{
            name: "React Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "Component Structure",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "State Management",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 2 Quiz",
        },
      ],
    },

    {
      week: "6",
      modules: [
        {
          moduleId: "module 1",
          title: "Module 1: Introduction to Web Development",
          topics: [{
            name: "HTML Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "CSS Fundamentals",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "JavaScript",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 1 Quiz",
        },
        {
          moduleId: "module 2",
          title: "Module 2: Frontend Frameworks",
          topics: [{
            name: "React Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "Component Structure",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "State Management",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 2 Quiz",
        },
      ],
    },

    {
      week: "7",
      modules: [
        {
          moduleId: "module 1",
          title: "Module 1: Introduction to Web Development",
          topics: [{
            name: "HTML Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "CSS Fundamentals",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "JavaScript",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 1 Quiz",
        },
        {
          moduleId: "module 2",
          title: "Module 2: Frontend Frameworks",
          topics: [{
            name: "React Basics",
            topicId: "topic1",
            isCompleted: false
          },
          {
            name: "Component Structure",
            topicId: "topic2",
            isCompleted: false
          },
          {
            name: "State Management",
            topicId: "topic3",
            isCompleted: false
          }
          ],
          quiz: "Module 2 Quiz",
        },
      ],
    },


  ];
  // Toggle week visibility
  const toggleWeek = (week) => {
    setExpandedWeeks((prev) => ({ ...prev, [week]: !prev[week] }));
  };

  // Toggle module visibility
  const toggleModule = (module) => {
    setExpandedModules((prev) => ({ ...prev, [module]: !prev[module] }));
  };

  return (
    <>
      <div
        className={`flex flex-col flex-1 m-3 ml-70 transition-all duration-500 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
      >
        <div className="p-8 bg-white/50 rounded-lg h-auto shadow-lg w-full mx-auto border border-gray-200">
          <div className="flex gap-4 m-auto gap-4 w-full">
            <div className="flex flex-col items-center m-auto gap-10 w-1/2">
              <div className="flex gap-10 items-center">
                <div className="">
                  <h2 className="text-3xl font-bold text-gray-800">{course.title}</h2>
                  <p className="text-gray-600">{course.description}</p>
                  <p className="text-gray-700 font-semibold mt-4">✅ Completed: {course.progress}%</p>
                  <p className="text-gray-700 mt-1">
                    📅 Active Days: {course.activeDays} | ⏳ Remaining Days: {course.remainingDays}
                  </p>
                </div>
                <div className="">
                  <CircularProgress progress={course.progress}/>
                </div>
              </div>
              <div className="ml-32">
                <Roadmap weeks={courseStructure.map((week, index) => index + 1)} />

              </div>
            </div>
            <div className="w-1/2 top-0 p-4 bg-white rounded-xl overflow-hidden shadow-md ">
              <h3 className="text-xl font-semibold mb-3">📅 Weekly Breakdown</h3>
              {courseStructure.map((week, index) => (
                <div key={index} className="mb-4 overflow-hidden rounded-lg">
                  {/* Week Header */}
                  <div
                    className="p-3 bg-gray-100 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleWeek(week.week)}
                  >
                    <p className="text-lg font-bold text-purple-600">Week {week.week}</p>
                    {expandedWeeks[week.week] ? <FaChevronUp /> : <FaChevronDown />}
                  </div>

                  {/* Modules (Visible only if week is expanded) */}
                  {expandedWeeks[week.week] && (
                    <div className="p-3 bg-gray-50">
                      {week.modules.map((module, modIndex) => (
                        <div key={modIndex} className="mb-3">
                          {/* Module Header */}
                          <div
                            className="p-2 bg-blue-100 cursor-pointer flex justify-between items-center rounded-md"
                            onClick={() => toggleModule(module.title)}
                          >
                            <p className="font-semibold text-gray-800">{module.title}</p>
                            {expandedModules[module.title] ? <FaChevronUp /> : <FaChevronDown />}
                          </div>

                          {/* Topics (Visible only if module is expanded) */}
                          {expandedModules[module.title] && (
                            <div className="ml-6 mt-2 p-3 bg-blue-50 rounded-md">
                              <ul className=" ml-4 text-gray-600">
                                {module.topics.map((topic, topicIndex) => (
                                  <li key={topicIndex}>🔹 {topic.name}</li>
                                ))}
                              </ul>
                              <p className="text-green-600 mt-2">📝 {module.quiz}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>


          </div>

        </div>


      </div>
    </>
  );
};

const StyledWrapper = styled.div`
  .progress-app {
    font-family: "Inter", sans-serif;
    color: #333333;
    line-height: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .progress-panel {
    background: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .panel-header {
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .system-status {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-indicator {
    width: 8px;
    height: 8px;
    background: #4a90e2;
    border-radius: 50%;
    animation: pulse 2s infinite ease-in-out;
  }

  .status-text {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    letter-spacing: 1px;
  }

  .progress-section {
    margin-bottom: 24px;
  }

  .progress-wrapper {
    position: relative;
    height: 20px;
    background: #e0e0e0;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 16px;
  }

  .progress-bar {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /* Progress Line dynamically updated */
  .progress-line {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: linear-gradient(90deg, #1260F1, #4a90e2, #6ec6ff);
    border-radius: 20px;
    transition: width 0.5s ease-in-out;
    animation: progressGlow 2s infinite;
  }

  .progress-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at center, rgba(74, 144, 226, 0.2) 2px, transparent 1px);
    background-size: 8px 8px;
    animation: particleFlow 20s linear infinite;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 24px;
    margin-bottom: -20px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .info-value {
    font-size: 18px;
    font-weight: 700;
    color: #4a90e2;
    text-shadow: 0 0 10px rgba(74, 144, 226, 0.3);
    margin-bottom: 4px;
  }

  .info-label {
    font-size: 10px;
    color: rgba(51, 51, 51, 0.6);
    letter-spacing: 0.5px;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
  }

  @keyframes progressGlow {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 20px rgba(74, 144, 226, 0.3);
    }
    50% {
      opacity: 0.8;
      box-shadow: 0 0 30px rgba(74, 144, 226, 0.5);
    }
  }

  @keyframes particleFlow {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }
  }

  @media (max-width: 600px) {
    .info-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .info-value {
      font-size: 20px;
    }

    .progress-wrapper {
      height: 32px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .status-indicator, .progress-line, .progress-particles {
      animation: none;
    }
  }
`;

export default CourseDetails;
