# Supabase Recipes Migration - Complete ✅

## What Was Changed

### 1. **lib/recipes.ts** - Migrated to Supabase Database
All recipe functions now use Supabase instead of localStorage:

- **`getAllRecipes()`** - Fetches from `recipes` table, combines with mock recipes
- **`getRecipeById()`** - Queries by ID from database (checks mock recipes first)
- **`addRecipe()`** - Inserts new recipe into database with user_id
- **`deleteRecipe()`** - Deletes recipe from database (user can only delete own recipes)

**Key Changes:**
- All functions are now `async` (return Promises)
- `addRecipe()` now requires `userId` parameter
- Returns success/error objects for better error handling
- Database field names transformed (snake_case → camelCase)
- Mock recipes still available as fallback if database fails
- Ingredients and instructions stored as JSONB arrays in database

### 2. **app/page.tsx** - Updated Home Page
- Changed `allRecipes` from direct call to state variable
- Added `isLoadingRecipes` state
- Added `loadRecipes()` async function to fetch recipes on mount
- Made `loadFavorites()` async
- Made `handleFavoriteToggle()` async

### 3. **app/add-recipe/page.tsx** - Updated Add Recipe Form
- Modified `addRecipe()` call to include `user.id` parameter
- Added result handling for success/error response
- Displays error message if recipe creation fails

### 4. **app/recipe/[id]/page.tsx** - Updated Recipe Detail Page
- Changed from synchronous to `async` function component
- Added `await` when calling `getRecipeById()`

## Database Schema Used

Recipes are stored in the `recipes` table with these fields:

```sql
- id (UUID, primary key)
- user_id (UUID, references users table)
- title (TEXT)
- image_url (TEXT)
- cuisine (TEXT)
- difficulty (TEXT, check: Easy/Medium/Hard)
- description (TEXT)
- ingredients (JSONB array)
- instructions (JSONB array)
- prep_time (INTEGER, minutes)
- cook_time (INTEGER, minutes)
- servings (INTEGER)
- created_at (TIMESTAMPTZ)
```

## Row Level Security (RLS)

The database enforces these policies:
- ✅ **Anyone** can view all recipes
- ✅ **Authenticated users** can create recipes
- ✅ **Users** can update/delete only their own recipes

## How It Works Now

### Viewing Recipes:
1. Home page loads and calls `getAllRecipes()`
2. Function fetches from Supabase `recipes` table
3. Transforms database records (snake_case → camelCase)
4. Combines database recipes with 6 mock recipes
5. Returns complete list to display

### Creating a Recipe:
1. User fills out add recipe form
2. Form validates all fields
3. Calls `addRecipe(recipeData, user.id)`
4. Function inserts into Supabase with RLS check
5. Returns success with new recipe or error message
6. User redirected to home page

### Viewing Recipe Details:
1. User clicks on a recipe card
2. Next.js calls `getRecipeById(id)` server-side
3. Function checks mock recipes first (IDs 1-6)
4. If not mock, queries Supabase database
5. Transforms and returns recipe data
6. Page renders with recipe details

### Deleting a Recipe:
1. Call `deleteRecipe(recipeId, userId)`
2. RLS policy ensures user can only delete own recipes
3. Mock recipes (IDs 1-6) cannot be deleted
4. Returns success or error message

## Mock Recipes

The 6 original mock recipes are still included:
1. Classic Margherita Pizza (Italian)
2. Chicken Pad Thai (Thai)
3. Beef Tacos with Guacamole (Mexican)
4. Japanese Ramen Bowl (Japanese)
5. Greek Salad with Feta (Greek)
6. French Onion Soup (French)

These appear alongside user-created recipes from the database.

## Testing the Changes

**Requirements:**
1. Supabase credentials in `.env.local`
2. Database migration completed
3. Dev server running

**To test:**
1. Go to home page - should see 6 mock recipes + any database recipes
2. Sign in to your account
3. Click "Add Recipe" and create a new recipe
4. Should see your recipe appear at the top of the home page
5. Click on your recipe to view details
6. Your recipe is now stored in Supabase database

## Error Handling

All functions include proper error handling:
- Network errors return fallback (mock recipes only)
- Database errors logged to console
- User-friendly error messages displayed in UI
- Functions return success/error objects with details

## Next Steps

After testing recipes, proceed with:
```
"Update lib/favorites.ts to use Supabase database:
- getUserFavorites() should fetch from favorites table
- toggleFavorite() should insert/delete from favorites table
- Use proper joins to get recipe details with favorites"
```

## Troubleshooting

**Recipes not loading:**
- Check Supabase credentials in `.env.local`
- Verify database migration ran successfully
- Check browser console for errors
- Should still show mock recipes as fallback

**Can't create recipe:**
- Make sure you're signed in
- Check RLS policies are set up correctly
- Verify user profile exists in `users` table
- Check Supabase logs for errors

**Recipe not appearing after creation:**
- Refresh the page
- Check Supabase Table Editor for the recipe
- Verify `created_at` timestamp is correct
