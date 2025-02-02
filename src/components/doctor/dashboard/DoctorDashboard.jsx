import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUserFriends, FaChartLine, FaClock, FaCheckCircle, FaChartBar, FaChartPie } from 'react-icons/fa';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DoctorDashboardSidebar from './DoctorDashboardSidebar';
import DoctorDashboardHeader from './DoctorDashboardHeader';
import AppointmentSection from './appointments/AppointmentSection';
import AppointmentHistory from './appointments/AppointmentHistory';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [doctorInfo, setDoctorInfo] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    if (!user || !token || user.role !== 'doctor') {
      navigate('/doctor/login');
      return;
    }

    setDoctorInfo(user);
  }, [navigate]);

  const handleLogout = () => {
    // Clear all localStorage items
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('doctorName');
    
    navigate('/doctor/login');
  };

  if (!doctorInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <DoctorDashboardSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout}
      />
      
      {/* Main Content */}
      <div className={`flex-1 ml-64 transition-all duration-300 overflow-y-auto`}>
        {/* Header */}
        <DoctorDashboardHeader activeTab={activeTab} />
        
        {/* Main Content Area */}
        <main className="p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Today's Appointments"
                  value="8"
                  icon={<FaCalendarAlt className="w-6 h-6" />}
                  bgColor="bg-blue-500"
                />
                <StatCard 
                  title="Pending Payments"
                  value="3"
                  icon={<FaClock className="w-6 h-6" />}
                  bgColor="bg-yellow-500"
                />
                <StatCard 
                  title="Total Patients"
                  value="145"
                  icon={<FaUserFriends className="w-6 h-6" />}
                  bgColor="bg-green-500"
                />
                <StatCard 
                  title="Completed Today"
                  value="5"
                  icon={<FaCheckCircle className="w-6 h-6" />}
                  bgColor="bg-purple-500"
                />
              </div>

              {/* Appointment Trends Graph */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Appointment Trends
                </h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={appointmentTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="appointments" stroke="#3B82F6" />
                      <Line type="monotone" dataKey="completed" stroke="#10B981" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Two Column Layout for Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Appointment Types Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Appointment Types
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={appointmentTypes}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        />
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Patient Age Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Patient Age Distribution
                  </h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ageDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="patients" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Today's Schedule
                </h2>
                <div className="space-y-4">
                  {/* Appointment List */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="text-left text-sm text-gray-500">
                          <th className="pb-4">Time</th>
                          <th className="pb-4">Patient Name</th>
                          <th className="pb-4">Type</th>
                          <th className="pb-4">Status</th>
                          <th className="pb-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {todayAppointments.map((apt, index) => (
                          <tr key={index} className="border-t border-gray-200">
                            <td className="py-4">{apt.time}</td>
                            <td className="py-4">{apt.patientName}</td>
                            <td className="py-4">{apt.type}</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${apt.statusColor}`}>
                                {apt.status}
                              </span>
                            </td>
                            <td className="py-4">
                              <button className="text-blue-600 hover:text-blue-800">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Monthly Statistics */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Monthly Statistics
                </h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="patients" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="appointments" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Weekly Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Weekly Overview
                </h2>
                <div className="grid grid-cols-7 gap-4">
                  {weekDays.map((day, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{day.name}</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{day.appointments}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">appointments</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <AppointmentSection />
          )}

          {activeTab === 'appointment-history' && (
            <AppointmentHistory />
          )}
        </main>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon, bgColor }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-full ${bgColor} bg-opacity-10`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
      </div>
    </div>
  </div>
);

// Sample Data
const todayAppointments = [
  {
    time: "09:00 AM",
    patientName: "Amina Mohamed",
    type: "Prenatal Checkup",
    status: "Upcoming",
    statusColor: "bg-yellow-100 text-yellow-800"
  },
  {
    time: "10:30 AM",
    patientName: "Sahra Hassan",
    type: "Follow-up",
    status: "Completed",
    statusColor: "bg-green-100 text-green-800"
  },
  {
    time: "11:45 AM",
    patientName: "Fadumo Ali",
    type: "Ultrasound",
    status: "In Progress",
    statusColor: "bg-blue-100 text-blue-800"
  }
];

const weekDays = [
  { name: "Isn", appointments: 8 },
  { name: "Isn", appointments: 6 },
  { name: "Tld", appointments: 9 },
  { name: "Arb", appointments: 7 },
  { name: "Kms", appointments: 8 },
  { name: "Jmc", appointments: 4 },
  { name: "Sbt", appointments: 0 }
];

// Sample Data for Graphs
const appointmentTrends = [
  { date: 'Jan', appointments: 120, completed: 110, paymentPending: 10 },
  { date: 'Feb', appointments: 140, completed: 125, paymentPending: 15 },
  { date: 'Mar', appointments: 165, completed: 150, paymentPending: 15 },
  { date: 'Apr', appointments: 180, completed: 160, paymentPending: 20 }
];

const appointmentTypes = [
  { name: 'Prenatal Checkup', value: 450 },
  { name: 'Ultrasound', value: 300 },
  { name: 'Follow-up', value: 250 },
  { name: 'General Consultation', value: 150 }
];

const ageDistribution = [
  { age: '18-24', patients: 180 },
  { age: '25-30', patients: 280 },
  { age: '31-35', patients: 220 },
  { age: '36-40', patients: 160 },
  { age: '41+', patients: 110 }
];

const monthlyStats = [
  { month: 'Jan', patients: 85, appointments: 120 },
  { month: 'Feb', patients: 95, appointments: 140 },
  { month: 'Mar', patients: 110, appointments: 165 },
  { month: 'Apr', patients: 125, appointments: 180 }
];

// Payment methods distribution
const paymentMethods = [
  { name: 'EVC-Plus', value: 450 },
  { name: 'E-dahab', value: 280 },
  { name: 'Hospital Reception', value: 270 }
];

// Add new chart for payment methods
const PaymentMethodsChart = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Payment Methods Distribution
    </h2>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={paymentMethods}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default DoctorDashboard; 