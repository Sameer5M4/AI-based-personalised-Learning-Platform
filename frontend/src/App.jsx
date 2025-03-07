import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import "./assets/scroller.css";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import CareerPath from "./pages/CareerPath";
import QuizApp from "./pages/QuizApp";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails"; // New Course Details Page

const App = () => {
  const navigate = useNavigate();
  const [isAuthentic, setIsAuthentic] = useState(localStorage.getItem("token") ? true : false);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [courses, setCourses] = useState([]); // Store courses from backend
  const [isCourse, setIsCourse] = useState(false)

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses"); // Adjust the URL
        setCourses(response.data);
        console.log("Courses:", response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleLogin = (token, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
    setIsAuthentic(true);
    setUserId(id);
    navigate("/home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthentic(false);
    setUserId("");
    navigate("/");
  };


  return (
    <>
      <Routes>
        {isAuthentic ? (
          <>
            <Route path="/" element={<Dashboard userId={userId} handleLogout={handleLogout} courses={courses} coursename={''} isCourse={false} setIsCourse={setIsCourse} />} />
            <Route path="/dashboard" element={<Dashboard userId={userId} handleLogout={handleLogout} courses={courses} coursename={''} isCourse={false} setIsCourse={setIsCourse} />} />
            <Route path="/quiz" element={<QuizApp />} />
            {courses.map((course) => (
              <Route key={course.id} path={`/courses/${course.name}`} element={<Dashboard userId={userId} handleLogout={handleLogout} courses={courses} coursename={course.name} isCourse={true} setIsCourse={setIsCourse} />} />
            ))}

          </>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Authentication setIsAuthentic={setIsAuthentic} handleLogin={handleLogin} setUserId={setUserId} />} />
            <Route path="*" element={<LandingPage />} />
          </>
        )}
      </Routes>
    </> 
  );
};

export default App;
