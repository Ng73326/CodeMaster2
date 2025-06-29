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

// Sign up with email verification
export async function createUserAccount(data: SignupData): Promise<{ user: User | null; needsVerification: boolean }> {
  try {
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
      throw error
    }

    // If user is created but not confirmed, they need to verify email
    if (authData.user && !authData.user.email_confirmed_at) {
      return { user: authData.user, needsVerification: true }
    }

    // If user is immediately confirmed (rare), create user record
    if (authData.user && authData.user.email_confirmed_at) {
      await userOperations.insertUser({
        name: data.name,
        email: data.email,
        userId: authData.user.id
      })
    }

    return { user: authData.user, needsVerification: false }
  } catch (error) {
    console.error('Signup error:', error)
    throw error
  }
}

// Login with email verification check
export async function loginUser(data: LoginData): Promise<AuthUser> {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })

    if (error) {
      // Handle specific email confirmation error
      if (error.message === 'Email not confirmed' || error.message.includes('email_not_confirmed')) {
        throw new Error('Please verify your email before logging in. Check your inbox for the verification link.')
      }
      throw error
    }

    if (!authData.user) {
      throw new Error('Login failed')
    }

    // Check if email is verified
    if (!authData.user.email_confirmed_at) {
      throw new Error('Please verify your email before logging in. Check your inbox for the verification link.')
    }

    // Get or create user record in users table
    let userRecord = await userOperations.getUserByUserId(authData.user.id)
    
    if (!userRecord) {
      // Create user record if it doesn't exist
      userRecord = await userOperations.insertUser({
        name: authData.user.user_metadata?.name || authData.user.user_metadata?.full_name || 'User',
        email: authData.user.email!,
        userId: authData.user.id
      })
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
    console.error('Login error:', error)
    throw error
  }
}

// Google OAuth login
export async function loginWithGoogle(): Promise<{ url?: string; error?: string }> {
  try {
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
      throw error
    }

    return { url: data.url }
  } catch (error) {
    console.error('Google login error:', error)
    return { error: error instanceof Error ? error.message : 'Failed to login with Google' }
  }
}

// Handle OAuth callback and create user record
export async function handleOAuthCallback(): Promise<AuthUser | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      console.error('OAuth callback error:', error)
      return null
    }

    // For OAuth users, email is automatically confirmed
    // Get or create user record in users table
    let userRecord = await userOperations.getUserByUserId(user.id)
    
    if (!userRecord) {
      // Create user record for OAuth user
      userRecord = await userOperations.insertUser({
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
        email: user.email!,
        userId: user.id
      })
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
    console.error('OAuth callback error:', error)
    return null
  }
}

// Logout user
export async function logoutUser(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Logout error:', error)
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

    // For OAuth users, email is automatically confirmed
    // For email/password users, check if email is verified
    if (user.app_metadata?.provider === 'email' && !user.email_confirmed_at) {
      return null
    }

    // Get user record from users table
    const userRecord = await userOperations.getUserByUserId(user.id)
    
    if (!userRecord) {
      return null
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
    console.error('Get current user error:', error)
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
      throw error
    }
  } catch (error) {
    console.error('Resend verification error:', error)
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
        throw updateError
      }
    }

    // Update user record in users table
    const userRecord = await userOperations.getUserByUserId(user.id)
    if (userRecord && updates.name) {
      await userOperations.updateUser(userRecord.id, { name: updates.name })
    }

    // Return updated user
    return await getCurrentUser() as AuthUser
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}

// Check auth state changes
export function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      const user = await getCurrentUser()
      callback(user)
    } else if (event === 'SIGNED_OUT') {
      callback(null)
    }
  })
}