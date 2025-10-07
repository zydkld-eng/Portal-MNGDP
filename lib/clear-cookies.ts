/**
 * Clear all Supabase cookies
 * Use this when cookies are corrupted or invalid
 */
export function clearSupabaseCookies() {
  if (typeof window === 'undefined') return

  // Get all cookies
  const cookies = document.cookie.split(';')

  // Clear all Supabase-related cookies
  cookies.forEach(cookie => {
    const cookieName = cookie.split('=')[0].trim()
    
    // Clear for current domain
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    
    // Clear for .localhost.mngdp.com domain
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.localhost.mngdp.com`
    
    // Clear for localhost.mngdp.com domain
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost.mngdp.com`
  })
}

/**
 * Clear specific cookie by name
 */
export function clearCookie(name: string) {
  if (typeof window === 'undefined') return

  // Clear for current domain
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  
  // Clear for .localhost.mngdp.com domain
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.localhost.mngdp.com`
  
  // Clear for localhost.mngdp.com domain
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost.mngdp.com`
}
