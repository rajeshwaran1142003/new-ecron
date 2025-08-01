import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService, type AuthUser } from '../lib/auth';
import type { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: { full_name?: string; avatar_url?: string }) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAdmin: boolean;
  hasRole: (role: 'user' | 'admin' | 'instructor') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get initial session and user
    const initializeAuth = async () => {
      try {
        const { session } = await AuthService.getCurrentSession();
        setSession(session);
        
        if (session?.user) {
          const userWithProfile = await AuthService.getCurrentUser();
          setUser(userWithProfile);
          setIsAdmin(userWithProfile?.profile?.role === 'admin' || false);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
        setSession(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = AuthService.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      setSession(session);
      
      if (session?.user) {
        const userWithProfile = await AuthService.getCurrentUser();
        setUser(userWithProfile);
        setIsAdmin(userWithProfile?.profile?.role === 'admin' || false);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const { error } = await AuthService.signIn({ email, password });

      if (error) {
        throw error;
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    setLoading(true);
    
    try {
      const { error } = await AuthService.signUp({ 
        email, 
        password, 
        fullName,
        role: 'user' 
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    setLoading(true);
    
    try {
      const { error } = await AuthService.signOut();
      
      if (error) {
        throw error;
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const updateProfile = async (updates: { full_name?: string; avatar_url?: string }) => {
    try {
      const { error } = await AuthService.updateProfile(updates);
      
      if (error) {
        throw error;
      }
      
      // Refresh user data
      const updatedUser = await AuthService.getCurrentUser();
      setUser(updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await AuthService.resetPassword(email);
      
      if (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  };

  const hasRole = (role: 'user' | 'admin' | 'instructor'): boolean => {
    return user?.profile?.role === role || false;
  };
    

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetPassword,
    isAdmin,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};