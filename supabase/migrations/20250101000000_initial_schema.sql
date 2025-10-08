-- Initial Schema for Recipe Finder App
-- This migration creates all tables and sets up Row Level Security

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- =====================================================
-- Note: Supabase Auth handles user authentication
-- This table extends the auth.users table with additional profile info
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);

-- =====================================================
-- RECIPES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  prep_time INTEGER NOT NULL CHECK (prep_time > 0),
  cook_time INTEGER NOT NULL CHECK (cook_time > 0),
  servings INTEGER NOT NULL CHECK (servings > 0),
  ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
  instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS recipes_user_id_idx ON public.recipes(user_id);
CREATE INDEX IF NOT EXISTS recipes_cuisine_idx ON public.recipes(cuisine);
CREATE INDEX IF NOT EXISTS recipes_difficulty_idx ON public.recipes(difficulty);
CREATE INDEX IF NOT EXISTS recipes_created_at_idx ON public.recipes(created_at DESC);

-- =====================================================
-- FAVORITES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES public.recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Ensure a user can only favorite a recipe once
  UNIQUE(user_id, recipe_id)
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS favorites_recipe_id_idx ON public.favorites(recipe_id);
CREATE INDEX IF NOT EXISTS favorites_created_at_idx ON public.favorites(created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- USERS TABLE POLICIES
-- =====================================================

-- Users can view all profiles (for recipe attribution)
CREATE POLICY "Users can view all profiles"
  ON public.users
  FOR SELECT
  USING (true);

-- Users can insert their own profile (on signup)
CREATE POLICY "Users can insert their own profile"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can delete their own profile
CREATE POLICY "Users can delete their own profile"
  ON public.users
  FOR DELETE
  USING (auth.uid() = id);

-- =====================================================
-- RECIPES TABLE POLICIES
-- =====================================================

-- Everyone can view all recipes
CREATE POLICY "Anyone can view recipes"
  ON public.recipes
  FOR SELECT
  USING (true);

-- Authenticated users can create recipes
CREATE POLICY "Authenticated users can create recipes"
  ON public.recipes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own recipes
CREATE POLICY "Users can update their own recipes"
  ON public.recipes
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own recipes
CREATE POLICY "Users can delete their own recipes"
  ON public.recipes
  FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- FAVORITES TABLE POLICIES
-- =====================================================

-- Users can view all favorites (to see favorite counts)
CREATE POLICY "Anyone can view favorites"
  ON public.favorites
  FOR SELECT
  USING (true);

-- Users can add their own favorites
CREATE POLICY "Users can add their own favorites"
  ON public.favorites
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own favorites
CREATE POLICY "Users can delete their own favorites"
  ON public.favorites
  FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- SEED DATA (Optional Mock Recipes)
-- =====================================================

-- Create a system user for mock recipes (optional)
-- You can manually create this user in Supabase Auth dashboard
-- or remove this section if you don't want mock data

COMMENT ON TABLE public.users IS 'User profiles extending Supabase Auth';
COMMENT ON TABLE public.recipes IS 'User-created recipes with ingredients and instructions';
COMMENT ON TABLE public.favorites IS 'User favorites - many-to-many relationship between users and recipes';
