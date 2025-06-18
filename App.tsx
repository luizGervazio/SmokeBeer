import React from 'react';
import Routes from './src/routes/Routes';
import { AuthProvider } from './src/auth/AuthContext/AuthContext';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </PaperProvider>
  );
};
