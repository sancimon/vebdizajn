"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, getCurrentUser, signout as authSignout } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user on mount
    loadUser();

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session);

      if (event === 'INITIAL_SESSION') {
        // Initial session loaded
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } else if (event === 'SIGNED_IN' && session) {
        // User signed in, fetch their profile
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } else if (event === 'SIGNED_OUT') {
        // User signed out
        setUser(null);
      } else if (event === 'USER_UPDATED' && session) {
        // User updated, refresh profile
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } else if (event === 'TOKEN_REFRESHED') {
        // Token refreshed, update user
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error loading user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authSignout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
