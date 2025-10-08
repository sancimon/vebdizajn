-- TEMPORARY FIX: Disable RLS on recipes table to test if everything else works
-- Run this in Supabase SQL Editor

ALTER TABLE public.recipes DISABLE ROW LEVEL SECURITY;

-- This will allow anyone to create/view recipes
-- We'll fix the proper auth issue after we confirm everything else works
