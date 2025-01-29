import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../nnn'; // ✅ Ensure correct import path
import { FaUser, FaLock, FaEnvelope, FaPhone, FaHome, FaCalendar } from 'react-icons/fa';

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    maritalStatus: '',
    occupation: '',
    address: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dateOfBirth') {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData((prev) => ({ ...prev, [name]: value, age: age.toString() }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post('/auth/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        occupation: formData.occupation,
        address: formData.address,
        role: 'patient'
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/patient/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Registration failed.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md"
        title="Back to Home"
      >
        <FaHome className="w-5 h-5" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="max-w-4xl w-full space-y-8">
        {/* User Icon */}
        <div className="flex justify-center">
          <div className="bg-blue-600 dark:bg-blue-500 p-4 rounded-full shadow-lg">
            <FaUser className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Patient Registration Form
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Women's Hope Medical Center
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg relative">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Registration Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Full Name" name="fullName" type="text" icon={<FaUser />} value={formData.fullName} onChange={handleChange} required />
              <FormField label="Email" name="email" type="email" icon={<FaEnvelope />} value={formData.email} onChange={handleChange} required />
              <FormField label="Phone" name="phone" type="text" icon={<FaPhone />} value={formData.phone} onChange={handleChange} required />
              <FormField label="Date of Birth" name="dateOfBirth" type="date" icon={<FaCalendar />} value={formData.dateOfBirth} onChange={handleChange} required />
              <FormField label="Age" name="age" type="text" icon={<FaUser />} value={formData.age} disabled />
              <FormField label="Address" name="address" type="text" icon={<FaHome />} value={formData.address} onChange={handleChange} required />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              <FormField label="Password" name="password" type="password" icon={<FaLock />} value={formData.password} onChange={handleChange} required />
              <FormField label="Confirm Password" name="confirmPassword" type="password" icon={<FaLock />} value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <button type="submit" disabled={isLoading} className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all">
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, name, type, icon, value, onChange, required, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
        {icon}
      </div>
      <input name={name} type={type} required={required} disabled={disabled} className="w-full pl-10 p-2 border rounded-lg" value={value} onChange={onChange} />
    </div>
  </div>
);

export default PatientRegister;
