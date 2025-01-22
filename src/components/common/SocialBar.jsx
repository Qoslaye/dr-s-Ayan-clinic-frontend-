import { FaFacebookF, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const SocialBar = () => {
  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: "https://facebook.com/womenshopeclinic",
      title: "Follow us on Facebook",
      bgColor: "bg-gradient-to-r from-blue-600 to-blue-500",
      hoverColor: "hover:from-blue-700 hover:to-blue-600",
      iconColor: "text-white",
      description: "Latest updates and health tips"
    },
    {
      icon: <FaYoutube />,
      href: "https://youtube.com/@womenshopeclinic",
      title: "Subscribe on YouTube",
      bgColor: "bg-gradient-to-r from-red-600 to-red-500",
      hoverColor: "hover:from-red-700 hover:to-red-600",
      iconColor: "text-white",
      description: "Educational health videos and clinic updates"
    },
    {
      icon: <FaTiktok />,
      href: "https://www.tiktok.com/@drs_ayaan_hussein?lang=en",
      title: "Follow us on TikTok",
      bgColor: "bg-gradient-to-r from-gray-900 to-gray-800",
      hoverColor: "hover:from-black hover:to-gray-900",
      iconColor: "text-white",
      description: "Health awareness videos"
    },
    {
      icon: <FaWhatsapp />,
      href: "https://wa.me/252616313663",
      title: "Contact on WhatsApp",
      bgColor: "bg-gradient-to-r from-green-600 to-green-500",
      hoverColor: "hover:from-green-700 hover:to-green-600",
      iconColor: "text-white",
      description: "Quick appointments & inquiries"
    }
  ];

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col gap-4 p-3 rounded-2xl bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg shadow-xl border border-white/20 dark:border-gray-700/20">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            title={social.title}
          >
            {/* Enhanced Tooltip */}
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 min-w-[200px] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl">
                <p className="font-medium text-gray-900 dark:text-white mb-1">
                  {social.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {social.description}
                </p>
                {/* Enhanced Arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-3 h-3 bg-white dark:bg-gray-800 border-r border-t border-gray-200 dark:border-gray-700"></div>
              </div>
            </div>

            {/* Enhanced Icon Button */}
            <div className={`
              w-12 h-12 
              flex items-center justify-center 
              rounded-xl 
              ${social.bgColor}
              ${social.hoverColor}
              transform hover:scale-110 
              transition-all duration-300 
              shadow-lg hover:shadow-xl
              group-hover:rotate-[360deg]
              group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
              dark:group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]
            `}>
              <div className={`text-xl ${social.iconColor} transition-transform duration-300 group-hover:scale-110`}>
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