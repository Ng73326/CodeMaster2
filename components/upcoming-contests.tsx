"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getUpcomingContests } from "@/lib/contests"
import { CalendarDays, Clock, Trophy } from "lucide-react"

export function UpcomingContests() {
  const [contests, setContests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const data = await getUpcomingContests()
        setContests(data)
      } catch (error) {
        console.error("Failed to fetch contests:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContests()
  }, [])

  if (loading) {
    return <div className="flex justify-center p-4">Loading contests...</div>
  }

  if (contests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Upcoming Contests</CardTitle>
          <CardDescription>There are no upcoming contests scheduled at the moment.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {contests.map((contest) => (
        <Card key={contest.id}>
          <CardHeader>
            <CardTitle>{contest.title}</CardTitle>
            <CardDescription>{contest.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
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
          </CardContent>
          <CardFooter className="flex gap-2">
            <Link href={`/contests/${contest.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                Details
              </Button>
            </Link>
            <Link href={`/contests/${contest.id}/register`} className="flex-1">
              <Button className="w-full">Register</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

