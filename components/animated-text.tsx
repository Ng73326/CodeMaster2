"use client"

import type React from "react"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedTextProps {
  text: string | ReactNode
  className?: string
  once?: boolean
  delay?: number
  duration?: number
  as?: React.ElementType
}

export function AnimatedText({
  text,
  className = "",
  once = true,
  delay = 0,
  duration = 0.5,
  as: Component = "div",
}: AnimatedTextProps) {
  if (typeof text === "string") {
    const words = text.split(" ")

    return (
      <Component className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once }}
            transition={{
              duration,
              delay: delay + i * 0.05,
              ease: "easeOut",
            }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        ))}
      </Component>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {text}
    </motion.div>
  )
}

