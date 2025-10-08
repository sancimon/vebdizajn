# 🚀 RUN THIS DATABASE MIGRATION

## Quick Steps (5 minutes):

### **Step 1: Open SQL Editor**

1. Go to your project: https://supabase.com/dashboard/project/pkllawugnxqubgltqpot
2. Click **"SQL Editor"** in the left sidebar (looks like `</>` icon)
3. Click **"New Query"** button

### **Step 2: Copy the Migration SQL**

1. Open the file: `supabase/migrations/20250101000000_initial_schema.sql`
2. **Select ALL the text** (Ctrl+A or Cmd+A)
3. **Copy it** (Ctrl+C or Cmd+C)

### **Step 3: Run the Migration**

1. **Paste** the SQL into the SQL Editor (Ctrl+V or Cmd+V)
2. **Click "Run"** button (or press Ctrl+Enter / Cmd+Enter)
3. **Wait** for it to finish (should take 2-3 seconds)
4. You should see: ✅ **"Success. No rows returned"**

### **Step 4: Verify Tables Were Created**

1. Click **"Table Editor"** in the left sidebar
2. You should see 3 new tables:
   - ✅ `users`
   - ✅ `recipes`
   - ✅ `favorites`

---

## ✅ Once Done:

Tell me: **"Migration complete! I see the 3 tables."**

Then we'll:
1. Commit the changes to GitHub
2. Add environment variables to Vercel
3. Test everything works!

---

## 🆘 If You See Errors:

- **"relation already exists"** - Tables already created, you're good! ✅
- **Other errors** - Copy the error message and send it to me
