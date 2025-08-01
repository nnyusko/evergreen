import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      console.log('AuthContext: Starting loadUser...');
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log('AuthContext: User loaded from storage:', parsedUser);
        } else {
          console.log('AuthContext: No user found in storage.');
        }
      } catch (e) {
        console.error('AuthContext: Failed to load user from storage', e);
      } finally {
        setIsLoading(false);
        console.log('AuthContext: isLoading set to false.');
      }
    };
    loadUser();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    console.log('AuthContext: User logged in and saved to storage.', userData);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
    console.log('AuthContext: User logged out and removed from storage.');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
