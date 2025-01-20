import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUserFriends, FaChartLine, FaClock, FaCheckCircle, FaChartBar, FaChartPie } from 'react-icons/fa';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DoctorDashboardSidebar from './DoctorDashboardSidebar';
import DoctorDashboardHeader from './DoctorDashboardHeader';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    navigate('/');
  };

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
                  value="5"
                  icon={<FaCalendarAlt className="w-6 h-6" />}
                  bgColor="bg-blue-500"
                />
                <StatCard 
                  title="Pending Appointments"
                  value="12"
                  icon={<FaClock className="w-6 h-6" />}
                  bgColor="bg-yellow-500"
                />
                <StatCard 
                  title="Total Patients"
                  value="120"
                  icon={<FaUserFriends className="w-6 h-6" />}
                  bgColor="bg-green-500"
                />
                <StatCard 
                  title="Completed Today"
                  value="3"
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

          {/* Add other tab content here */}
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
    patientName: "Sarah Johnson",
    type: "General Checkup",
    status: "Upcoming",
    statusColor: "bg-yellow-100 text-yellow-800"
  },
  {
    time: "10:30 AM",
    patientName: "Michael Brown",
    type: "Follow-up",
    status: "Completed",
    statusColor: "bg-green-100 text-green-800"
  },
  // Add more appointments as needed
];

const weekDays = [
  { name: "Mon", appointments: 5 },
  { name: "Tue", appointments: 3 },
  { name: "Wed", appointments: 7 },
  { name: "Thu", appointments: 4 },
  { name: "Fri", appointments: 6 },
  { name: "Sat", appointments: 2 },
  { name: "Sun", appointments: 0 },
];

// Sample Data for Graphs
const appointmentTrends = [
  { date: 'Jan', appointments: 40, completed: 35 },
  { date: 'Feb', appointments: 45, completed: 42 },
  { date: 'Mar', appointments: 35, completed: 30 },
  // Add more months...
];

const appointmentTypes = [
  { name: 'General Checkup', value: 400 },
  { name: 'Follow-up', value: 300 },
  { name: 'Consultation', value: 200 },
  { name: 'Emergency', value: 100 },
];

const ageDistribution = [
  { age: '18-25', patients: 120 },
  { age: '26-35', patients: 250 },
  { age: '36-45', patients: 180 },
  { age: '46-55', patients: 150 },
  { age: '56+', patients: 100 },
];

const monthlyStats = [
  { month: 'Jan', patients: 100, appointments: 150 },
  { month: 'Feb', patients: 120, appointments: 180 },
  { month: 'Mar', patients: 140, appointments: 200 },
  // Add more months...
];

export default DoctorDashboard; 