"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

// Create a client-only version of the theme toggle
const ThemeToggleClient = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    // Check if document is available (client-side only)
    if (typeof document !== "undefined") {
      // Determine initial theme
      const isDark = document.documentElement.classList.contains("dark")
      setTheme(isDark ? "dark" : "light")

      // Set up a mutation observer to watch for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            const isDarkNow = document.documentElement.classList.contains("dark")
            setTheme(isDarkNow ? "dark" : "light")
          }
        })
      })

      observer.observe(document.documentElement, { attributes: true })

      return () => observer.disconnect()
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "dark" ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

// Export a dynamic version with SSR disabled
export const ThemeToggle = dynamic(() => Promise.resolve(ThemeToggleClient), {
  ssr: false,
})

