/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  FaHome, FaBook, FaTasks, FaCog, FaQuestionCircle, FaPlus,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const navItems = [
  { name: "Home", icon: FaHome },
  { name: "Add Path", icon: FaPlus },
  { name: "Courses", icon: FaBook },
  { name: "Certifications", icon: FaTasks },
  { name: "Settings", icon: FaCog },
  { name: "Help", icon: FaQuestionCircle }
];

export default function LeftSidebar({ userId, active, setActive, currentPage, setCurrentPage, open, setOpen, isCourse, setIsCourse }) {
  const navigate = useNavigate(); // Initialize navigate function
  const [ad, setAd] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    image: "",
  });
  useEffect(() => {
    setCurrentPage(isCourse ? "Course-detail" : active.replace(" ", "-"));
  }, [active, setCurrentPage, isCourse]);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5550/api/user/${userId}`)
        .then((res) => {
          const data = res.data;
          setProfile({
            name: data.name || "",
            image: data.image || "",
          });
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [userId]);

  return (
    <div className="bg-white fixed w-64 h-[calc(100vh-1.5rem)] p-6 flex flex-col transition-transform duration-300 shadow-lg rounded-xl">
      <div className="flex items-center mb-8">
        <img alt="Logo" className="w-10 h-10 mr-2" src="/vite.svg" />
        <span className="text-xl font-bold text-gray-800">AI-Learning</span>
      </div>

      <nav className=" flex-1 text-lg">
        <ul>
          {navItems.map(({ name, icon: Icon }) => (
            <li key={name} className="mb-1.5 relative">
              <button
                className={`cursor-pointer flex items-center w-full px-4 py-1.5 rounded-lg transition-all duration-300 
                  ${active === name ? "pl-8 bg-blue-500 text-white shadow-md" : "text-gray-700 hover:text-blue-500"}`}
                onClick={() => {
                  setActive(name);
                  setIsCourse(false);
                  navigate("/dashboard"); // Navigate to /dashboard
                }}
              >
                <Icon className="mr-3 text-lg" /> {name}
              </button>
              <div className="absolute w-1.5 h-6 bg-white z-10 top-2 rounded right-1.5"></div>
            </li>
          ))}
        </ul>
      </nav>

      {ad ? (
        <div className="relative mt-auto bg-purple-100 p-4 mb-10 rounded-lg text-center shadow-md">
          <div className="cursor-pointer absolute text-red-500 font-bold top-2 right-2" onClick={() => setAd(false)}>close</div>
          <div className="text-2xl mb-2">😎</div>
          <div className="text-lg font-semibold">Bonus Content!</div>
          <div className="text-sm text-gray-600 mb-2">Get Premium resources</div>
          <button className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Upgrade to Pro
          </button>
        </div>
      ) : null}

      <div className="flex items-center mt-auto">
        <div className="flex items-center"
          onClick={() => {
            setActive("Profile");
            navigate("/dashboard"); // Navigate when clicking profile
          }}>
          <img
            src={`http://localhost:5550${profile.image}`}
            alt="Profile"
            className="cursor-pointer w-10 h-10 rounded-full"

          />
          <div className="flex flex-col ml-2 cursor-pointer">
            <p className="text-lg text-gray-700 font-bold -mb-1">{profile.name.slice(0,13)}</p>
            <span className="text-sm">Online</span>
          </div>
        </div>
        <div className="cursor-pointer flex ml-auto" onClick={() => setOpen(!open)}>
          <FiLogOut className="text-xl text-red-500 ml-2" />
        </div>
      </div>
    </div>
  );
}
