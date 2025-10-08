# Supabase Email Confirmation Setup Guide

## Current Status
✅ Code is ready for email confirmation
✅ Email template is configured
⚠️ Need to configure Site URL in Supabase

## Step-by-Step Configuration

### 1. Enable Email Provider
**URL:** https://supabase.com/dashboard/project/pkllawugnxqubgltqpot/auth/providers

- Click on **"Email"** provider
- **Enable** "Enable Email provider" ✓
- **Enable** "Confirm email" ✓
- Click **Save**

### 2. Configure Site URL (MOST IMPORTANT!)
**URL:** https://supabase.com/dashboard/project/pkllawugnxqubgltqpot/settings/auth

Find the **"Site URL"** field and set it to your production URL:
```
https://your-vercel-app.vercel.app
```

**Why?** This is what `{{ .ConfirmationURL }}` uses to generate the email link. If it's set to `http://localhost:3000`, confirmation emails will have localhost links that don't work in production.

### 3. Add Redirect URLs
In the same settings page, find **"Redirect URLs"** section.

Add these URLs (one per line):
```
https://your-vercel-app.vercel.app/**
http://localhost:3000/**
```

The `**` wildcard allows all paths under these domains.

### 4. Verify Email Template (Already Done ✓)
**URL:** https://supabase.com/dashboard/project/pkllawugnxqubgltqpot/auth/templates

Your current "Confirm signup" template:
```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p>
```

This is perfect! The `{{ .ConfirmationURL }}` will automatically use the Site URL you configured.

## How the Flow Works

1. **User signs up** → Account created, email sent
2. **User checks email** → Clicks confirmation link
3. **Link redirects to** → `/auth/callback?code=...`
4. **Callback exchanges code** → Creates session
5. **Redirects to** → `/auth/confirmed` (success page)
6. **User can now** → Sign in with their credentials

## Testing

After configuring the above:

1. Sign up with a new email
2. Check your inbox for confirmation email
3. Click the confirmation link
4. Should see "Email Confirmed!" page
5. Click "Sign In to Your Account"
6. Login with your credentials

## Troubleshooting

**Problem:** Email link still points to localhost
- **Solution:** Check Site URL is set to production URL, not localhost

**Problem:** "Invalid email or password" after signup
- **Solution:** Email not confirmed yet - check inbox and click link

**Problem:** Session lost on refresh
- **Solution:** This is now fixed with middleware - should work after deploy

**Problem:** "Email signups are disabled"
- **Solution:** Enable Email provider in Authentication → Providers

## Environment Variables

Make sure these are set in Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=https://pkllawugnxqubgltqpot.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

These are already configured if you deployed from the same repo.
