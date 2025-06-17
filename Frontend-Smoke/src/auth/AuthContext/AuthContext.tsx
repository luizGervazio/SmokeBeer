import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextData {
  isLoggedIn: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) setIsLoggedIn(true);
    };
    loadToken();
  }, []);

  const login = async () => {
    const token = await SecureStore.getItemAsync('token');
    if (token) setIsLoggedIn(true);
  };

  const logout = async () => {
    console.log('Deslogando...');
    await SecureStore.deleteItemAsync('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
