import { supabase, userOperations } from './supabase'
import type { User } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  image?: string
  email_confirmed_at?: string
}

export interface SignupData {
  name: string
  email: string
  password: string
  role?: 'user' | 'admin'
}

export interface LoginData {
  email: string
  password: string
}

// Clear any cached user data on app start
export async function clearCachedUserData(): Promise<void> {
  try {
    // Clear localStorage and sessionStorage
    if (typeof window !== 'undefined') {
      const keysToRemove = [
        'supabase.auth.token',
        'sb-fjfnkdpmkziirmldnhxj-auth-token',
        'user-profile',
        'user-data',
        'john-doe-data'
      ]
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key)
        sessionStorage.removeItem(key)
      })
      
      // Clear auth-related cookies
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=")
        const name = eqPos > -1 ? c.substr(0, eqPos) : c
        if (name.trim().includes('auth') || name.trim().includes('supabase')) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
        }
      })
    }
    
    // Sign out from Supabase
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Error clearing cached user data:', error)
  }
}

// Sign up with email verification
export async function createUserAccount(data: SignupData): Promise<{ user: User | null; needsVerification: boolean }> {
  try {
    await clearCachedUserData()
    
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          role: data.role || 'user'
        }
      }
    })

    if (error) {
      console.error('Signup error:', error)
      throw error
    }

    // Check if user needs email verification
    if (authData.user && !authData.user.email_confirmed_at) {
      return { user: authData.user, needsVerification: true }
    }

    // If user is immediately confirmed, create user record
    if (authData.user && authData.user.email_confirmed_at) {
      try {
        await userOperations.insertUser({
          name: data.name,
          email: data.email,
          userId: authData.user.id
        })
      } catch (dbError) {
        console.error('Error creating user record:', dbError)
        // Continue anyway, user can be created later
      }
    }

    return { user: authData.user, needsVerification: false }
  } catch (error) {
    console.error('createUserAccount error:', error)
    throw error
  }
}

// Login with email verification check
export async function loginUser(data: LoginData): Promise<AuthUser> {
  try {
    await clearCachedUserData()
    
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })

    if (error) {
      console.error('Login error:', error)
      
      // Handle specific email confirmation error
      if (error.message === 'Email not confirmed' || error.message.includes('email_not_confirmed')) {
        throw new Error('Please verify your email before logging in. Check your inbox for the verification link.')
      }
      throw error
    }

    if (!authData.user) {
      throw new Error('Login failed - no user returned')
    }

    // Check if email is verified
    if (!authData.user.email_confirmed_at) {
      throw new Error('Please verify your email before logging in. Check your inbox for the verification link.')
    }

    // Get or create user record in users table
    let userRecord = await userOperations.getUserByUserId(authData.user.id)
    
    if (!userRecord) {
      try {
        // Create user record if it doesn't exist
        userRecord = await userOperations.insertUser({
          name: authData.user.user_metadata?.name || authData.user.user_metadata?.full_name || 'User',
          email: authData.user.email!,
          userId: authData.user.id
        })
      } catch (dbError) {
        console.error('Error creating user record during login:', dbError)
        // Use fallback user data
        userRecord = {
          id: 'temp',
          name: authData.user.user_metadata?.name || 'User',
          email: authData.user.email!,
          userId: authData.user.id
        }
      }
    }

    return {
      id: authData.user.id,
      email: authData.user.email!,
      name: userRecord.name,
      role: (authData.user.user_metadata?.role as 'user' | 'admin') || 'user',
      image: authData.user.user_metadata?.avatar_url || authData.user.user_metadata?.picture,
      email_confirmed_at: authData.user.email_confirmed_at
    }
  } catch (error) {
    console.error('loginUser error:', error)
    throw error
  }
}

// Google OAuth login
export async function loginWithGoogle(): Promise<{ url?: string; error?: string }> {
  try {
    await clearCachedUserData()
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    })

    if (error) {
      console.error('Google OAuth error:', error)
      return { error: error.message }
    }

    return { url: data.url }
  } catch (error) {
    console.error('loginWithGoogle error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to login with Google' }
  }
}

// Handle OAuth callback
export async function handleOAuthCallback(): Promise<AuthUser | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      console.error('OAuth callback error:', error)
      return null
    }

    // Get or create user record
    let userRecord = await userOperations.getUserByUserId(user.id)
    
    if (!userRecord) {
      try {
        userRecord = await userOperations.insertUser({
          name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          email: user.email!,
          userId: user.id
        })
      } catch (dbError) {
        console.error('Error creating OAuth user record:', dbError)
        // Use fallback
        userRecord = {
          id: 'temp',
          name: user.user_metadata?.full_name || 'User',
          email: user.email!,
          userId: user.id
        }
      }
    }

    return {
      id: user.id,
      email: user.email!,
      name: userRecord.name,
      role: (user.user_metadata?.role as 'user' | 'admin') || 'user',
      image: user.user_metadata?.avatar_url || user.user_metadata?.picture,
      email_confirmed_at: user.email_confirmed_at
    }
  } catch (error) {
    console.error('handleOAuthCallback error:', error)
    return null
  }
}

// Logout user
export async function logoutUser(): Promise<void> {
  try {
    await clearCachedUserData()
    
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Logout error:', error)
      throw error
    }
  } catch (error) {
    console.error('logoutUser error:', error)
    throw error
  }
}

// Get current user
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }

    // Check email verification for email/password users
    if (user.app_metadata?.provider === 'email' && !user.email_confirmed_at) {
      return null
    }

    // Get user record from database
    const userRecord = await userOperations.getUserByUserId(user.id)
    
    if (!userRecord) {
      // Try to create user record if missing
      try {
        const newUserRecord = await userOperations.insertUser({
          name: user.user_metadata?.name || user.user_metadata?.full_name || 'User',
          email: user.email!,
          userId: user.id
        })
        
        return {
          id: user.id,
          email: user.email!,
          name: newUserRecord.name,
          role: (user.user_metadata?.role as 'user' | 'admin') || 'user',
          image: user.user_metadata?.avatar_url || user.user_metadata?.picture,
          email_confirmed_at: user.email_confirmed_at
        }
      } catch (dbError) {
        console.error('Error creating missing user record:', dbError)
        return null
      }
    }

    return {
      id: user.id,
      email: user.email!,
      name: userRecord.name,
      role: (user.user_metadata?.role as 'user' | 'admin') || 'user',
      image: user.user_metadata?.avatar_url || user.user_metadata?.picture,
      email_confirmed_at: user.email_confirmed_at
    }
  } catch (error) {
    console.error('getCurrentUser error:', error)
    return null
  }
}

// Resend verification email
export async function resendVerificationEmail(email: string): Promise<void> {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email
    })
    
    if (error) {
      console.error('Resend verification error:', error)
      throw error
    }
  } catch (error) {
    console.error('resendVerificationEmail error:', error)
    throw error
  }
}

// Update user profile
export async function updateUserProfile(updates: { name?: string; image?: string }): Promise<AuthUser> {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      throw new Error('User not authenticated')
    }

    // Update auth metadata if needed
    if (updates.name) {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { name: updates.name }
      })
      
      if (updateError) {
        console.error('Error updating auth metadata:', updateError)
        // Continue anyway
      }
    }

    // Update user record in users table
    const userRecord = await userOperations.getUserByUserId(user.id)
    if (userRecord && updates.name) {
      try {
        await userOperations.updateUser(userRecord.id, { name: updates.name })
      } catch (dbError) {
        console.error('Error updating user record:', dbError)
        // Continue anyway
      }
    }

    // Return updated user
    const updatedUser = await getCurrentUser()
    if (!updatedUser) {
      throw new Error('Failed to get updated user')
    }
    
    return updatedUser
  } catch (error) {
    console.error('updateUserProfile error:', error)
    throw error
  }
}

// Auth state change listener
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth state changed:', event, session?.user?.email)
    
    if (event === 'SIGNED_IN' && session?.user) {
      const user = await getCurrentUser()
      callback(user)
    } else if (event === 'SIGNED_OUT') {
      await clearCachedUserData()
      callback(null)
    }
  })
}