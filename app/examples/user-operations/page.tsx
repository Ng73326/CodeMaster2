"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { userOperations } from "@/lib/supabase"
import type { User } from "@/lib/supabase"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default function UserOperationsExample() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    userId: ""
  })
  const [result, setResult] = useState("")

  // Fetch all users
  const handleFetchUsers = async () => {
    setLoading(true)
    try {
      const allUsers = await userOperations.getAllUsers()
      setUsers(allUsers)
      setResult(`✅ Fetched ${allUsers.length} users successfully`)
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Insert new user
  const handleInsertUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.userId) {
      setResult("❌ Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const createdUser = await userOperations.insertUser(newUser)
      setResult(`✅ User created successfully: ${createdUser.name}`)
      setNewUser({ name: "", email: "", userId: "" })
      // Refresh the users list
      handleFetchUsers()
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Get user by userId
  const handleGetUserByUserId = async () => {
    if (!newUser.userId) {
      setResult("❌ Please enter a userId")
      return
    }

    setLoading(true)
    try {
      const user = await userOperations.getUserByUserId(newUser.userId)
      if (user) {
        setResult(`✅ User found: ${user.name} (${user.email})`)
      } else {
        setResult("❌ User not found")
      }
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">User Table Operations</h1>
            <p className="text-muted-foreground">
              Examples of how to interact with the users table in Supabase
            </p>
          </div>

          {/* Fetch Users */}
          <Card>
            <CardHeader>
              <CardTitle>✅ Fetch All Users</CardTitle>
              <CardDescription>
                Retrieve all entries from the "users" table
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleFetchUsers} disabled={loading}>
                {loading ? "Loading..." : "Fetch All Users"}
              </Button>
              
              {users.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Users ({users.length}):</h3>
                  <div className="space-y-2">
                    {users.map((user) => (
                      <div key={user.id} className="p-3 border rounded-md">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>User ID:</strong> {user.userId}</p>
                        <p><strong>Created:</strong> {new Date(user.created_at || '').toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Insert User */}
          <Card>
            <CardHeader>
              <CardTitle>✅ Insert New User</CardTitle>
              <CardDescription>
                Add a new user with name, email, and userId (auth.user.id)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="userId">User ID (auth.user.id)</Label>
                  <Input
                    id="userId"
                    placeholder="uuid-string"
                    value={newUser.userId}
                    onChange={(e) => setNewUser(prev => ({ ...prev, userId: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={handleInsertUser} disabled={loading}>
                {loading ? "Creating..." : "Insert User"}
              </Button>
            </CardContent>
          </Card>

          {/* Get User by UserId */}
          <Card>
            <CardHeader>
              <CardTitle>🔍 Get User by UserId</CardTitle>
              <CardDescription>
                Find a user by their userId (auth.user.id)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="searchUserId">User ID to search</Label>
                <Input
                  id="searchUserId"
                  placeholder="Enter userId to search"
                  value={newUser.userId}
                  onChange={(e) => setNewUser(prev => ({ ...prev, userId: e.target.value }))}
                />
              </div>
              <Button onClick={handleGetUserByUserId} disabled={loading}>
                {loading ? "Searching..." : "Find User"}
              </Button>
            </CardContent>
          </Card>

          {/* Result Display */}
          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Result</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={result}
                  readOnly
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
          )}

          {/* Code Examples */}
          <Card>
            <CardHeader>
              <CardTitle>📝 Code Examples</CardTitle>
              <CardDescription>
                Here's how to use these operations in your code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">1. Fetch All Users:</h3>
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
{`import { userOperations } from '@/lib/supabase'

// Fetch all users
const users = await userOperations.getAllUsers()
console.log('All users:', users)`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium mb-2">2. Insert New User:</h3>
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
{`import { userOperations } from '@/lib/supabase'

// Insert new user
const newUser = await userOperations.insertUser({
  name: 'John Doe',
  email: 'john@example.com',
  userId: 'auth-user-id-here'
})
console.log('Created user:', newUser)`}
                  </pre>
                </div>

                <div>
                  <h3 className="font-medium mb-2">3. Get User by UserId:</h3>
                  <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
{`import { userOperations } from '@/lib/supabase'

// Get user by userId (auth.user.id)
const user = await userOperations.getUserByUserId('auth-user-id')
if (user) {
  console.log('User found:', user)
} else {
  console.log('User not found')
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}