import { FaUserCircle, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';

const PatientDashboardHeader = ({ activeTab, handleLogout, patientName = "John Doe" }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center px-8 py-4">
        {/* Left Section - Page Title & Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize mb-1">
            {activeTab.split('-').join(' ')}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getGreeting()}, {patientName.split(' ')[0]}
          </p>
        </div>

        {/* Right Section - Notifications & Profile */}
        <div className="flex items-center space-x-6">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200">
            <FaBell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center border-2 border-white dark:border-gray-800">
              2
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <div className="relative">
                <FaUserCircle className="w-10 h-10 text-blue-600 dark:text-blue-500" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">{patientName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Patient ID: #12345</p>
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                <a href="#profile" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  View Profile
                </a>
                <a href="#settings" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Settings
                </a>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                >
                  <FaSignOutAlt className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="px-8 py-2 bg-gray-50 dark:bg-gray-700/50">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Dashboard / {activeTab.split('-').join(' ')}
        </div>
      </div>
    </header>
  );
};

export default PatientDashboardHeader; 
