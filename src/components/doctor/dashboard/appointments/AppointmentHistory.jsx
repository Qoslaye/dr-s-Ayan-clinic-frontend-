import React, { useState } from 'react';
import { FaHistory, FaSearch, FaFileMedical, FaNotesMedical, FaMoneyBill, FaMoneyCheck } from 'react-icons/fa';

const AppointmentHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredHistory = appointmentHistory.filter(history =>
    history.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FaHistory className="text-blue-600" />
          Appointment History
        </h2>
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {selectedPatient ? (
        <PatientHistoryDetail 
          patient={selectedPatient} 
          onBack={() => setSelectedPatient(null)}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Patient Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Visit Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Visit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Medical History
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {filteredHistory.map((history) => (
                  <tr key={history.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {history.patientName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {history.patientId}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {history.visitCount} visits
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {history.lastVisit}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {history.conditions.map((condition, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          >
                            {condition}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedPatient(history)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const PatientHistoryDetail = ({ patient, onBack }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          ← Back
        </button>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Patient History: {patient.patientName}
        </h3>
      </div>

      {/* Patient Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaFileMedical />
            Patient Overview
          </h4>
          <div className="space-y-2">
            <DetailRow label="Patient ID" value={patient.patientId} />
            <DetailRow label="Age" value={patient.age} />
            <DetailRow label="Gender" value={patient.gender} />
            <DetailRow label="Marital Status" value={patient.maritalStatus} />
            <DetailRow label="Occupation" value={patient.occupation} />
            <DetailRow label="Blood Type" value={patient.bloodType} />
            <DetailRow label="Total Visits" value={`${patient.visitCount} visits`} />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FaNotesMedical />
            Medical Summary
          </h4>
          <div className="space-y-2">
            <DetailRow label="Chronic Conditions" value={patient.conditions.join(', ')} />
            <DetailRow label="Allergies" value={patient.allergies.join(', ')} />
            <DetailRow label="Current Medications" value={patient.medications.join(', ')} />
          </div>
        </div>
      </div>

      {/* Visit History */}
      <div className="mt-8">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Visit History
        </h4>
        <div className="space-y-4">
          {patient.visits.map((visit, index) => (
            <div 
              key={index}
              className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    {visit.date}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {visit.type}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(visit.status)}`}>
                  {visit.status}
                </span>
              </div>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Symptoms:</strong> {visit.symptoms}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Diagnosis:</strong> {visit.diagnosis}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Prescription:</strong> {visit.prescription}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Notes:</strong> {visit.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-sm text-gray-600 dark:text-gray-400">{label}:</span>
    <span className="text-sm text-gray-900 dark:text-white font-medium">{value}</span>
  </div>
);

// Sample data
const appointmentHistory = [
  {
    id: 1,
    patientId: "P001",
    patientName: "Fatima Ahmed",
    age: 28,
    gender: "Female",
    maritalStatus: "Married",
    occupation: "Teacher",
    bloodType: "O+",
    visitCount: 5,
    lastVisit: "2024-03-15",
    conditions: ["Pregnancy", "Mild Hypertension"],
    allergies: ["None"],
    medications: ["Prenatal vitamins", "Iron supplements"],
    visits: [
      {
        date: "2024-03-15",
        type: "Prenatal Checkup",
        status: "Completed",
        paymentStatus: "Paid",
        paymentMethod: "EVC-Plus",
        symptoms: "Mild morning sickness, fatigue",
        diagnosis: "Normal pregnancy progression",
        prescription: "Continue prenatal vitamins",
        notes: "Fetal development on track"
      },
      {
        date: "2024-02-15",
        type: "Initial Consultation",
        status: "Completed",
        paymentStatus: "Paid",
        paymentMethod: "Hospital Reception",
        symptoms: "Pregnancy confirmation needed",
        diagnosis: "Confirmed pregnancy - 8 weeks",
        prescription: "Started prenatal vitamins",
        notes: "First prenatal visit completed"
      }
    ]
  },
  // Add more patient histories with similar structure
];

const getStatusColor = (status) => {
  const colors = {
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Scheduled': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };
  return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
};

const getPaymentStatusIcon = (status, method) => {
  if (status === 'Paid') {
    return method === 'Hospital Reception' ? 
      <FaMoneyCheck className="text-green-500" /> : 
      <FaMoneyBill className="text-green-500" />;
  }
  return null;
};

export default AppointmentHistory;