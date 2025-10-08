import { supabase } from './supabase';

export interface User {
  id: string;
  name: string;
  email: string;
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Get current logged-in user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    // Fetch user profile from our users table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return null;
    }

    return profile;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Sign up a new user
export async function signup(
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    // Validation
    if (!name.trim()) {
      return { success: false, error: 'Name is required' };
    }

    if (!email.trim()) {
      return { success: false, error: 'Email is required' };
    }

    if (!validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          name: name.trim(),
        },
        emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
      },
    });

    console.log('Signup response:', { authData, authError });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to create user' };
    }

    // Check if email confirmation is required
    if (authData.user && !authData.session) {
      // Email confirmation required - user created but not logged in yet
      return {
        success: true,
        error: '✉️ Account created! Please check your email and click the confirmation link to activate your account.',
        user: undefined // Don't return user until confirmed
      };
    }

    // The user profile is automatically created by the database trigger
    // Wait a moment for the trigger to complete
    await new Promise(resolve => setTimeout(resolve, 500));

    // Fetch the created profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      console.error('Profile fetch error:', profileError);
      return {
        success: false,
        error: 'Account created but profile fetch failed. Please try signing in.'
      };
    }

    return {
      success: true,
      user: profile
    };
  } catch (error: any) {
    console.error('Signup error:', error);
    return {
      success: false,
      error: error?.message || 'An unexpected error occurred during signup'
    };
  }
}

// Sign in a user
export async function signin(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    // Validation
    if (!email.trim()) {
      return { success: false, error: 'Email is required' };
    }

    if (!validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    if (!password) {
      return { success: false, error: 'Password is required' };
    }

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    console.log('Signin response:', { authData, authError });

    if (authError) {
      console.error('Sign in error:', authError);

      // Check if it's an email confirmation error
      if (authError.message.includes('Email not confirmed')) {
        return { success: false, error: 'Please confirm your email before signing in. Check your inbox.' };
      }

      return { success: false, error: 'Invalid email or password' };
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to sign in' };
    }

    // Fetch user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      return {
        success: false,
        error: 'Signed in but failed to fetch profile'
      };
    }

    return {
      success: true,
      user: profile
    };
  } catch (error: any) {
    console.error('Signin error:', error);
    return {
      success: false,
      error: error?.message || 'An unexpected error occurred during sign in'
    };
  }
}

// Sign out the current user
export async function signout(): Promise<void> {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}
