# 🚀 Supabase Setup Guide for Prospectify

## Step 1: Create the Environment File

1. **Navigate to your project root directory** (where `package.json` is located)
2. **Create a new file** called `.env.local`
3. **Add the environment variables** (see .env.local file)

## Step 2: Get Your Supabase Keys

### 🔗 Create a Supabase Project
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `prospectify-db` (or any name you prefer)
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 🔑 Get Your API Keys
1. **Go to Project Settings** → Click the gear icon ⚙️
2. **Navigate to API section** → Settings → API
3. **Copy the following values**:

   \`\`\`
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   \`\`\`

### 📝 Update Your .env.local File
Replace the placeholder values with your actual keys:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

## Step 3: Set Up Database Tables

### 🗄️ Run SQL Scripts
1. **Go to Supabase Dashboard** → Your Project
2. **Open SQL Editor** → Click "SQL Editor" in sidebar
3. **Create Tables** → Copy and paste the content from `scripts/create-tables.sql`
4. **Click "Run"** to execute
5. **Seed Data** → Copy and paste the content from `scripts/seed-cities.sql`
6. **Click "Run"** to execute

## Step 4: Restart Your Development Server

\`\`\`bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

## Step 5: Verify Configuration

1. Go to `/dashboard`
2. Click the **"Configuration"** tab
3. You should see ✅ **"Supabase Connected"** and **"LIVE"** badge

## 🔒 Security Notes

- ✅ `.env.local` is automatically ignored by Git (safe)
- ✅ `NEXT_PUBLIC_*` variables are safe for client-side
- ⚠️ `SUPABASE_SERVICE_ROLE_KEY` is server-only (never expose)
- 🚫 Never commit API keys to version control

## 🐛 Troubleshooting

### "supabaseKey is required" Error
- Check that `.env.local` exists in project root
- Verify variable names are exactly correct
- Restart development server after adding variables

### "Invalid API Key" Error
- Double-check you copied the full key (they're very long)
- Make sure you're using the correct project's keys
- Verify the project URL ends with `.supabase.co`

### Still in Demo Mode?
- Check the Configuration tab in dashboard
- Ensure all three variables show as "Valid"
- Try hard refresh (Ctrl+Shift+R) after restart
