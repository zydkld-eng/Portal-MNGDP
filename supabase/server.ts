import { createServerClient } from '@supabase/ssr'
import { cookies, headers } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // Set cookies with cross-subdomain support
              const cookieOptions = {
                ...options,
                domain: '.localhost.mngdp.com', // Force domain for all Supabase cookies
                secure: false, // Allow HTTP for localhost
                sameSite: 'lax' as const,
                path: '/', // Ensure cookie is available across all paths
              }
              cookieStore.set(name, value, cookieOptions)
            })
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
