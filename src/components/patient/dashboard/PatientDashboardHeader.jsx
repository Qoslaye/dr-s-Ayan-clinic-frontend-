import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const PatientDashboardHeader = ({ activeTab }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
          {activeTab}
        </h1>
        
        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500">
            <FaBell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <FaUserCircle className="w-8 h-8 text-gray-600 dark:text-gray-300" />
            <div className="text-sm">
              <p className="font-medium text-gray-900 dark:text-white">John Doe</p>
              <p className="text-gray-500 dark:text-gray-400">Patient</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PatientDashboardHeader; 