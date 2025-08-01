import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  console.log('App.js: App component rendered.');
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
