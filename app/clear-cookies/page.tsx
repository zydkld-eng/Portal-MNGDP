"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { clearSupabaseCookies } from "@/lib/clear-cookies"

export default function ClearCookiesPage() {
  const [cookies, setCookies] = useState<string[]>([])
  const [cleared, setCleared] = useState(false)

  useEffect(() => {
    loadCookies()
  }, [])

  const loadCookies = () => {
    if (typeof window !== 'undefined') {
      const allCookies = document.cookie.split(';').map(c => c.trim())
      setCookies(allCookies)
    }
  }

  const handleClearCookies = () => {
    clearSupabaseCookies()
    setCleared(true)
    setTimeout(() => {
      loadCookies()
      setCleared(false)
    }, 1000)
  }

  const handleRedirectToLogin = () => {
    const isLocal = window.location.hostname.includes('localhost')
    const loginUrl = isLocal
      ? 'http://login.localhost.mngdp.com:3000/login'
      : 'https://login.mngdp.com/login'
    
    window.location.href = loginUrl
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Cookie Management</CardTitle>
            <CardDescription>
              Clear corrupted or invalid cookies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Current Cookies:</h3>
              <div className="bg-muted p-4 rounded-md max-h-64 overflow-auto">
                {cookies.length > 0 ? (
                  <ul className="space-y-1 text-sm font-mono">
                    {cookies.map((cookie, index) => (
                      <li key={index} className="break-all">{cookie}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No cookies found</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleClearCookies} variant="destructive">
                Clear All Cookies
              </Button>
              <Button onClick={loadCookies} variant="outline">
                Refresh
              </Button>
              <Button onClick={handleRedirectToLogin}>
                Go to Login
              </Button>
            </div>

            {cleared && (
              <div className="bg-green-100 text-green-800 p-3 rounded-md">
                Cookies cleared successfully!
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>If you're seeing UTF-8 errors:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Click "Clear All Cookies" button above</li>
              <li>Close all browser tabs for this domain</li>
              <li>Click "Go to Login" to login again</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
