"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { getCurrentUser } from "@/lib/auth"
import { CalendarDays, Clock, Trophy } from "lucide-react"
import Link from "next/link"

export default function ContestsPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          {user ? (
            <UserNav user={user} />
          ) : (
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => (window.location.href = "/login")}>
                Login
              </Button>
              <Button onClick={() => (window.location.href = "/signup")}>Sign Up</Button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Contests</h2>
        </div>
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: "1",
                  title: "Weekly Challenge #6",
                  description: "Solve algorithmic problems in this weekly challenge.",
                  date: "2025-04-15",
                  startTime: "18:00",
                  duration: "2",
                  type: "weekly-challenge",
                  status: "upcoming",
                },
                {
                  id: "2",
                  title: "Algorithm Sprint #2",
                  description: "Test your algorithm skills with timed challenges.",
                  date: "2025-04-20",
                  startTime: "20:00",
                  duration: "1.5",
                  type: "algorithm-sprint",
                  status: "upcoming",
                },
                {
                  id: "3",
                  title: "Code Masters Cup",
                  description: "The ultimate coding competition with multiple rounds.",
                  date: "2025-05-01",
                  startTime: "10:00",
                  duration: "4",
                  type: "code-masters-cup",
                  status: "upcoming",
                },
              ].map((contest) => (
                <Card key={contest.id}>
                  <CardHeader>
                    <CardTitle>{contest.title}</CardTitle>
                    <CardDescription>{contest.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-sm">{new Date(contest.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-sm">
                          {contest.startTime} ({contest.duration} hours)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Trophy className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-sm capitalize">{contest.type.replace("-", " ")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/contests/${contest.id}/register`} className="w-full">
                      <Button className="w-full">Register</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="ongoing" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: "4",
                  title: "Algorithm Sprint #1",
                  description: "Test your algorithm skills in this timed sprint.",
                  date: "2025-03-07",
                  startTime: "19:00",
                  duration: "2",
                  type: "algorithm-sprint",
                  status: "active",
                },
              ].map((contest) => (
                <Card key={contest.id}>
                  <CardHeader>
                    <CardTitle>{contest.title}</CardTitle>
                    <CardDescription>{contest.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-sm">{new Date(contest.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-sm">
                          {contest.startTime} ({contest.duration} hours)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Trophy className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-sm capitalize">{contest.type.replace("-", " ")}</span>
                      </div>
                      <div className="mt-2 p-2 bg-green-50 text-green-800 rounded-md dark:bg-green-900/20 dark:text-green-400">
                        <p className="text-sm font-medium">This contest is currently active!</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/contests/${contest.id}/join`} className="w-full">
                      <Button className="w-full">Join Now</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="past" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Past Contests</CardTitle>
                <CardDescription>View results and solutions from previous contests.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="p-4">
                    <h3 className="font-medium">Weekly Challenge #4</h3>
                    <p className="text-sm text-muted-foreground">February 7, 2025</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <h3 className="font-medium">Algorithm Sprint #1</h3>
                    <p className="text-sm text-muted-foreground">January 20, 2025</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <h3 className="font-medium">Weekly Challenge #3</h3>
                    <p className="text-sm text-muted-foreground">January 7, 2025</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Load More
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

