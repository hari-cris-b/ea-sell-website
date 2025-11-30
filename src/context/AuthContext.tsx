import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signup: (email: string, name: string, city: string, password: string, referralCode?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('forexea_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('forexea_user');
      }
    }
    setIsLoading(false);
  }, []);

  const signup = async (email: string, name: string, city: string, password: string, referralCode?: string) => {
    setIsLoading(true);
    try {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('customer_users')
        .select('*')
        .eq('email', email)
        .single();

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create user in Supabase
      const { data, error } = await supabase
        .from('customer_users')
        .insert([
          {
            email,
            name,
            city,
            referral_code: referralCode || null
          }
        ])
        .select()
        .single();

      if (error) throw error;

      const newUser: User = {
        id: data.id,
        email: data.email,
        name: data.name,
        city: data.city,
        referralCode: data.referral_code,
        createdAt: data.created_at
      };

      setUser(newUser);
      localStorage.setItem('forexea_user', JSON.stringify(newUser));
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Fetch user from Supabase
      const { data, error } = await supabase
        .from('customer_users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) {
        throw new Error('Invalid email or password');
      }

      const loggedInUser: User = {
        id: data.id,
        email: data.email,
        name: data.name,
        city: data.city,
        referralCode: data.referral_code,
        createdAt: data.created_at
      };

      setUser(loggedInUser);
      localStorage.setItem('forexea_user', JSON.stringify(loggedInUser));
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('forexea_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('forexea_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}