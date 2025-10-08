# Vercel Deployment Guide with Supabase

## 🚀 Complete Deployment Steps

Follow these steps to deploy your Recipe Finder app to Vercel with Supabase integration.

---

## Step 1: Get Your Supabase Credentials

Before deploying, you need your Supabase project credentials:

1. Go to https://app.supabase.com
2. Select your project
3. Click on **Settings** (gear icon in sidebar)
4. Click on **API** in the settings menu
5. Copy these two values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

**Keep these values handy - you'll need them in Step 3.**

---

## Step 2: Access Your Vercel Project Settings

1. Go to https://vercel.com
2. Sign in to your account
3. Click on your project (**vebdizajn**)
4. You'll see your project dashboard with deployments

---

## Step 3: Add Environment Variables

### Option A: Via Vercel Dashboard (Recommended)

1. **Click on "Settings" tab** at the top of your project page

2. **Click on "Environment Variables"** in the left sidebar

3. **Add the first variable:**
   - In the "Key" field, enter: `NEXT_PUBLIC_SUPABASE_URL`
   - In the "Value" field, paste your Supabase Project URL
   - Check all three environments: ✅ Production ✅ Preview ✅ Development
   - Click **"Save"**

4. **Add the second variable:**
   - Click **"Add Another"** (or scroll down)
   - In the "Key" field, enter: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - In the "Value" field, paste your Supabase anon/public key
   - Check all three environments: ✅ Production ✅ Preview ✅ Development
   - Click **"Save"**

5. **Verify both variables are added:**
   You should see:
   ```
   NEXT_PUBLIC_SUPABASE_URL          [hidden]  Production, Preview, Development
   NEXT_PUBLIC_SUPABASE_ANON_KEY     [hidden]  Production, Preview, Development
   ```

### Option B: Via Vercel CLI

If you prefer using the command line:

```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
# When prompted, paste your Supabase URL and select all environments

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# When prompted, paste your Supabase anon key and select all environments
```

---

## Step 4: Redeploy Your Project

After adding environment variables, you need to redeploy:

### Method 1: Automatic Redeploy (Recommended)

1. Go to your project's **"Deployments"** tab
2. Click on the **three dots (...)** next to your latest deployment
3. Click **"Redeploy"**
4. Click **"Redeploy"** again to confirm
5. Wait for the deployment to complete (usually 1-2 minutes)

### Method 2: Push to GitHub

Simply push any change to your GitHub repository:

```bash
# Make a small change or just recommit
git commit --allow-empty -m "Trigger Vercel redeploy with env vars"
git push
```

Vercel will automatically detect the push and redeploy.

---

## Step 5: Verify Deployment

1. **Wait for deployment to complete**
   - Check the "Deployments" tab
   - Status should change from "Building" → "Ready"

2. **Visit your deployed site**
   - Click on your deployment URL (e.g., `https://vebdizajn.vercel.app`)
   - Or click "Visit" button

3. **Test the functionality:**
   - ✅ Site loads without errors
   - ✅ You can see the 6 mock recipes
   - ✅ Sign up works
   - ✅ Sign in works
   - ✅ Can create a recipe
   - ✅ Can favorite recipes
   - ✅ Dark mode toggle works

---

## 🔍 Troubleshooting

### Issue: "Missing Supabase environment variables" Error

**Cause:** Environment variables not set or deployment hasn't picked them up.

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Verify both variables are present for all environments
3. Click on latest deployment → three dots → Redeploy
4. Wait for new deployment to complete

---

### Issue: "Failed to sign up" or "Failed to create recipe"

**Cause:** Database migration not run or RLS policies not set up.

**Solution:**
1. Go to your Supabase project dashboard
2. Click on **SQL Editor**
3. Run the migration from `supabase/migrations/20250101000000_initial_schema.sql`
4. Verify tables exist in **Table Editor**
5. Verify RLS policies in **Authentication → Policies**

---

### Issue: Deployment Builds Successfully but Site Shows Errors

**Cause:** Environment variables might be set incorrectly.

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Click **"Edit"** on each variable
3. Verify the values are exactly correct:
   - No extra spaces
   - No quotes around the values
   - Correct format (URL starts with `https://`)
4. Save and redeploy

---

### Issue: Can't Access Vercel Dashboard

**Cause:** Not signed in or wrong account.

**Solution:**
1. Make sure you're signed in to the correct Vercel account
2. If you deployed via CLI, run `vercel whoami` to check
3. If needed, run `vercel logout` then `vercel login` to switch accounts

---

## 📋 Environment Variables Checklist

Use this checklist to ensure everything is set up correctly:

- [ ] Supabase project created
- [ ] Database migration run successfully
- [ ] Got Supabase Project URL
- [ ] Got Supabase anon/public key
- [ ] Added `NEXT_PUBLIC_SUPABASE_URL` to Vercel
- [ ] Added `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel
- [ ] Both variables set for Production environment
- [ ] Both variables set for Preview environment
- [ ] Both variables set for Development environment
- [ ] Triggered a new deployment
- [ ] Deployment completed successfully
- [ ] Visited deployed site and tested functionality

---

## 🎯 Environment Variable Reference

Here's what your variables should look like:

### NEXT_PUBLIC_SUPABASE_URL
```
https://abcdefghijklmnop.supabase.co
```
- Must start with `https://`
- Ends with `.supabase.co`
- Contains your unique project ID

### NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjQ0MTIzMCwiZXhwIjoxOTMxODE3MjMwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- Long string (200+ characters)
- Starts with `eyJ`
- Contains three parts separated by periods (.)
- This is safe to expose publicly (it's the public/anon key)

---

## 🔒 Security Notes

### Safe to Expose:
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Public project URL
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key (protected by RLS)

### NEVER Expose:
- ❌ `SUPABASE_SERVICE_ROLE_KEY` - Do NOT add this to Vercel
- ❌ Database password
- ❌ Personal access tokens

**Why is the anon key safe?**
- It's designed to be public
- All data access is protected by Row Level Security (RLS)
- Users can only access their own data
- RLS policies enforce authorization

---

## 🚀 Next Steps After Deployment

1. **Share Your App**
   - Your app is live at `https://vebdizajn.vercel.app`
   - Share the URL with friends and family

2. **Monitor Usage**
   - Check Vercel Analytics for traffic
   - Check Supabase Dashboard for database usage

3. **Custom Domain (Optional)**
   - Go to Vercel → Settings → Domains
   - Add your custom domain
   - Follow the DNS configuration instructions

4. **Set Up Email Verification (Optional)**
   - Go to Supabase → Authentication → Settings
   - Enable email verification
   - Configure SMTP settings

---

## 📞 Need Help?

- **Vercel Documentation:** https://vercel.com/docs
- **Supabase Documentation:** https://supabase.com/docs
- **Environment Variables Guide:** https://vercel.com/docs/concepts/projects/environment-variables

---

## ✅ Success!

Once you see your app running at your Vercel URL with working authentication and database features, you're all done! 🎉

Your Recipe Finder is now live on the internet with:
- ✅ Real authentication
- ✅ Cloud database
- ✅ User profiles
- ✅ Recipe CRUD
- ✅ Favorites system
- ✅ Responsive design
- ✅ Dark mode

Congratulations on deploying your full-stack Next.js app! 🚀
