import { Routes, Route, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import CareerPath from "./pages/CareerPath";

const App = () => {
  const navigate = useNavigate();

  // Load authentication state from localStorage
  const [isAuthentic, setIsAuthentic] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [userId, setUserId] = useState(localStorage.getItem("userId")|| "");

  // Persist authentication on login
  const handleLogin = (token, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
    setIsAuthentic(true);
    setUserId(id);
    navigate("/home"); // Redirect after login
  };

  // useEffect(()=>{
  //   handleLogout()
  // },[])

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthentic(false);
    setUserId("");
    navigate("/"); // Redirect to MainHome after logout
  };
 
  return (
    <>
      
      <Routes>
        {isAuthentic ? (
          <>
            <Route path="/" element={<LandingPage userId={userId} handleLogout={handleLogout} />} />
            <Route path="/home" element={<LandingPage userId={userId} handleLogout={handleLogout} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<LandingPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={<Authentication setIsAuthentic={setIsAuthentic} handleLogin={handleLogin} setUserId={setUserId} />}
            />
            <Route path="/career-path" element={<CareerPath />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<LandingPage />} />
          </>
        )}
      </Routes>
    </>
  )
};

export default App;
