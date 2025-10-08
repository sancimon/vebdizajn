import { supabase } from './supabase';

// Get favorites for a specific user (returns array of recipe IDs)
export async function getUserFavorites(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('recipe_id')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }

    // Return array of recipe IDs
    return (data || []).map((fav: { recipe_id: string }) => fav.recipe_id);
  } catch (error) {
    console.error('Unexpected error fetching favorites:', error);
    return [];
  }
}

// Add a recipe to favorites
export async function addToFavorites(
  userId: string,
  recipeId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        recipe_id: recipeId,
      });

    if (error) {
      // Check if it's a unique constraint violation (already favorited)
      if (error.code === '23505') {
        return { success: true }; // Already favorited, treat as success
      }
      console.error('Error adding to favorites:', error);
      return {
        success: false,
        error: error.message || 'Failed to add to favorites'
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Unexpected error adding to favorites:', error);
    return {
      success: false,
      error: error?.message || 'An unexpected error occurred'
    };
  }
}

// Remove a recipe from favorites
export async function removeFromFavorites(
  userId: string,
  recipeId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('recipe_id', recipeId);

    if (error) {
      console.error('Error removing from favorites:', error);
      return {
        success: false,
        error: error.message || 'Failed to remove from favorites'
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Unexpected error removing from favorites:', error);
    return {
      success: false,
      error: error?.message || 'An unexpected error occurred'
    };
  }
}

// Check if a recipe is favorited
export async function isFavorite(
  userId: string,
  recipeId: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('recipe_id', recipeId)
      .single();

    if (error) {
      // Not found is not an error, just means not favorited
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Unexpected error checking favorite:', error);
    return false;
  }
}

// Toggle favorite status (add if not favorited, remove if favorited)
export async function toggleFavorite(
  userId: string,
  recipeId: string
): Promise<{ success: boolean; isFavorited: boolean; error?: string }> {
  try {
    // Check if already favorited
    const isCurrentlyFavorited = await isFavorite(userId, recipeId);

    if (isCurrentlyFavorited) {
      // Remove from favorites
      const result = await removeFromFavorites(userId, recipeId);
      return {
        success: result.success,
        isFavorited: false,
        error: result.error
      };
    } else {
      // Add to favorites
      const result = await addToFavorites(userId, recipeId);
      return {
        success: result.success,
        isFavorited: true,
        error: result.error
      };
    }
  } catch (error: any) {
    console.error('Unexpected error toggling favorite:', error);
    return {
      success: false,
      isFavorited: false,
      error: error?.message || 'An unexpected error occurred'
    };
  }
}

// Get all favorited recipes with full recipe details (using join)
export async function getUserFavoritedRecipes(userId: string) {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        recipe_id,
        recipes (
          id,
          title,
          image_url,
          cuisine,
          difficulty,
          description,
          ingredients,
          instructions,
          prep_time,
          cook_time,
          servings,
          user_id,
          created_at
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching favorited recipes:', error);
      return [];
    }

    // Transform the joined data to Recipe interface
    return (data || []).map(fav => {
      const recipe = fav.recipes as any;
      return {
        id: recipe.id,
        title: recipe.title,
        imageUrl: recipe.image_url,
        cuisine: recipe.cuisine,
        difficulty: recipe.difficulty as "Easy" | "Medium" | "Hard",
        description: recipe.description,
        ingredients: recipe.ingredients as string[],
        instructions: recipe.instructions as string[],
        prepTime: recipe.prep_time,
        cookTime: recipe.cook_time,
        servings: recipe.servings,
        userId: recipe.user_id,
        createdAt: recipe.created_at,
      };
    });
  } catch (error) {
    console.error('Unexpected error fetching favorited recipes:', error);
    return [];
  }
}
