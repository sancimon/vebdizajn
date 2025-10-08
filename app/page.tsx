"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RecipeCard } from "@/components/recipe/recipe-card";
import { RecipeModal } from "@/components/recipe/recipe-modal";
import { SearchBar } from "@/components/recipe/search-bar";
import { getAllRecipes, Recipe } from "@/lib/recipes";
import { getUserFavorites, toggleFavorite } from "@/lib/favorites";
import { useAuth } from "@/components/providers/auth-provider";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { Eye, Heart, Sparkles } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [useModalView, setUseModalView] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  // Load recipes on mount
  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    setIsLoadingRecipes(true);
    const recipes = await getAllRecipes();
    setAllRecipes(recipes);
    setIsLoadingRecipes(false);
  };

  // Load favorites when user changes
  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const loadFavorites = async () => {
    if (user) {
      const userFavorites = await getUserFavorites(user.id);
      setFavorites(userFavorites);
    }
  };

  // Filter recipes based on search and filters
  const filteredRecipes = useMemo(() => {
    let filtered = allRecipes;

    // Apply favorites filter
    if (showFavoritesOnly && user) {
      filtered = filtered.filter((recipe) => favorites.includes(recipe.id));
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.ingredients.some((ing) => ing.toLowerCase().includes(query))
      );
    }

    // Apply cuisine filter
    if (cuisineFilter !== "all") {
      filtered = filtered.filter((recipe) => recipe.cuisine === cuisineFilter);
    }

    // Apply difficulty filter
    if (difficultyFilter !== "all") {
      filtered = filtered.filter(
        (recipe) => recipe.difficulty === difficultyFilter
      );
    }

    return filtered;
  }, [
    allRecipes,
    searchQuery,
    cuisineFilter,
    difficultyFilter,
    showFavoritesOnly,
    favorites,
    user,
  ]);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleFavoriteToggle = async (recipeId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      window.location.href = "/signin";
      return;
    }

    await toggleFavorite(user.id, recipeId);
    await loadFavorites();
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCuisineFilter("all");
    setDifficultyFilter("all");
    setShowFavoritesOnly(false);
  };

  const favoriteCount = favorites.length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-32 bg-gradient-to-b from-background via-background to-muted/30 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

        <Container className="relative">
          <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-in zoom-in duration-500">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Welcome to RecipeApp</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent animate-in slide-in-from-bottom-4 duration-700 delay-100">
              Discover & Share Amazing Recipes
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl px-4 animate-in slide-in-from-bottom-4 duration-700 delay-200">
              Join our community of food lovers. Share your favorite recipes and
              explore culinary creations from around the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 animate-in slide-in-from-bottom-4 duration-700 delay-300">
              <Button size="lg" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-lg group w-full sm:w-auto">
                <Link href="/add-recipe">
                  <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                  Share a Recipe
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="transition-all duration-300 hover:scale-105 hover:shadow-md w-full sm:w-auto">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Recipes Section */}
      <section className="py-12 sm:py-16 flex-1">
        <Container>
          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            cuisineFilter={cuisineFilter}
            onCuisineChange={setCuisineFilter}
            difficultyFilter={difficultyFilter}
            onDifficultyChange={setDifficultyFilter}
            onClear={handleClearFilters}
            recipes={allRecipes}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-bold">
                {showFavoritesOnly ? "Favorite Recipes" : "All Recipes"}
              </h2>
              <Badge variant="secondary" className="text-xs sm:text-sm">
                {filteredRecipes.length} recipe
                {filteredRecipes.length !== 1 ? "s" : ""}
              </Badge>
              {user && favoriteCount > 0 && (
                <Badge variant="outline" className="gap-1 text-xs sm:text-sm">
                  <Heart className="h-3 w-3 fill-current text-red-500" />
                  {favoriteCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {user && favoriteCount > 0 && (
                <Button
                  variant={showFavoritesOnly ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className="transition-all duration-200 hover:scale-105"
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${
                      showFavoritesOnly ? "fill-current" : ""
                    }`}
                  />
                  <span className="hidden sm:inline">
                    {showFavoritesOnly ? "Show All" : "Favorites"}
                  </span>
                  <span className="sm:hidden">
                    {showFavoritesOnly ? "All" : "Favs"}
                  </span>
                </Button>
              )}
              <Button
                variant={useModalView ? "default" : "outline"}
                size="sm"
                onClick={() => setUseModalView(!useModalView)}
                className="transition-all duration-200 hover:scale-105"
              >
                <Eye className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">
                  {useModalView ? "Modal" : "Page"}
                </span>
              </Button>
            </div>
          </div>

          {filteredRecipes.length === 0 ? (
            <div className="text-center py-16 sm:py-20 animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted mb-4 sm:mb-6">
                <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">No recipes found</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 px-4">
                No recipes match your current filters
              </p>
              <Button variant="outline" onClick={handleClearFilters} className="hover:scale-105 transition-transform">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredRecipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <RecipeCard
                    recipe={recipe}
                    useModal={useModalView}
                    onClick={
                      useModalView ? () => handleRecipeClick(recipe) : undefined
                    }
                    isFavorite={user ? favorites.includes(recipe.id) : false}
                    onFavoriteToggle={(e) => handleFavoriteToggle(recipe.id, e)}
                    showFavoriteButton={!!user}
                  />
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
