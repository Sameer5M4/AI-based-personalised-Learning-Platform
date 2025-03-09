import React, { useState, useEffect } from 'react';
import LeftSidebar from '../components/dashboard/LeftSidebar';
import Loader from '../components/Loader';
import Home from './Home';
import CareerPath from './CareerPath';
import Settings from './Settings';
import Courses from './Courses';
import Analytics from './Analytics';
import Assignments from './Assignments';
import Help from './Help';
import AlertBox from '../components/AlertBox';
import CourseDetails from './CourseDetails';
import Profile from './Profile';
import GenerateQuiz from './GenerateQuiz';

export default function Dashboard({ userId, handleLogout, courses, courseId, isCourse, setIsCourse }) {
  const [active, setActive] = useState(isCourse ? 'Courses' : 'Home');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(isCourse ? 'Course-detail' : 'Home');


  useEffect(() => {
    setTimeout(() => setLoading(false), 0);
  }, [currentPage]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return ( 
    <>
      {loading && <Loader />}
      {open && <AlertBox open={open} setOpen={setOpen} handleLogout={handleLogout}/>}
      <div className={`flex bg-gray-200/25 transition-transform transition-all duration-300 ${loading ? 'blur-md' : ''}`}>
        <div
          aria-hidden="true"
          className="fixed inset-x-0 -top-60 -z-10 transform-gpu overflow-hidden blur-2xl sm:-top-[500px] "
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(40%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div
          aria-hidden="true"
          className="fixed inset-x-0 top-60 -z-10 transform-gpu overflow-hidden blur-2xl sm:-top-[500px] "
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#32CD32] to-[#7DF9FF] opacity-20 sm:left-[calc(40%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="fixed p-3">
          <LeftSidebar userId={userId} active={active} setActive={setActive} currentPage={currentPage} setCurrentPage={setCurrentPage} open={open} setOpen={setOpen} isCourse={isCourse} setIsCourse={setIsCourse}/>
        </div>
        <div className="w-full">
          {currentPage === 'Home' && <Home userId={userId} darkMode={darkMode} setDarkMode={setDarkMode} setCurrentPage={setCurrentPage} setActive={setActive} />}
          {currentPage === 'Add-Path' && <CareerPath />}
          {currentPage === 'Courses' && <Courses setCurrentPage={setCurrentPage} courses={courses} />}
          {currentPage === 'Course-detail' && <CourseDetails courseId={courseId} />}
          {currentPage === 'Certifications' && <Assignments />}
          {/* {currentPage === 'Settings' && <GenerateQuiz />} */}
          {currentPage === 'Settings' && <Settings />}
          {currentPage === 'Help' && <Help />}
          {currentPage === 'Profile' && <Profile userId={userId} />}

        </div>

        <div
          aria-hidden="true"
          className="fixed inset-x-0 top-[calc(50%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(140%-30rem)] "
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2  rotate-[180deg] bg-gradient-to-tr from-[#00FFFF] to-[#FF69B4] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div
          aria-hidden="true"
          className="fixed inset-x-0 top-[calc(150%-20rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] "
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </>
  );
}
