# Supabase Database Setup

This directory contains SQL migration scripts for the Recipe Finder application.

## Running the Migration

### Option 1: Supabase Dashboard (Recommended for Beginners)

1. Go to your Supabase project dashboard at https://app.supabase.com
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `migrations/20250101000000_initial_schema.sql`
5. Paste it into the SQL editor
6. Click **Run** (or press Cmd/Ctrl + Enter)

### Option 2: Supabase CLI (Advanced)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. Run migrations:
   ```bash
   supabase db push
   ```

## Database Schema Overview

### Tables Created

#### `users`
- Extends Supabase Auth with profile information
- Automatically created when a user signs up (via trigger)
- Fields: `id`, `email`, `name`, `created_at`

#### `recipes`
- Stores user-created recipes
- Fields: `id`, `user_id`, `title`, `description`, `image_url`, `cuisine`, `difficulty`, `prep_time`, `cook_time`, `servings`, `ingredients`, `instructions`, `created_at`
- `ingredients` and `instructions` are stored as JSONB arrays

#### `favorites`
- Many-to-many relationship between users and recipes
- Fields: `id`, `user_id`, `recipe_id`, `created_at`
- Unique constraint prevents duplicate favorites

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

#### Users Table
- ✅ Anyone can view all profiles
- ✅ Users can insert/update/delete their own profile

#### Recipes Table
- ✅ Anyone can view all recipes
- ✅ Authenticated users can create recipes
- ✅ Users can update/delete only their own recipes

#### Favorites Table
- ✅ Anyone can view favorites
- ✅ Users can add/remove only their own favorites

### Automatic Features

- **Auto Profile Creation**: When a user signs up via Supabase Auth, their profile is automatically created in the `users` table
- **Cascade Deletes**: Deleting a user removes all their recipes and favorites
- **Unique Constraints**: Users can't favorite the same recipe twice

## Verifying the Setup

After running the migration, verify it worked:

1. Go to **Table Editor** in Supabase dashboard
2. You should see 3 tables: `users`, `recipes`, `favorites`
3. Go to **Authentication** > **Policies** to see RLS policies

## Next Steps

After running this migration, update your `.env.local` file with your Supabase credentials and proceed with updating the application code to use Supabase instead of localStorage.
