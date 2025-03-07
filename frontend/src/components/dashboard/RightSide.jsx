import React from 'react'
import { FaBell, FaMoon, FaSun } from 'react-icons/fa';
import axios from "axios";
import { useState, useEffect } from 'react';
export default function RightSide({ userId, darkMode, setDarkMode }) {
    const [profile, setProfile] = useState({
        name: "",
        image: "",
    });
    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/api/user/${userId}`)
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
        <>
            <div className="flex items-center space-x-4 bg-white p-2 pl-3 pr-4 rounded-full shadow">
                <div className="flex gap-1 items-center p-1 bg-gray-300 overflow-hidden rounded-full">
                    <div className={`cursor-pointer p-1.5 rounded-full transition-colors transform duration-300 ${darkMode ? '' : 'bg-white'}`} onClick={() => setDarkMode(!darkMode)}>
                        <FaSun className={` ${darkMode ? 'text-gray-600 ' : 'text-yellow-500'}`} />
                    </div>
                    <div className={` cursor-pointer  p-1.5 rounded-full transition-colors transform duration-300 ${darkMode ? 'bg-gray-600' : ''}`} onClick={() => setDarkMode(!darkMode)}>
                        <FaMoon className={`${darkMode ? 'text-white' : 'text-gray-600'} `} />
                    </div>
                </div>
                <span className="w-0.5 h-8 border-l-2 border-gray-400 mr-4"></span>
                <div className="flex items-center space-x-2">
                    <img
                        src={`http://localhost:5000${profile.image}`}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="text-gray-700 font-bold">{profile.name.slice(0, 13)}</span>
                </div>
            </div>
            <div className="bg-white p-6 pb-7 h-[calc(100vh-5.75rem)] rounded-xl shadow-xl">
                <div className="flex justify-between items-center mb-4 ">
                    <div className="text-lg font-semibold">March 2025</div>
                    <i className="fas fa-chevron-down text-gray-600"></i>
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-center text-gray-600">
                    <div>Su</div>
                    <div>Mo</div>
                    <div>Tu</div>
                    <div>We</div>
                    <div>Th</div>
                    <div>Fr</div>
                    <div>Sa</div>
                    <div className="col-span-7 border-t border-gray-300 my-2"></div>
                    <div className="text-gray-400 px-1.5 py-1">1</div>
                    <div className="text-gray-400 px-1.5 py-1">2</div>
                    <div className="text-gray-400 px-1.5 py-1">3</div>
                    <div className="text-gray-400 px-1.5 py-1">4</div>
                    <div className="text-gray-400 px-1.5 py-1">5</div>
                    <div className="text-gray-400 px-1.5 py-1">6</div>
                    <div className="text-gray-400 px-1.5 py-1">7</div>
                    <div className="text-gray-400 px-1.5 py-1">8</div>
                    <div className="text-gray-400 px-1.5 py-1">9</div>
                    <div className="text-gray-400 px-1.5 py-1">10</div>
                    <div className="text-gray-400 px-1.5 py-1">11</div>
                    <div className="text-gray-400 px-1.5 py-1">12</div>
                    <div className="text-gray-400 px-1.5 py-1">13</div>
                    <div className="text-gray-400 px-1.5 py-1">14</div>
                    <div className="text-gray-400 px-1.5 py-1">15</div>
                    <div className="text-gray-400 px-1.5 py-1">16</div>
                    <div className="text-gray-400 px-1.5 py-1">17</div>
                    <div className="text-gray-400 px-1.5 py-1">18</div>
                    <div className="text-gray-400 px-1.5 py-1">19</div>
                    <div className="text-gray-400 px-1.5 py-1">20</div>
                    <div className="text-gray-400 px-1.5 py-1">21</div>
                    <div className="text-gray-400 px-1.5 py-1">22</div>
                    <div className="bg-blue-500 p px-1.5 py-1 text-white rounded-full">23</div>
                    <div className="text-gray-400 px-1.5 py-1">24</div>
                    <div className="text-gray-400 px-1.5 py-1">25</div>
                    <div className="text-gray-400 px-1.5 py-1">26</div>
                    <div className="text-gray-400 px-1.5 py-1">27</div>
                    <div className="text-gray-400 px-1.5 py-1">28</div>
                    <div className="text-gray-400 px-1.5 py-1">29</div>
                    <div className="text-gray-400 px-1.5 py-1">30</div>
                    <div className="text-gray-400 px-1.5 py-1">31</div>
                </div>
                <div className="mt-6">
                    <div className="text-lg font-semibold mb-4">Todays Task</div>
                    <div className="flex items-center mb-4">
                        <img alt="Task Image" className="object-fit object-cover w-10 h-10 rounded-lg mr-4" height="40" src="login2.png" width="40" />
                        <div>
                            <div className="font-semibold">Landing Page Design</div>
                            <div className="text-sm text-gray-600">06:00 AM | Web Design</div>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <img alt="Task Image" className="object-fit object-cover w-10 h-10 rounded-lg mr-4" height="40" src="login2.png" width="40" />
                        <div>
                            <div className="font-semibold">3D Icon Design</div>
                            <div className="text-sm text-gray-600">09:00 AM | 3D Modeling</div>
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <img alt="Task Image" className="object-fit object-cover w-10 h-10 rounded-lg mr-4" height="40" src="login2.png" width="40" />
                        <div>
                            <div className="font-semibold">Landing Page Design</div>
                            <div className="text-sm text-gray-600">06:00 AM | Web Design</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <img alt="Task Image" className="object-fit object-cover w-10 h-10 rounded-lg mr-4" height="40" src="login2.png" width="40" />
                        <div>
                            <div className="font-semibold">3D Icon Design</div>
                            <div className="text-sm text-gray-600">09:00 AM | 3D Modeling</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
