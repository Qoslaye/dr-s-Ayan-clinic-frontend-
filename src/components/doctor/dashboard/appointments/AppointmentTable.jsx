import { FaEye } from 'react-icons/fa';

const AppointmentTable = ({ onSelectAppointment }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
              <th className="pb-4">Date & Time</th>
              <th className="pb-4">Patient Name</th>
              <th className="pb-4">Type</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {appointments.map((apt) => (
              <tr key={apt.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-4">
                  <div className="text-gray-900 dark:text-white">{apt.date}</div>
                  <div className="text-gray-500 dark:text-gray-400">{apt.time}</div>
                </td>
                <td className="py-4 text-gray-900 dark:text-white">{apt.patientName}</td>
                <td className="py-4 text-gray-900 dark:text-white">{apt.type}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(apt.status)}`}>
                    {apt.status}
                  </span>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => onSelectAppointment(apt)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2"
                  >
                    <FaEye /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const appointments = [
  {
    id: 1,
    date: '2024-03-20',
    time: '09:00 AM',
    patientName: 'Amina Mohamed',
    type: 'Prenatal Checkup',
    status: 'Upcoming',
    age: 25,
    gender: 'Female',
    maritalStatus: 'Married',
    occupation: 'Homemaker',
    contact: '+252615123456',
    address: 'Hodan District, Mogadishu',
    medicalHistory: 'First pregnancy',
    reason: 'Regular prenatal checkup',
    symptoms: 'Mild morning sickness',
    paymentStatus: 'Pending',
    paymentMethod: 'Pay at Hospital'
  },
  {
    id: 2,
    date: '2024-03-20',
    time: '10:30 AM',
    patientName: 'Sahra Hassan',
    type: 'Follow-up',
    status: 'Confirmed',
    age: 32,
    gender: 'Female',
    maritalStatus: 'Married',
    occupation: 'Business Owner',
    contact: '+252612345678',
    address: 'Wadajir District, Mogadishu',
    medicalHistory: 'Second pregnancy, previous C-section',
    reason: 'Routine pregnancy checkup',
    symptoms: 'None',
    paymentStatus: 'Paid',
    paymentMethod: 'EVC-Plus'
  },
  // Add more appointments...
];

const getStatusColor = (status) => {
  const colors = {
    'Upcoming': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
  };
  return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
};

export default AppointmentTable; 