export interface User {
  id: string;
  name: string;
  email: string;
}

interface StoredUser extends User {
  password: string;
}

const USERS_KEY = "recipe_app_users";
const CURRENT_USER_KEY = "recipe_app_current_user";

// Get all users from localStorage
function getUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

// Save users to localStorage
function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Get current logged-in user
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);
  return currentUser ? JSON.parse(currentUser) : null;
}

// Set current logged-in user
function setCurrentUser(user: User): void {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

// Clear current user
function clearCurrentUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sign up a new user
export function signup(
  name: string,
  email: string,
  password: string
): { success: boolean; error?: string; user?: User } {
  // Validation
  if (!name.trim()) {
    return { success: false, error: "Name is required" };
  }

  if (!email.trim()) {
    return { success: false, error: "Email is required" };
  }

  if (!validateEmail(email)) {
    return { success: false, error: "Invalid email format" };
  }

  if (!password || password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" };
  }

  const users = getUsers();

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    return { success: false, error: "User with this email already exists" };
  }

  // Create new user
  const newUser: StoredUser = {
    id: Date.now().toString(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
  };

  users.push(newUser);
  saveUsers(users);

  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  setCurrentUser(userWithoutPassword);

  return { success: true, user: userWithoutPassword };
}

// Sign in a user
export function signin(
  email: string,
  password: string
): { success: boolean; error?: string; user?: User } {
  // Validation
  if (!email.trim()) {
    return { success: false, error: "Email is required" };
  }

  if (!validateEmail(email)) {
    return { success: false, error: "Invalid email format" };
  }

  if (!password) {
    return { success: false, error: "Password is required" };
  }

  const users = getUsers();
  const user = users.find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  setCurrentUser(userWithoutPassword);

  return { success: true, user: userWithoutPassword };
}

// Sign out the current user
export function signout(): void {
  clearCurrentUser();
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
