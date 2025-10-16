import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance'; // Assuming you have an axios instance for API calls

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const logout = (redirect = true) => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    if (redirect) {
      navigate('/otp/login'); // Redirect to login page on logout
    }
  };

  // This function could be expanded to actually validate the token with the backend
  // For now, it just checks for the presence of a token
  const checkSession = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  // Axios interceptor for session expiration
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          // Unauthorized, likely session expired
          logout();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, checkSession, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
