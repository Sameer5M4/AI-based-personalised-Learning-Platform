import React, { useEffect, useState } from "react";
import { FaQuestionCircle, FaUser, FaBook, FaTools, FaEnvelope } from "react-icons/fa";

export default function Help() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`flex flex-col flex-1 m-3 ml-70 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="p-8 bg-white/50 rounded-lg shadow-lg w-full mx-auto border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FaQuestionCircle className="text-blue-500" /> Help & Support
                </h2>

                {/* General FAQs */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-800">General FAQs</h3>
                    <div className="mt-4 space-y-3">
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-800">How do I reset my password?</h4>
                            <p className="text-gray-600 mt-1">Go to Settings → Change Password and follow the steps.</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-800">Where can I track my learning progress?</h4>
                            <p className="text-gray-600 mt-1">Your progress is displayed on the Dashboard under "Active Paths".</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-800">Is my data safe on this platform?</h4>
                            <p className="text-gray-600 mt-1">Yes, we follow industry-standard encryption and security measures.</p>
                        </div>
                    </div>
                </div>

                {/* Getting Started */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FaBook className="text-green-500" /> Getting Started
                    </h3>
                    <p className="text-gray-600 mt-2">
                        New to the platform? Follow these steps:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                        <li>Sign up and complete your profile.</li>
                        <li>Choose a learning path based on your interests.</li>
                        <li>Start courses and track your progress.</li>
                        <li>Engage in discussions and join student communities.</li>
                    </ul>
                </div>

                {/* Account & Profile Management */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FaUser className="text-purple-500" /> Account & Profile
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Need help with your account? Here are common topics:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                        <li>Updating profile information</li>
                        <li>Setting up security & privacy preferences</li>
                        <li>Deleting or deactivating your account</li>
                    </ul>
                </div>

                {/* Course & Learning Assistance */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FaBook className="text-blue-500" /> Learning Paths & Courses
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Find answers about learning paths, courses, and study materials:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                        <li>How do I enroll in a course?</li>
                        <li>What happens when I complete a learning path?</li>
                        <li>Are the courses free or paid?</li>
                    </ul>
                </div>

                {/* Technical Support */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FaTools className="text-red-500" /> Technical Support
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Experiencing issues? Try these steps:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                        <li>Clear your browser cache and refresh the page.</li>
                        <li>Ensure your internet connection is stable.</li>
                        <li>Contact support if the issue persists.</li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FaEnvelope className="text-orange-500" /> Contact Support
                    </h3>
                    <p className="text-gray-600 mt-2">
                        Still need help? Reach out to us:
                    </p>
                    <p className="text-gray-700 font-semibold mt-1">
                        📧 Email: support@ai-learning.com  
                        📞 Phone: +91 98765 43210  
                    </p>
                </div>
            </div>
        </div>
    );
}
