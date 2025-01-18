import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import DoctorLogin from './components/doctor/DoctorLogin';
import PatientLogin from './components/patient/auth/PatientLogin';
import PatientRegister from './components/patient/auth/PatientRegister';
import PatientDashboard from './components/patient/dashboard/PatientDashboard';
import DoctorDashboard from './components/doctor/dashboard/DoctorDashboard';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
