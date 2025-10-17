# ⚡ Quick Start Guide

Get your Flutter Component Generator running in 5 minutes!

## 🚀 Local Development

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your credentials
# DATABASE_URL=your-cockroachdb-url
# JWT_SECRET=your-secret-key
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Initialize Database
Visit: `http://localhost:3000/api/setup`

### 5. Create Account & Test
Visit: `http://localhost:3000`

✅ **Done!** You're ready to develop.

## 🌐 Deploy to Vercel

### Quick Deploy (3 steps):

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo
   - Add environment variables:
     - `DATABASE_URL`
     - `JWT_SECRET` (generate a new one!)
     - `NODE_ENV=production`

3. **Initialize Production DB**
   - Visit: `https://your-app.vercel.app/api/setup`

✅ **Live!** Test auth at your Vercel URL.

## 🧪 Test Checklist

- [ ] Signup with new account works
- [ ] Login with existing account works
- [ ] Session persists after refresh
- [ ] Logout works
- [ ] Wrong password shows error
- [ ] Form auto-saves data
- [ ] Export markdown works
- [ ] Language switcher works
- [ ] Dark/light theme works

## 📚 Full Guides

- Detailed deployment: See `DEPLOYMENT.md`
- Project overview: See `README.md`
- Code architecture: See `CLAUDE.md`

## 🆘 Common Issues

**"Database connection failed"**
→ Check `DATABASE_URL` in environment variables

**"Cannot find module 'pg'"**
→ Run `npm install --legacy-peer-deps`

**"Table users does not exist"**
→ Visit `/api/setup` endpoint

**Build fails**
→ Check all env vars are set in Vercel

## 💡 Tips

- Use `npm run dev` for development (hot reload)
- Visit `/api/setup` only ONCE per environment
- Generate strong JWT_SECRET for production
- Keep `.env.local` private (never commit)
- Test auth flows before going live

---

Need more help? Check `DEPLOYMENT.md` for detailed instructions!
