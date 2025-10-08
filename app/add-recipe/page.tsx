"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/components/providers/auth-provider";
import { Recipe } from "@/lib/recipes";
import { addRecipeAction } from "@/app/actions/recipes";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, ChefHat } from "lucide-react";
import Link from "next/link";

export default function AddRecipePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState<Recipe["difficulty"]>("Easy");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin");
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!title.trim()) {
      setError("Recipe title is required");
      return;
    }

    if (!imageUrl.trim()) {
      setError("Image URL is required");
      return;
    }

    if (!cuisine.trim()) {
      setError("Cuisine is required");
      return;
    }

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    if (!prepTime || parseInt(prepTime) <= 0) {
      setError("Valid prep time is required");
      return;
    }

    if (!cookTime || parseInt(cookTime) < 0) {
      setError("Valid cook time is required");
      return;
    }

    if (!servings || parseInt(servings) <= 0) {
      setError("Valid servings count is required");
      return;
    }

    if (!ingredients.trim()) {
      setError("Ingredients are required");
      return;
    }

    if (!instructions.trim()) {
      setError("Instructions are required");
      return;
    }

    setIsSubmitting(true);

    try {
      // Parse ingredients and instructions
      const ingredientsList = ingredients
        .split("\n")
        .map((i) => i.trim())
        .filter((i) => i.length > 0);

      const instructionsList = instructions
        .split("\n")
        .map((i) => i.trim())
        .filter((i) => i.length > 0);

      if (ingredientsList.length === 0) {
        setError("Please add at least one ingredient");
        setIsSubmitting(false);
        return;
      }

      if (instructionsList.length === 0) {
        setError("Please add at least one instruction");
        setIsSubmitting(false);
        return;
      }

      // Create recipe using Server Action
      if (!user) {
        setError("You must be logged in to add a recipe");
        setIsSubmitting(false);
        return;
      }

      const result = await addRecipeAction({
        title: title.trim(),
        imageUrl: imageUrl.trim(),
        cuisine: cuisine.trim(),
        difficulty,
        description: description.trim(),
        prepTime: parseInt(prepTime),
        cookTime: parseInt(cookTime),
        servings: parseInt(servings),
        ingredients: ingredientsList,
        instructions: instructionsList,
      });

      if (!result.success) {
        setError(result.error || "Failed to add recipe");
        setIsSubmitting(false);
        return;
      }

      setSuccess(true);

      // Redirect to home page after 1.5 seconds
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      setError("Failed to add recipe. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="py-16">
        <Container className="max-w-2xl">
          <div className="flex items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </Container>
      </div>
    );
  }

  // Don't render form if not logged in
  if (!user) {
    return null;
  }

  return (
    <div className="py-16 animate-in fade-in duration-500">
      <Container className="max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-bold">Add New Recipe</CardTitle>
            </div>
            <CardDescription>
              Share your culinary creation with the community
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-100 dark:border-green-900">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Recipe added successfully! Redirecting to home page...
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">
                  Recipe Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Classic Chocolate Chip Cookies"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">
                  Image URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cuisine">
                    Cuisine <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cuisine"
                    type="text"
                    placeholder="e.g., Italian, Mexican, Thai"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">
                    Difficulty <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={difficulty}
                    onValueChange={(value) =>
                      setDifficulty(value as Recipe["difficulty"])
                    }
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Briefly describe your recipe..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prep-time">
                    Prep Time (min) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="prep-time"
                    type="number"
                    placeholder="30"
                    min="0"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cook-time">
                    Cook Time (min) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cook-time"
                    type="number"
                    placeholder="45"
                    min="0"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servings">
                    Servings <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="servings"
                    type="number"
                    placeholder="4"
                    min="1"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ingredients">
                  Ingredients (one per line){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="ingredients"
                  placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs&#10;..."
                  rows={6}
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">
                  Instructions (one step per line){" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="instructions"
                  placeholder="Preheat oven to 350°F&#10;Mix dry ingredients&#10;Add wet ingredients&#10;..."
                  rows={8}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting || success}
                >
                  {isSubmitting ? "Publishing..." : "Publish Recipe"}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  asChild
                  disabled={isSubmitting}
                >
                  <Link href="/">Cancel</Link>
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </Container>
    </div>
  );
}
