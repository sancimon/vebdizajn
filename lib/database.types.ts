// Database types for Supabase schema
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
