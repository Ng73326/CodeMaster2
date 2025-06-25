import { supabase } from './supabase'
import type { Database } from './database.types'

type Contest = Database['public']['Tables']['contests']['Row']
type ContestInsert = Database['public']['Tables']['contests']['Insert']

export async function createContest(data: any): Promise<Contest> {
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
}

export async function getUpcomingContests(): Promise<Contest[]> {
  const { data, error } = await supabase
    .from('contests')
    .select('*')
    .eq('status', 'upcoming')
    .order('date', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export async function getAllContests(): Promise<Contest[]> {
  const { data, error } = await supabase
    .from('contests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export async function getContestById(id: string): Promise<Contest | null> {
  const { data, error } = await supabase
    .from('contests')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return null
  }

  return data
}

export async function updateContestStatus(id: string, status: 'upcoming' | 'active' | 'completed'): Promise<void> {
  const { error } = await supabase
    .from('contests')
    .update({ status })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}