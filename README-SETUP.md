# CodeMasters Setup Guide

## Quick Setup Instructions

### 1. Environment Variables Setup

1. **Create a Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for the project to be ready

2. **Get Your Supabase Credentials:**
   - Go to Project Settings > API
   - Copy your Project URL and anon public key

3. **Update Environment Variables:**
   - Open `.env.local` file
   - Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 2. Database Setup

The database schema is already created in the migration file. Supabase will automatically run the migration when you connect.

### 3. Authentication Setup (Optional - for Google Sign-in)

1. **Enable Google OAuth in Supabase:**
   - Go to Authentication > Providers in your Supabase dashboard
   - Enable Google provider
   - Add your Google OAuth credentials (if you have them)

2. **For Google OAuth Setup:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs: `https://your-project.supabase.co/auth/v1/callback`

### 4. Start the Application

```bash
npm run dev
```

## Features Available

- ✅ User Authentication (Email/Password)
- ✅ Google Sign-in (requires OAuth setup)
- ✅ Contest Management
- ✅ User Dashboard
- ✅ Practice Problems
- ✅ Leaderboard
- ✅ Responsive Design

## Test Accounts

You can create test accounts using the signup form, or use the Google authentication demo at `/auth/demo`.

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Make sure you've updated `.env.local` with your actual Supabase credentials

2. **Authentication not working**
   - Verify your Supabase URL and keys are correct
   - Check that RLS policies are enabled (they should be from the migration)

3. **Google Sign-in not working**
   - This requires additional OAuth setup in Google Cloud Console
   - You can skip this and use email/password authentication

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase project is active
3. Ensure environment variables are correctly set
4. Check that the database migration ran successfully

## Next Steps

1. Update your Supabase credentials in `.env.local`
2. Start the development server
3. Create a test account or use Google sign-in
4. Explore the features!

The application will work with mock data if Supabase is not properly configured, but for full functionality, you'll need to set up Supabase properly.