import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  user_id: string;
  name: string | null;
  farm_name: string | null;
  location: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface User extends SupabaseUser {
  profile?: Profile;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends AuthCredentials {
  name: string;
  farmName?: string;
  location?: string;
}

export const authService = {
  // Sign up new user
  async signUp(data: SignUpData): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            name: data.name,
          }
        }
      });

      if (authError) {
        return { user: null, error: authError.message };
      }

      if (!authData.user) {
        return { user: null, error: "Failed to create user" };
      }

      // Update profile with additional data
      if (authData.user && (data.farmName || data.location)) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            farm_name: data.farmName,
            location: data.location
          })
          .eq('user_id', authData.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
        }
      }

      return { user: authData.user as User, error: null };
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Sign in existing user
  async signIn(credentials: AuthCredentials): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        return { user: null, error: error.message };
      }

      return { user: data.user as User, error: null };
    } catch (error) {
      return { user: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Sign out user
  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message || null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Get current user with profile
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      // Fetch profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      return {
        ...user,
        profile: profile || undefined
      } as User;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Update user profile
  async updateProfile(updates: Partial<Profile>): Promise<{ error: string | null }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { error: 'No authenticated user' };
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          name: updates.name,
          farm_name: updates.farm_name,
          location: updates.location,
          avatar_url: updates.avatar_url
        })
        .eq('user_id', user.id);

      return { error: error?.message || null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Reset password
  async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?mode=reset`,
      });

      return { error: error?.message || null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Get current session
  async getSession(): Promise<Session | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  }
};