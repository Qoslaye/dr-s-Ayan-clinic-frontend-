import { FaCheckCircle, FaCalendarAlt, FaClock, FaUserMd, FaMoneyBill } from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';

const AppointmentConfirmation = ({ appointmentData, onDone }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleConfirmAppointment = async () => {
    setIsRecording(true);
    setError(null);
    setSuccess(false);
    
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      if (!user || !token) {
        setError('User session expired. Please login again.');
        return;
      }

      // Validate all required fields before sending
      const requiredFields = {
        patient: user._id,
        doctor: '6793e1932df6c6acb3cb0ce8',
        appointmentDate: appointmentData.date,
        appointmentTime: appointmentData.time,
        reason: appointmentData.reason
      };

      // Check for missing fields
      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        setError(`Missing required fields: ${missingFields.join(', ')}`);
        return;
      }

      // Format the date properly
      const formattedDate = new Date(appointmentData.date).toISOString();

      const appointmentPayload = {
        patient: user._id,
        doctor: '6793e1932df6c6acb3cb0ce8', // Dr. Ayaan's ID
        appointmentDate: formattedDate,
        appointmentTime: appointmentData.time,
        reason: appointmentData.reason || 'General checkup',
        status: 'scheduled',
        paymentStatus: appointmentData.paymentType === 'at_hospital' ? 'pending' : 'completed',
        paymentMethod: appointmentData.paymentType || 'at_hospital',
        paymentPhone: appointmentData.phoneNumber || null
      };

      // Debug log to check the data
      console.log('Appointment Payload:', {
        patient: appointmentPayload.patient,
        doctor: appointmentPayload.doctor,
        date: appointmentPayload.appointmentDate,
        time: appointmentPayload.appointmentTime,
        reason: appointmentPayload.reason,
        paymentInfo: {
          status: appointmentPayload.paymentStatus,
          method: appointmentPayload.paymentMethod,
          phone: appointmentPayload.paymentPhone
        }
      });

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios.post(
        'http://localhost:5000/api/appointments',
        appointmentPayload,
        config
      );

      if (response.data && response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          onDone();
        }, 2000);
      } else {
        throw new Error(response.data?.message || 'Server returned unsuccessful response');
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        data: appointmentData
      });
      
      let errorMessage = 'Failed to create appointment. ';
      if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else {
        errorMessage += 'Please check all required fields are filled correctly.';
      }
      
      setError(errorMessage);
    } finally {
      setIsRecording(false);
    }
  };

  const getPaymentMessage = () => {
    if (appointmentData.skipPayment) {
      return {
        title: 'Payment Required',
        message: 'Please complete your payment at the hospital reception before your appointment.',
        icon: 'text-yellow-500'
      };
    }

    if (appointmentData.paymentType === 'local') {
      return {
        title: 'Payment Initiated',
        message: `Your payment will be processed via ${appointmentData.localPaymentMethod === 'evc' ? 'EVC-Plus' : 'E-dahab'}. Please check your phone for confirmation.`,
        phone: appointmentData.phoneNumber,
        icon: 'text-blue-500'
      };
    }

    return {
      title: 'Payment Successful',
      message: 'Thank you! Your payment has been successfully processed.',
      icon: 'text-green-500'
    };
  };

  const paymentInfo = getPaymentMessage();

  return (
    <div className="p-6">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 mb-4">
          <FaCheckCircle className="w-12 h-12 text-green-500 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Confirm Your Appointment
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Please review your appointment details below
        </p>
      </div>
      
      <div className="space-y-4 mb-8">
        {/* Doctor Info */}
        <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <FaUserMd className="w-5 h-5 text-blue-500 mr-3" />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {appointmentData.doctorName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {appointmentData.specialization} • {appointmentData.hospitalName}
            </p>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <FaCalendarAlt className="w-5 h-5 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Date(appointmentData.date).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <FaClock className="w-5 h-5 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {appointmentData.time}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-start">
            <FaMoneyBill className={`w-5 h-5 ${paymentInfo.icon} mr-3 mt-0.5`} />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                {paymentInfo.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {paymentInfo.message}
              </p>
              {paymentInfo.phone && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Payment Phone: {paymentInfo.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-green-600 dark:text-green-400">
            Appointment successfully created! Redirecting...
          </p>
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={handleConfirmAppointment}
          disabled={isRecording || success}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
        >
          {isRecording ? 'Recording Appointment...' : 'Confirm & Record Appointment'}
        </button>
        <button
          onClick={onDone}
          disabled={isRecording}
          className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation; 