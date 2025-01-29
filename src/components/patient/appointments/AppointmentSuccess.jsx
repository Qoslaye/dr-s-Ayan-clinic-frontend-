import { FaCheckCircle } from 'react-icons/fa';

const AppointmentSuccess = ({ onClose }) => {
  return (
    <div className="p-6 text-center">
      <FaCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Appointment Confirmed!</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Your appointment has been successfully scheduled.</p>
      <button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
        Close
      </button>
    </div>
  );
};

export default AppointmentSuccess;
