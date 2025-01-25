import { useState } from 'react';
import axios from 'axios';
import AppointmentBookingForm from './AppointmentBookingForm';
import AppointmentPayment from './AppointmentPayment';
import AppointmentConfirmation from './AppointmentConfirmation';

const AppointmentBooking = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState({
    doctorId: '6793e1932df6c6acb3cb0ce8', // Use the actual MongoDB ObjectId
    doctorName: 'Dr. Ayan Hussein Salad',
    specialization: 'General Practitioner',
    hospitalName: 'Somali Scandinavian Hospital',
  });

  const handleFormSubmit = (data) => {
    setAppointmentData({
      ...appointmentData,
      ...data,
    });
    setStep(2);
  };

  const handlePaymentSubmit = async (data) => {
    try {
      // Update appointment data with payment info
      setAppointmentData({
        ...appointmentData,
        ...data,
        paymentStatus: data.skipPayment ? 'pending' : 'completed',
        paymentMethod: data.paymentType || 'at_hospital',
        paymentPhone: data.phoneNumber || null
      });
      
      // Move to confirmation step
      setStep(3);
    } catch (error) {
      console.error('Payment submission error:', error);
      // Handle error (show error message to user)
    }
  };

  const handleConfirmation = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      const appointmentPayload = {
        patient: user._id,
        doctor: appointmentData.doctorId,
        appointmentDate: appointmentData.date,
        appointmentTime: appointmentData.time,
        reason: appointmentData.reason,
        paymentStatus: appointmentData.paymentStatus,
        paymentMethod: appointmentData.paymentMethod,
        paymentPhone: appointmentData.paymentPhone
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Create the appointment in the database
      const response = await axios.post(
        'http://localhost:5000/api/appointments',
        appointmentPayload,
        config
      );

      if (response.data.success) {
        // Close the modal and refresh the appointments list
        onClose();
      }
    } catch (error) {
      console.error('Appointment creation error:', error);
      // Handle error (show error message to user)
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-xl w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-200 transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          {step === 1 && (
            <AppointmentBookingForm 
              onNext={handleFormSubmit} 
              initialData={appointmentData}
            />
          )}
          {step === 2 && (
            <AppointmentPayment
              appointmentData={appointmentData}
              onNext={handlePaymentSubmit}
              onBack={handleBack}
            />
          )}
          {step === 3 && (
            <AppointmentConfirmation
              appointmentData={appointmentData}
              onDone={handleConfirmation}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking; 