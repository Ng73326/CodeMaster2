import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing')
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing')
  
  // For development, provide helpful error message
  if (typeof window !== 'undefined') {
    alert('Please set up your Supabase environment variables in .env.local')
  }
}

// Create Supabase client with error handling
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
    global: {
      headers: {
        'X-Client-Info': 'codemasters-app'
      }
    }
  }
)

// Database types
export interface User {
  id: string
  name: string
  email: string
  userId: string
  created_at?: string
  updated_at?: string
}

export interface Contest {
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

// User table operations with error handling
export const userOperations = {
  // Fetch all users
  async getAllUsers(): Promise<User[]> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching users:', error)
        throw error
      }
      
      return data || []
    } catch (error) {
      console.error('getAllUsers error:', error)
      return []
    }
  },

  // Insert new user
  async insertUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()
      
      if (error) {
        console.error('Error inserting user:', error)
        throw error
      }
      
      return data
    } catch (error) {
      console.error('insertUser error:', error)
      throw error
    }
  },

  // Get user by userId (auth.user.id)
  async getUserByUserId(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('userId', userId)
        .single()
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user by userId:', error)
        throw error
      }
      
      return data || null
    } catch (error) {
      console.error('getUserByUserId error:', error)
      return null
    }
  },

  // Update user
  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) {
        console.error('Error updating user:', error)
        throw error
      }
      
      return data
    } catch (error) {
      console.error('updateUser error:', error)
      throw error
    }
  },

  // Delete user
  async deleteUser(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
      
      if (error) {
        console.error('Error deleting user:', error)
        throw error
      }
    } catch (error) {
      console.error('deleteUser error:', error)
      throw error
    }
  }
}

// Test Supabase connection
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1)
    
    if (error) {
      console.error('Supabase connection test failed:', error)
      return false
    }
    
    console.log('Supabase connection successful')
    return true
  } catch (error) {
    console.error('Supabase connection error:', error)
    return false
  }
}