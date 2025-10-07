/**
 * Authentication Helper Functions (Client-Side Only)
 * 
 * Use these functions in client components to check authentication status
 */

import { createClient } from "@/supabase/client";

/**
 * Client-side: Get current authenticated user
 * Use this in client components
 */
export async function getCurrentUser() {
  const supabase = createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  
  return user;
}

/**
 * Client-side: Get user session
 * Use this to check if user is logged in
 */
export async function getSession() {
  const supabase = createClient();
  
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error fetching session:', error);
    return null;
  }
  
  return session;
}

/**
 * Client-side: Get user profile from database
 * Returns user data including role, department, etc.
 */
export async function getUserProfile(userId: string) {
  const supabase = createClient();
  
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

/**
 * Client-side: Check if user has specific role
 */
export async function checkUserRole(userId: string, role: 'Admin' | 'User') {
  const profile = await getUserProfile(userId);
  return profile?.role === role;
}

/**
 * Client-side: Check if user is admin
 */
export async function isAdmin(userId: string) {
  return checkUserRole(userId, 'Admin');
}

/**
 * Redirect to login page with current URL as redirect parameter
 * Use this when you detect user is not authenticated
 */
export function redirectToLogin() {
  if (typeof window !== 'undefined') {
    const currentUrl = window.location.href;
    const isLocal = window.location.hostname.includes('localhost');
    const loginUrl = isLocal
      ? 'http://login.localhost.mngdp.com:3000/'
      : 'https://login.mngdp.com/';
    
    window.location.href = `${loginUrl}?redirect=${encodeURIComponent(currentUrl)}`;
  }
}

/**
 * Sign out and redirect to login
 */
export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  
  if (typeof window !== 'undefined') {
    const isLocal = window.location.hostname.includes('localhost');
    const loginUrl = isLocal
      ? 'http://login.localhost.mngdp.com:3000'
      : 'https://login.mngdp.com';
    
    window.location.href = loginUrl;
  }
}
