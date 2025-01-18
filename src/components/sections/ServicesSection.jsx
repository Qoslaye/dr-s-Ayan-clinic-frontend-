import { useState } from 'react';
import { MdMedicalServices, MdLocalHospital, MdEmergency } from 'react-icons/md';

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState('general');

  const services = {
    general: {
      title: "Women's General Health",
      description: "Comprehensive women's healthcare services for all stages of life.",
      features: ["Annual Check-ups", "Preventive Care", "Health Consultations"]
    },
    specialist: {
      title: "Specialized Care",
      description: "Expert care for specific women's health concerns.",
      features: ["Reproductive Health", "Prenatal Care", "Gynecological Services"]
    },
    emergency: {
      title: "Urgent Care",
      description: "Priority care for urgent women's health concerns.",
      features: ["Same-day Appointments", "Emergency Consultations", "Follow-up Care"]
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dr. Ayan Hussein Salad provides comprehensive women's healthcare services tailored to your needs.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-700 p-2">
            <TabButton 
              active={activeTab === 'general'} 
              onClick={() => setActiveTab('general')}
              icon={<MdMedicalServices />}
              text="General Medicine"
            />
            <TabButton 
              active={activeTab === 'specialist'} 
              onClick={() => setActiveTab('specialist')}
              icon={<MdLocalHospital />}
              text="Specialist Care"
            />
            <TabButton 
              active={activeTab === 'emergency'} 
              onClick={() => setActiveTab('emergency')}
              icon={<MdEmergency />}
              text="Emergency"
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            {services[activeTab].title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {services[activeTab].description}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services[activeTab].features.map((feature, index) => (
              <li 
                key={index}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const TabButton = ({ active, onClick, icon, text }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
        active 
          ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
          : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {text}
    </button>
  );
};

export default ServicesSection; 