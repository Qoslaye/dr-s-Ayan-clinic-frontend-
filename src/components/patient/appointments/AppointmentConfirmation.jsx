import { FaCheckCircle, FaCalendarAlt, FaClock, FaUserMd, FaMoneyBill } from 'react-icons/fa';

const AppointmentConfirmation = ({ appointmentData, onDone }) => {
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
          Appointment Confirmed!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Your appointment has been successfully scheduled.
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
              <p className="font-medium text-gray-900 dark:text-white">{appointmentData.date}</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <FaClock className="w-5 h-5 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
              <p className="font-medium text-gray-900 dark:text-white">{appointmentData.time}</p>
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

      <div className="space-y-4">
        <button
          onClick={onDone}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Done
        </button>
        <button
          onClick={onDone}
          className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Download Details
        </button>
      </div>
    </div>
  );
};

export default AppointmentConfirmation; 