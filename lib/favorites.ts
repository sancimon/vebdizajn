const FAVORITES_KEY_PREFIX = "recipe_app_favorites_";

// Get favorites for a specific user
export function getUserFavorites(userId: string): string[] {
  if (typeof window === "undefined") return [];
  const key = FAVORITES_KEY_PREFIX + userId;
  const favorites = localStorage.getItem(key);
  return favorites ? JSON.parse(favorites) : [];
}

// Save favorites for a specific user
function saveUserFavorites(userId: string, favorites: string[]): void {
  const key = FAVORITES_KEY_PREFIX + userId;
  localStorage.setItem(key, JSON.stringify(favorites));
}

// Add a recipe to favorites
export function addToFavorites(userId: string, recipeId: string): void {
  const favorites = getUserFavorites(userId);
  if (!favorites.includes(recipeId)) {
    favorites.push(recipeId);
    saveUserFavorites(userId, favorites);
  }
}

// Remove a recipe from favorites
export function removeFromFavorites(userId: string, recipeId: string): void {
  const favorites = getUserFavorites(userId);
  const filtered = favorites.filter((id) => id !== recipeId);
  saveUserFavorites(userId, filtered);
}

// Check if a recipe is favorited
export function isFavorite(userId: string, recipeId: string): boolean {
  const favorites = getUserFavorites(userId);
  return favorites.includes(recipeId);
}

// Toggle favorite status
export function toggleFavorite(userId: string, recipeId: string): boolean {
  const isFav = isFavorite(userId, recipeId);
  if (isFav) {
    removeFromFavorites(userId, recipeId);
    return false;
  } else {
    addToFavorites(userId, recipeId);
    return true;
  }
}
