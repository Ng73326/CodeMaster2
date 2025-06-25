"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarDays, Clock, Trophy, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

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

interface RegisterForContestProps {
  contest: Contest
}

export default function RegisterForContest({ contest }: RegisterForContestProps) {
  const router = useRouter()
  const [registrationId, setRegistrationId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
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
        throw new Error("Invalid registration ID. Please check and try again.")
      }

      setSuccess(true)

      // Redirect to contest page after successful registration
      setTimeout(() => {
        router.push(`/contests/${contest.id}`)
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register for contest")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Register for Contest</CardTitle>
        <CardDescription>Enter your registration ID to participate in this contest</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{contest.title}</h3>
          <p className="text-sm text-muted-foreground">{contest.description}</p>

          <div className="flex flex-col space-y-2 mt-4">
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
        </div>

        <div className="border-t pt-4">
          <form onSubmit={handleRegister}>
            <div className="space-y-2">
              <Label htmlFor="registrationId">Registration ID</Label>
              <Input
                id="registrationId"
                placeholder="Enter your registration ID"
                value={registrationId}
                onChange={(e) => setRegistrationId(e.target.value)}
                disabled={loading || success}
                required
              />
              <p className="text-xs text-muted-foreground">
                Your registration ID was provided when you created your account
              </p>
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
                <AlertDescription>
                  Successfully registered for {contest.title}! Redirecting to contest page...
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full mt-4" disabled={loading || success}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Registered
                </>
              ) : (
                "Register Now"
              )}
            </Button>
          </form>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-center text-muted-foreground">
          By registering, you agree to follow the contest rules and code of conduct
        </p>
      </CardFooter>
    </Card>
  )
}

