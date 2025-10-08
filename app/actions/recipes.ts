'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface RecipeInput {
  title: string;
  imageUrl: string;
  cuisine: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
}

export async function addRecipeAction(recipe: RecipeInput) {
  try {
    const supabase = await createClient();

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        error: 'You must be logged in to add a recipe'
      };
    }

    const { data, error } = await supabase
      .from('recipes')
      .insert({
        user_id: user.id,
        title: recipe.title,
        image_url: recipe.imageUrl,
        cuisine: recipe.cuisine,
        difficulty: recipe.difficulty,
        description: recipe.description,
        ingredients: recipe.ingredients as any,
        instructions: recipe.instructions as any,
        prep_time: recipe.prepTime,
        cook_time: recipe.cookTime,
        servings: recipe.servings,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding recipe:', error);
      return {
        success: false,
        error: error.message || 'Failed to add recipe'
      };
    }

    if (!data) {
      return {
        success: false,
        error: 'No data returned from insert'
      };
    }

    // Revalidate the home page to show the new recipe
    revalidatePath('/');

    return {
      success: true,
      recipe: {
        id: data.id,
        title: data.title,
        imageUrl: data.image_url,
        cuisine: data.cuisine,
        difficulty: data.difficulty as 'Easy' | 'Medium' | 'Hard',
        description: data.description,
        ingredients: data.ingredients as string[],
        instructions: data.instructions as string[],
        prepTime: data.prep_time,
        cookTime: data.cook_time,
        servings: data.servings,
        userId: data.user_id,
        createdAt: data.created_at,
      }
    };
  } catch (error: any) {
    console.error('Unexpected error adding recipe:', error);
    return {
      success: false,
      error: error?.message || 'An unexpected error occurred'
    };
  }
}

export async function deleteRecipeAction(recipeId: string) {
  try {
    const supabase = await createClient();

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        error: 'You must be logged in to delete a recipe'
      };
    }

    // Don't allow deleting mock recipes
    if (['1', '2', '3', '4', '5', '6'].includes(recipeId)) {
      return {
        success: false,
        error: 'Cannot delete mock recipes'
      };
    }

    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', recipeId)
      .eq('user_id', user.id); // Ensure user can only delete their own recipes

    if (error) {
      console.error('Error deleting recipe:', error);
      return {
        success: false,
        error: error.message || 'Failed to delete recipe'
      };
    }

    // Revalidate the home page
    revalidatePath('/');

    return { success: true };
  } catch (error: any) {
    console.error('Unexpected error deleting recipe:', error);
    return {
      success: false,
      error: error?.message || 'An unexpected error occurred'
    };
  }
}
