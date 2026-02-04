import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Navbar = ({ setChatLang }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu toggle
  const [isLangOpen, setIsLangOpen] = useState(false); // Desktop lang dropdown toggle
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [role, setRole] = useState("");

  const userRole = user?.Role || user?.role;

  const languages = [
    { name: "English", code: "en", display: "English" },
    { name: "हिंदी", code: "hi", display: "हिंदी" },
    { name: "తెలుగు", code: "te", display: "తెలుగు" },
    { name: "বাংলা", code: "bn", display: "বাংলা" },
  ];

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLangOpen(false);
  }, [location]);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setChatLang(langCode);
    setIsLangOpen(false);
    setIsMenuOpen(false);
  };

  const getCurrentLanguageDisplay = () => {
    return languages.find((lang) => lang.code === i18n.language)?.display || "Language";
  };

  const handleContinue = () => {
    if (!role) return alert("Please select a role");
    setShowRoleModal(false);
    navigate("/login", { state: { role } });
  };

  const goToDashboard = () => {
    const routes = {
      farmer: "/farmers/dashboard",
      buyer: "/buyers/dashboard",
      admin: "/admin/dashboard",
    };
    navigate(routes[userRole] || "/");
  };

  const navLinks = [
    { name: t("navbar.home"), path: "/" },
    { name: t("navbar.about"), path: "/about" },
    { name: t("navbar.chatbot"), path: "/chatbot" },
    { name: t("navbar.services"), path: "/services" },
    { name: t("navbar.contact"), path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-green-700 cursor-pointer flex items-center"
          onClick={() => navigate("/")}
        >
          <span className="mr-2">🌱</span> {t("navbar.logo")}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors ${
                location.pathname === link.path ? "text-green-700 font-bold" : "text-gray-600 hover:text-green-600"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition"
            >
              <span>{getCurrentLanguageDisplay()}</span>
              <svg className={`w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-xl py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`block w-full text-left px-4 py-2 hover:bg-green-50 ${i18n.language === lang.code ? "text-green-600 font-bold" : "text-gray-700"}`}
                  >
                    {lang.display}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!isLoggedIn ? (
            <button
              onClick={() => setShowRoleModal(true)}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
            >
              {t("navbar.loginRegister")}
            </button>
          ) : (
            <button
              onClick={goToDashboard}
              className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition shadow-md"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-green-700">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl p-4 space-y-4">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="block text-lg text-gray-700 hover:text-green-600 py-2 border-b border-gray-50">
              {link.name}
            </Link>
          ))}

          {/* Mobile Language Selection */}
          <div className="py-2">
            <p className="text-sm font-semibold text-gray-400 mb-2 uppercase">Switch Language</p>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`py-2 rounded-md border ${i18n.language === lang.code ? "bg-green-600 text-white" : "bg-gray-50 text-gray-700"}`}
                >
                  {lang.display}
                </button>
              ))}
            </div>
          </div>

          {!isLoggedIn ? (
            <button
              onClick={() => setShowRoleModal(true)}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold"
            >
              {t("navbar.loginRegister")}
            </button>
          ) : (
            <button
              onClick={goToDashboard}
              className="w-full bg-green-700 text-white py-3 rounded-lg font-bold"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      )}

      {/* ROLE MODAL */}
      {showRoleModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] px-4"
          onClick={() => setShowRoleModal(false)} // Close on click outside
        >
          <div 
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
            <p className="text-gray-600 mb-6">Please select your role to continue.</p>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-green-500 outline-none transition"
            >
              <option value="">Select Role...</option>
              <option value="farmer">Farmer (किसान)</option>
              <option value="buyer">Buyer (खरीददार)</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowRoleModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="flex-1 px-4 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition shadow-lg shadow-green-200"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;