"use client";

import Link from "next/link";
import { Container } from "./container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { ChefHat, Menu, LogOut, User, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all duration-200">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 group transition-all duration-200"
          >
            <div className="relative">
              <ChefHat className="h-7 w-7 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              RecipeApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link
              href="/"
              className="text-sm font-medium transition-all duration-200 hover:text-primary px-3 py-2 rounded-md hover:bg-accent"
            >
              Home
            </Link>
            <Link
              href="/add-recipe"
              className="text-sm font-medium transition-all duration-200 hover:text-primary px-3 py-2 rounded-md hover:bg-accent"
            >
              Add Recipe
            </Link>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              {user ? (
                <>
                  <div className="hidden lg:flex items-center space-x-2 px-3 py-2 rounded-md bg-accent/50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium max-w-[120px] truncate">
                      {user.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="transition-all duration-200 hover:scale-105"
                  >
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 rounded-md hover:bg-accent transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen
              ? "max-h-[500px] opacity-100 py-4"
              : "max-h-0 opacity-0"
          )}
        >
          <nav className="space-y-2 animate-in slide-in-from-top-4 duration-300">
            <Link
              href="/"
              className="block text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/add-recipe"
              className="block text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Add Recipe
            </Link>
            {user ? (
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-accent/50">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}
