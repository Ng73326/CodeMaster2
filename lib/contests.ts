import { supabase } from './supabase'
import type { Contest } from './supabase'

// Contest operations using Supabase
export const contestOperations = {
  // Create a new contest
  async createContest(contestData: Omit<Contest, 'id' | 'created_at' | 'updated_at'>): Promise<Contest> {
    const { data, error } = await supabase
      .from('contests')
      .insert([contestData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating contest:', error)
      throw error
    }
    
    return data
  },

  // Get all contests
  async getAllContests(): Promise<Contest[]> {
    const { data, error } = await supabase
      .from('contests')
      .select('*')
      .order('date', { ascending: true })
    
    if (error) {
      console.error('Error fetching contests:', error)
      throw error
    }
    
    return data || []
  },

  // Get upcoming contests
  async getUpcomingContests(): Promise<Contest[]> {
    const { data, error } = await supabase
      .from('contests')
      .select('*')
      .eq('status', 'upcoming')
      .order('date', { ascending: true })
    
    if (error) {
      console.error('Error fetching upcoming contests:', error)
      throw error
    }
    
    return data || []
  },

  // Get contest by ID
  async getContestById(id: string): Promise<Contest | null> {
    const { data, error } = await supabase
      .from('contests')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching contest:', error)
      throw error
    }
    
    return data || null
  },

  // Update contest status
  async updateContestStatus(id: string, status: 'upcoming' | 'active' | 'completed'): Promise<Contest> {
    const { data, error } = await supabase
      .from('contests')
      .update({ status })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating contest status:', error)
      throw error
    }
    
    return data
  }
}

// Export functions for backward compatibility
export async function createContest(data: any): Promise<Contest> {
  return contestOperations.createContest(data)
}

export async function getUpcomingContests(): Promise<Contest[]> {
  return contestOperations.getUpcomingContests()
}

export async function getAllContests(): Promise<Contest[]> {
  return contestOperations.getAllContests()
}

export async function getContestById(id: string): Promise<Contest | null> {
  return contestOperations.getContestById(id)
}

export async function updateContestStatus(id: string, status: 'upcoming' | 'active' | 'completed'): Promise<void> {
  await contestOperations.updateContestStatus(id, status)
}