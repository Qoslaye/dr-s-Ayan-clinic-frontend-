import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Dr. Ayan Hussein Salad</h3>
            <p className="text-gray-400">
              Dedicated to providing exceptional women's healthcare services for a healthier future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-blue-400">About Dr. Ayan</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400">Services</a></li>
              <li><a href="#appointment" className="text-gray-400 hover:text-blue-400">Book Appointment</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <FaPhone className="mr-3" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FaEnvelope className="mr-3" />
                <span>dr.ayan@womenshope.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FaMapMarkerAlt className="mr-3" />
                <span>Women's Hope Medical Center, New York, NY</span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Clinic Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
              <li>Saturday: 10:00 AM - 2:00 PM</li>
              <li>Sunday: Closed</li>
              <li className="mt-2 text-blue-400">Emergency: By Appointment</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Dr. Ayan Hussein Salad - Women's Hope. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 