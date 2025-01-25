import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import DoctorLogin from './components/doctor/DoctorLogin';
import PatientLogin from './components/patient/auth/PatientLogin';
import PatientRegister from './components/patient/auth/PatientRegister';
import PatientDashboard from './components/patient/dashboard/PatientDashboard';
import DoctorDashboard from './components/doctor/dashboard/DoctorDashboard';

// Protected Route Components
const PatientProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token || userRole !== 'patient') {
    return <Navigate to="/patient/login" />;
  }
  return children;
};

const DoctorProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  if (!token || userRole !== 'doctor') {
    return <Navigate to="/doctor/login" />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          
          {/* Patient Routes */}
          <Route 
            path="/patient/dashboard" 
            element={
              <PatientProtectedRoute>
                <PatientDashboard />
              </PatientProtectedRoute>
            } 
          />
          
          {/* Doctor Routes */}
          <Route 
            path="/doctor/dashboard" 
            element={
              <DoctorProtectedRoute>
                <DoctorDashboard />
              </DoctorProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
