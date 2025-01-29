import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios'; // ✅ Correct axios import path
import { FaUserMd, FaLock, FaHome } from 'react-icons/fa';

const DoctorLogin = () => {
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

      if (res.data.token && res.data.user.role === 'doctor') {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/doctor/dashboard'); // ✅ Redirect to Doctor Dashboard
      } else {
        setError('Only doctors can log in.');
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
        className="absolute top-6 left-6 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md"
      >
        <FaHome className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="max-w-md w-full space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-blue-600 dark:bg-blue-500 p-4 rounded-full shadow-lg">
            <FaUserMd className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Doctor Login
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Welcome back, please log in to your account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormField label="Email Address" name="email" type="email" icon={<FaUserMd />} value={credentials.email} onChange={handleChange} required />
            <FormField label="Password" name="password" type="password" icon={<FaLock />} value={credentials.password} onChange={handleChange} required />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Security Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

// FormField Component for Reusability
const FormField = ({ label, name, type, icon, value, onChange, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        name={name}
        type={type}
        required={required}
        className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors duration-200"
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default DoctorLogin;
