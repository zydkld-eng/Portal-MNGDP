/**
 * Authentication Helper Functions (Server-Side Only)
 * 
 * Use these functions ONLY in:
 * - Server Components
 * - API Routes
 * - Server Actions
 * 
 * DO NOT import these in Client Components!
 */

import { createClient as createServerClient } from "@/supabase/server";

/**
 * Server-side: Get current authenticated user
 * Use this in server components and API routes
 */
export async function getServerUser() {
  const supabase = await createServerClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  
  return user;
}

/**
 * Server-side: Get user session
 * Use this to check if user is logged in on the server
 */
export async function getServerSession() {
  const supabase = await createServerClient();
  
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error fetching session:', error);
    return null;
  }
  
  return session;
}

/**
 * Server-side: Get user profile from database
 */
export async function getServerUserProfile(userId: string) {
  const supabase = await createServerClient();
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
}
