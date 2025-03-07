import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaBell, FaSignOutAlt, FaUser, FaLock, FaTrash, FaDownload, FaShieldAlt, FaEye, FaDatabase } from 'react-icons/fa';

export default function Settings({ darkMode, setDarkMode }) {
    const [isVisible, setIsVisible] = useState(false);
    const [dark, setDark] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [publicProfile, setPublicProfile] = useState(true);

    useEffect(() => {
        setIsVisible(true);
    }, [isVisible]);

    return (
        <div className={`flex flex-col flex-1 m-3 ml-70  transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="p-8 bg-white/40 rounded-lg shadow-lg w-full mx-auto border border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
                
                {/* Theme Toggle */}
                <div className="flex justify-between items-center mt-6 p-4 border-b border-gray-300">
                    <span className="text-lg text-gray-700">Dark Mode</span>
                    <div className="flex items-center gap-3">
                        <FaSun className="text-yellow-500" />
                        <div 
                        className={`w-12 h-6 flex items-center ${dark ? 'bg-green-500' : 'bg-gray-300'} rounded-full p-1 cursor-pointer`}
                        onClick={() => setDark(!dark)}
                    >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform ${dark ? 'translate-x-6' : ''} transition-transform`}></div>
                    </div>
                        <FaMoon className="text-gray-500" />
                    </div>
                </div>

                {/* Notification Toggle */}
                <div className="flex justify-between items-center mt-6 p-4 border-b border-gray-300">
                    <span className="text-lg text-gray-700">Notifications</span>
                    <div 
                        className={`w-12 h-6 flex items-center ${notifications ? 'bg-green-500' : 'bg-gray-300'} rounded-full p-1 cursor-pointer`}
                        onClick={() => setNotifications(!notifications)}
                    >
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform ${notifications ? 'translate-x-6' : ''} transition-transform`}></div>
                    </div>
                </div>

                {/* Privacy & Security */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-800">Privacy & Security</h3>
                    
                    {/* Two-Factor Authentication */}
                    <div className="flex justify-between items-center mt-4 p-4 border-b border-gray-300">
                        <span className="text-lg text-gray-700">Two-Factor Authentication</span>
                        <div 
                            className={`w-12 h-6 flex items-center ${twoFactorAuth ? 'bg-green-500' : 'bg-gray-300'} rounded-full p-1 cursor-pointer`}
                            onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow transform ${twoFactorAuth ? 'translate-x-6' : ''} transition-transform`}></div>
                        </div>
                    </div>

                    {/* Public Profile */}
                    <div className="flex justify-between items-center mt-4 p-4 border-b border-gray-300">
                        <span className="text-lg text-gray-700">Public Profile</span>
                        <div 
                            className={`w-12 h-6 flex items-center ${publicProfile ? 'bg-green-500' : 'bg-gray-300'} rounded-full p-1 cursor-pointer`}
                            onClick={() => setPublicProfile(!publicProfile)}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow transform ${publicProfile ? 'translate-x-6' : ''} transition-transform`}></div>
                        </div>
                    </div>
                </div>

                {/* Storage Usage & Data Management */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-800">Data & Storage</h3>
                    <div className="mt-4 p-4 border-b border-gray-300">
                        <div className="flex justify-between">
                            <span className="text-lg text-gray-700">Used Storage</span>
                            <span className="text-lg font-semibold text-gray-800">1.2GB / 5GB</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                            <div className="bg-blue-500 h-4 rounded-full" style={{ width: "24%" }}></div>
                        </div>
                    </div>
                </div>

                {/* Account Settings */}
                <div className="grid grid-cols-2 gap-4">
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-800">Account</h3>
                    <div className="mt-4 space-y-3">
                        <button className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg w-full transition">
                            <FaUser /> Edit Profile
                        </button>
                        <button className="flex items-center gap-3 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg w-full transition">
                            <FaLock /> Change Password
                        </button>
                        <button className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg w-full transition">
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>

                {/* Advanced Actions */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-800">Advanced Actions</h3>
                    <div className="mt-4 space-y-3">
                        <button className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg w-full transition">
                            <FaDownload /> Download My Data
                        </button>
                        <button className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg w-full transition">
                            <FaTrash /> Delete Account
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
