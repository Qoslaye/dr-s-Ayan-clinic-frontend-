import { useState } from 'react';
import AppointmentBookingForm from './AppointmentBookingForm';
import AppointmentPayment from './AppointmentPayment';
import AppointmentConfirmation from './AppointmentConfirmation';

const AppointmentBooking = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState({
    doctorId: 'dr-ayan-hussein',
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

  const handlePaymentSubmit = (data) => {
    setAppointmentData({
      ...appointmentData,
      ...data,
    });
    setStep(3);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleDone = () => {
    onClose();
    // Reset form but keep doctor info
    setStep(1);
    setAppointmentData({
      doctorId: 'dr-ayan-hussein',
      doctorName: 'Dr. Ayan Hussein Salad',
      specialization: 'General Practitioner',
      hospitalName: 'Somali Scandinavian Hospital',
    });
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

        {/* Steps */}
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
              onDone={handleDone}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking; 