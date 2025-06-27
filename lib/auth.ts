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
  try {
    // Validate admin code if role is admin
    if (data.role === 'admin' && data.adminCode !== '123456') {
      throw new Error('Invalid admin code')
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
          role: data.role
        }
      }
    })

    if (authError) {
      throw new Error(authError.message)
    }

    if (!authData.user) {
      throw new Error('Failed to create user')
    }

    // Create user profile in our users table
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
      // If user profile creation fails, we should clean up the auth user
      console.error('Failed to create user profile:', userError)
      throw new Error('Failed to create user profile')
    }

    return userData
  } catch (error) {
    console.error('Error in createUserAccount:', error)
    throw error
  }
}

export async function loginUser(data: LoginData): Promise<User> {
  try {
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
      // If user doesn't exist in our users table, create it
      if (userError.code === 'PGRST116') {
        const { data: newUserData, error: createError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: authData.user.email!,
            name: authData.user.user_metadata?.full_name || authData.user.email!.split('@')[0],
            role: authData.user.user_metadata?.role || 'user',
            image: authData.user.user_metadata?.avatar_url
          })
          .select()
          .single()

        if (createError) {
          throw new Error('Failed to create user profile')
        }

        return newUserData
      }
      throw new Error(userError.message)
    }

    return userData
  } catch (error) {
    console.error('Error in loginUser:', error)
    throw error
  }
}

export async function logoutUser(): Promise<void> {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message)
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
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
      // If user doesn't exist in our users table, create it
      if (error.code === 'PGRST116') {
        const { data: newUserData, error: createError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.full_name || user.email!.split('@')[0],
            role: user.user_metadata?.role || 'user',
            image: user.user_metadata?.avatar_url
          })
          .select()
          .single()

        if (createError) {
          console.error('Failed to create user profile:', createError)
          return null
        }

        return newUserData
      }
      console.error('Error fetching user:', error)
      return null
    }

    return userData
  } catch (error) {
    console.error('Error in getCurrentUser:', error)
    return null
  }
}