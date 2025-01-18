import { FaCalendarAlt, FaUserCircle, FaClipboardList, FaBell, FaCog, FaSignOutAlt, FaHospital, FaUserMd, FaPrescription } from 'react-icons/fa';
import { useState } from 'react';

const PatientDashboardSidebar = ({ activeTab, setActiveTab, handleLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      title: 'Appointments',
      icon: <FaCalendarAlt className="w-5 h-5" />,
      id: 'appointments',
      badge: 2 // Number of upcoming appointments
    },
    {
      title: 'Medical Records',
      icon: <FaClipboardList className="w-5 h-5" />,
      id: 'records'
    },
    {
      title: 'Prescriptions',
      icon: <FaPrescription className="w-5 h-5" />,
      id: 'prescriptions',
      badge: 1 // New prescriptions
    },
    {
      title: 'My Doctors',
      icon: <FaUserMd className="w-5 h-5" />,
      id: 'doctors'
    },
    {
      title: 'Departments',
      icon: <FaHospital className="w-5 h-5" />,
      id: 'departments'
    },
    {
      title: 'Notifications',
      icon: <FaBell className="w-5 h-5" />,
      id: 'notifications',
      badge: 3 // Unread notifications
    },
    {
      title: 'Settings',
      icon: <FaCog className="w-5 h-5" />,
      id: 'settings'
    }
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo and Collapse Button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="relative">
              <FaUserCircle className="w-10 h-10 text-blue-600 dark:text-blue-500" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Patient Portal</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back!</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center' : 'justify-between'
              } px-4 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                {!isCollapsed && <span>{item.title}</span>}
              </div>
              {!isCollapsed && item.badge && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activeTab === item.id
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200"
          >
            <svg
              className={`w-6 h-6 transform transition-transform duration-200 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`w-full mt-4 flex items-center ${
              isCollapsed ? 'justify-center' : 'justify-start space-x-3'
            } px-4 py-2.5 rounded-lg text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200`}
          >
            <FaSignOutAlt className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default PatientDashboardSidebar; 