import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const SocialBar = () => {
  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: "#",
      title: "Facebook",
      bgColor: "bg-gradient-to-r from-blue-600 to-blue-500",
      hoverColor: "hover:from-blue-700 hover:to-blue-600",
      iconColor: "text-white"
    },
    {
      icon: <FaYoutube />,
      href: "#",
      title: "YouTube",
      bgColor: "bg-gradient-to-r from-red-600 to-red-500",
      hoverColor: "hover:from-red-700 hover:to-red-600",
      iconColor: "text-white"
    },
    {
      icon: <FaTiktok />,
      href: "#",
      title: "TikTok",
      bgColor: "bg-gradient-to-r from-gray-900 to-gray-800",
      hoverColor: "hover:from-black hover:to-gray-900",
      iconColor: "text-white"
    },
    {
      icon: <FaLinkedinIn />,
      href: "#",
      title: "LinkedIn",
      bgColor: "bg-gradient-to-r from-blue-700 to-blue-600",
      hoverColor: "hover:from-blue-800 hover:to-blue-700",
      iconColor: "text-white"
    }
  ];

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col gap-4 p-3 rounded-full bg-white/10 dark:bg-gray-800/10 backdrop-blur-md shadow-xl border border-white/20 dark:border-gray-700/20">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            className="group relative"
            title={social.title}
          >
            {/* Tooltip */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-white dark:bg-gray-800 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {social.title}
              {/* Arrow */}
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800"></span>
            </span>

            {/* Icon Button */}
            <div className={`
              w-12 h-12 
              flex items-center justify-center 
              rounded-full 
              ${social.bgColor}
              ${social.hoverColor}
              transform hover:scale-110 
              transition-all duration-300 
              shadow-lg hover:shadow-xl
              hover:rotate-[360deg]
              group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]
            `}>
              <div className={`text-xl ${social.iconColor}`}>
                {social.icon}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialBar; 