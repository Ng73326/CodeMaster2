"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import JoinContest from "@/components/join-contest"
import { getCurrentUser } from "@/lib/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { getContestById } from "@/lib/contests"
import { useRouter } from "next/navigation"
import { ContestNavigation } from "@/components/contest-navigation"

export default function ContestJoinPage() {
  const params = useParams()
  const contestId = params.id as string
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [contest, setContest] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userData = await getCurrentUser()
        setUser(userData)

        // In a real app, this would fetch the contest from your API
        const contestData = await getContestById(contestId)

        if (!contestData) {
          // Contest not found, redirect to contests page
          router.push("/contests")
          return
        }

        // Only allow joining active contests
        if (contestData.status !== "active") {
          if (contestData.status === "upcoming") {
            // If contest is upcoming, redirect to register page
            router.push(`/contests/${contestId}/register`)
            return
          } else {
            // If contest is completed, redirect to contests page
            router.push("/contests")
            return
          }
        }

        setContest(contestData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [contestId, router])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          {user ? (
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserNav user={user} />
            </div>
          ) : (
            <div className="flex gap-4">
              <ThemeToggle />
              <Button variant="outline" onClick={() => (window.location.href = "/login")}>
                Login
              </Button>
              <Button onClick={() => (window.location.href = "/signup")}>Sign Up</Button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 p-8 pt-6">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <ContestNavigation contestId={contestId} />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Join Live Contest</h1>
            <p className="text-muted-foreground mt-2">Enter your registration ID to join the ongoing contest</p>
          </div>

          {contest && <JoinContest contest={contest} />}
        </div>
      </main>
    </div>
  )
}

