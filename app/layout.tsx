import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ClientThemeProvider } from "@/components/client-theme-provider"
import { AuthProvider } from "@/hooks/use-auth"

export const metadata: Metadata = {
  title: "CodeMasters - Competitive Coding Platform",
  description: "Improve your coding skills through competitions and practice",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        <div id="app-shell" suppressHydrationWarning>
          <ClientThemeProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ClientThemeProvider>
        </div>
      </body>
    </html>
  )
}