"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

interface Contest {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  duration: string
  type: string
  status: "upcoming" | "active" | "completed"
}

interface JoinContestProps {
  contest: Contest
}

export default function JoinContest({ contest }: JoinContestProps) {
  const router = useRouter()
  const [registrationId, setRegistrationId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!registrationId.trim()) {
      setError("Please enter your registration ID")
      return
    }

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      // In a real app, this would be an API call to your backend
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if registration ID is valid (for demo purposes)
      if (registrationId.length < 5) {
        throw new Error("Invalid registration ID or you are not registered for this contest.")
      }

      setSuccess(true)

      // Redirect to contest arena after successful join
      setTimeout(() => {
        router.push(`/contests/${contest.id}/arena`)
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join contest")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Join Live Contest</CardTitle>
        <CardDescription>Enter your registration ID to join the ongoing contest</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-yellow-50 text-yellow-800 rounded-md dark:bg-yellow-900/20 dark:text-yellow-400">
          <p className="text-sm font-medium">
            Make sure you're ready before joining. The timer will start immediately after you join.
          </p>
        </div>

        <form onSubmit={handleJoin}>
          <div className="space-y-2">
            <Label htmlFor="joinRegistrationId">Registration ID</Label>
            <Input
              id="joinRegistrationId"
              placeholder="Enter your registration ID"
              value={registrationId}
              onChange={(e) => setRegistrationId(e.target.value)}
              disabled={loading || success}
              required
            />
            <p className="text-xs text-muted-foreground">You must have registered for this contest earlier</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Successfully joined the contest! Redirecting to contest arena...</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full mt-4" disabled={loading || success}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : success ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Joined
              </>
            ) : (
              "Join Contest Now"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-center text-muted-foreground">
          Not registered yet?{" "}
          <Link href={`/contests/${contest.id}/register`} className="text-primary underline">
            Register first
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

