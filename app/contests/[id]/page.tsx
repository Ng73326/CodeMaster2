// Fix the contest details page to properly show contest information and navigation

"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { getCurrentUser } from "@/lib/auth"
import { ArrowLeft, CalendarDays, Clock, Users, AlertCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getContestById } from "@/lib/contests"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ContestDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const contestId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [contest, setContest] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userData = await getCurrentUser()
        setUser(userData)

        // In a real app, this would fetch the contest from your API
        const contestData = await getContestById(contestId)

        if (!contestData) {
          setError("Contest not found")
          return
        }

        // Add additional contest details
        const enhancedContest = {
          ...contestData,
          longDescription:
            contestData.description +
            " This contest is designed to challenge your coding skills and problem-solving abilities.",
          participants: Math.floor(Math.random() * 100) + 50,
          prizes: ["1st Place: $500", "2nd Place: $250", "3rd Place: $100"],
          rules: [
            "You must solve the problems independently",
            "No external libraries are allowed",
            "Solutions must pass all test cases",
            "Time and space complexity will be considered for scoring",
          ],
        }

        setContest(enhancedContest)
      } catch (error) {
        console.error("Failed to fetch data:", error)
        setError("Failed to load contest data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [contestId])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav />
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 container py-8 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Error</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <div className="mt-4">
                <Link href="/contests">
                  <Button className="w-full">Return to Contests</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
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
            <Link href="/contests">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" /> Back to Contests
              </Button>
            </Link>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">{contest.title}</CardTitle>
                  <CardDescription className="mt-2">{contest.description}</CardDescription>
                </div>
                <Badge
                  variant={contest.status === "active" ? "default" : "outline"}
                  className="self-start md:self-center"
                >
                  {contest.status === "active" ? "Active" : "Upcoming"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <div className="flex items-center">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                    <span>{new Date(contest.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Time</span>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 opacity-70" />
                    <span>
                      {contest.startTime} ({contest.duration} hours)
                    </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground">Participants</span>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 opacity-70" />
                    <span>{contest.participants} registered</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">About this Contest</h3>
                <p className="text-muted-foreground">{contest.longDescription}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Prizes</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {contest.prizes.map((prize: string, index: number) => (
                    <li key={index} className="text-muted-foreground">
                      {prize}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Rules</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {contest.rules.map((rule: string, index: number) => (
                    <li key={index} className="text-muted-foreground">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              {contest.status === "active" ? (
                <Link href={`/contests/${contest.id}/join`} className="w-full">
                  <Button className="w-full">Join Contest Now</Button>
                </Link>
              ) : (
                <Link href={`/contests/${contest.id}/register`} className="w-full">
                  <Button className="w-full">Register for this Contest</Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

