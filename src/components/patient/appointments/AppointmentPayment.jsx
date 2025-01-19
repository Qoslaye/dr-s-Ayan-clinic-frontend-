import { useState } from 'react';
import { FaMobileAlt, FaCreditCard } from 'react-icons/fa';

const AppointmentPayment = ({ appointmentData, onNext, onBack }) => {
  const [paymentType, setPaymentType] = useState('');
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [selectedLocalMethod, setSelectedLocalMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const localPaymentMethods = [
    { 
      id: 'evc', 
      name: 'EVC-Plus', 
      color: '#2563eb',
      icon: '💳'
    },
    { 
      id: 'edahab', 
      name: 'E-dahab', 
      color: '#2563eb',
      icon: '📱'
    }
  ];

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      onNext({
        ...appointmentData,
        paymentType,
        ...(paymentType === 'local' && {
          localPaymentMethod: selectedLocalMethod,
          phoneNumber: `+252${phoneNumber}`
        }),
        ...(paymentType === 'online' && {
          onlinePaymentMethod
        })
      });
    }, 1500);
  };

  const handleSkipPayment = () => {
    onNext({
      ...appointmentData,
      paymentType: 'local',
      localPaymentMethod: 'cash',
      skipPayment: true
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Payment Details
      </h2>

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
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
            }`}
          >
            <FaMobileAlt className="w-4 h-4 text-blue-600" />
            <span className="text-gray-900 dark:text-white font-medium text-sm">Mobile Money</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentType('online')}
            className={`p-3 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 ${
              paymentType === 'online'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
            }`}
          >
            <FaCreditCard className="w-4 h-4 text-blue-600" />
            <span className="text-gray-900 dark:text-white font-medium text-sm">Card Payment</span>
          </button>
        </div>
      </div>

      {paymentType ? (
        <div className="space-y-6">
          {paymentType === 'local' ? (
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
                <div className="space-y-4">
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
                        className="flex-1 px-3 py-2 rounded-r-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-sm"
                        required
                      />
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={!phoneNumber || loading}
                    className={`w-full px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 text-sm ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                    }`}
                  >
                    {loading ? 'Processing...' : 'Pay Now'}
                  </button>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      You will receive a payment confirmation message on your phone.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="onlinePaymentMethod"
                      value="card"
                      checked={onlinePaymentMethod === 'card'}
                      onChange={(e) => setOnlinePaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600 dark:text-blue-400"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="onlinePaymentMethod"
                      value="paypal"
                      checked={onlinePaymentMethod === 'paypal'}
                      onChange={(e) => setOnlinePaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600 dark:text-blue-400"
                    />
                    <span className="text-gray-700 dark:text-gray-300">PayPal</span>
                  </label>
                </div>
              </div>

              {onlinePaymentMethod === 'card' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Pay Now'
                )}
              </button>
            </form>
          )}
        </div>
      ) : (
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
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Note: Payment must be completed at reception before your appointment
            </p>
          </div>
        </div>
      )}

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