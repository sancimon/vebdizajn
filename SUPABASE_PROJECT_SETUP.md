# Supabase Project Setup Guide

## ✅ You Already Have an Account

Great! Your Supabase account is connected to your GitHub. Now let's create the project.

---

## 📝 Step-by-Step: Create Your Recipe Finder Project

### **Step 1: Go to Supabase Dashboard**

1. Open your browser and go to: **https://app.supabase.com**
2. You'll see your Supabase dashboard
3. If you have existing projects, you'll see them listed

---

### **Step 2: Create New Project**

1. **Click the green "New Project" button** (top right or center of page)

2. **Fill in the project details:**

   **Organization:** Select your organization (probably your GitHub username)

   **Name:** `recipe-finder` (or any name you prefer)

   **Database Password:** Create a strong password
   - ⚠️ **IMPORTANT:** Save this password somewhere safe!
   - You'll need it if you want to connect directly to the database
   - Example: `MyRecipeApp2024!`

   **Region:** Choose closest to you
   - 🇺🇸 East US (North Virginia) - `us-east-1`
   - 🇺🇸 West US (Oregon) - `us-west-1`
   - 🇪🇺 Europe (Frankfurt) - `eu-central-1`
   - 🇸🇬 Southeast Asia (Singapore) - `ap-southeast-1`
   - Choose the one closest to your users

   **Pricing Plan:** Free (already selected)

3. **Click "Create new project"**

4. **Wait 2-3 minutes** for Supabase to set up your project
   - You'll see a loading screen: "Setting up your project..."
   - ☕ Take a coffee break!

---

### **Step 3: Get Your Project Credentials**

Once your project is ready:

1. **You'll see your project dashboard** with various options

2. **Click on the "Settings" icon** (gear/cog icon) in the left sidebar
   - It's at the bottom of the sidebar

3. **Click on "API"** in the settings menu
   - You'll see a page with your API credentials

4. **Copy Your Credentials:**

   **A) Project URL:**
   - Look for "Project URL" section
   - You'll see something like: `https://abcdefghijklmnop.supabase.co`
   - Click the **copy icon** next to it
   - Paste it somewhere safe (notepad, notes app)

   **B) API Keys:**
   - Scroll down to "Project API keys" section
   - You'll see two keys:
     - `anon` `public` (this is what you need) ✅
     - `service_role` (DO NOT use this in your app) ❌

   - Click the **copy icon** next to **"anon public"** key
   - Paste it somewhere safe (notepad, notes app)
   - It will be a long string starting with `eyJ...`

---

## 📋 What You Should Have Now:

After completing the above steps, you should have:

```
Project URL:
https://your-unique-project-id.supabase.co

Anon Key:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItdW5pcXVlLXByb2plY3QtaWQiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjQ0MTIzMCwiZXhwIjoxOTMxODE3MjMwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **Keep these safe** - you'll need them in the next step!

---

## 🎯 Visual Guide:

### Dashboard Layout:
```
┌─────────────────────────────────────────────────┐
│  Supabase                              [+ New]   │
├─────────────────────────────────────────────────┤
│ 📊 Home                                         │
│ 🔐 Authentication                               │
│ 📝 Table Editor                                 │
│ 💾 SQL Editor                                   │
│ 📡 Database                                     │
│ 📦 Storage                                      │
│ 🔧 Functions                                    │
│                                                 │
│ ⚙️  Settings  ← Click here                      │
│    └─ API    ← Then click here                 │
└─────────────────────────────────────────────────┘
```

### API Settings Page:
```
┌─────────────────────────────────────────────────┐
│ Configuration                                    │
│                                                 │
│ Project URL                                     │
│ https://xxxxx.supabase.co            [Copy] ←── │
│                                                 │
│ API Keys                                        │
│                                                 │
│ anon public                                     │
│ eyJhbGciOi...                        [Copy] ←── │
│ This key is safe to use in a browser            │
│                                                 │
│ service_role secret                             │
│ eyJhbGciOi...                        [Copy]     │
│ ⚠️  This key has full access - DO NOT USE      │
└─────────────────────────────────────────────────┘
```

---

## ✅ Verification Checklist:

Before moving to the next step, verify:

- [ ] ✅ Supabase account is connected to GitHub
- [ ] ✅ Created a new project named "recipe-finder" (or similar)
- [ ] ✅ Project finished setting up (no longer loading)
- [ ] ✅ Copied Project URL (starts with `https://`)
- [ ] ✅ Copied anon public key (starts with `eyJ`)
- [ ] ✅ Both credentials saved somewhere safe

---

## 🚨 Common Issues:

### Issue: "Can't create project"
**Solution:**
- Check if you've reached the free tier limit (1 project on free tier for new accounts)
- Some accounts can have 2 projects - try anyway
- If needed, delete an old unused project first

### Issue: "Project taking too long to set up"
**Solution:**
- Wait up to 5 minutes
- Refresh the page
- If still stuck, try creating a new project with a different name

### Issue: "Can't find API settings"
**Solution:**
- Make sure project finished setting up
- Look for Settings (gear icon) at the bottom of left sidebar
- Click "API" in the settings menu

---

## 🎯 Next Step:

Once you have your Project URL and anon key, tell me:

**"I have my Supabase credentials. Ready for Step 2: Help me run the database migration in Supabase."**

I'll then guide you through:
1. Opening the SQL Editor
2. Running the migration script
3. Verifying tables were created
4. Setting up Row Level Security

---

## 💡 Pro Tips:

1. **Bookmark your project URL** - you'll access it often
2. **Save database password** - needed for direct DB connections
3. **Project dashboard** - shows usage, storage, and API requests
4. **Free tier is generous** - perfect for personal projects and learning

---

## 🆘 Need Help?

If you're stuck, tell me what you see on your screen and I'll help you navigate!
