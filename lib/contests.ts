import { supabase } from './supabase'
import type { Database } from './database.types'

type Contest = Database['public']['Tables']['contests']['Row']
type ContestInsert = Database['public']['Tables']['contests']['Insert']

export async function createContest(data: any): Promise<Contest> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const contestData: ContestInsert = {
      title: data.title,
      description: data.description,
      date: data.date,
      start_time: data.startTime,
      duration: data.duration,
      type: data.type,
      created_by: user.id,
    }

    const { data: contest, error } = await supabase
      .from('contests')
      .insert(contestData)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return contest
  } catch (error) {
    console.error('Error creating contest:', error)
    throw error
  }
}

export async function getUpcomingContests(): Promise<Contest[]> {
  try {
    const { data, error } = await supabase
      .from('contests')
      .select('*')
      .eq('status', 'upcoming')
      .order('date', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    console.error('Error fetching upcoming contests:', error)
    // Return mock data as fallback
    return [
      {
        id: "1",
        title: "Weekly Challenge #6",
        description: "Solve algorithmic problems in this weekly challenge.",
        date: "2025-04-15",
        start_time: "18:00",
        duration: "2",
        type: "weekly-challenge",
        created_by: "system",
        status: "upcoming" as const,
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
        created_by: "system",
        status: "upcoming" as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    ]
  }
}

export async function getAllContests(): Promise<Contest[]> {
  try {
    const { data, error } = await supabase
      .from('contests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    console.error('Error fetching all contests:', error)
    return []
  }
}

export async function getContestById(id: string): Promise<Contest | null> {
  try {
    const { data, error } = await supabase
      .from('contests')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Return mock data for demo purposes
        return {
          id: id,
          title: "Algorithm Sprint #1",
          description: "Test your algorithm skills in this timed sprint.",
          date: "2025-03-07",
          start_time: "19:00",
          duration: "2",
          type: "algorithm-sprint",
          created_by: "system",
          status: "active" as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching contest by ID:', error)
    return null
  }
}

export async function updateContestStatus(id: string, status: 'upcoming' | 'active' | 'completed'): Promise<void> {
  try {
    const { error } = await supabase
      .from('contests')
      .update({ status })
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    console.error('Error updating contest status:', error)
    throw error
  }
}