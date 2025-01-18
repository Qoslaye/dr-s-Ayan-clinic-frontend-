import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import PatientDashboardSidebar from './PatientDashboardSidebar';
import PatientDashboardHeader from './PatientDashboardHeader';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <PatientDashboardSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout}
      />
      
      {/* Main Content */}
      <div className={`flex-1 ml-64 transition-all duration-300`}>
        {/* Header */}
        <PatientDashboardHeader activeTab={activeTab} />
        
        {/* Main Content Area */}
        <main className="p-8">
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {/* Add new appointment logic */}}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Book New Appointment
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
                        Upcoming Appointment
                      </span>
                    </div>
                    <span className="text-sm text-blue-600 dark:text-blue-500 font-medium">
                      Tomorrow
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    General Checkup
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    With Dr. Ayan Hussein Salad
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      10:00 AM
                    </span>
                    <button className="text-sm text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="space-y-6">
              {/* Add Medical Records content */}
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="space-y-6">
              {/* Add Prescriptions content */}
            </div>
          )}

          {activeTab === 'doctors' && (
            <div className="space-y-6">
              {/* Add Doctors content */}
            </div>
          )}

          {activeTab === 'departments' && (
            <div className="space-y-6">
              {/* Add Departments content */}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              {/* Add Notifications content */}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Add Settings content */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard; 