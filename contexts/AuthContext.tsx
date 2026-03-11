
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  credits: number;
  login: () => Promise<void>;
  logout: () => void;
  deductCredits: (amount: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState(100); // Default starting credits

  const login = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user
    setUser({
      id: 'usr_12345',
      name: 'Cliente Demo',
      email: 'cliente@exemplo.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Cliente+Demo&background=0D8ABC&color=fff'
    });
    setCredits(100); // Reset or fetch credits on login
  };

  const logout = () => {
    setUser(null);
  };

  const deductCredits = (amount: number): boolean => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, credits, login, logout, deductCredits }}>
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
