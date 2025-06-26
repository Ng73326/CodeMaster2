"use client"

import { GoogleAuth } from "@/components/google-auth"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default function GoogleAuthDemo() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Google Authentication Demo</h1>
            <p className="text-muted-foreground mt-2">
              Test Google sign-in integration with Supabase
            </p>
          </div>
          <GoogleAuth />
        </div>
      </main>
    </div>
  )
}