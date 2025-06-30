"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ThemeProvider } from "next-themes"

export function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering theme provider until mounted
  if (!mounted) {
    return <div className="contents">{children}</div>
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="codemasters-theme"
    >
      {children}
    </ThemeProvider>
  )
}