import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaHome } from 'react-icons/fa';
import axios from 'axios';

const PatientLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', credentials);

      // Login request
      const response = await axios.post('http://localhost:5000/api/patients/login', credentials);

      console.log('Login response:', response.data);

      if (response.data.success) {
        // Store user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.patient));
        localStorage.setItem('userRole', 'patient');

        // Get patient profile
        const profileResponse = await axios.get(
          `http://localhost:5000/api/patients/profile/${response.data.patient._id}`,
          {
            headers: {
              Authorization: `Bearer ${response.data.token}`
            }
          }
        );

        // Store patient profile
        localStorage.setItem('patientProfile', JSON.stringify(profileResponse.data.data));

        // Navigate to dashboard
        navigate('/patient/dashboard');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md"
        title="Back to Home"
      >
        <FaHome className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <div className="bg-blue-600 dark:bg-blue-500 p-4 rounded-full shadow-lg">
            <FaUser className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Patient Login
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Welcome back to Women's Hope Medical Center
            </p>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center text-sm">
              <span className="text-gray-600 dark:text-gray-400">Don't have an account? </span>
              <button
                type="button"
                onClick={() => navigate('/patient/register')}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Register now
              </button>
            </div>
          </form>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientLogin; 