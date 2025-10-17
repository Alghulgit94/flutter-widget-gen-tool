# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Flutter Component Generator** - a Next.js web application that helps developers create comprehensive, AI-ready markdown specifications for Flutter components. It features a multi-step form interface with real-time markdown preview, multi-language support (English/Spanish), and automatic data persistence.

The generated markdown files follow a specific structure designed for AI agents working with Flutter/Dart codebases, particularly for the "Tobati" app design system.

## Commands

### Development
```bash
npm install --legacy-peer-deps  # Install dependencies
npm run dev          # Start development server (default: http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Setup
```bash
# Visit http://localhost:3000/api/setup (one-time) to initialize database tables
# This creates the users table in CockroachDB
```

## Architecture

### Core Workflow
1. **Authentication Flow** (`app/page.tsx`)
   - Real authentication with CockroachDB backend
   - JWT-based sessions with httpOnly cookies
   - Authentication state persisted and checked on mount
   - API routes in `app/api/auth/`: signup, login, logout, me
   - Password hashing with bcrypt (12 salt rounds)
   - State managed via `isAuthenticated` in main page component

2. **Multi-Step Form** (`components/component-form.tsx`)
   - 7 steps: Basic Info → Variants/States → Design Specs → Component API → Behavior → Implementation → Review
   - State managed in `formData` with `ComponentData` type
   - Auto-saves to `localStorage` with key `"flutter-component-data"`
   - Step validation tracked via `lib/validation.ts`
   - Quick Start Mode toggle to show/hide optional fields

3. **Data Flow**
   - Form data (`ComponentData`) flows from `component-form.tsx` → `app/page.tsx`
   - Real-time markdown generation via `lib/markdown-generator.ts`
   - Validation changes trigger re-renders and completion indicators

4. **Markdown Generation** (`lib/markdown-generator.ts`)
   - Single source of truth for markdown template
   - Generates comprehensive Flutter component specifications
   - Includes references to design system files (colors, typography, dimensions, animations, icons)
   - Template includes implementation requirements, validation checklist, and deliverables

### Key Type Definitions

The central data structure is `ComponentData` in `lib/types.ts`:
```typescript
interface ComponentData {
  // Basic Info (Step 1)
  componentName: string
  componentType: string[]
  description: string
  visualReference: string

  // Variants/States (Step 2)
  variants: string[]

  // Design Specs (Step 3)
  colors: { background, text, border, icons, stateColors }
  typography: { primaryText, secondaryText, labels, other }
  dimensions: { height, width, padding, margin, borderRadius, borderWidth, iconSize }
  icons: { iconName, iconPosition, iconColor }
  animations: { animationType, duration, curve, trigger }

  // Component API (Step 4)
  componentAPI: string

  // Behavior (Step 5)
  behavior: string
  responsiveBehavior: string
  accessibility: string[]

  // Implementation (Step 6)
  stateManagement: { needsProvider, providerStructure, consumesProviders }
  validation: { rules, timing, errorHandling, successHandling }
  fileLocation: string

  // Review (Step 7)
  additionalNotes: string
  validationChecklist: string[]
}
```

### Step Components

All step components are in `components/steps/`:
- Each step receives: `data`, `updateData`, `quickStartMode` props
- Each step is responsible for updating a slice of `ComponentData`
- Steps use translation keys via `useTranslation(language)` hook

### Internationalization (i18n)

- Language context: `lib/language-context.tsx` provides `LanguageProvider` and `useLanguage()` hook
- Translations: `lib/i18n.ts` exports `translations` object with `en` and `es` keys
- All UI text should use `t.[section].[key]` pattern from translations
- Language switcher component: `components/language-switcher.tsx`

### Validation System

Validation logic in `lib/validation.ts`:
- `validateStep(stepId, data)`: Returns step-specific validation result
- `validateAllSteps(data)`: Returns overall completion status and lists of complete/incomplete steps
- Required fields per step:
  - Step 1: componentName, componentType, description
  - Step 2: variants
  - Step 3: colors.background, typography.primaryText, dimensions.height
  - Step 4: componentAPI
  - Step 5: behavior, accessibility
  - Step 6: fileLocation
  - Step 7: No required fields

### UI Component Library

Uses shadcn/ui components (in `components/ui/`):
- Built on Radix UI primitives
- Styled with Tailwind CSS
- Theme support via `next-themes` (`components/theme-provider.tsx`)
- Component configuration in `components.json`

## Important Implementation Details

### LocalStorage Persistence
- Data auto-saves on every form update to `localStorage.getItem("flutter-component-data")`
- Loaded on mount in `component-form.tsx` (line 70-78)
- Reset function clears localStorage

### Export Functionality
- Export button disabled until all steps complete (`allStepsComplete` prop)
- Creates downloadable `.md` file with filename: `[componentName]-spec.md`
- Export logic in `app/page.tsx` (line 34-47)

### Preview System
- `components/markdown-preview.tsx` shows live preview
- Toggle-able via header button
- Grid layout switches between 1-column and 2-column based on preview visibility

### TypeScript Configuration
- Path alias: `@/*` maps to project root
- Build errors ignored in `next.config.mjs` (line 4) - fix type errors instead of relying on this
- Strict mode enabled

## Design Patterns

1. **Client Components**: All interactive components use `"use client"` directive
2. **Controlled Forms**: All inputs use controlled component pattern with `value` and `onChange`
3. **Prop Drilling**: Data flows down from `page.tsx` → `component-form.tsx` → individual step components
4. **Custom Hooks**: `useLanguage()`, `useTranslation()`, `useToast()`, `useMobile()`
5. **Type Safety**: Strict typing with TypeScript, comprehensive interfaces in `lib/types.ts`

## Common Tasks

### Adding a New Step
1. Create step component in `components/steps/[step-name]-step.tsx`
2. Add to `STEPS` array in `component-form.tsx`
3. Update `ComponentData` type in `lib/types.ts` with new fields
4. Add validation logic in `lib/validation.ts`
5. Update `generateMarkdown()` in `lib/markdown-generator.ts` to include new fields
6. Add translations in `lib/i18n.ts` for both `en` and `es`

### Modifying Markdown Template
- Edit `generateMarkdown()` in `lib/markdown-generator.ts`
- This is the single source of truth for output format
- Template includes Flutter/Dart-specific conventions and file references

### Adding Translation Keys
- Update `translations` object in `lib/i18n.ts`
- Add keys for both `en` and `es` languages
- Use consistent nesting: `section.key` pattern

### Working with Form State
- Always update via `updateData()` partial updates
- Never mutate `formData` directly
- Use spread operator for nested object updates

## Database & Authentication

### Database Setup
- **Database**: CockroachDB (PostgreSQL-compatible)
- **Connection**: Configured in `lib/db.ts` with SSL enabled
- **Schema**: Defined in `lib/db-setup.sql`
- **Tables**: `users` table with UUID primary key
- **Initialization**: Visit `/api/setup` once to create tables

### Authentication System
- **JWT Tokens**: Generated with `jose` library (7-day expiration)
- **Password Security**: Bcryptjs hashing with 12 salt rounds
- **Cookie Management**: HttpOnly, Secure (prod), SameSite=Lax
- **Session Check**: `/api/auth/me` verifies current user
- **Login Flow**: Email/password → JWT → httpOnly cookie
- **Signup Flow**: Validation → Hash password → Insert user → JWT → httpOnly cookie

### Security Best Practices Implemented
- ✅ Parameterized queries (SQL injection prevention)
- ✅ Password hashing (bcryptjs with salt rounds)
- ✅ HttpOnly cookies (XSS prevention)
- ✅ Input validation (email format, password strength)
- ✅ JWT expiration (7-day max)
- ✅ SSL/TLS for database connections
- ✅ Secure flag for cookies in production

## Deployment

### Environment Variables
Required for production (set in Vercel dashboard):
```
DATABASE_URL=postgresql://user:pass@host:port/db?sslmode=verify-full
JWT_SECRET=your-super-secret-jwt-key-production
NODE_ENV=production
```

### Vercel Deployment Steps
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy
5. Visit `/api/setup` once to initialize database
6. Test authentication at your deployed URL

### Files Excluded from Git
- `.env.local` - Local environment variables
- `.db` - Database credentials file
- `node_modules/` - Dependencies
- `.next/` - Build output
