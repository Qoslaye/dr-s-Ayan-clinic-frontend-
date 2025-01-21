import React from 'react';
import AppointmentTable from './AppointmentTable';
import AppointmentDetails from './AppointmentDetails';
import CompletedAppointments from './CompletedAppointments';

const AppointmentSection = () => {
  const [selectedAppointment, setSelectedAppointment] = React.useState(null);
  const [activeView, setActiveView] = React.useState('upcoming'); // 'upcoming' or 'completed'

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Appointments
        </h2>
        
        {/* View Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveView('upcoming')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeView === 'upcoming'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveView('completed')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeView === 'completed'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {selectedAppointment ? (
        <AppointmentDetails 
          appointment={selectedAppointment}
          onBack={() => setSelectedAppointment(null)}
        />
      ) : (
        <>
          {activeView === 'upcoming' && (
            <AppointmentTable 
              onSelectAppointment={setSelectedAppointment}
            />
          )}
          {activeView === 'completed' && (
            <CompletedAppointments />
          )}
        </>
      )}
    </div>
  );
};

export default AppointmentSection; 