import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-20 pb-8">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"></div>
      
      <div className="container mx-auto px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Clinic Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-blue-400">Dr. Ayan Hussein</h3>
            <p className="text-gray-300 mb-6">
              Dedicated to providing exceptional women's healthcare with compassion and expertise.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram].map((Icon, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-400">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Services', 'Book Appointment', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-400">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-300">
                <FaPhone className="mr-3 text-blue-400" />
                <span>+252 61 XXX XXXX</span>
              </li>
              <li className="flex items-center text-gray-300">
                <FaEnvelope className="mr-3 text-blue-400" />
                <span>contact@womenshope.so</span>
              </li>
              <li className="flex items-start text-gray-300">
                <FaMapMarkerAlt className="mr-3 mt-1 text-blue-400" />
                <span>Women's Hope Hospital<br />Mogadishu, Somalia</span>
              </li>
            </ul>
          </div>

          {/* Clinic Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-400">Clinic Hours</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 - 17:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 - 14:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
              <li className="mt-4 text-blue-400 font-semibold">
                24/7 Emergency Care Available
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dr. Ayan Hussein - Women's Hope Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 