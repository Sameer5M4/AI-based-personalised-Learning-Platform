import React, { useEffect, useState } from "react";

export default function Courses({ setCurrentPage, courses }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`flex flex-col gap-3 flex-1 ml-67 p-3 transition-all min-h-[calc(100vh-1.5rem)] duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <div className="grid grid-cols-1 gap-6">
        <div className="lg:col-span-2 bg-white/60 p-6 rounded-xl shadow">
          <div className="text-2xl font-semibold mb-4">My Courses</div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Course Title</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Tasks</th>
                  <th className="px-4 py-2 text-left">Progress</th>
                  <th className="px-4 py-2 text-left">Active Hours</th>
                  <th className="px-4 py-2 text-left">Remaining Hours</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr className="" key={course.courseId} onClick={() => { window.location.href = `/courses/${course.courseId}` }}>
                    <td className="cursor-pointer border-t px-4 py-2">
                      <div className="flex items-center">
                        <img alt="Course" className="object-cover w-10 h-10 rounded-md mr-4" src="login2.png" />
                        <div>
                          <div className="font-semibold">{course.courseName}</div>
                          <div className="text-sm text-gray-600">{}</div>
                        </div>
                      </div>
                    </td>
                    <td className="border-t px-4 py-2">{course.category}</td>
                    <td className="border-t px-4 py-2">{20} Tasks</td>
                    <td className="border-t px-4 py-2">
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                          <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500" style={{ width: `${50}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="border-t px-4 py-2">{course.duration} Hours</td>
                    <td className="border-t px-4 py-2">{course.remaining} Hours</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
