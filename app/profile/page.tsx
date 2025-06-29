"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { getCurrentUser } from "@/lib/auth"
import { getUserProfile } from "@/lib/user"
import { Code, Trophy, Star, Settings, Calendar } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get current authenticated user
        const userData = await getCurrentUser()
        setUser(userData)

        if (userData) {
          // Get user profile with stats
          const profileData = await getUserProfile()
          setUserProfile(profileData)
        }
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

  if (!user) {
    return <div className="flex h-screen items-center justify-center">Please log in to view your profile.</div>
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
                    <p className="text-sm text-muted-foreground">@{user.email?.split('@')[0]}</p>

                    <div className="mt-2">
                      <Badge variant="outline" className="mr-1">
                        <Trophy className="mr-1 h-3 w-3" /> 
                        {userProfile?.globalRank ? `Rank #${userProfile.globalRank}` : 'Unranked'}
                      </Badge>
                    </div>

                    <p className="mt-4 text-sm">Passionate about coding and competitive programming</p>

                    <div className="w-full mt-6 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{user.email}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Joined:</span>
                        <span>Recently</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Role:</span>
                        <span className="capitalize">{user.role}</span>
                      </div>
                    </div>

                    <div className="w-full mt-6">
                      <h3 className="text-sm font-medium mb-2 text-left">Preferred Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">JavaScript</Badge>
                        <Badge variant="secondary">Python</Badge>
                        <Badge variant="secondary">C++</Badge>
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
                        <div className="text-2xl font-bold">{userProfile?.problemsSolved || 0}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Easy: 0 • Medium: 0 • Hard: 0
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Start solving problems to see your rate
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
                          {userProfile?.contestsWon || 0} / {userProfile?.totalContests || 0}
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
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No recent activity</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Start participating in contests or solving problems to see your activity here
                        </p>
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
                      <div className="text-center py-8">
                        <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No contest history yet</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Participate in contests to see your performance history
                        </p>
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
                            <span className="text-sm text-muted-foreground">0 solved</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: "0%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium">Medium Problems</h4>
                            <span className="text-sm text-muted-foreground">0 solved</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full" style={{ width: "0%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-medium">Hard Problems</h4>
                            <span className="text-sm text-muted-foreground">0 solved</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full" style={{ width: "0%" }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-sm font-medium mb-4">Recently Solved Problems</h3>
                        <div className="text-center py-4">
                          <p className="text-muted-foreground">No problems solved yet</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Start solving problems to see your progress
                          </p>
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
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground">No activity yet</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Your coding activity will appear here as you participate in contests and solve problems
                          </p>
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