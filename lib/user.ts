import { userOperations } from './supabase'
import type { User } from './supabase'

// Example functions for user table operations
export async function getUserProfile() {
  try {
    // Get all users (for demo purposes)
    const users = await userOperations.getAllUsers()
    console.log('All users:', users)
    
    // Return mock user data for dashboard
    return {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      image: "",
      problemsSolved: 42,
      recentlySolved: 5,
      globalRank: 128,
      rankChange: 15,
      contestsWon: 2,
      totalContests: 8,
      rating: 1850,
      ratingChange: 75,
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