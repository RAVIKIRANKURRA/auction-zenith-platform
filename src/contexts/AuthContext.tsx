
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

type UserRole = 'admin' | 'seller' | 'bidder';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSeller: boolean;
  isBidder: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: { [key: string]: User & { password: string } } = {
  'admin@example.com': {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin'
  },
  'seller@example.com': {
    id: '2',
    name: 'Seller User',
    email: 'seller@example.com',
    password: 'password123',
    role: 'seller'
  },
  'bidder@example.com': {
    id: '3',
    name: 'Bidder User',
    email: 'bidder@example.com',
    password: 'password123',
    role: 'bidder'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check if user is stored in localStorage on mount
    const storedUser = localStorage.getItem('auctionUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const lowerEmail = email.toLowerCase();
    const mockUser = mockUsers[lowerEmail];
    
    if (mockUser && mockUser.password === password) {
      const { password, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('auctionUser', JSON.stringify(userWithoutPassword));
      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const lowerEmail = email.toLowerCase();
    
    if (mockUsers[lowerEmail]) {
      toast({
        title: "Registration failed",
        description: "This email is already registered",
        variant: "destructive"
      });
      throw new Error('Email already exists');
    }
    
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email: lowerEmail,
      password,
      role
    };
    
    mockUsers[lowerEmail] = newUser;
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('auctionUser', JSON.stringify(userWithoutPassword));
    
    toast({
      title: "Registration successful",
      description: "Your account has been created",
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auctionUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isSeller: user?.role === 'seller',
        isBidder: user?.role === 'bidder'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
