import { FaUserMd, FaHospital, FaClock } from 'react-icons/fa';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Dr. Ayan Hussein Salad
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dedicated to providing exceptional women's healthcare with a personalized approach to each patient's unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FaUserMd />}
            title="Women's Health Specialist"
            description="Specialized in comprehensive women's healthcare with years of dedicated experience."
          />
          <FeatureCard 
            icon={<FaHospital />}
            title="Modern Clinic"
            description="State-of-the-art facilities designed specifically for women's health and comfort."
          />
          <FeatureCard 
            icon={<FaClock />}
            title="Personalized Care"
            description="Flexible scheduling and dedicated attention to each patient's individual needs."
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