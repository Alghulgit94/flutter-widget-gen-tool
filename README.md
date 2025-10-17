# Flutter Component Generator

A Next.js web application that helps developers create comprehensive, AI-ready markdown specifications for Flutter components. Features a multi-step form interface with real-time markdown preview, multi-language support (English/Spanish), and automatic data persistence.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based auth with CockroachDB backend
- 📝 **Multi-Step Form** - 7-step guided component specification process
- 👀 **Live Preview** - Real-time markdown generation as you type
- 🌍 **Multi-Language** - Full support for English and Spanish
- 💾 **Auto-Save** - Never lose your progress with localStorage persistence
- 📤 **Export** - Download complete markdown specifications
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- 🌓 **Theme Support** - Light and dark mode

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- CockroachDB account (free tier available at [cockroachlabs.cloud](https://cockroachlabs.cloud))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd flutter-component-generator
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your credentials:
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=verify-full
   JWT_SECRET=your-super-secret-jwt-key-change-this
   NODE_ENV=development
   ```

4. **Initialize the database**

   Start the dev server:
   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000/api/setup` to create database tables.

5. **Start using the app**

   Open `http://localhost:3000` and create your account!

## 📦 Project Structure

```
flutter-component-generator/
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   ├── logout/
│   │   │   └── me/
│   │   └── setup/         # Database initialization
│   ├── layout.tsx
│   └── page.tsx           # Main app page
├── components/
│   ├── steps/             # Form step components
│   ├── ui/                # shadcn/ui components
│   ├── component-form.tsx
│   ├── login-screen.tsx
│   ├── signup-screen.tsx
│   ├── markdown-preview.tsx
│   └── language-switcher.tsx
├── lib/
│   ├── auth.ts            # Authentication utilities
│   ├── auth-types.ts      # TypeScript types
│   ├── db.ts              # Database connection
│   ├── db-setup.sql       # Database schema
│   ├── i18n.ts            # Internationalization
│   ├── language-context.tsx
│   ├── markdown-generator.ts
│   ├── types.ts
│   ├── utils.ts
│   └── validation.ts
├── .env.example           # Environment template
├── .env.local             # Your credentials (not in git)
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: CockroachDB (PostgreSQL-compatible)
- **Authentication**: JWT with jose + bcryptjs
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **State Management**: React hooks + Context API
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**

   In Vercel Dashboard → Settings → Environment Variables, add:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=verify-full
   JWT_SECRET=your-super-secret-jwt-key-production
   NODE_ENV=production
   ```

4. **Initialize Production Database**

   After deployment, visit:
   ```
   https://your-app.vercel.app/api/setup
   ```

5. **Done!** Your app is live at `https://your-app.vercel.app`

### Important Deployment Notes

- ✅ The `.env.local` file is excluded from git (sensitive data)
- ✅ The `.env.example` file is included (template only)
- ✅ Database credentials in `.db` are excluded from git
- ✅ Generate a strong JWT_SECRET for production (use a password generator)
- ✅ CockroachDB SSL is enabled and required
- ✅ All API routes use parameterized queries (SQL injection protection)
- ✅ Passwords are hashed with bcryptjs (salt rounds: 12)
- ✅ JWT tokens expire after 7 days
- ✅ Cookies are httpOnly and secure in production

## 📖 Usage

1. **Sign Up**: Create an account with email and password
2. **Login**: Access the form with your credentials
3. **Fill the Form**: Complete the 7-step component specification
   - Step 1: Basic Info (name, type, description)
   - Step 2: Variants & States
   - Step 3: Design Specs (colors, typography, dimensions)
   - Step 4: Component API (props/parameters)
   - Step 5: Behavior & Accessibility
   - Step 6: Implementation details
   - Step 7: Review & Export
4. **Export**: Download your markdown specification file
5. **Use with AI**: Share the markdown with AI assistants to generate Flutter components

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs (12 salt rounds)
- ✅ HttpOnly cookies (XSS protection)
- ✅ CSRF protection with SameSite cookies
- ✅ Parameterized SQL queries (SQL injection protection)
- ✅ Input validation (email format, password strength)
- ✅ Secure cookie flags in production
- ✅ SSL/TLS for database connections

## 🌍 Internationalization

The app supports:
- 🇺🇸 English
- 🇪🇸 Spanish

Switch languages using the language selector in the top navigation.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Database hosted on [CockroachDB](https://www.cockroachlabs.com/)
- Deployed on [Vercel](https://vercel.com)

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ for the Flutter community
