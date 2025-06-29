import { userOperations } from './supabase'
import { getCurrentUser } from './auth'
import type { User } from './supabase'

// Get user profile from authenticated user
export async function getUserProfile() {
  try {
    // Get the current authenticated user
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      throw new Error('No authenticated user found')
    }

    // Get user record from database
    const userRecord = await userOperations.getUserByUserId(currentUser.id)
    
    if (!userRecord) {
      throw new Error('User record not found in database')
    }

    // Return real user data with additional computed fields for dashboard
    return {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
      image: currentUser.image,
      // These would come from actual user data/calculations in a real app
      problemsSolved: 0, // Start with 0 for new users
      recentlySolved: 0,
      globalRank: null, // Will be calculated based on actual performance
      rankChange: 0,
      contestsWon: 0,
      totalContests: 0,
      rating: 1200, // Default starting rating
      ratingChange: 0,
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error)
    throw error
  }
}

// Example: Create a new user record
export async function createUserRecord(userData: {
  name: string
  email: string
  userId: string
}): Promise<User> {
  try {
    const newUser = await userOperations.insertUser(userData)
    console.log('Created user:', newUser)
    return newUser
  } catch (error) {
    console.error('Error creating user record:', error)
    throw error
  }
}

// Example: Get user by auth ID
export async function getUserByAuthId(authId: string): Promise<User | null> {
  try {
    const user = await userOperations.getUserByUserId(authId)
    console.log('User found:', user)
    return user
  } catch (error) {
    console.error('Error getting user by auth ID:', error)
    throw error
  }
}

// Example: Update user profile
export async function updateUserProfile(id: string, updates: Partial<User>): Promise<User> {
  try {
    const updatedUser = await userOperations.updateUser(id, updates)
    console.log('Updated user:', updatedUser)
    return updatedUser
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}

// Example: Delete user
export async function deleteUserProfile(id: string): Promise<void> {
  try {
    await userOperations.deleteUser(id)
    console.log('User deleted successfully')
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}