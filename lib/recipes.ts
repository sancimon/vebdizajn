export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
}

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Margherita Pizza",
    imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&h=600&fit=crop",
    cuisine: "Italian",
    difficulty: "Medium",
    description: "Authentic Italian pizza with fresh mozzarella, tomatoes, and basil on a crispy thin crust.",
    ingredients: [
      "500g pizza dough",
      "200g fresh mozzarella",
      "400g San Marzano tomatoes",
      "Fresh basil leaves",
      "3 tbsp extra virgin olive oil",
      "2 cloves garlic, minced",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Preheat your oven to 475°F (245°C) with a pizza stone inside.",
      "Roll out the pizza dough on a floured surface to your desired thickness.",
      "Crush the tomatoes and mix with olive oil, garlic, salt, and pepper.",
      "Spread the tomato sauce evenly over the dough, leaving a border for the crust.",
      "Tear the mozzarella into chunks and distribute over the sauce.",
      "Bake for 10-12 minutes until the crust is golden and cheese is bubbly.",
      "Remove from oven and top with fresh basil leaves.",
      "Drizzle with olive oil and serve immediately.",
    ],
    prepTime: 20,
    cookTime: 12,
    servings: 4,
  },
  {
    id: "2",
    title: "Chicken Pad Thai",
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop",
    cuisine: "Thai",
    difficulty: "Medium",
    description: "Sweet and tangy Thai noodle dish with chicken, peanuts, and a delicious tamarind sauce.",
    ingredients: [
      "300g rice noodles",
      "400g chicken breast, sliced",
      "3 eggs, beaten",
      "100g bean sprouts",
      "50g roasted peanuts, crushed",
      "3 tbsp tamarind paste",
      "2 tbsp fish sauce",
      "2 tbsp palm sugar",
      "3 cloves garlic, minced",
      "2 shallots, sliced",
      "Lime wedges and cilantro for garnish",
    ],
    instructions: [
      "Soak rice noodles in warm water for 30 minutes, then drain.",
      "Mix tamarind paste, fish sauce, and palm sugar to make the sauce.",
      "Heat oil in a wok over high heat and cook chicken until done. Set aside.",
      "Add more oil, cook garlic and shallots until fragrant.",
      "Push to the side, pour in beaten eggs and scramble.",
      "Add noodles and sauce, toss to combine.",
      "Add chicken back in, along with bean sprouts.",
      "Stir-fry for 2-3 minutes until noodles are cooked.",
      "Serve topped with crushed peanuts, lime wedges, and cilantro.",
    ],
    prepTime: 35,
    cookTime: 15,
    servings: 4,
  },
  {
    id: "3",
    title: "Beef Tacos with Guacamole",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop",
    cuisine: "Mexican",
    difficulty: "Easy",
    description: "Flavorful seasoned beef tacos topped with fresh guacamole, salsa, and crispy lettuce.",
    ingredients: [
      "500g ground beef",
      "8 taco shells",
      "2 avocados",
      "1 lime, juiced",
      "1 tomato, diced",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "Lettuce, shredded",
      "Cheddar cheese, grated",
      "Sour cream",
      "2 tsp cumin",
      "1 tsp paprika",
      "Salt and pepper to taste",
    ],
    instructions: [
      "Cook ground beef with garlic, cumin, paprika, salt, and pepper until browned.",
      "Mash avocados with lime juice, salt, and some diced onion to make guacamole.",
      "Warm taco shells according to package instructions.",
      "Fill each shell with seasoned beef.",
      "Top with lettuce, tomatoes, cheese, guacamole, and sour cream.",
      "Serve immediately with extra lime wedges.",
    ],
    prepTime: 15,
    cookTime: 15,
    servings: 4,
  },
  {
    id: "4",
    title: "Japanese Ramen Bowl",
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop",
    cuisine: "Japanese",
    difficulty: "Hard",
    description: "Rich and flavorful ramen with tender pork belly, soft-boiled eggs, and homemade broth.",
    ingredients: [
      "400g fresh ramen noodles",
      "300g pork belly",
      "4 eggs",
      "1L chicken broth",
      "500ml pork broth",
      "3 tbsp miso paste",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "Green onions, sliced",
      "Nori sheets",
      "Bamboo shoots",
      "Corn kernels",
      "2 cloves garlic, minced",
      "Fresh ginger, sliced",
    ],
    instructions: [
      "Braise pork belly in soy sauce, ginger, and garlic for 2 hours until tender.",
      "Make soft-boiled eggs by boiling for 6.5 minutes, then ice bath.",
      "Combine chicken and pork broth, add miso paste and sesame oil, simmer for 30 minutes.",
      "Cook ramen noodles according to package instructions.",
      "Slice the braised pork belly and peel the eggs.",
      "Divide noodles into bowls and ladle hot broth over them.",
      "Top with pork slices, halved eggs, green onions, nori, bamboo shoots, and corn.",
      "Serve immediately while hot.",
    ],
    prepTime: 30,
    cookTime: 150,
    servings: 4,
  },
  {
    id: "5",
    title: "Greek Salad with Feta",
    imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop",
    cuisine: "Greek",
    difficulty: "Easy",
    description: "Fresh and crisp Mediterranean salad with cucumbers, tomatoes, olives, and creamy feta cheese.",
    ingredients: [
      "4 tomatoes, cut into wedges",
      "2 cucumbers, sliced",
      "1 red onion, thinly sliced",
      "200g feta cheese, cubed",
      "100g Kalamata olives",
      "1 green bell pepper, sliced",
      "4 tbsp extra virgin olive oil",
      "2 tbsp red wine vinegar",
      "1 tsp dried oregano",
      "Salt and pepper to taste",
      "Fresh parsley for garnish",
    ],
    instructions: [
      "Combine tomatoes, cucumbers, onion, bell pepper, and olives in a large bowl.",
      "Add cubed feta cheese on top.",
      "Whisk together olive oil, red wine vinegar, oregano, salt, and pepper.",
      "Drizzle the dressing over the salad.",
      "Toss gently to combine, being careful not to break the feta too much.",
      "Garnish with fresh parsley and serve immediately.",
    ],
    prepTime: 15,
    cookTime: 0,
    servings: 4,
  },
  {
    id: "6",
    title: "French Onion Soup",
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop",
    cuisine: "French",
    difficulty: "Medium",
    description: "Rich caramelized onion soup topped with crusty bread and melted Gruyère cheese.",
    ingredients: [
      "6 large onions, thinly sliced",
      "4 tbsp butter",
      "1.5L beef stock",
      "250ml white wine",
      "2 bay leaves",
      "4 sprigs thyme",
      "200g Gruyère cheese, grated",
      "4 slices baguette",
      "Salt and pepper to taste",
      "2 cloves garlic, minced",
    ],
    instructions: [
      "Melt butter in a large pot over medium heat.",
      "Add onions and cook slowly for 45 minutes, stirring occasionally until deeply caramelized.",
      "Add garlic and cook for 1 minute.",
      "Pour in white wine and simmer until reduced by half.",
      "Add beef stock, bay leaves, and thyme. Simmer for 30 minutes.",
      "Toast baguette slices and top with grated Gruyère.",
      "Ladle soup into oven-safe bowls, place cheese toast on top.",
      "Broil until cheese is golden and bubbly, about 3-4 minutes.",
      "Serve immediately while hot.",
    ],
    prepTime: 15,
    cookTime: 80,
    servings: 4,
  },
];

const USER_RECIPES_KEY = "recipe_app_user_recipes";

// Get user-created recipes from localStorage
function getUserRecipes(): Recipe[] {
  if (typeof window === "undefined") return [];
  const recipes = localStorage.getItem(USER_RECIPES_KEY);
  return recipes ? JSON.parse(recipes) : [];
}

// Save user recipes to localStorage
function saveUserRecipes(recipes: Recipe[]): void {
  localStorage.setItem(USER_RECIPES_KEY, JSON.stringify(recipes));
}

// Add a new recipe
export function addRecipe(recipe: Omit<Recipe, "id">): Recipe {
  const newRecipe: Recipe = {
    ...recipe,
    id: `user-${Date.now()}`,
  };

  const userRecipes = getUserRecipes();
  userRecipes.unshift(newRecipe); // Add to beginning
  saveUserRecipes(userRecipes);

  return newRecipe;
}

// Delete a user recipe
export function deleteRecipe(id: string): boolean {
  if (!id.startsWith("user-")) return false;

  const userRecipes = getUserRecipes();
  const filtered = userRecipes.filter((recipe) => recipe.id !== id);
  saveUserRecipes(filtered);

  return true;
}

// Helper function to get a recipe by ID (checks both mock and user recipes)
export function getRecipeById(id: string): Recipe | undefined {
  // Check user recipes first
  const userRecipes = getUserRecipes();
  const userRecipe = userRecipes.find((recipe) => recipe.id === id);
  if (userRecipe) return userRecipe;

  // Then check mock recipes
  return mockRecipes.find((recipe) => recipe.id === id);
}

// Helper function to get all recipes (combines mock and user recipes)
export function getAllRecipes(): Recipe[] {
  const userRecipes = getUserRecipes();
  return [...userRecipes, ...mockRecipes];
}
