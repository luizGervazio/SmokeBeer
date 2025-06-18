import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

interface AuthContextData {
  isLoggedIn: boolean;
  roles: string[];
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);

  // 👉 função para verificar se o token expirou
  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: any = jwtDecode(token);
      if (!decoded.exp) return true;

      const currentTime = Math.floor(Date.now() / 1000); // em segundos
      return decoded.exp < currentTime;
    } catch {
      return true; // token inválido = considerado expirado
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token && !isTokenExpired(token)) {
        setIsLoggedIn(true);
        try {
          const decoded: any = jwtDecode(token);
          setRoles(Array.isArray(decoded.roles) ? decoded.roles : []);
        } catch {
          setRoles([]);
        }
      } else {
        await SecureStore.deleteItemAsync('token');
        setIsLoggedIn(false);
        setRoles([]);
      }
    };
    loadToken();
  }, []);

  const login = async () => {
    const token = await SecureStore.getItemAsync('token');
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
      try {
        const decoded: any = jwtDecode(token);
        setRoles(Array.isArray(decoded.roles) ? decoded.roles : []);
      } catch {
        setRoles([]);
      }
    } else {
      await SecureStore.deleteItemAsync('token');
      setIsLoggedIn(false);
      setRoles([]);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
