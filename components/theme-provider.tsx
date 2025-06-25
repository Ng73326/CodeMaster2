"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Use a client-side only rendered div to avoid hydration mismatches
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // Clean up any problematic style tags
    document.querySelectorAll("style[class]").forEach((el) => {
      if (el.className && el.className.includes("dark")) {
        el.removeAttribute("class")
      }
    })

    setMounted(true)
  }, [])

  // During SSR and initial client render, return nothing
  // This completely bypasses the hydration process for this component
  if (!mounted) {
    return null
  }

  // Only render on client after hydration
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

