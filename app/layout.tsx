import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ClientThemeProvider } from "@/components/client-theme-provider"
import { AuthProvider } from "@/hooks/use-auth"
import { clearCachedUserData } from "@/lib/auth"
import { useEffect } from "react"

export const metadata: Metadata = {
  title: "CodeMasters - Competitive Coding Platform",
  description: "Improve your coding skills through competitions and practice",
  generator: "Next.js",
}

// Component to clear cached data on app start
function DataCleaner() {
  useEffect(() => {
    // Clear any John Doe or cached data when app starts
    clearCachedUserData().catch(console.error)
  }, [])
  
  return null
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Initial shell that will be visible during SSR */}
        <div id="app-shell" suppressHydrationWarning>
          <ClientThemeProvider>
            <AuthProvider>
              <DataCleaner />
              {children}
            </AuthProvider>
          </ClientThemeProvider>
        </div>
      </body>
    </html>
  )
}