"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { handleOAuthCallback } from '@/lib/auth'
import { Loader2 } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const user = await handleOAuthCallback()
        
        if (user) {
          // Successful OAuth login, redirect to leaderboard
          router.push('/leaderboard')
        } else {
          // Failed to get user, redirect to login with error
          router.push('/login?error=oauth_failed')
        }
      } catch (error) {
        console.error('OAuth callback error:', error)
        router.push('/login?error=oauth_failed')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  )
}