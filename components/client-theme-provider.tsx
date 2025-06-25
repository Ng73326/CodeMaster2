"use client"

import type React from "react"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Import ThemeProvider dynamically with SSR disabled
const ThemeProviderNoSSR = dynamic(() => import("@/components/theme-provider").then((mod) => mod.ThemeProvider), {
  ssr: false,
})

export function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Use a client-side only rendered div to avoid hydration mismatches
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Clean up any problematic style tags
    document.querySelectorAll("style[class]").forEach((el) => {
      if (el.className && el.className.includes("dark")) {
        el.removeAttribute("class")
      }
    })

    setMounted(true)
  }, [])

  // During initial client render, return a simple wrapper
  if (!mounted) {
    return <div className="contents">{children}</div>
  }

  // Only render ThemeProvider on client after hydration
  return (
    <ThemeProviderNoSSR
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="codemasters-theme"
    >
      {children}
    </ThemeProviderNoSSR>
  )
}

