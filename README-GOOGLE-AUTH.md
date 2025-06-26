# Google Authentication with Supabase Integration

This implementation provides a complete Google Authentication system integrated with Supabase for the CodeMasters platform.

## Features

- **Google OAuth Sign-in**: Seamless Google authentication flow
- **Supabase Integration**: User data stored in Supabase database
- **Session Management**: Automatic session detection and management
- **User Profile Creation**: Automatic user profile creation/update in database
- **Auth State Management**: React context for global auth state
- **Protected Routes**: Auth guard component for protecting routes
- **Responsive UI**: Beautiful, responsive authentication components

## Components

### 1. GoogleAuth Component (`components/google-auth.tsx`)
- Main authentication component with Google sign-in button
- Displays user information after successful login
- Handles sign-out functionality
- Shows loading states and error handling

### 2. Auth Provider (`hooks/use-auth.tsx`)
- React context provider for global auth state
- Manages user session across the application
- Provides auth utilities (signOut, user state, loading state)

### 3. Auth Guard (`components/auth-guard.tsx`)
- Protects routes that require authentication
- Redirects unauthenticated users to login
- Redirects authenticated users away from auth pages

### 4. Auth Callback (`app/auth/callback/route.ts`)
- Handles OAuth callback from Google
- Exchanges authorization code for session
- Redirects to dashboard after successful authentication

## Setup Instructions

### 1. Supabase Configuration

1. **Enable Google OAuth in Supabase:**
   - Go to your Supabase dashboard
   - Navigate to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials

2. **Configure Redirect URLs:**
   - Add `http://localhost:3000/auth/callback` for development
   - Add your production domain callback URL for production

### 2. Google Cloud Console Setup

1. **Create OAuth 2.0 Credentials:**
   - Go to Google Cloud Console
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback`

### 3. Environment Variables

Create a `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Database Schema

The system automatically creates/updates user profiles in the `users` table with:
- `id`: User's Supabase auth ID
- `email`: User's email from Google
- `name`: User's full name from Google (or email prefix if not available)
- `image`: User's avatar URL from Google
- `role`: Set to 'user' by default

## Usage Examples

### Basic Authentication
```tsx
import { GoogleAuth } from '@/components/google-auth'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <GoogleAuth />
    </div>
  )
}
```

### Using Auth Context
```tsx
import { useAuth } from '@/hooks/use-auth'

export default function Dashboard() {
  const { user, loading, signOut } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please sign in</div>

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

### Protected Routes
```tsx
import { AuthGuard } from '@/components/auth-guard'

export default function ProtectedPage() {
  return (
    <AuthGuard requireAuth={true}>
      <div>This content is only visible to authenticated users</div>
    </AuthGuard>
  )
}
```

## Demo Page

Visit `/auth/demo` to test the Google authentication functionality. This page includes:
- Google sign-in button
- User information display after login
- Sign-out functionality
- Error handling and loading states

## Security Features

- **Row Level Security (RLS)**: Enabled on all database tables
- **Secure Session Management**: Automatic token refresh and validation
- **Protected API Routes**: Server-side session validation
- **CSRF Protection**: Built-in protection against cross-site request forgery

## Error Handling

The system includes comprehensive error handling for:
- Network connectivity issues
- Invalid OAuth responses
- Database connection errors
- Session expiration
- User permission errors

## Customization

You can customize the authentication flow by:
- Modifying the `GoogleAuth` component styling
- Adding additional OAuth providers
- Customizing user profile fields
- Adding custom redirect logic
- Implementing role-based access control

## Testing

To test the Google authentication:
1. Start the development server: `npm run dev`
2. Navigate to `/auth/demo`
3. Click "Continue with Google"
4. Complete the Google OAuth flow
5. Verify user information is displayed
6. Test sign-out functionality

The system will automatically create a user profile in your Supabase database upon successful authentication.