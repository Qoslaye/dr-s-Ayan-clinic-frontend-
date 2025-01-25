import { useState } from 'react';
import { FaMobileAlt, FaCreditCard } from 'react-icons/fa';

const AppointmentPayment = ({ appointmentData, onNext, onBack }) => {
  const [paymentType, setPaymentType] = useState('');
  const [selectedLocalMethod, setSelectedLocalMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState('card');

  const localPaymentMethods = [
    { id: 'evc', name: 'EVC Plus', icon: '💳' },
    { id: 'edahab', name: 'eDahab', icon: '📱' }
  ];

  const handlePayment = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      onNext({
        ...appointmentData,
        paymentType,
        localPaymentMethod: selectedLocalMethod,
        phoneNumber,
        onlinePaymentMethod
      });
    } catch (error) {
      console.error('Payment error:', error);
      // Handle payment error
    } finally {
      setLoading(false);
    }
  };

  const handleSkipPayment = () => {
    onNext({
      ...appointmentData,
      skipPayment: true
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Payment Details
      </h2>

      {/* Payment Summary */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
          Appointment Summary
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Consultation Fee: $50
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Select Payment Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPaymentType('local')}
            className={`p-3 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 ${
              paymentType === 'local'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
            }`}
          >
            <FaMobileAlt className="w-4 h-4 text-blue-600" />
            <span className="text-gray-900 dark:text-white font-medium text-sm">
              Mobile Money
            </span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentType('online')}
            className={`p-3 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 ${
              paymentType === 'online'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
            }`}
          >
            <FaCreditCard className="w-4 h-4 text-blue-600" />
            <span className="text-gray-900 dark:text-white font-medium text-sm">
              Card Payment
            </span>
          </button>
        </div>
      </div>

      {/* Payment Forms */}
      {paymentType === 'local' && (
        <div className="space-y-4">
          {/* Local Payment Methods */}
          <div className="space-y-2">
            {localPaymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedLocalMethod(method.id)}
                className={`w-full p-3 text-left border-2 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                  selectedLocalMethod === method.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                }`}
              >
                <span className="text-xl">{method.icon}</span>
                <span className="text-gray-900 dark:text-white font-medium text-sm">
                  {method.name}
                </span>
              </button>
            ))}
          </div>

          {selectedLocalMethod && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mobile Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                  +252
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="flex-1 rounded-r-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent px-4 py-2"
                  required
                />
              </div>
            </div>
          )}

          {selectedLocalMethod && phoneNumber && (
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm Payment'}
            </button>
          )}
        </div>
      )}

      {/* Skip Payment Option */}
      <div className="mt-6 text-center">
        <div className="mb-4">
          <div className="h-px bg-gray-200 dark:bg-gray-700 w-full my-6" />
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Or pay at the hospital
          </p>
          <button
            onClick={handleSkipPayment}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200"
          >
            Pay at Hospital Reception
          </button>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={onBack}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 text-sm"
        >
          ← Back to appointment details
        </button>
      </div>
    </div>
  );
};

export default AppointmentPayment; 