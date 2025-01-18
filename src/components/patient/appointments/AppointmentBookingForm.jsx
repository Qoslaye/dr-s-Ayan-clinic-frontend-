import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUserMd, FaNotesMedical } from 'react-icons/fa';

const AppointmentBookingForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: '',
    symptoms: ''
  });

  const doctors = [
    { id: 1, name: 'Dr. Ayan Hussein Salad', speciality: 'General Physician' },
    { id: 2, name: 'Dr. Sarah Smith', speciality: 'Cardiologist' },
    { id: 3, name: 'Dr. John Doe', speciality: 'Pediatrician' }
  ];

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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Book New Appointment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Doctor
          </label>
          <div className="relative">
            <FaUserMd className="absolute left-3 top-3 text-gray-400" />
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
              className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white py-2.5"
            >
              <option value="">Select a doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.speciality}
                </option>
              ))}
            </select>
          </div>
        </div>

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
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default AppointmentBookingForm; 