import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Navbar = ({ setChatLang }) => {
  const { isLoggedIn, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [role, setRole] = useState("");

  const userRole = (user?.Role || user?.role || "").toLowerCase();

  const languages = [
    { name: "English", code: "en", display: "English" },
    { name: "हिंदी", code: "hi", display: "हिंदी" },
    { name: "తెలుగు", code: "te", display: "తెలుగు" },
    { name: "বাংলা", code: "bn", display: "বাংলা" },
  ];

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
    return (
      languages.find((lang) => lang.code === i18n.language)?.display ||
      "Language"
    );
  };

  const handleContinue = () => {
    if (!role) return alert("Please select a role");
    navigate("/login", { state: { role } });
    setShowRoleModal(false);
  };

  const goToDashboard = () => {
    if (!userRole) return;

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
          🌱 {t("navbar.logo")}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors ${
                location.pathname === link.path
                  ? "text-green-700 font-bold"
                  : "text-gray-600 hover:text-green-600"
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
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-xl py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`block w-full text-left px-4 py-2 hover:bg-green-50 ${
                      i18n.language === lang.code
                        ? "text-green-600 font-bold"
                        : "text-gray-700"
                    }`}
                  >
                    {lang.display}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AUTH BUTTON */}
        {/* AUTH BUTTON */}
          {loading ? (
            <div className="w-24 h-8 bg-gray-200 rounded-lg animate-pulse" />
          ) : !isLoggedIn ? (
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
      </div>

      {/* ROLE MODAL */}
      {showRoleModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000]"
          onClick={() => setShowRoleModal(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
            <p className="text-gray-600 mb-6">
              Please select your role to continue.
            </p>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border-2 border-gray-200 p-3 rounded-xl"
            >
              <option value="">Select Role...</option>
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowRoleModal(false)}
                className="flex-1 px-4 py-3 rounded-xl border"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="flex-1 px-4 py-3 rounded-xl bg-green-600 text-white"
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
