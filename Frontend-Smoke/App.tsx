import React from 'react';
import Routes from './src/routes/Routes';
import { AuthProvider } from './src/auth/AuthContext/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};
