import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(null);

  // Language mapping for display names and codes
  const languages = [
    { name: "English", code: "en", display: "English" },
    { name: "हिंदी", code: "hi", display: "हिंदी" },
    { name: "తెలుగు", code: "te", display: "తెలుగు" },
    { name: "বাংলা", code: "bn", display: "বাংলা" }
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsMenuOpen(null);
    console.log("Language changed to:", langCode);
  };

  const getCurrentLanguageDisplay = () => {
    const currentLang = languages.find(lang => lang.code === i18n.language);
    return currentLang ? currentLang.display : t('navbar.language');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-2xl font-bold text-green-700">{t('navbar.logo')}</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#home" className="hover:text-green-600">{t('navbar.home')}</a>
          <a href="#about" className="hover:text-green-600">{t('navbar.about')}</a>
          <a href="#services" className="hover:text-green-600">{t('navbar.services')}</a>
          <a href="#contact" className="hover:text-green-600">{t('navbar.contact')}</a>
             
          <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
            {t('navbar.loginRegister')}
          </button>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setIsMenuOpen(isMenuOpen === "lang" ? null : "lang")
              }
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <span>{getCurrentLanguageDisplay()}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMenuOpen === "lang" && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                      i18n.language === lang.code ? 'bg-green-50 text-green-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {lang.display}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(isMenuOpen === "menu" ? null : "menu")}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6 text-green-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen === "menu" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen === "menu" && (
        <div className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-2">
          <a href="#home" className="block py-2 border-b hover:text-green-600">{t('navbar.home')}</a>
          <a href="#about" className="block py-2 border-b hover:text-green-600">{t('navbar.about')}</a>
          <a href="#services" className="block py-2 border-b hover:text-green-600">{t('navbar.services')}</a>
          <a href="#contact" className="block py-2 border-b hover:text-green-600">{t('navbar.contact')}</a>
          
          <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
            {t('navbar.loginRegister')}
          </button>
          
          {/* Language Dropdown in Mobile */}
          <div className="relative">
            <button
              onClick={() =>
                setIsMenuOpen(isMenuOpen === "lang" ? "menu" : "lang")
              }
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg flex items-center justify-between"
            >
              <span>{getCurrentLanguageDisplay()}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMenuOpen === "lang" && (
              <div className="mt-2 w-full bg-white border rounded-lg shadow-lg z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code);
                      setIsMenuOpen("menu"); // Keep mobile menu open after language selection
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                      i18n.language === lang.code ? 'bg-green-50 text-green-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {lang.display}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;