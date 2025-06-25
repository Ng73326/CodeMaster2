"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedGradientBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedGradientBackground({ children, className = "" }: AnimatedGradientBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 via-background to-secondary/20 opacity-50"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--background-rgb), 1) 50%)",
            "radial-gradient(circle at 100% 0%, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--background-rgb), 1) 50%)",
            "radial-gradient(circle at 100% 100%, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--background-rgb), 1) 50%)",
            "radial-gradient(circle at 0% 100%, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--background-rgb), 1) 50%)",
            "radial-gradient(circle at 0% 0%, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--background-rgb), 1) 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        style={{
          backgroundPosition: `calc((${mousePosition.x}px / window.innerWidth) * 100%) calc((${mousePosition.y}px / window.innerHeight) * 100%)`,
        }}
      />
      {children}
    </div>
  )
}

