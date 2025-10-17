# ✅ Pre-Deployment Checklist

Complete this checklist before deploying to production.

## 📋 Code Quality

- [x] TypeScript strict mode enabled
- [x] No console errors in development
- [x] ESLint configured and passing
- [x] All files follow project structure
- [x] CLAUDE.md updated with latest architecture
- [x] README.md includes all setup steps

## 🔒 Security

- [x] `.env.local` in `.gitignore`
- [x] `.db` file in `.gitignore`
- [x] No hardcoded secrets in code
- [x] Passwords hashed with bcrypt
- [x] JWT tokens expire after 7 days
- [x] HttpOnly cookies enabled
- [x] SQL queries use parameterization
- [x] Input validation implemented
- [ ] **Generate NEW JWT_SECRET for production**
- [ ] **Verify DATABASE_URL has `?sslmode=verify-full`**

## 🗄️ Database

- [x] CockroachDB instance running
- [x] Connection tested locally
- [x] Schema defined in `lib/db-setup.sql`
- [x] Migration script works (`/api/setup`)
- [x] Users table created successfully
- [x] Email index exists for performance
- [ ] **Production database ready**
- [ ] **Ran `/api/setup` on production** (after first deploy)

## 🧪 Testing

Test all these flows locally before deploying:

### Authentication
- [ ] Signup with valid email/password works
- [ ] Signup with invalid email shows error
- [ ] Signup with short password shows error
- [ ] Signup with mismatched passwords shows error
- [ ] Signup with existing email shows "Email already registered"
- [ ] Login with correct credentials works
- [ ] Login with wrong password shows error
- [ ] Login with non-existent email shows error
- [ ] Logout works and clears session
- [ ] Session persists on page refresh
- [ ] Session expires after 7 days (optional to test)

### Form Functionality
- [ ] All 7 steps load correctly
- [ ] Form data auto-saves to localStorage
- [ ] Step validation works (required fields)
- [ ] Quick Start mode toggle works
- [ ] Reset step button works
- [ ] Navigation between steps works
- [ ] Export button disabled until all steps complete
- [ ] Export creates correct markdown file
- [ ] Markdown preview shows correct content

### UI/UX
- [ ] Light theme works
- [ ] Dark theme works
- [ ] English language works
- [ ] Spanish language works
- [ ] Language switcher works
- [ ] Mobile responsive (test on small screen)
- [ ] Toast notifications appear
- [ ] Loading states work
- [ ] Error states work

## 📦 Dependencies

- [x] All dependencies installed
- [x] Package.json includes all required packages
- [x] No peer dependency warnings (using --legacy-peer-deps)
- [ ] **Run `npm install --legacy-peer-deps` in fresh clone**
- [ ] **Run `npm run build` successfully**

## 🌐 Deployment Configuration

- [x] `vercel.json` configured
- [x] `.gitignore` excludes sensitive files
- [x] Build command: `npm run build`
- [x] Start command: `npm run start`
- [ ] **Environment variables ready for Vercel**
- [ ] **GitHub repository created**
- [ ] **GitHub repository is private** (or public if intended)

## 📚 Documentation

- [x] README.md complete
- [x] DEPLOYMENT.md created
- [x] QUICK_START.md created
- [x] CLAUDE.md updated
- [x] .env.example has all variables
- [ ] **License file added** (if needed)
- [ ] **Contributing guide added** (if needed)

## 🚀 Ready to Deploy?

### Final Steps:

1. **Generate Production JWT Secret**
   ```bash
   # Visit https://passwordsgenerator.net/
   # Generate 32+ character password
   # Save for Vercel env vars
   ```

2. **Verify Environment Variables**
   ```
   DATABASE_URL=postgresql://...?sslmode=verify-full
   JWT_SECRET=[your-new-secret]
   NODE_ENV=production
   ```

3. **Test Build Locally**
   ```bash
   npm run build
   npm run start
   # Visit http://localhost:3000
   # Test signup and login
   ```

4. **Push to GitHub**
   ```bash
   git status  # Review what will be committed
   git add .
   git commit -m "Initial commit: Flutter Component Generator"
   git push origin main
   ```

5. **Deploy to Vercel**
   - Import project from GitHub
   - Add environment variables
   - Deploy
   - Visit `/api/setup` once
   - Test authentication

## 🎯 Post-Deployment

After deploying, verify:

- [ ] App loads at Vercel URL
- [ ] No console errors in browser
- [ ] Database connection works
- [ ] Signup creates user in database
- [ ] Login works with created user
- [ ] Session persists on refresh
- [ ] Export functionality works
- [ ] Both themes work
- [ ] Both languages work
- [ ] Mobile view works

## 🐛 If Something Fails

1. **Check Vercel Logs**
   - Dashboard → Project → Deployments → View Function Logs

2. **Check Environment Variables**
   - Dashboard → Project → Settings → Environment Variables

3. **Check Database**
   - Visit CockroachDB console
   - Verify tables exist: `SELECT * FROM users;`

4. **Common Fixes**
   - Re-run `/api/setup` if tables missing
   - Regenerate JWT_SECRET if token errors
   - Verify DATABASE_URL includes `?sslmode=verify-full`

## ✅ All Checks Passed?

You're ready to deploy! 🚀

Follow the steps in `DEPLOYMENT.md` for detailed instructions.

---

**Remember**: Always test locally first, then deploy to production!
