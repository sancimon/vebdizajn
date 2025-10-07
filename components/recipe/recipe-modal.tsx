"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recipe } from "@/lib/recipes";
import { Clock, Users, ChefHat, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RecipeModalProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function RecipeModal({ recipe, open, onOpenChange }: RecipeModalProps) {
  if (!recipe) return null;

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
        <ScrollArea className="h-[90vh]">
          <div className="p-6">
            <DialogHeader className="space-y-4">
              {/* Recipe Image */}
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted -mx-6 -mt-6 mb-2">
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>

              {/* Title and Badges */}
              <div className="space-y-3 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <DialogTitle className="text-3xl font-bold flex-1">
                    {recipe.title}
                  </DialogTitle>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{recipe.cuisine}</Badge>
                  <Badge className={difficultyColors[recipe.difficulty]}>
                    {recipe.difficulty}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{recipe.description}</p>

                {/* Time and Servings */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Prep: {recipe.prepTime} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Cook: {recipe.cookTime} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-muted-foreground" />
                    <span>Total: {totalTime} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* Recipe Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Ingredients */}
              <Card className="md:col-span-1">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Ingredients</h3>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Instructions</h3>
                  <ol className="space-y-3">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-3 text-sm">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground font-bold text-xs">
                          {index + 1}
                        </span>
                        <p className="flex-1 pt-0.5">{instruction}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Button>Save Recipe</Button>
              <Button variant="outline">Share</Button>
              <Button variant="outline" asChild>
                <Link href={`/recipe/${recipe.id}`}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Full Page
                </Link>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
