import { FaUserMd, FaHospital, FaClock, FaStethoscope, FaHeartbeat } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Women's Hope Clinic
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A modern healthcare facility dedicated to providing comprehensive women's healthcare services in Mogadishu, with a focus on maternal care and women's wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FaUserMd />}
            title="Expert Medical Team"
            description="Our experienced doctors specialize in women's health, providing compassionate care with modern medical expertise."
          />
          <FeatureCard 
            icon={<FaHospital />}
            title="Modern Facilities"
            description="State-of-the-art medical equipment and comfortable environment for all your healthcare needs."
          />
          <FeatureCard 
            icon={<FaStethoscope />}
            title="Comprehensive Care"
            description="From prenatal care to general women's health services, we provide complete healthcare solutions."
          />
          <FeatureCard 
            icon={<FaHeartbeat />}
            title="Emergency Services"
            description="24/7 emergency care available for urgent medical needs with quick response times."
          />
          <FeatureCard 
            icon={<FaClock />}
            title="Flexible Scheduling"
            description="Easy appointment booking with convenient timing options to fit your schedule."
          />
          <FeatureCard 
            icon={<FaHospital />}
            title="Modern Technology"
            description="Advanced ultrasound and diagnostic equipment for accurate and timely care."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default AboutSection; 