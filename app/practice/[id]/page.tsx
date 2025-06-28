"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { CodeExecutionPanel } from "@/components/code-execution-panel"
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
          testCases: [
            {
              input: "2 7 11 15\n9",
              expectedOutput: "0 1",
              description: "Basic test case"
            },
            {
              input: "3 2 4\n6",
              expectedOutput: "1 2",
              description: "Different indices"
            },
            {
              input: "3 3\n6",
              expectedOutput: "0 1",
              description: "Same values"
            }
          ],
          starterCode: {
            javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Read input
    const lines = input.trim().split('\\n');
    const numsArray = lines[0].split(' ').map(Number);
    const targetValue = parseInt(lines[1]);
    
    // Your solution here
    
    // Return result as space-separated string
    return result.join(' ');
}

// Test with sample input
const input = \`2 7 11 15
9\`;
console.log(twoSum(input));`,
            python: `def two_sum():
    # Read input
    lines = input().strip().split('\\n')
    nums = list(map(int, lines[0].split()))
    target = int(lines[1])
    
    # Your solution here
    
    # Print result as space-separated values
    print(' '.join(map(str, result)))

two_sum()`,
            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Read input
        String[] numsStr = scanner.nextLine().split(" ");
        int[] nums = new int[numsStr.length];
        for (int i = 0; i < numsStr.length; i++) {
            nums[i] = Integer.parseInt(numsStr[i]);
        }
        int target = scanner.nextInt();
        
        // Your solution here
        
        // Print result
        System.out.println(result[0] + " " + result[1]);
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    
    // Parse nums array
    vector<int> nums;
    stringstream ss(line);
    int num;
    while (ss >> num) {
        nums.push_back(num);
    }
    
    // Read target
    int target;
    cin >> target;
    
    // Your solution here
    
    // Print result
    cout << result[0] << " " << result[1] << endl;
    
    return 0;
}`
          }
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

            {/* Code execution panel */}
            <div className="lg:col-span-2">
              <CodeExecutionPanel
                initialCode={problem.starterCode?.javascript || ""}
                initialLanguage="javascript"
                problemTitle={problem.title}
                testCases={problem.testCases}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}