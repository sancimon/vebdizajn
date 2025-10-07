"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/lib/recipes";
import { Clock, ChefHat, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
  useModal?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: (e: React.MouseEvent) => void;
  showFavoriteButton?: boolean;
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function RecipeCard({
  recipe,
  onClick,
  useModal = false,
  isFavorite = false,
  onFavoriteToggle,
  showFavoriteButton = false,
}: RecipeCardProps) {
  const totalTime = recipe.prepTime + recipe.cookTime;

  const cardContent = (
    <Card
      className={cn(
        "h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer",
        isFavorite && "ring-2 ring-red-500 ring-offset-2"
      )}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {recipe.cuisine}
            </Badge>
          </div>
          {showFavoriteButton && onFavoriteToggle && (
            <div className="absolute top-2 left-2">
              <Button
                size="icon"
                variant={isFavorite ? "default" : "secondary"}
                className={cn(
                  "h-9 w-9 rounded-full backdrop-blur-sm transition-all duration-200",
                  isFavorite
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-background/80 hover:bg-background"
                )}
                onClick={onFavoriteToggle}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-all duration-200",
                    isFavorite && "fill-current"
                  )}
                />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors flex-1">
            {recipe.title}
          </h3>
          {isFavorite && (
            <Heart className="h-5 w-5 text-red-500 fill-current flex-shrink-0" />
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {recipe.description}
        </p>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{totalTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="h-4 w-4 text-muted-foreground" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Badge className={difficultyColors[recipe.difficulty]}>
          {recipe.difficulty}
        </Badge>
      </CardFooter>
    </Card>
  );

  if (useModal && onClick) {
    return (
      <div className="group" onClick={onClick}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link href={`/recipe/${recipe.id}`} className="block group">
      {cardContent}
    </Link>
  );
}
