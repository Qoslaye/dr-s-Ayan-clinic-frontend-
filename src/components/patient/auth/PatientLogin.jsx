import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../nnn'; // ✅ Ensure correct import path
import { FaUser, FaLock, FaHome } from 'react-icons/fa';

const PatientLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await axios.post('/auth/login', credentials);

      console.log('Login Response:', res.data);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        navigate('/patient/dashboard'); // Redirect to patient dashboard
      } else {
        setError('Invalid login response, please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md"
        title="Back to Home"
      >
        <FaHome className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="max-w-md w-full space-y-8">
        {/* User Icon */}
        <div className="flex justify-center">
          <div className="bg-blue-600 dark:bg-blue-500 p-4 rounded-full shadow-lg">
            <FaUser className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Patient Login
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Welcome back to Women's Hope Medical Center
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormField label="Email Address" name="email" type="email" icon={<FaUser />} value={credentials.email} onChange={handleChange} required />
            <FormField label="Password" name="password" type="password" icon={<FaLock />} value={credentials.password} onChange={handleChange} required />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Logging in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ✅ Ensure FormField is defined
const FormField = ({ label, name, type, icon, value, onChange, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
        {icon}
      </div>
      <input
        name={name}
        type={type}
        required={required}
        className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default PatientLogin;
