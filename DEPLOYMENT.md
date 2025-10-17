# 🚀 Deployment Guide - Vercel

This guide will walk you through deploying the Flutter Component Generator to Vercel and testing the authentication system.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier is fine - sign up at [vercel.com](https://vercel.com))
- CockroachDB instance running (you already have this configured in `.env.local`)
- Git installed on your machine

## 🔧 Step 1: Prepare for Deployment

### 1.1 Initialize Git Repository

```bash
cd /mnt/c/Users/Omar/Desktop/flutter-component-generator

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Flutter Component Generator with CockroachDB auth"
```

### 1.2 Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it: `flutter-component-generator` (or your preferred name)
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

### 1.3 Push to GitHub

```bash
# Add GitHub remote (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/flutter-component-generator.git

# Set branch name to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## 🌐 Step 2: Deploy to Vercel

### 2.1 Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository:
   - Click **"Import Git Repository"**
   - Find `flutter-component-generator` in the list
   - Click **"Import"**

### 2.2 Configure Project Settings

Vercel will auto-detect Next.js. Keep these default settings:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 2.3 Add Environment Variables

**IMPORTANT**: Before clicking "Deploy", add these environment variables:

Click **"Environment Variables"** section and add:

| Name | Value | Note |
|------|-------|------|
| `DATABASE_URL` | `postgresql://username:password@your-cluster.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full` | Your CockroachDB connection string |
| `JWT_SECRET` | `[GENERATE A NEW SECRET]` | Use a password generator - 32+ chars |
| `NODE_ENV` | `production` | Sets production mode |

**Generate a strong JWT_SECRET**:
- Visit [passwordsgenerator.net](https://passwordsgenerator.net/)
- Generate a 32-character password
- Copy and paste as JWT_SECRET value

### 2.4 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. You'll see "Congratulations!" when done
4. Your app is now live at: `https://your-project-name.vercel.app`

## 🗄️ Step 3: Initialize Production Database

### 3.1 Create Database Tables

Visit this URL in your browser (replace with your actual Vercel URL):
```
https://your-project-name.vercel.app/api/setup
```

You should see:
```json
{
  "success": true,
  "message": "Database tables created successfully"
}
```

✅ **Database is now ready!**

## 🧪 Step 4: Test Authentication

### 4.1 Test Signup Flow

1. Visit your deployed app: `https://your-project-name.vercel.app`
2. You'll see the login screen
3. Click **"Sign up"** at the bottom
4. Fill in the form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
5. Click **"Create Account"**

**Expected Result**: ✅ You should see a success toast and be redirected to the main form

### 4.2 Test Logout

1. Click the **Logout** button (top right corner)
2. You should be redirected back to the login screen

### 4.3 Test Login Flow

1. On the login screen, enter:
   - Email: `test@example.com`
   - Password: `password123`
2. Click **"Sign in"**

**Expected Result**: ✅ You should see a success toast and access the form

### 4.4 Test Session Persistence

1. While logged in, **refresh the page** (F5 or Cmd+R)

**Expected Result**: ✅ You should stay logged in (not redirected to login)

### 4.5 Test Wrong Credentials

1. Logout
2. Try to login with wrong password:
   - Email: `test@example.com`
   - Password: `wrongpassword`

**Expected Result**: ✅ You should see an error toast: "Invalid email or password"

## 🎉 Step 5: Verify Database

### 5.1 Check User in Database (Optional)

You can verify the user was created in CockroachDB:

1. Go to [cockroachlabs.cloud](https://cockroachlabs.cloud)
2. Open your cluster
3. Go to **SQL Shell**
4. Run:
   ```sql
   SELECT id, name, email, created_at FROM users;
   ```

You should see your test user!

## 🔄 Making Updates

When you make changes to your code:

```bash
# Stage changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your app
3. Deploy the new version
4. Your app updates in ~2 minutes

## 🐛 Troubleshooting

### Issue: "Database connection failed"

**Solution**: Check that:
- `DATABASE_URL` is correctly set in Vercel environment variables
- Your CockroachDB instance is running
- The connection string includes `?sslmode=verify-full`

### Issue: "JWT token invalid"

**Solution**:
- Make sure `JWT_SECRET` is the same in all environments
- Clear cookies and try logging in again

### Issue: "Cannot read property of undefined"

**Solution**:
- Visit `/api/setup` to ensure database tables are created
- Check Vercel logs: Dashboard → Your Project → Deployments → Click deployment → View Function Logs

### Issue: Build fails on Vercel

**Solution**:
- Check the build logs in Vercel dashboard
- Ensure all environment variables are set
- Try building locally first: `npm run build`

## 📊 Monitoring

### View Logs

1. Go to Vercel Dashboard
2. Click your project
3. Go to **Deployments**
4. Click on the latest deployment
5. Click **"View Function Logs"**

### Check Database Activity

1. Go to CockroachDB Cloud Console
2. Click your cluster
3. Go to **Monitoring** → **SQL Activity**
4. You'll see all queries being executed

## 🔒 Security Checklist

Before going live:
- ✅ `JWT_SECRET` is strong and unique (32+ characters)
- ✅ `DATABASE_URL` contains `?sslmode=verify-full`
- ✅ `.env.local` and `.db` are in `.gitignore` (not pushed to GitHub)
- ✅ Environment variables are set in Vercel dashboard (not in code)
- ✅ Tested signup, login, logout flows
- ✅ Tested session persistence

## 🎯 Next Steps

Your app is now deployed! Here are some optional enhancements:

1. **Custom Domain**: Add a custom domain in Vercel settings
2. **Analytics**: Already integrated with Vercel Analytics
3. **Monitoring**: Set up error tracking (Sentry)
4. **Email Verification**: Add email verification for new signups
5. **Password Reset**: Implement password reset flow
6. **User Profile**: Add user profile page
7. **Component Library**: Save components to database per user

## 📞 Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **CockroachDB Docs**: [cockroachlabs.com/docs](https://www.cockroachlabs.com/docs)

---

✅ **Deployment Complete!** Your Flutter Component Generator is now live and ready to use!

Share your deployed URL: `https://your-project-name.vercel.app`
