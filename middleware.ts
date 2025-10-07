import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set({
                name,
                value,
                ...options,
              })
            })
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) => {
              supabaseResponse.cookies.set({
                name,
                value,
                ...options,
              })
            })
          },
        },
      }
    )

    // Check if user is authenticated
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    // If there's an error (like invalid UTF-8), clear cookies and redirect to login
    if (error) {
      console.error('Auth error in middleware:', error)
      const isLocal = request.nextUrl.hostname.includes('localhost')
      const loginUrl = isLocal
        ? 'http://login.localhost.mngdp.com:3000/'
        : 'https://login.mngdp.com/'
      
      const currentUrl = request.url
      const redirectUrl = `${loginUrl}?redirect=${encodeURIComponent(currentUrl)}`
      const response = NextResponse.redirect(redirectUrl)
      
      // Clear all Supabase cookies
      const cookiesToClear = ['sb-access-token', 'sb-refresh-token']
      cookiesToClear.forEach(name => {
        response.cookies.delete(name)
      })
      
      return response
    }

    // If user is not authenticated, redirect to login
    if (!user) {
      const currentUrl = request.url
      const isLocal = request.nextUrl.hostname.includes('localhost')
      const loginUrl = isLocal
        ? 'http://login.localhost.mngdp.com:3000/'
        : 'https://login.mngdp.com/'
      
      const redirectUrl = `${loginUrl}?redirect=${encodeURIComponent(currentUrl)}`
      return NextResponse.redirect(redirectUrl)
    }

    return supabaseResponse
  } catch (error) {
    // Handle any unexpected errors
    console.error('Unexpected error in middleware:', error)
    
    const isLocal = request.nextUrl.hostname.includes('localhost')
    const loginUrl = isLocal
      ? 'http://login.localhost.mngdp.com:3000/'
      : 'https://login.mngdp.com/'
    
    const currentUrl = request.url
    const redirectUrl = `${loginUrl}?redirect=${encodeURIComponent(currentUrl)}`
    const response = NextResponse.redirect(redirectUrl)
    
    // Clear all cookies on error
    request.cookies.getAll().forEach(cookie => {
      if (cookie.name.startsWith('sb-')) {
        response.cookies.delete(cookie.name)
      }
    })
    
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - clear-cookies (debug page)
     */
    '/((?!_next/static|_next/image|favicon.ico|clear-cookies|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
