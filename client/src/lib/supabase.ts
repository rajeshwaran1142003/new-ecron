import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});

// Auth event listeners for debugging (remove in production)
if (import.meta.env.DEV) {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event, session?.user?.email);
  });
}

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'user' | 'admin' | 'instructor';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'user' | 'admin' | 'instructor';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'user' | 'admin' | 'instructor';
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          course_interest: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          course_interest?: string | null;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string;
          course_interest?: string | null;
          message?: string;
          created_at?: string;
        };
      };
      course_applications: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          course_name: string;
          experience_level: string;
          interest_message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          course_name: string;
          experience_level: string;
          interest_message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          course_name?: string;
          experience_level?: string;
          interest_message?: string;
          created_at?: string;
        };
      };
      demo_applications: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string;
          course_for_demo: string;
          available_time: string;
          preferred_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email: string;
          course_for_demo: string;
          available_time: string;
          preferred_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          email?: string;
          course_for_demo?: string;
          available_time?: string;
          preferred_date?: string | null;
          created_at?: string;
        };
      };
      newsletter_subscriptions: {
        Row: {
          email: string;
          created_at: string;
        };
        Insert: {
          email: string;
          created_at?: string;
        };
        Update: {
          email?: string;
          created_at?: string;
        };
      };
      event_registrations: {
        Row: {
          id: string;
          name: string;
          degree: string;
          year: string;
          college_name: string;
          university_name: string;
          contact_number: string;
          alternate_number: string | null;
          email_id: string;
          certificate_code: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          degree: string;
          year: string;
          college_name: string;
          university_name: string;
          contact_number: string;
          alternate_number?: string | null;
          email_id: string;
          certificate_code: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          degree?: string;
          year?: string;
          college_name?: string;
          university_name?: string;
          contact_number?: string;
          alternate_number?: string | null;
          email_id?: string;
          certificate_code?: string;
          created_at?: string;
        };
      };
    };
  };
}