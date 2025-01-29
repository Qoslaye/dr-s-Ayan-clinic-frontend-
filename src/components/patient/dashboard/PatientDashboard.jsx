import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCalendar, FaUserMd, FaPlus } from 'react-icons/fa';
import axios from '../../../utils/axios'; // ✅ Ensure correct path
import PatientDashboardHeader from './PatientDashboardHeader';
import PatientDashboardSidebar from './PatientDashboardSidebar';
import AppointmentBooking from '../appointments/AppointmentBooking';

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments');
  const [showBooking, setShowBooking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!user || !token) {
          navigate('/patient/login');
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Fetch user details & appointments
        const [profileRes, appointmentsRes] = await Promise.all([
          axios.get(`/users/${user._id}`, config),
          axios.get(`/appointments/patient/${user._id}`, config)
        ]);

        setPatient(profileRes.data);
        setAppointments(appointmentsRes.data);
      } catch (error) {
        console.error('Dashboard loading error:', error);
        if (error.response?.status === 401) {
          navigate('/patient/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/patient/login');
  };

  const handleBookingClose = () => {
    setShowBooking(false);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <PatientDashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleLogout={handleLogout}
        patientName={patient?.fullName} // ✅ Display User's Name
      />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <PatientDashboardHeader
          activeTab={activeTab}
          handleLogout={handleLogout}
          patientName={patient?.fullName} // ✅ Display User's Name
        />

        <main className="p-8">
          {activeTab === 'appointments' && (
            <>
              {/* Book Appointment Button */}
              <div className="mb-6">
                <button
                  onClick={() => setShowBooking(true)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  <FaPlus />
                  <span>Book New Appointment</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Profile Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <FaUser className="w-12 h-12 text-blue-500" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {patient?.fullName} {/* ✅ Show User's Name */}
                      </h2>
                      <p className="text-gray-500 dark:text-gray-400">{patient?.email}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <InfoItem label="Phone" value={patient?.phone} />
                    <InfoItem label="Age" value={patient?.age} />
                    <InfoItem label="Gender" value={patient?.gender} />
                    <InfoItem label="Marital Status" value={patient?.maritalStatus} />
                    <InfoItem label="Address" value={patient?.address} />
                  </div>
                </div>

                {/* Appointments Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <FaCalendar className="mr-2" />
                    Recent Appointments
                  </h2>
                  <div className="space-y-4">
                    {appointments.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400">No appointments found</p>
                    ) : (
                      appointments.map((appointment) => (
                        <AppointmentItem key={appointment._id} appointment={appointment} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'appointment-history' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Appointment History</h2>
              {/* Add appointment history content */}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Settings</h2>
              {/* Add settings content */}
            </div>
          )}
        </main>
      </div>

      {/* Appointment Booking Modal */}
      {showBooking && <AppointmentBooking onClose={handleBookingClose} />}
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <span className="text-gray-500 dark:text-gray-400">{label}: </span>
    <span className="text-gray-900 dark:text-white">{value || 'N/A'}</span>
  </div>
);

const AppointmentItem = ({ appointment }) => (
  <div className="border-l-4 border-blue-500 pl-4 py-2">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-900 dark:text-white font-medium">
          {new Date(appointment.appointmentDate).toLocaleDateString()}
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {appointment.appointmentTime}
        </p>
      </div>
      <div className="flex items-center text-gray-500 dark:text-gray-400">
        <FaUserMd className="mr-2" />
        <span>{appointment.doctor?.name || 'Doctor'}</span>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 mt-1">
      {appointment.reason}
    </p>
  </div>
);

export default PatientDashboard;
