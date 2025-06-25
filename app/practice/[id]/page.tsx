"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { CodeEditor } from "@/components/code-editor"
import { getCurrentUser } from "@/lib/auth"
import { ArrowLeft, Bookmark, Share2, ThumbsUp, MessageSquare } from "lucide-react"

export default function PracticeProblemPage() {
  const params = useParams()
  const router = useRouter()
  const problemId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [problem, setProblem] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userData = await getCurrentUser()
        setUser(userData)

        // In a real app, this would fetch the problem from your API
        // const response = await fetch(`/api/problems/${problemId}`);
        // const problemData = await response.json();

        // Mock problem data for demonstration
        const mockProblem = {
          id: problemId,
          title: "Two Sum",
          difficulty: "Easy",
          tags: ["Arrays", "Hash Table"],
          description:
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
          examples: [
            {
              input: "nums = [2,7,11,15], target = 9",
              output: "[0,1]",
              explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
            },
            {
              input: "nums = [3,2,4], target = 6",
              output: "[1,2]",
              explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
            },
            {
              input: "nums = [3,3], target = 6",
              output: "[0,1]",
              explanation: "Because nums[0] + nums[1] == 6, we return [0, 1].",
            },
          ],
          constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists.",
          ],
          hints: [
            "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
            "Try to use the fact that the complement of the number we need is already in the hash table.",
          ],
          solvedCount: 12500,
          successRate: "85%",
          discussions: 342,
          solutions: 156,
          likes: 1250,
        }
        setProblem(mockProblem)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [problemId])

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

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
      <main className="flex-1 p-4 md:p-8">
        <div className="container max-w-7xl">
          <div className="mb-6">
            <Link href="/practice">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" /> Back to Problems
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Problem description */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{problem.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
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
                        <span className="text-xs text-muted-foreground">Success Rate: {problem.successRate}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="space-y-2">
                    <p className="whitespace-pre-line">{problem.description}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Examples:</h3>
                    {problem.examples.map((example: any, index: number) => (
                      <div key={index} className="p-3 bg-muted rounded-md">
                        <p className="font-mono text-sm">
                          <strong>Input:</strong> {example.input}
                        </p>
                        <p className="font-mono text-sm">
                          <strong>Output:</strong> {example.output}
                        </p>
                        {example.explanation && (
                          <p className="font-mono text-sm">
                            <strong>Explanation:</strong> {example.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Constraints:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {problem.constraints.map((constraint: string, index: number) => (
                        <li key={index} className="text-sm font-mono">
                          {constraint}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Hints:</h3>
                    <div className="space-y-2">
                      {problem.hints.map((hint: string, index: number) => (
                        <div
                          key={index}
                          className="p-2 bg-yellow-50 text-yellow-800 rounded-md dark:bg-yellow-900/20 dark:text-yellow-400"
                        >
                          <p className="text-sm">{hint}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">{problem.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span className="text-sm">{problem.discussions}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Solved by {problem.solvedCount.toLocaleString()} users
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Code editor and tabs */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="p-4 border-b">
                  <Tabs defaultValue="code">
                    <TabsList className="w-full justify-start h-10">
                      <TabsTrigger value="code" className="data-[state=active]:bg-background">
                        Code
                      </TabsTrigger>
                      <TabsTrigger value="solutions" className="data-[state=active]:bg-background">
                        Solutions
                      </TabsTrigger>
                      <TabsTrigger value="discussions" className="data-[state=active]:bg-background">
                        Discussions
                      </TabsTrigger>
                      <TabsTrigger value="submissions" className="data-[state=active]:bg-background">
                        Submissions
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[600px]">
                    <CodeEditor
                      defaultLanguage="javascript"
                      defaultValue={`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your solution here
  
}`}
                    />
                  </div>
                  <div className="p-4 border-t flex justify-between">
                    <div className="flex gap-2">
                      <select className="px-3 py-1 border rounded-md text-sm">
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                      </select>
                      <Button variant="outline" size="sm">
                        Run Code
                      </Button>
                    </div>
                    <Button size="sm">Submit Solution</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

