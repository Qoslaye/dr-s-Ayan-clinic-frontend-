import { FaCheckCircle } from 'react-icons/fa';
import axios from '../../../utils/axios'; // ✅ Correct import path
import { useState } from 'react';

const AppointmentConfirmation = ({ appointmentData, onDone }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleConfirmAppointment = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      if (!user || !token) {
        setError('Session expired. Please log in again.');
        return;
      }

      // ✅ Ensure field names match the backend
      const appointmentPayload = {
        patientId: user._id, // ✅ Match backend schema
        doctorId: appointmentData.doctorId, // ✅ Match backend schema
        date: appointmentData.appointmentDate, // ✅ Match backend schema
        time: appointmentData.appointmentTime, // ✅ Match backend schema
        reason: appointmentData.reason || 'General checkup',
        paymentStatus: appointmentData.paymentStatus || 'pending',
        paymentMethod: appointmentData.paymentMethod || 'at_hospital',
      };

      const config = { headers: { Authorization: `Bearer ${token}` } };

      console.log('🚀 Sending Appointment Payload:', appointmentPayload);

      const response = await axios.post('/appointments', appointmentPayload, config);

      console.log('✅ Server Response:', response.data);

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          onDone();
        }, 2000);
      } else {
        throw new Error(response.data.message || 'Failed to create appointment.');
      }
    } catch (error) {
      console.error('❌ Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to create appointment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 text-center">
      <FaCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Confirm Your Appointment</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Review your appointment details before final confirmation.</p>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {success ? (
        <div className="text-green-500 font-medium">Appointment successfully created! Redirecting...</div>
      ) : (
        <button
          onClick={handleConfirmAppointment}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {isLoading ? 'Recording Appointment...' : 'Confirm & Schedule'}
        </button>
      )}
    </div>
  );
};

export default AppointmentConfirmation;
