import { supabase } from './supabase'
import type { Database } from './database.types'

type User = Database['public']['Tables']['users']['Row']

interface SignupData {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  adminCode?: string
}

interface LoginData {
  email: string
  password: string
}

export async function createUserAccount(data: SignupData): Promise<User> {
  // Validate admin code if role is admin
  if (data.role === 'admin' && data.adminCode !== '123456') {
    throw new Error('Invalid admin code')
  }

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })

  if (authError) {
    throw new Error(authError.message)
  }

  if (!authData.user) {
    throw new Error('Failed to create user')
  }

  // Create user profile
  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({
      id: authData.user.id,
      email: data.email,
      name: data.name,
      role: data.role,
    })
    .select()
    .single()

  if (userError) {
    throw new Error(userError.message)
  }

  return userData
}

export async function loginUser(data: LoginData): Promise<User> {
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (authError) {
    throw new Error(authError.message)
  }

  if (!authData.user) {
    throw new Error('Failed to login')
  }

  // Get user profile
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', authData.user.id)
    .single()

  if (userError) {
    throw new Error(userError.message)
  }

  return userData
}

export async function logoutUser(): Promise<void> {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null
  }

  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    return null
  }

  return userData
}