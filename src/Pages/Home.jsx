import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import Footer from '../components/layout/Footer';
import SocialBar from '../components/common/SocialBar';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <Footer />
      <SocialBar />
    </div>
  );
};

export default Home; 