/* eslint-disable no-unused-vars */
import React from 'react'
import PathCard from './PathCard'
import GraphComponent from './GraphComponent'
import { FaPlus } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Clock, TrendingUp, TrendingDown, CheckCircle, FileText } from "lucide-react";

export default function Middle({ setCurrentPage, setActive }) {

    const [courses, setCourses] = useState([]); // Store courses from backend
    const [recentCourses, setRecentCourses] = useState([]); // Store recent courses

    // Fetch courses from backend
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/courses"); // Adjust the URL
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
            try {
                const response2 = await axios.get("http://localhost:5000/api/courses/recent"); // Adjust the URL
                setRecentCourses(response2.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    return (
        <div className="flex-1 p-6">

            <div className="flex gap-3 w-full">
                <div className="w-3/4">
                    <GraphComponent />
                </div>
                <div className="flex flex-col w-1/3 gap-3">
                    {/* Time Spent */}
                    <div className="bg-white p-4 rounded-xl shadow">
                        <div className="flex items-center pl-3 gap-3 mb-2">
                            <Clock className="text-blue-500" size={32} />
                            <div className="ml-4">
                                <div className="text-lg font-semibold">Time Spent</div>
                                <div className="text-2xl font-bold">48 Hrs</div>
                                <div className="text-sm text-green-500 flex items-center">
                                    <TrendingUp className="mr-1" size={16} /> +2.4% This Week
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="bg-white p-4 rounded-xl shadow">
                        <div className="flex items-center pl-3 gap-3 mb-2">
                            <CheckCircle className="text-purple-500" size={32} />
                            <div className="ml-4">
                                <div className="text-lg font-semibold">Progress</div>
                                <div className="text-2xl font-bold">38%</div>
                                <div className="text-sm text-red-500 flex items-center">
                                    <TrendingDown className="mr-1" size={16} /> -1.7% This Week
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assignments */}
                    <div className="bg-white p-4 rounded-xl shadow">
                        <div className="flex items-center pl-3 gap-3 mb-2">
                            <FileText className="text-pink-500" size={32} />
                            <div className="ml-4">
                                <div className="text-lg font-semibold">Assignments</div>
                                <div className="text-2xl font-bold">23</div>
                                <div className="text-sm text-green-500 flex items-center">
                                    <TrendingUp className="mr-1" size={16} /> +5 This Week
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between w-full mt-4 mb-1">
                <div className="relative flex items-center gap-2 text-xl text-gray-800 font-bold ">
                    <div className='w-3 h-3 bg-green-500 rounded-full ml-0.5'></div>
                    <div className='absolute w-3.5 h-3.5 border-2 ml-0.25 mb-0.25 rounded-full border-green-500 animate-ping'></div>
                    Active Paths</div>
                <button onClick={() => { setCurrentPage('Add-Path'); setActive('Add Path') }} className='cursor-pointer flex items-center gap-2 bg-blue-500 text-white px-4 h-10 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300'>
                    <FaPlus className="text-xl text-gray-100" />
                    <span className='font-bold'>Add Path</span>
                </button>
            </div>
            <div className="flex flex-wrap w-full gap-3 mt-3 items-center justify-center">
                {
                    courses.map((course) => (
                        <div key={course.id} onClick={() => { window.location.href = `/courses/${course.name}`; }} >
                            <PathCard
                                key={course.id}
                                name={course.title}
                                completed={course.progress}
                                active={course.activeDays}
                                remaining={course.remainingDays}
                            />
                        </div>
                    ))
                }
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
                    <div className="text-lg font-semibold mb-4">Recent Courses</div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Course Title</th>
                                    <th className="px-4 py-2 text-left">Category</th>
                                    <th className="px-4 py-2 text-left">Task</th>
                                    <th className="px-4 py-2 text-left">Progress</th>
                                    <th className="px-4 py-2 text-left">Active</th>
                                    <th className="px-4 py-2 text-left">Remaining </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentCourses.map((course) => (
                                    <tr key={course.id}>
                                        <td className="border-t px-4 py-2">
                                            <div className="flex items-center">
                                                <img alt="Course" className="object-cover w-10 h-10 rounded-md mr-4" src="login2.png" />
                                                <div>
                                                    <div className="font-semibold">{course.title}</div>
                                                    <div className="text-sm text-gray-600">By {course.instructor}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="border-t px-4 py-2">{course.category}</td>
                                        <td className="border-t px-4 py-2">{course.tasks} Tasks</td>
                                        <td className="border-t px-4 py-2">
                                            <div className="relative pt-1">
                                                <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                                    <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500" style={{ width: `${course.progress}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="border-t px-4 py-2">{course.activeDays} Days</td>
                                        <td className="border-t px-4 py-2">{course.remainingDays} Days</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
