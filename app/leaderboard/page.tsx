"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"

export default function LeaderboardPage() {
  // Mock user data for demonstration
  const [globalUsers] = useState([
    { id: "1", name: "Rahul Singh", problemsSolved: 245, rating: 2150, rank: 1 },
    { id: "2", name: "Aman Kumar", problemsSolved: 230, rating: 2120, rank: 2 },
    { id: "3", name: "Pooja Sharma", problemsSolved: 215, rating: 2080, rank: 3 },
    { id: "4", name: "Akash Patel", problemsSolved: 205, rating: 2050, rank: 4 },
    { id: "5", name: "Neha Gupta", problemsSolved: 190, rating: 2020, rank: 5 },
    { id: "6", name: "Rohan Joshi", problemsSolved: 180, rating: 1980, rank: 6 },
    { id: "7", name: "Priya Verma", problemsSolved: 175, rating: 1950, rank: 7 },
    { id: "8", name: "Vishal Mehta", problemsSolved: 170, rating: 1920, rank: 8 },
    { id: "9", name: "Ravi Tiwari", problemsSolved: 165, rating: 1900, rank: 9 },
    { id: "10", name: "Shweta Kapoor", problemsSolved: 160, rating: 1880, rank: 10 },
  ])

  const [weeklyUsers] = useState([
    { id: "3", name: "Pooja Sharma", score: 450, contestsWon: 1, rank: 1 },
    { id: "1", name: "Rahul Singh", score: 425, contestsWon: 0, rank: 2 },
    { id: "2", name: "Aman Kumar", score: 400, contestsWon: 0, rank: 3 },
  ])

  const [algorithmUsers] = useState([
    { id: "4", name: "Akash Patel", score: 380, contestsWon: 1, rank: 1 },
    { id: "5", name: "Neha Gupta", score: 360, contestsWon: 0, rank: 2 },
    { id: "6", name: "Rohan Joshi", score: 340, contestsWon: 0, rank: 3 },
  ])

  const [mastersCupUsers] = useState([
    { id: "7", name: "Priya Verma", round: "Winner", rank: 1 },
    { id: "8", name: "Vishal Mehta", round: "Finalist", rank: 2 },
    { id: "9", name: "Ravi Tiwari", round: "Finalist", rank: 3 },
    { id: "10", name: "Shweta Kapoor", round: "Semi-Finalist", rank: 4 },
    { id: "1", name: "Rahul Singh", round: "Semi-Finalist", rank: 5 },
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => (window.location.href = "/login")}>
              Login
            </Button>
            <Button onClick={() => (window.location.href = "/signup")}>Sign Up</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Leaderboard</h2>
        </div>
        <Tabs defaultValue="global" className="space-y-4">
          <TabsList>
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Challenge</TabsTrigger>
            <TabsTrigger value="algorithm">Algorithm Sprint</TabsTrigger>
            <TabsTrigger value="masters">Code Masters Cup</TabsTrigger>
          </TabsList>
          <TabsContent value="global" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Global Rankings</CardTitle>
                <CardDescription>Top performers across all contests and practice problems</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rank</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                            Problems Solved
                          </th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rating</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {globalUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">
                              {user.rank === 1 && (
                                <div className="flex items-center">
                                  <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                                  {user.rank}
                                </div>
                              )}
                              {user.rank !== 1 && user.rank}
                            </td>
                            <td className="p-4 align-middle font-medium">{user.name}</td>
                            <td className="p-4 align-middle">{user.problemsSolved}</td>
                            <td className="p-4 align-middle">{user.rating}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="weekly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Challenge</CardTitle>
                <CardDescription>Top performers in this week's coding challenge</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rank</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Score</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {weeklyUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">
                              {user.rank === 1 && (
                                <div className="flex items-center">
                                  <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                                  {user.rank}
                                </div>
                              )}
                              {user.rank !== 1 && user.rank}
                            </td>
                            <td className="p-4 align-middle font-medium">{user.name}</td>
                            <td className="p-4 align-middle">{user.score}</td>
                            <td className="p-4 align-middle">
                              {user.contestsWon > 0 ? (
                                <Badge>Winner</Badge>
                              ) : (
                                <Badge variant="outline">Participant</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="algorithm" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Algorithm Sprint</CardTitle>
                <CardDescription>Top performers in the algorithm sprint challenge</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rank</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Score</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {algorithmUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">
                              {user.rank === 1 && (
                                <div className="flex items-center">
                                  <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                                  {user.rank}
                                </div>
                              )}
                              {user.rank !== 1 && user.rank}
                            </td>
                            <td className="p-4 align-middle font-medium">{user.name}</td>
                            <td className="p-4 align-middle">{user.score}</td>
                            <td className="p-4 align-middle">
                              {user.contestsWon > 0 ? (
                                <Badge>Winner</Badge>
                              ) : (
                                <Badge variant="outline">Participant</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="masters" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Code Masters Cup</CardTitle>
                <CardDescription>Results from the latest Code Masters Cup tournament</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rank</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Round</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {mastersCupUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">
                              {user.rank === 1 && (
                                <div className="flex items-center">
                                  <Trophy className="h-4 w-4 text-yellow-500 mr-1" />
                                  {user.rank}
                                </div>
                              )}
                              {user.rank !== 1 && user.rank}
                            </td>
                            <td className="p-4 align-middle font-medium">{user.name}</td>
                            <td className="p-4 align-middle">
                              <Badge variant={user.round === "Winner" ? "default" : "outline"}>{user.round}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

