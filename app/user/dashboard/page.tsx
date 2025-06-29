"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { Overview } from "@/components/overview"
import { RecentContests } from "@/components/recent-contests"
import { UpcomingContests } from "@/components/upcoming-contests"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { Trophy, Target, Code, TrendingUp, Calendar, Award, Zap, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { userOperations } from "@/lib/supabase"

export default function UserDashboard() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [userStats, setUserStats] = useState({
    problemsSolved: 42,
    recentlySolved: 5,
    globalRank: 128,
    rankChange: 15,
    contestsWon: 2,
    totalContests: 8,
    rating: 1850,
    ratingChange: 75,
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav user={user} />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between space-y-2"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h2>
            <p className="text-muted-foreground">
              Ready to level up your coding skills today?
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/contests">
              <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                <Trophy className="mr-2 h-4 w-4" />
                Join Contest
              </Button>
            </Link>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contests">Contests</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
                    <Code className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{userStats.problemsSolved}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+{userStats.recentlySolved}</span> this month
                    </p>
                    <Progress value={75} className="mt-2" />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Global Ranking</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">#{userStats.globalRank}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+{userStats.rankChange}</span> from last week
                    </p>
                    <Badge variant="secondary" className="mt-2">Top 15%</Badge>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Contests Won</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{userStats.contestsWon}</div>
                    <p className="text-xs text-muted-foreground">{userStats.totalContests} total participated</p>
                    <div className="flex gap-1 mt-2">
                      <Award className="h-3 w-3 text-yellow-500" />
                      <Award className="h-3 w-3 text-gray-400" />
                      <Award className="h-3 w-3 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Current Rating</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{userStats.rating}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">+{userStats.ratingChange}</span> from last contest
                    </p>
                    <Badge variant="outline" className="mt-2">Expert</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Performance Overview
                    </CardTitle>
                    <CardDescription>Your coding progress over the last 12 months</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Recent Contests
                    </CardTitle>
                    <CardDescription>Your latest contest performances</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentContests />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Jump into your coding journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Link href="/practice">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Code className="h-6 w-6" />
                        <span>Practice Problems</span>
                      </Button>
                    </Link>
                    <Link href="/contests">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Trophy className="h-6 w-6" />
                        <span>Join Contest</span>
                      </Button>
                    </Link>
                    <Link href="/leaderboard">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                        <TrendingUp className="h-6 w-6" />
                        <span>View Rankings</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="contests" className="space-y-4">
            <UpcomingContests />
          </TabsContent>

          <TabsContent value="practice" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Practice Problems</CardTitle>
                <CardDescription>Sharpen your skills with curated coding challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Link href="/practice?difficulty=easy">
                      <Button variant="outline" className="w-full h-16 flex flex-col gap-1 hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-950">
                        <span className="font-semibold">Easy</span>
                        <span className="text-xs text-muted-foreground">20 solved</span>
                      </Button>
                    </Link>
                    <Link href="/practice?difficulty=medium">
                      <Button variant="outline" className="w-full h-16 flex flex-col gap-1 hover:bg-yellow-50 hover:border-yellow-200 dark:hover:bg-yellow-950">
                        <span className="font-semibold">Medium</span>
                        <span className="text-xs text-muted-foreground">15 solved</span>
                      </Button>
                    </Link>
                    <Link href="/practice?difficulty=hard">
                      <Button variant="outline" className="w-full h-16 flex flex-col gap-1 hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950">
                        <span className="font-semibold">Hard</span>
                        <span className="text-xs text-muted-foreground">5 solved</span>
                      </Button>
                    </Link>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="font-medium mb-2">Recommended for you</h3>
                    <div className="space-y-2">
                      <Link href="/practice/p1" className="block p-3 rounded-md hover:bg-muted transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Two Sum</p>
                            <p className="text-sm text-muted-foreground">Array, Hash Table</p>
                          </div>
                          <Badge variant="outline">Easy</Badge>
                        </div>
                      </Link>
                      <Link href="/practice/p3" className="block p-3 rounded-md hover:bg-muted transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Merge Two Sorted Lists</p>
                            <p className="text-sm text-muted-foreground">Linked List, Recursion</p>
                          </div>
                          <Badge variant="secondary">Medium</Badge>
                        </div>
                      </Link>
                    </div>
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