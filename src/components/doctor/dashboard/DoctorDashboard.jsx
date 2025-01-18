import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import DoctorDashboardSidebar from './DoctorDashboardSidebar';
import DoctorDashboardHeader from './DoctorDashboardHeader';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <DoctorDashboardSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout}
      />
      
      {/* Main Content */}
      <div className={`flex-1 ml-64 transition-all duration-300`}>
        {/* Header */}
        <DoctorDashboardHeader activeTab={activeTab} />
        
        {/* Main Content Area */}
        <main className="p-8">
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {/* Add new appointment logic */}}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Schedule Appointment
                </button>
              </div>

              {/* Appointment Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Example Appointment Card */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <FaCalendarAlt className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Next Patient
                      </span>
                    </div>
                    <span className="text-sm text-blue-600 dark:text-blue-500 font-medium">
                      In 15 mins
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <FaUserFriends className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Sarah Johnson
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        General Checkup
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      10:00 AM
                    </span>
                    <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add other tab content here */}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard; 