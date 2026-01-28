import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../Services/Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // ✅ full user object
  const [loading, setLoading] = useState(true);

  // ✅ Check user is logged-in or not (on reload)
  const fetchCurrentUser = async () => {
    try {
      // ✅ correct route
      const res = await api.get("/api/v1/auth/me", {
        withCredentials: true,
      });

      setUser(res.data.data);
      setIsLoggedIn(true);
    } catch (err) {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // ✅ Call after login success
  const loginUser = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  // ✅ logout state clear
  const logoutUser = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        loginUser,
        logoutUser,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
