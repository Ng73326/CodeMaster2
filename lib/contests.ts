// Mock contest system without Supabase
interface Contest {
  id: string
  title: string
  description: string
  date: string
  start_time: string
  duration: string
  type: string
  status: 'upcoming' | 'active' | 'completed'
  created_by: string
  created_at: string
  updated_at: string
}

// Mock contests data
const mockContests: Contest[] = [
  {
    id: "1",
    title: "Weekly Challenge #6",
    description: "Solve algorithmic problems in this weekly challenge.",
    date: "2025-04-15",
    start_time: "18:00",
    duration: "2",
    type: "weekly-challenge",
    created_by: "1",
    status: "upcoming",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Algorithm Sprint #2",
    description: "Test your algorithm skills with timed challenges.",
    date: "2025-04-20",
    start_time: "20:00",
    duration: "1.5",
    type: "algorithm-sprint",
    created_by: "1",
    status: "upcoming",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Algorithm Sprint #1",
    description: "Test your algorithm skills in this timed sprint.",
    date: "2025-03-07",
    start_time: "19:00",
    duration: "2",
    type: "algorithm-sprint",
    created_by: "1",
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
]

export async function createContest(data: any): Promise<Contest> {
  const newContest: Contest = {
    id: (mockContests.length + 1).toString(),
    title: data.title,
    description: data.description,
    date: data.date,
    start_time: data.startTime,
    duration: data.duration,
    type: data.type,
    created_by: "1", // Mock admin user
    status: "upcoming",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mockContests.push(newContest)
  return newContest
}

export async function getUpcomingContests(): Promise<Contest[]> {
  return mockContests.filter(contest => contest.status === 'upcoming')
}

export async function getAllContests(): Promise<Contest[]> {
  return mockContests
}

export async function getContestById(id: string): Promise<Contest | null> {
  return mockContests.find(contest => contest.id === id) || null
}

export async function updateContestStatus(id: string, status: 'upcoming' | 'active' | 'completed'): Promise<void> {
  const contest = mockContests.find(c => c.id === id)
  if (contest) {
    contest.status = status
    contest.updated_at = new Date().toISOString()
  }
}