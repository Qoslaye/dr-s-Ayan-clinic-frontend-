import { useState } from 'react';
import axios from '@/utils/axios'; // ✅ Fixed import
import AppointmentBookingForm from './AppointmentBookingForm';
import AppointmentPayment from './AppointmentPayment';
import AppointmentConfirmation from './AppointmentConfirmation';
import AppointmentSuccess from './AppointmentSuccess';

const AppointmentBooking = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [appointmentData, setAppointmentData] = useState({
    doctorId: '6793e1932df6c6acb3cb0ce8',
    doctorName: 'Dr. Ayan Hussein Salad',
    specialization: 'General Practitioner',
    hospitalName: 'Somali Scandinavian Hospital',
  });
  const [isAppointmentSuccessful, setIsAppointmentSuccessful] = useState(false);

  const handleFormSubmit = (data) => {
    setAppointmentData({ ...appointmentData, ...data });
    setStep(2);
  };

  const handlePaymentSubmit = (data) => {
    setAppointmentData({ ...appointmentData, ...data, paymentStatus: data.skipPayment ? 'pending' : 'completed' });
    setStep(3);
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
      };

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.post('/appointments', appointmentPayload, config);

      if (response.data.success) {
        setIsAppointmentSuccessful(true); // ✅ Show success screen
      }
    } catch (error) {
      console.error('Appointment creation error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-xl w-full relative">
        <button onClick={onClose} className="absolute -top-12 right-0 text-white hover:text-gray-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700">
            <div className="h-full bg-blue-600 dark:bg-blue-500" style={{ width: `${(step / 3) * 100}%` }} />
          </div>

          {isAppointmentSuccessful ? (
            <AppointmentSuccess onClose={onClose} />
          ) : step === 1 ? (
            <AppointmentBookingForm onNext={handleFormSubmit} initialData={appointmentData} />
          ) : step === 2 ? (
            <AppointmentPayment appointmentData={appointmentData} onNext={handlePaymentSubmit} />
          ) : (
            <AppointmentConfirmation appointmentData={appointmentData} onDone={handleConfirmation} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
