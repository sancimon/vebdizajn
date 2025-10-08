import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat, ArrowLeft } from "lucide-react";
import { getRecipeById } from "@/lib/recipes";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface RecipeDetailPageProps {
  params: {
    id: string;
  };
}

const difficultyColors = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const recipe = await getRecipeById(params.id);

  if (!recipe) {
    notFound();
  }

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="py-16 animate-in fade-in duration-500">
      <Container className="max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          asChild
          className="mb-6 animate-in slide-in-from-left duration-300"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipes
          </Link>
        </Button>

        {/* Recipe Header */}
        <div className="space-y-4 mb-8 animate-in slide-in-from-bottom duration-500">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold">{recipe.title}</h1>
            <Badge variant="secondary">{recipe.cuisine}</Badge>
            <Badge className={difficultyColors[recipe.difficulty]}>
              {recipe.difficulty}
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground">{recipe.description}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm">
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

        {/* Recipe Image */}
        <div className="mb-8 animate-in zoom-in duration-700">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted shadow-xl">
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-bottom duration-700 delay-200">
          {/* Ingredients */}
          <Card className="md:col-span-1 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 animate-in slide-in-from-left duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="md:col-span-2 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4 animate-in slide-in-from-right duration-300"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </span>
                    <p className="flex-1 pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 animate-in slide-in-from-bottom duration-500 delay-300">
          <Button size="lg" className="hover:scale-105 transition-transform duration-200">
            Save Recipe
          </Button>
          <Button size="lg" variant="outline" className="hover:scale-105 transition-transform duration-200">
            Share
          </Button>
          <Button size="lg" variant="outline" asChild className="hover:scale-105 transition-transform duration-200">
            <Link href="/add-recipe">Add Your Own</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
