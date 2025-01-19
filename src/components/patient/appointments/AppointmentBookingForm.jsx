import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUserMd, FaNotesMedical } from 'react-icons/fa';

const AppointmentBookingForm = ({ onNext, initialData }) => {
  const [formData, setFormData] = useState({
    doctorId: 'dr-ayan-hussein',
    doctorName: 'Dr. Ayan Hussein Salad',
    specialization: 'General Practitioner',
    hospitalName: 'Somali Scandinavian Hospital',
    date: '',
    time: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="p-6">
      {/* Doctor Info Card - Read only */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
            <FaUserMd className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white font-medium">
              {formData.doctorName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formData.specialization} • {formData.hospitalName}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preferred Date
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preferred Time
            </label>
            <div className="relative">
              <FaClock className="absolute left-3 top-3 text-gray-400" />
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2.5"
              >
                <option value="">Select time</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Reason for Visit
          </label>
          <div className="relative">
            <FaNotesMedical className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows="3"
              className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2.5"
              placeholder="Please describe your reason for visit"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default AppointmentBookingForm; 