import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import Logo from '../../assets/logo.webp';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label="Toggle Theme"
    >
      <div className={`
        absolute w-6 h-6 rounded-full bg-white dark:bg-gray-800 shadow transform transition-transform duration-300
        ${darkMode ? 'translate-x-6' : 'translate-x-0'}
      `} />
      <div className="relative flex items-center justify-between w-12">
        <FaSun className="text-yellow-500 text-sm ml-1" />
        <FaMoon className="text-gray-400 text-sm mr-1" />
      </div>
    </button>
  );
};

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 py-4 px-16 shadow-sm transition-colors duration-200 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={handleHomeClick}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <img src={Logo} alt="Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">Women's Hope</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-8">
          <button 
            onClick={handleHomeClick}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
          >
            About Us
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
          >
            Our Services
          </button>
          <button 
            onClick={() => navigate('/doctor/login')} 
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
          >
            Doctor Login
          </button>
        </div>

        {/* Theme Toggle & Patient Auth Buttons */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="flex space-x-2">
            <button 
              onClick={() => navigate('/patient/login')}
              className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/patient/register')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 