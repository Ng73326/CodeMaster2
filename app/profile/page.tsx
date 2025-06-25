"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { getUserProfile } from "@/lib/user"
import { Code, Trophy, Star, Settings, Calendar } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real app, this would fetch the user's profile from the API
        const userData = await getUserProfile()

        // Add additional profile data for this page
        const profileData = {
          ...userData,
          username: "rahul_dev",
          bio: "Passionate Coder | Loves Competitive Programming",
          preferredLanguages: ["Python", "JavaScript", "C++"],
          themePreference: "dark",
          contestsParticipated: 12,
          contestsWon: 5,
          globalRanking: 45,
          problemsSolved: {
            easy: 20,
            medium: 15,
            hard: 5,
            total: 40,
          },
          successRate: "85%",
          fastestSubmissionTime: "1.2 sec",
          recentActivity: [
            { type: "contest", name: "Weekly Challenge #5", date: "2025-03-01", result: "Rank #3" },
            { type: "problem", name: "Find the Largest Number", date: "2025-02-28", result: "Solved" },
            { type: "contest", name: "Algorithm Sprint #2", date: "2025-02-15", result: "Rank #7" },
            { type: "problem", name: "Valid Parentheses", date: "2025-02-10", result: "Solved" },
          ],
        }

        setUser(profileData)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserNav user={user} />
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            {/* Profile Sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user.image || ""} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>

                    <div className="mt-2">
                      <Badge variant="outline" className="mr-1">
                        <Trophy className="mr-1 h-3 w-3" /> Rank #{user.globalRanking}
                      </Badge>
                    </div>

                    <p className="mt-4 text-sm">{user.bio}</p>

                    <div className="w-full mt-6 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{user.email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Joined:</span>
                        <span>January 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Theme:</span>
                        <span className="capitalize">{user.themePreference}</span>
                      </div>
                    </div>

                    <div className="w-full mt-6">
                      <h3 className="text-sm font-medium mb-2 text-left">Preferred Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.preferredLanguages.map((lang: string) => (
                          <Badge key={lang} variant="secondary">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full mt-6">
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="contests">Contests</TabsTrigger>
                  <TabsTrigger value="problems">Problems</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
                        <Code className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{user.problemsSolved.total}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Easy: {user.problemsSolved.easy} • Medium: {user.problemsSolved.medium} • Hard:{" "}
                          {user.problemsSolved.hard}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{user.successRate}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Fastest submission: {user.fastestSubmissionTime}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Contests</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {user.contestsWon} / {user.contestsParticipated}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Contests won / participated</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your recent contests and problem-solving activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {user.recentActivity.map((activity: any, index: number) => (
                          <div key={index} className="flex items-start">
                            <div className="mr-4">
                              {activity.type === "contest" ? (
                                <div className="bg-primary/10 p-2 rounded-full">
                                  <Trophy className="h-5 w-5 text-primary" />
                                </div>
                              ) : (
                                <div className="bg-secondary/10 p-2 rounded-full">
                                  <Code className="h-5 w-5 text-secondary-foreground" />
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h4 className="font-medium">{activity.name}</h4>
                                <Badge variant="outline" className="ml-2">
                                  {activity.result}
                                </Badge>
                              </div>
                              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-3 w-3" />
                                {activity.date}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contests" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contest History</CardTitle>
                      <CardDescription>Your performance in past contests</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <div className="relative w-full overflow-auto">
                          <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Contest
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Date
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Rank
                                </th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                  Score
                                </th>
                              </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <td className="p-4 align-middle font-medium">Weekly Challenge #5</td>
                                <td className="p-4 align-middle">Mar 1, 2025</td>
                                <td className="p-4 align-middle">3 / 120</td>
                                <td className="p-4 align-middle">450</td>
                              </tr>
                              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <td className="p-4 align-middle font-medium">Algorithm Sprint #2</td>
                                <td className="p-4 align-middle">Feb 15, 2025</td>
                                <td className="p-4 align-middle">7 / 85</td>
                                <td className="p-4 align-middle">380</td>
                              </tr>
                              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <td className="p-4 align-middle font-medium">Weekly Challenge #4</td>
                                <td className="p-4 align-middle">Feb 7, 2025</td>
                                <td className="p-4 align-middle">12 / 110</td>
                                <td className="p-4 align-middle">320</td>
                              </tr>
                              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <td className="p-4 align-middle font-medium">Code Masters Cup</td>
                                <td className="p-4 align-middle">Jan 25, 2025</td>
                                <td className="p-4 align-middle">Semi-Finalist</td>
                                <td className="p-4 align-middle">420</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="problems" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Problem Solving Stats</CardTitle>
                      <CardDescription>Your problem-solving performance by difficulty</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium">Easy Problems</h4>
                            <span className="text-sm text-muted-foreground">{user.problemsSolved.easy} solved</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium">Medium Problems</h4>
                            <span className="text-sm text-muted-foreground">{user.problemsSolved.medium} solved</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium">Hard Problems</h4>
                            <span className="text-sm text-muted-foreground">{user.problemsSolved.hard} solved</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: "30%" }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-sm font-medium mb-4">Recently Solved Problems</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                            <div>
                              <p className="font-medium">Find the Largest Number</p>
                              <p className="text-xs text-muted-foreground">Easy • Feb 28, 2025</p>
                            </div>
                            <Badge variant="outline">1.2 sec</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                            <div>
                              <p className="font-medium">Valid Parentheses</p>
                              <p className="text-xs text-muted-foreground">Medium • Feb 10, 2025</p>
                            </div>
                            <Badge variant="outline">2.5 sec</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                            <div>
                              <p className="font-medium">Merge Two Sorted Lists</p>
                              <p className="text-xs text-muted-foreground">Medium • Jan 30, 2025</p>
                            </div>
                            <Badge variant="outline">3.1 sec</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Activity Calendar</CardTitle>
                      <CardDescription>Your coding activity over the past year</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 flex items-center justify-center border rounded-md">
                        <p className="text-muted-foreground">Activity calendar visualization would go here</p>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-sm font-medium mb-4">Activity Feed</h3>
                        <div className="space-y-4">
                          {user.recentActivity.map((activity: any, index: number) => (
                            <div key={index} className="flex items-start border-b pb-4 last:border-0">
                              <div className="mr-4">
                                {activity.type === "contest" ? (
                                  <div className="bg-primary/10 p-2 rounded-full">
                                    <Trophy className="h-5 w-5 text-primary" />
                                  </div>
                                ) : (
                                  <div className="bg-secondary/10 p-2 rounded-full">
                                    <Code className="h-5 w-5 text-secondary-foreground" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <h4 className="font-medium">{activity.name}</h4>
                                  <Badge variant="outline" className="ml-2">
                                    {activity.result}
                                  </Badge>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                                  <Calendar className="mr-1 h-3 w-3" />
                                  {activity.date}
                                </div>
                                <p className="mt-2 text-sm">
                                  {activity.type === "contest"
                                    ? `You participated in ${activity.name} and achieved ${activity.result}.`
                                    : `You solved the ${activity.name} problem successfully.`}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

