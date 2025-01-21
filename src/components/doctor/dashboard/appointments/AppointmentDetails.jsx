import { FaArrowLeft, FaUser, FaPhone, FaNotesMedical, FaCalendarAlt } from 'react-icons/fa';

const AppointmentDetails = ({ appointment, onBack }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <FaArrowLeft className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Appointment Details
        </h3>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Information */}
        <div className="space-y-4">
          <DetailCard
            icon={<FaUser />}
            title="Patient Information"
            items={[
              { label: 'Name', value: appointment.patientName },
              { label: 'Age', value: appointment.age },
              { label: 'Gender', value: appointment.gender },
              { label: 'Marital Status', value: appointment.maritalStatus },
              { label: 'Occupation', value: appointment.occupation }
            ]}
          />
          
          <DetailCard
            icon={<FaPhone />}
            title="Contact Information"
            items={[
              { label: 'Phone', value: appointment.contact },
              { label: 'Address', value: appointment.address }
            ]}
          />
        </div>

        {/* Appointment Information */}
        <div className="space-y-4">
          <DetailCard
            icon={<FaCalendarAlt />}
            title="Appointment Information"
            items={[
              { label: 'Date', value: appointment.date },
              { label: 'Time', value: appointment.time },
              { label: 'Type', value: appointment.type },
              { label: 'Status', value: appointment.status },
              { label: 'Payment Status', value: appointment.paymentStatus },
              { label: 'Payment Method', value: appointment.paymentMethod || 'Pay at Hospital' }
            ]}
          />

          <DetailCard
            icon={<FaNotesMedical />}
            title="Medical Information"
            items={[
              { label: 'Reason for Visit', value: appointment.reason },
              { label: 'Medical History', value: appointment.medicalHistory },
              { label: 'Symptoms', value: appointment.symptoms }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ icon, title, items }) => (
  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
    <div className="flex items-center mb-3">
      <div className="text-blue-600 dark:text-blue-400 mr-2">
        {icon}
      </div>
      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </h4>
    </div>
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">{item.label}:</span>
          <span className="text-gray-900 dark:text-white font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default AppointmentDetails; 