import { createBrowserClient } from '@supabase/ssr';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.'
  );
}

// Create browser client for client-side usage (recommended for Next.js 14 App Router)
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// Database types (we'll expand this later with actual schema)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          created_at?: string;
        };
      };
      recipes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          image_url: string;
          cuisine: string;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          prep_time: number;
          cook_time: number;
          servings: number;
          ingredients: string[];
          instructions: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          image_url: string;
          cuisine: string;
          difficulty: 'Easy' | 'Medium' | 'Hard';
          prep_time: number;
          cook_time: number;
          servings: number;
          ingredients: string[];
          instructions: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string;
          image_url?: string;
          cuisine?: string;
          difficulty?: 'Easy' | 'Medium' | 'Hard';
          prep_time?: number;
          cook_time?: number;
          servings?: number;
          ingredients?: string[];
          instructions?: string[];
          created_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          recipe_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          recipe_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          recipe_id?: string;
          created_at?: string;
        };
      };
    };
  };
};
