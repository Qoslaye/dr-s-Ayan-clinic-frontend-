import { FaCheckCircle } from 'react-icons/fa';

const CompletedAppointments = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <FaCheckCircle className="text-green-500" />
          Completed Appointments
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
              <th className="pb-4">Date Completed</th>
              <th className="pb-4">Patient Name</th>
              <th className="pb-4">Type</th>
              <th className="pb-4">Notes</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {completedAppointments.map((apt) => (
              <tr key={apt.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-4">
                  <div className="text-gray-900 dark:text-white">{apt.completedDate}</div>
                  <div className="text-gray-500 dark:text-gray-400">{apt.time}</div>
                </td>
                <td className="py-4 text-gray-900 dark:text-white">{apt.patientName}</td>
                <td className="py-4 text-gray-900 dark:text-white">{apt.type}</td>
                <td className="py-4 text-gray-500 dark:text-gray-400 max-w-xs truncate">
                  {apt.notes}
                </td>
                <td className="py-4">
                  <button
                    onClick={() => window.open(`/appointments/report/${apt.id}`, '_blank')}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View Report
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

const completedAppointments = [
  {
    id: 1,
    completedDate: '2024-03-15',
    time: '10:30 AM',
    patientName: 'Sarah Johnson',
    type: 'General Checkup',
    notes: 'Regular checkup completed. Patient in good health.',
    report: 'path/to/report'
  },
  {
    id: 2,
    completedDate: '2024-03-14',
    time: '2:15 PM',
    patientName: 'Emily Davis',
    type: 'Follow-up',
    notes: 'Follow-up visit successful. Symptoms improved.',
    report: 'path/to/report'
  },
  // Add more completed appointments...
];

export default CompletedAppointments; 