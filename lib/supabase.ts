// This file is kept for backward compatibility
// Import the browser client for client components
import { createClient } from './supabase/client';

// Export a singleton instance for client-side usage
export const supabase = createClient();
