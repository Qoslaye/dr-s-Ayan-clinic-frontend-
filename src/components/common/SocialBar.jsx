import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const SocialBar = () => {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col gap-6 bg-white/90 dark:bg-gray-800/90 p-4 rounded-full shadow-lg backdrop-blur-sm">
        <a 
          href="#" 
          className="hover:scale-110 transition-transform duration-200"
          title="Facebook"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <FaFacebookF className="text-2xl text-blue-600 dark:text-blue-400" />
          </div>
        </a>
        <a 
          href="#" 
          className="hover:scale-110 transition-transform duration-200"
          title="Instagram"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
            <FaInstagram className="text-2xl text-pink-600 dark:text-pink-400" />
          </div>
        </a>
        <a 
          href="#" 
          className="hover:scale-110 transition-transform duration-200"
          title="TikTok"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900/30">
            <FaTiktok className="text-2xl text-gray-800 dark:text-gray-300" />
          </div>
        </a>
        <a 
          href="#" 
          className="hover:scale-110 transition-transform duration-200"
          title="Twitter"
        >
          
        </a>
      </div>
    </div>
  );
};

export default SocialBar; 