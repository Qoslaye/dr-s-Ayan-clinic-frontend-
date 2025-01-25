import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaHome, FaCalendar } from 'react-icons/fa';
import axios from 'axios';

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    age: '',
    maritalStatus: '',
    occupation: '',
    address: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Calculate age if date of birth changes
    if (name === 'dateOfBirth') {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData(prev => ({
        ...prev,
        [name]: value,
        age: age.toString()
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Validate required fields
      const requiredFields = ['fullName', 'email', 'phone', 'password', 'confirmPassword', 'dateOfBirth', 'maritalStatus', 'address'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // First, create user account
      console.log('Sending user registration data:', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: 'patient'
      });

      const userResponse = await axios.post('http://localhost:5000/api/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: 'patient'
      });

      console.log('User registration response:', userResponse.data);

      if (userResponse.data.success) {
        // Prepare patient data
        const patientData = {
          user: userResponse.data.user._id,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          age: parseInt(formData.age),
          gender: 'female',
          maritalStatus: formData.maritalStatus,
          occupation: formData.occupation || '',
          address: formData.address
        };

        console.log('Sending patient data:', patientData);

        // Create patient profile with error handling
        try {
          const response = await axios.post('http://localhost:5000/api/patients/register', {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            dateOfBirth: formData.dateOfBirth,
            age: parseInt(formData.age),
            maritalStatus: formData.maritalStatus,
            occupation: formData.occupation || '',
            address: formData.address
          });

          console.log('Patient creation response:', response.data);

          if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.patient));
            localStorage.setItem('userRole', 'patient');
            navigate('/patient/dashboard');
          }
        } catch (patientError) {
          console.error('Patient creation error:', patientError.response?.data);
          // If patient creation fails, we should handle the created user
          setError(patientError.response?.data?.message || 'Error creating patient profile. Please try again.');
        }
      }
    } catch (err) {
      console.error('Registration error:', err.response?.data || err);
      const errorMessage = err.response?.data?.details?.[0] || 
                         err.response?.data?.message || 
                         'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md"
      >
        <FaHome className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="max-w-4xl w-full space-y-8">
        <div className="flex justify-center">
          <div className="bg-blue-600 dark:bg-blue-500 p-4 rounded-full shadow-lg">
            <FaUser className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Patient Registration Form
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Women's Hope Medical Center
            </p>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg relative mb-6">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                
                <FormField
                  label="Full Name"
                  name="fullName"
                  type="text"
                  icon={<FaUser />}
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

                <FormField
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  icon={<FaCalendar />}
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />

                <FormField
                  label="Age"
                  name="age"
                  type="text"
                  icon={<FaUser />}
                  value={formData.age}
                  onChange={handleChange}
                  disabled
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Marital Status
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className="rounded-lg relative block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                
                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  icon={<FaEnvelope />}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <FormField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  icon={<FaPhone />}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <FormField
                  label="Address"
                  name="address"
                  type="text"
                  icon={<FaHome />}
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Account Security Section */}
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Security</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Password"
                  name="password"
                  type="password"
                  icon={<FaLock />}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <FormField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  icon={<FaLock />}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            <div className="text-center text-sm mt-4">
              <span className="text-gray-600 dark:text-gray-400">Already have an account? </span>
              <button
                type="button"
                onClick={() => navigate('/patient/login')}
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, name, type, icon, value, onChange, required, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {React.cloneElement(icon, { className: "h-5 w-5 text-gray-400" })}
      </div>
      <input
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm disabled:bg-gray-100 dark:disabled:bg-gray-600"
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default PatientRegister; 