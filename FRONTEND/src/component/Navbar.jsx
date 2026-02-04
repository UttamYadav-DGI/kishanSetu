import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const Navbar = ({ setChatLang }) => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(null);

  // ✅ Role Modal States
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [role, setRole] = useState("");

  // ✅ Role from backend (supports Role or role)
  const userRole = user?.Role || user?.role;

  // Language mapping
  const languages = [
    { name: "English", code: "en", display: "English" },
    { name: "हिंदी", code: "hi", display: "हिंदी" },
    { name: "తెలుగు", code: "te", display: "తెలుగు" },
    { name: "বাংলা", code: "bn", display: "বাংলা" },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsMenuOpen(null);
    setChatLang(langCode);
  };

  const getCurrentLanguageDisplay = () => {
    const currentLang = languages.find((lang) => lang.code === i18n.language);
    return currentLang ? currentLang.display : t("navbar.language");
  };

  // ✅ open role modal
  const openRoleModal = () => {
    setRole("");
    setShowRoleModal(true);
  };

  // ✅ Continue after selecting role (go login page)
  const handleContinue = () => {
    if (!role) {
      alert("Please select a role");
      return;
    }

    setShowRoleModal(false);
    setIsMenuOpen(null);

    navigate("/login", { state: { role } });
  };

  // ✅ Dashboard redirect based on logged-in user role
  const goToDashboard = () => {
    if (userRole === "farmer") navigate("/farmers/dashboard");
    else if (userRole === "buyer") navigate("/buyers/dashboard");
    else if (userRole === "admin") navigate("/admin/dashboard");
    else navigate("/");
  };

  return (
    <nav className="bg-white shadow-md w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-green-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          {t("navbar.logo")}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-green-600">
            {t("navbar.home")}
          </Link>
          <Link to="/about" className="hover:text-green-600">
            {t("navbar.about")}
          </Link>
          <Link to="/chatbot" className="hover:text-green-600">
            {t("navbar.chatbot")}
          </Link>
          <Link to="/services" className="hover:text-green-600">
            {t("navbar.services")}
          </Link>
          <Link to="/contact" className="hover:text-green-600">
            {t("navbar.contact")}
          </Link>

          {/* ✅ Login/Register OR Dashboard */}
          {!isLoggedIn ? (
            <button
              onClick={openRoleModal}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              {t("navbar.loginRegister")}
            </button>
          ) : (
            <button
              onClick={goToDashboard}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Dashboard
            </button>
          )}

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setIsMenuOpen(isMenuOpen === "lang" ? null : "lang")
              }
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <span>{getCurrentLanguageDisplay()}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isMenuOpen === "lang" && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                      i18n.language === lang.code
                        ? "bg-green-50 text-green-600 font-medium"
                        : "text-gray-700"
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

      {/* ✅ Mobile Menu */}
      {isMenuOpen === "menu" && (
        <div className="md:hidden bg-white shadow-md px-4 pt-2 pb-4 space-y-2">
          <Link to="/" className="block py-2 border-b hover:text-green-600">
            {t("navbar.home")}
          </Link>

          <Link to="/about" className="block py-2 border-b hover:text-green-600">
            {t("navbar.about")}
          </Link>

          <Link
            to="/chatbot"
            className="block py-2 border-b hover:text-green-600"
          >
            {t("navbar.chatbot")}
          </Link>

          <Link
            to="/services"
            className="block py-2 border-b hover:text-green-600"
          >
            {t("navbar.services")}
          </Link>

          <Link
            to="/contact"
            className="block py-2 border-b hover:text-green-600"
          >
            {t("navbar.contact")}
          </Link>

          {!isLoggedIn ? (
            <button
              onClick={openRoleModal}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg"
            >
              {t("navbar.loginRegister")}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsMenuOpen(null);
                goToDashboard();
              }}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg"
            >
              Dashboard
            </button>
          )}
        </div>
      )}

      {/* ✅ ROLE MODAL */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] px-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              Select Your Role
            </h2>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="">Choose Role</option>
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowRoleModal(false)}
                className="w-1/2 border border-gray-400 py-2 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleContinue}
                className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
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
