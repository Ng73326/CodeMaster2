// Mock authentication system without Supabase
interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
  image?: string
}

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

// Mock user storage (in a real app, this would be a database)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user'
  }
]

let currentUser: User | null = null

export async function createUserAccount(data: SignupData): Promise<User> {
  // Validate admin code if role is admin
  if (data.role === 'admin' && data.adminCode !== '123456') {
    throw new Error('Invalid admin code')
  }

  // Check if user already exists
  const existingUser = mockUsers.find(user => user.email === data.email)
  if (existingUser) {
    throw new Error('User already exists')
  }

  // Create new user
  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    email: data.email,
    name: data.name,
    role: data.role
  }

  mockUsers.push(newUser)
  currentUser = newUser

  return newUser
}

export async function loginUser(data: LoginData): Promise<User> {
  // Find user by email
  const user = mockUsers.find(u => u.email === data.email)
  
  if (!user) {
    throw new Error('User not found')
  }

  // In a real app, you would verify the password here
  // For demo purposes, we'll accept any password
  
  currentUser = user
  return user
}

export async function logoutUser(): Promise<void> {
  currentUser = null
}

export async function getCurrentUser(): Promise<User | null> {
  return currentUser
}