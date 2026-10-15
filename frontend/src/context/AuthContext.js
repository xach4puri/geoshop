import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const fetchProfile = async () => {
    const token = localStorage.getItem('access');
    if (token) {
      try {
        const res = await api.get('auth/me/');
        setUser(res.data);
      } catch (err) {
        setUser(null);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (username, password) => {
    const res = await api.post('auth/login/', { username, password });
    localStorage.setItem('access', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);
    await fetchProfile();
  };

  const register = async (username, email, password, role = 'user') => {
    await api.post('auth/register/', { username, email, password, role });
    await login(username, password);
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};