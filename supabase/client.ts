"use client"

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          try {
            return document.cookie
              .split('; ')
              .map(cookie => {
                const [name, value] = cookie.split('=')
                return { name, value }
              })
              .filter(cookie => cookie.name)
          } catch (error) {
            console.error('Error getting cookies:', error)
            return []
          }
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              const cookieOptions = {
                ...options,
                domain: '.localhost.mngdp.com', // Force domain for all Supabase cookies
                secure: false, // Allow HTTP for localhost
                sameSite: 'lax',
                path: '/',
              }
              
              let cookieString = `${name}=${value}`
              if (cookieOptions.domain) cookieString += `; Domain=${cookieOptions.domain}`
              if (cookieOptions.path) cookieString += `; Path=${cookieOptions.path}`
              if (cookieOptions.maxAge) cookieString += `; Max-Age=${cookieOptions.maxAge}`
              if (cookieOptions.sameSite) cookieString += `; SameSite=${cookieOptions.sameSite}`
              if (cookieOptions.secure) cookieString += `; Secure`
              
              document.cookie = cookieString
            })
          } catch (error) {
            console.error('Error setting cookies:', error)
          }
        },
      },
    }
  )
}
