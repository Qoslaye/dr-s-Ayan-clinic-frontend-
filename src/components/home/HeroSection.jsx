import DoctorImage from '../../assets/doctor.png';
import { FaCalendarAlt, FaUserMd, FaHospital } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative container mx-auto px-16 py-20">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-1/2 pr-12"
          >
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Expert Women's<br />
              <span className="text-blue-600 dark:text-blue-400">Healthcare</span> Services
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-xl mb-8">
              Providing specialized care for women's health needs with compassion and expertise.
            </p>
            
            <div className="flex space-x-6 mb-12">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
                <FaCalendarAlt className="mr-2" />
                Book Appointment
              </button>
              <button className="border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 px-8 py-4 rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center">
                <FaUserMd className="mr-2" />
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {[
                { number: '1,000+', label: 'Happy Patients' },
                { number: '10+', label: 'Years Experience' },
                { number: '98%', label: 'Success Rate' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.2 }}
                  className="text-center"
                >
                  <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stat.number}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-1/2"
          >
            <div className="relative">
              <img 
                src={DoctorImage} 
                alt="Dr. Ayan Hussein"
                className="w-full h-auto object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <FaHospital className="text-blue-600 text-3xl" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Women's Hope </h3>
                    <p className="text-gray-600 dark:text-gray-300">Modern Healthcare Facility</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 