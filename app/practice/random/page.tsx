"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RandomProblemPage() {
  const router = useRouter()

  useEffect(() => {
    // Mock problem IDs
    const problemIds = ["p1", "p2", "p3", "p4", "p5", "p6"]

    // Select a random problem ID
    const randomIndex = Math.floor(Math.random() * problemIds.length)
    const randomProblemId = problemIds[randomIndex]

    // Redirect to the random problem
    router.push(`/practice/${randomProblemId}`)
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Finding a random problem for you...</p>
    </div>
  )
}

