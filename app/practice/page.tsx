"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { getCurrentUser } from "@/lib/auth"
import { Search, Filter, Code, Clock, BarChart } from "lucide-react"

export default function PracticePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  // Mock practice problems
  const [problems] = useState([
    {
      id: "p1",
      title: "Two Sum",
      difficulty: "Easy",
      tags: ["Arrays", "Hash Table"],
      solvedCount: 12500,
      successRate: "85%",
    },
    {
      id: "p2",
      title: "Valid Parentheses",
      difficulty: "Easy",
      tags: ["Stack", "String"],
      solvedCount: 10200,
      successRate: "78%",
    },
    {
      id: "p3",
      title: "Merge Two Sorted Lists",
      difficulty: "Medium",
      tags: ["Linked List", "Recursion"],
      solvedCount: 8900,
      successRate: "72%",
    },
    {
      id: "p4",
      title: "Maximum Subarray",
      difficulty: "Medium",
      tags: ["Array", "Dynamic Programming"],
      solvedCount: 7800,
      successRate: "68%",
    },
    {
      id: "p5",
      title: "LRU Cache",
      difficulty: "Hard",
      tags: ["Hash Table", "Linked List", "Design"],
      solvedCount: 4500,
      successRate: "45%",
    },
    {
      id: "p6",
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      tags: ["Array", "Binary Search", "Divide and Conquer"],
      solvedCount: 3200,
      successRate: "38%",
    },
  ])

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

  // Filter problems based on search query and difficulty
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty =
      difficultyFilter === "all" || problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase()
    return matchesSearch && matchesDifficulty
  })

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
          <h2 className="text-3xl font-bold tracking-tight">Practice Problems</h2>
          <div className="flex items-center space-x-2">
            <Link href="/practice/random">
              <Button variant="outline">Random Problem</Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Filters sidebar */}
          <div className="w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Refine your problem search</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search problems..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={difficultyFilter === "all" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setDifficultyFilter("all")}
                    >
                      All
                    </Badge>
                    <Badge
                      variant={difficultyFilter === "easy" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setDifficultyFilter("easy")}
                    >
                      Easy
                    </Badge>
                    <Badge
                      variant={difficultyFilter === "medium" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setDifficultyFilter("medium")}
                    >
                      Medium
                    </Badge>
                    <Badge
                      variant={difficultyFilter === "hard" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setDifficultyFilter("hard")}
                    >
                      Hard
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Topics</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer">
                      Arrays
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Strings
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Dynamic Programming
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Graphs
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer">
                      Trees
                    </Badge>
                  </div>
                </div>

                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Problems list */}
          <div className="w-full md:w-3/4">
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Problems</TabsTrigger>
                <TabsTrigger value="solved">Solved</TabsTrigger>
                <TabsTrigger value="attempted">Attempted</TabsTrigger>
                <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <Card>
                  <CardContent className="p-0">
                    <div className="rounded-md border">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Title
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Difficulty
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Tags
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Solved By
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Success Rate
                              </th>
                            </tr>
                          </thead>
                          <tbody className="[&_tr:last-child]:border-0">
                            {filteredProblems.map((problem) => (
                              <tr
                                key={problem.id}
                                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                              >
                                <td className="p-4 align-middle">
                                  <Link
                                    href={`/practice/${problem.id}`}
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                  >
                                    {problem.title}
                                  </Link>
                                </td>
                                <td className="p-4 align-middle">
                                  <Badge
                                    variant={
                                      problem.difficulty === "Easy"
                                        ? "outline"
                                        : problem.difficulty === "Medium"
                                          ? "secondary"
                                          : "default"
                                    }
                                  >
                                    {problem.difficulty}
                                  </Badge>
                                </td>
                                <td className="p-4 align-middle">
                                  <div className="flex flex-wrap gap-1">
                                    {problem.tags.map((tag) => (
                                      <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </td>
                                <td className="p-4 align-middle">{problem.solvedCount.toLocaleString()}</td>
                                <td className="p-4 align-middle">{problem.successRate}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="solved" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center py-8">
                      <Code className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No solved problems yet</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Start solving problems to track your progress
                      </p>
                      <Button className="mt-4">Start Practicing</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attempted" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center py-8">
                      <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No attempted problems</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Problems you've attempted but not solved will appear here
                      </p>
                      <Button className="mt-4">Browse Problems</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookmarked" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center py-8">
                      <BarChart className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No bookmarked problems</h3>
                      <p className="text-sm text-muted-foreground mt-1">Bookmark problems to save them for later</p>
                      <Button className="mt-4">Explore Problems</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

