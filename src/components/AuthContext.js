// AuthContext.js
import React, { createContext, useContext, useState,useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setLoggedIn] = useState(false);

    // useEffect to initialize isLoggedIn from local storage
    useEffect(() => {
        // Check local storage for the authentication state
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
    
        // Set isLoggedIn based on the stored value (or default to false)
        setLoggedIn(storedLoggedIn === 'true');
      }, []);
  
  const login = () => {
    setLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
};
  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
};

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
