import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Navbar from "./Navbar.jsx";
import Services from "./Services.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Sample hero images - replace with your actual farm/agriculture images
  const heroImages = [
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1920&h=1080&fit=crop"
  ];

  // Auto-swap images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleNavClick = (section) => {
     navigate(`/${section}`); 
    
  };

  return (
    <div className="min-h-screen bg-black">
      {/* <Navbar/> */}
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Images with smooth transitions */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={image}
              alt={`Agricultural scene ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
          </div>
        ))}
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-5xl animate-fade-in">
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: t('hero.title') }}
            />
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleNavClick("services")}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                {t('hero.exploreServices')}
              </button>
              <button 
                onClick={() => handleNavClick("services")}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
              >
                {t('hero.governmentSchemes')}
              </button>
            </div>
          </div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Us / Contact Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                dangerouslySetInnerHTML={{ __html: t('about.title') }}
              />
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t('about.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📞</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{t('contact.getInTouch')}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                    <span className="text-gray-700">support@farmersetu.com</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                    <span className="text-gray-700">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                    <span className="text-gray-700">help@farmersetu.com</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🔗</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{t('contact.quickLinks')}</h3>
                </div>
                <div className="space-y-3">
                  <button onClick={() => handleNavClick('about')} className="block w-full text-left text-green-600 hover:text-green-700 font-medium p-3 rounded-lg hover:bg-green-50 transition-all duration-200">
                    {t('footer.aboutUs')}
                  </button>
                  <button onClick={() => handleNavClick('contact')} className="block w-full text-left text-green-600 hover:text-green-700 font-medium p-3 rounded-lg hover:bg-green-50 transition-all duration-200">
                    {t('footer.contact')}
                  </button>
                  <button onClick={() => handleNavClick('privacy')} className="block w-full text-left text-green-600 hover:text-green-700 font-medium p-3 rounded-lg hover:bg-green-50 transition-all duration-200">
                    {t('footer.privacyPolicy')}
                  </button>
                  <button onClick={() => handleNavClick('terms')} className="block w-full text-left text-green-600 hover:text-green-700 font-medium p-3 rounded-lg hover:bg-green-50 transition-all duration-200">
                    {t('footer.termsOfService')}
                  </button>
                  <button onClick={() => handleNavClick('help')} className="block w-full text-left text-green-600 hover:text-green-700 font-medium p-3 rounded-lg hover:bg-green-50 transition-all duration-200">
                    {t('footer.helpCenter')}
                  </button>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🏆</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">{t('contact.certifications')}</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">ISO</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{t('certifications.iso')}</p>
                      <p className="text-sm text-gray-600">{t('certifications.isoDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🌱</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{t('certifications.organic')}</p>
                      <p className="text-sm text-gray-600">{t('certifications.organicDesc')}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
                    <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-sm">🇮🇳</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{t('certifications.government')}</p>
                      <p className="text-sm text-gray-600">{t('certifications.governmentDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl text-white p-12 text-center shadow-2xl">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">{t('mission.title')}</h3>
                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  {t('mission.description')}
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <div className="text-3xl mb-2">🚀</div>
                    <h4 className="font-semibold mb-2">{t('mission.innovation')}</h4>
                    <p className="text-sm">{t('mission.innovationDesc')}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <div className="text-3xl mb-2">🤝</div>
                    <h4 className="font-semibold mb-2">{t('mission.support')}</h4>
                    <p className="text-sm">{t('mission.supportDesc')}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    <div className="text-3xl mb-2">🌱</div>
                    <h4 className="font-semibold mb-2">{t('mission.sustainability')}</h4>
                    <p className="text-sm">{t('mission.sustainabilityDesc')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
                <p className="text-gray-600">{t('stats.farmersConnected')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">200+</div>
                <p className="text-gray-600">{t('stats.governmentSchemes')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
                <p className="text-gray-600">{t('stats.statesCovered')}</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
                <p className="text-gray-600">{t('stats.satisfactionRate')}</p>
              </div>
            </div>

            {/* Services Preview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">🌾</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('services.cropManagement')}</h4>
                <p className="text-gray-600 text-sm">{t('services.cropManagementDesc')}</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">💰</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('services.financialAid')}</h4>
                <p className="text-gray-600 text-sm">{t('services.financialAidDesc')}</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl">📱</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('services.digitalTools')}</h4>
                <p className="text-gray-600 text-sm">{t('services.digitalToolsDesc')}</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 text-2xl">🎓</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('services.training')}</h4>
                <p className="text-gray-600 text-sm">{t('services.trainingDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🌾</span>
                </div>
                <span className="text-2xl font-bold">{t('footer.companyName')}</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {t('footer.description')}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
              <div className="space-y-2">
                <button onClick={() => handleNavClick('about')} className="block text-gray-400 hover:text-white transition-colors">
                  {t('footer.aboutUs')}
                </button>
                <button onClick={() => handleNavClick('services')} className="block text-gray-400 hover:text-white transition-colors">
                  {t('footer.ourServices')}
                </button>
                <button onClick={() => handleNavClick('scheme')} className="block text-gray-400 hover:text-white transition-colors">
                  {t('stats.governmentSchemes')}
                </button>
                <button onClick={() => handleNavClick('careers')} className="block text-gray-400 hover:text-white transition-colors">
                  {t('footer.careers')}
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.officeAddress')}</h4>
              <div className="text-gray-400 space-y-2">
                <p>{t('footer.headquarters')}</p>
                <p>{t('footer.address1')}</p>
                <p>{t('footer.address2')}</p>
                <p className="mt-4">
                  <span className="text-green-400">{t('footer.email')}:</span> info@farmersetu.com
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                <p>{t('footer.copyright')}</p>
              </div>
              <div className="flex space-x-6">
                <button onClick={() => handleNavClick('privacy')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.privacyPolicy')}
                </button>
                <button onClick={() => handleNavClick('terms')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.termsOfService')}
                </button>
                <button onClick={() => handleNavClick('sitemap')} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t('footer.sitemap')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;