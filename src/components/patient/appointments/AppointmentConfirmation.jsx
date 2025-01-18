import { FaCheckCircle } from 'react-icons/fa';

const AppointmentConfirmation = ({ appointmentData, onDone }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
      <div className="flex justify-center mb-6">
        <FaCheckCircle className="w-16 h-16 text-green-500" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Appointment Confirmed!
      </h2>

      <div className="space-y-4 mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          Your appointment has been successfully scheduled.
        </p>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">Appointment Details:</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Date: {appointmentData.date}</p>
            <p>Time: {appointmentData.time}</p>
            <p>Payment Method: {appointmentData.paymentMethod === 'local' ? 'Pay at Hospital' : 'Online Payment'}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onDone}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Done
      </button>
    </div>
  );
};

export default AppointmentConfirmation; 