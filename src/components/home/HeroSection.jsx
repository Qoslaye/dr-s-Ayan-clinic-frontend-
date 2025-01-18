import DoctorImage from '../../assets/doctor.png';
import SocialBar from '../common/SocialBar';

const HeroSection = () => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300" />
      
      {/* Content */}
      <div className="relative container mx-auto px-16 py-12">
        <div className="flex items-center justify-between">
          {/* Left Content */}
          <div className="w-1/2 pr-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Women's Health<br />
              Care & Support
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              Dedicated to providing specialized care for women's health needs. 
              Schedule your appointment today with our experienced specialist.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex space-x-4 mb-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-200">
                Book Appointment
              </button>
              <button className="border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 px-8 py-3 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200">
                View Services
              </button>
            </div>

            {/* Stats */}
            <div className="flex space-x-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,000+</h3>
                <p className="text-gray-600 dark:text-gray-300">Happy Patients</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">1</h3>
                <p className="text-gray-600 dark:text-gray-300">Specialist Doctor</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">98%</h3>
                <p className="text-gray-600 dark:text-gray-300">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right Content - Doctor Image */}
          <div className="w-1/2">
            <img 
              src={DoctorImage} 
              alt="Doctor" 
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-3xl" />
        
        {/* Social Bar */}
        <SocialBar />
      </div>
    </div>
  );
};

export default HeroSection; 