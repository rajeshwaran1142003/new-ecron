import { supabase } from './supabase';
import type { User, Session, AuthError } from '@supabase/supabase-js';

// Types for authentication
export interface AuthUser extends User {
  profile?: {
    full_name: string | null;
    avatar_url: string | null;
    role: 'user' | 'admin' | 'instructor';
  };
}

export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
  role?: 'user' | 'admin' | 'instructor';
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  session: Session | null;
  error: AuthError | null;
}

// Authentication functions
export class AuthService {
  /**
   * Sign up a new user with email and password
   */
  static async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const { email, password, fullName, role = 'user' } = data;

      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (authError) {
        console.error('Sign up error:', authError);
        return { user: null, session: null, error: authError };
      }

      // If user is created, create profile
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: authData.user.email!,
            full_name: fullName || null,
            role: role,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't return error here as user is already created
        }
      }

      return {
        user: authData.user as AuthUser,
        session: authData.session,
        error: null,
      };
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      return {
        user: null,
        session: null,
        error: error as AuthError,
      };
    }
  }

  /**
   * Sign in an existing user
   */
  static async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const { email, password } = data;

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error('Sign in error:', authError);
        return { user: null, session: null, error: authError };
      }

      // Fetch user profile
      const userWithProfile = await this.getUserWithProfile(authData.user.id);

      return {
        user: userWithProfile,
        session: authData.session,
        error: null,
      };
    } catch (error) {
      console.error('Unexpected sign in error:', error);
      return {
        user: null,
        session: null,
        error: error as AuthError,
      };
    }
  }

  /**
   * Sign out the current user
   */
  static async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected sign out error:', error);
      return { error: error as AuthError };
    }
  }

  /**
   * Get current user session
   */
  static async getCurrentSession(): Promise<{ session: Session | null; error: AuthError | null }> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Get session error:', error);
        return { session: null, error };
      }

      return { session, error: null };
    } catch (error) {
      console.error('Unexpected get session error:', error);
      return { session: null, error: error as AuthError };
    }
  }

  /**
   * Get current user with profile data
   */
  static async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        console.error('Get user error:', error);
        return null;
      }

      return await this.getUserWithProfile(user.id);
    } catch (error) {
      console.error('Unexpected get user error:', error);
      return null;
    }
  }

  /**
   * Get user with profile data
   */
  static async getUserWithProfile(userId: string): Promise<AuthUser | null> {
    try {
      const { data: user, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user.user) {
        return null;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, role')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        return user.user as AuthUser;
      }

      return {
        ...user.user,
        profile,
      } as AuthUser;
    } catch (error) {
      console.error('Unexpected get user with profile error:', error);
      return null;
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(updates: {
    full_name?: string;
    avatar_url?: string;
  }): Promise<{ error: AuthError | null }> {
    try {
      const user = await this.getCurrentUser();
      
      if (!user) {
        return { error: new Error('No authenticated user') as AuthError };
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        console.error('Profile update error:', error);
        return { error: error as AuthError };
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected profile update error:', error);
      return { error: error as AuthError };
    }
  }

  /**
   * Reset password
   */
  static async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Password reset error:', error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected password reset error:', error);
      return { error: error as AuthError };
    }
  }

  /**
   * Update password
   */
  static async updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error('Password update error:', error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Unexpected password update error:', error);
      return { error: error as AuthError };
    }
  }

  /**
   * Check if user has specific role
   */
  static async hasRole(role: 'user' | 'admin' | 'instructor'): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return user?.profile?.role === role || false;
    } catch (error) {
      console.error('Role check error:', error);
      return false;
    }
  }

  /**
   * Check if user is admin
   */
  static async isAdmin(): Promise<boolean> {
    return await this.hasRole('admin');
  }

  /**
   * Subscribe to auth state changes
   */
  static onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

// Export individual functions for convenience
export const {
  signUp,
  signIn,
  signOut,
  getCurrentSession,
  getCurrentUser,
  updateProfile,
  resetPassword,
  updatePassword,
  hasRole,
  isAdmin,
  onAuthStateChange,
} = AuthService;