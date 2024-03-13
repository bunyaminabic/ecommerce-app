// AuthProvider.js
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedLoggedIn = localStorage.getItem("loggedIn");

    if (storedLoggedIn && storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(JSON.parse(storedLoggedIn));
    }
  }, []);

  const login = (data) => {
    setLoggedIn(true);
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("loggedIn", JSON.stringify(true));
  };

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
  };

  const values = {
    loggedIn,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
