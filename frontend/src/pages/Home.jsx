import React, { useEffect, useState } from 'react';
import Middle from '../components/dashboard/Middle';
import RightSide from '../components/dashboard/RightSide';
import "../assets/noScroller.css"

export default function Home({ userId, darkMode, setDarkMode, setCurrentPage, setActive }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className={`flex flex-col ml-64 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="flex w-full h-dvh">
                <div className="flex flex-col w-[76%] overflow-y-auto pt-3">
                    <div className="flex justify-between items-center ml-8 mr-0 mt-3 mb-0">
                        <h1 className="text-2xl font-bold">Good Morning <span className="ml-2">👋</span></h1>
                        <input className="border border-gray-300 focus:outline-none rounded-lg px-4 py-2 ml-auto mr-8" placeholder="Search anything" type="text" />
                    </div>
                    <Middle setCurrentPage={setCurrentPage} setActive={setActive} />
                </div>
            </div>

            <div className="fixed w-[24%] overflow-hidden right-3 top-3 flex flex-col gap-3 rounded-xl">
                <RightSide userId={userId} darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
        </div>
    );
}
