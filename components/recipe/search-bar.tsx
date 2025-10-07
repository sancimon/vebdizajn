"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { Recipe } from "@/lib/recipes";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  cuisineFilter: string;
  onCuisineChange: (value: string) => void;
  difficultyFilter: string;
  onDifficultyChange: (value: string) => void;
  onClear: () => void;
  recipes: Recipe[];
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  cuisineFilter,
  onCuisineChange,
  difficultyFilter,
  onDifficultyChange,
  onClear,
  recipes,
}: SearchBarProps) {
  // Get unique cuisines from all recipes
  const cuisines = Array.from(new Set(recipes.map((r) => r.cuisine))).sort();

  const hasActiveFilters =
    searchQuery.trim() !== "" || cuisineFilter !== "all" || difficultyFilter !== "all";

  return (
    <div className="space-y-4 mb-8 p-6 bg-muted/50 rounded-lg border animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by title or ingredient..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Cuisine Filter */}
        <Select value={cuisineFilter} onValueChange={onCuisineChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Cuisines" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cuisines</SelectItem>
            {cuisines.map((cuisine) => (
              <SelectItem key={cuisine} value={cuisine}>
                {cuisine}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Difficulty Filter */}
        <Select value={difficultyFilter} onValueChange={onDifficultyChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Difficulties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="icon"
            onClick={onClear}
            className="shrink-0"
            title="Clear filters"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
              Search: &quot;{searchQuery}&quot;
            </span>
          )}
          {cuisineFilter !== "all" && (
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
              Cuisine: {cuisineFilter}
            </span>
          )}
          {difficultyFilter !== "all" && (
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
              Difficulty: {difficultyFilter}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
