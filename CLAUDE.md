# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StackDay is a coming soon landing page for an ADHD-friendly time-blocking app. This is a Next.js 14 project with TypeScript and Tailwind CSS, designed to capture email signups for the waitlist.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Framework & Routing
- **Next.js 14** with App Router (not Pages Router)
- Server Components by default; Client Components marked with `'use client'`
- API routes in `app/api/` directory using Route Handlers

### Key Files
- `app/page.tsx` - Main landing page (Server Component)
- `app/layout.tsx` - Root layout with metadata and SEO configuration
- `app/api/waitlist/route.ts` - Waitlist API endpoint (POST for signup, GET for count)
- `components/EmailCapture.tsx` - Email capture form (Client Component)

### Styling
- Tailwind CSS configured in `tailwind.config.ts`
- Custom blue color palette (50-900 shades) defined in Tailwind config
- Inter font loaded via `next/font/google`
- Custom fade-in animation for landing page elements

### State Management
- Client-side state handled with React `useState` in components
- No global state management library (not needed for this simple app)

### Data Persistence
**Current Implementation:**
- Waitlist emails stored in-memory using a `Set` in `app/api/waitlist/route.ts`
- This is for demo/development only - data is lost on server restart
- Waitlist count starts at 127 for social proof

**Production Integration:**
- Ready to integrate Supabase (commented code in `route.ts`)
- Expects `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_KEY` environment variables
- Alternative: ConvertKit or Mailchimp integration (see README for examples)

## Path Aliases

TypeScript configured with `@/*` path alias mapping to project root:
```typescript
import EmailCapture from '@/components/EmailCapture';
```

## Deployment

Project is optimized for Vercel deployment:
- Environment variable `NEXT_PUBLIC_SITE_URL` defaults to `https://stackday.app`
- SEO metadata configured for Open Graph and Twitter cards
- Expects `/og-image.png` and `/favicon.ico` in `public/` directory

## Important Patterns

1. **API Error Handling**: All API routes return proper error messages and HTTP status codes
2. **Form Validation**: Email validation happens both client-side (HTML5) and server-side
3. **Loading States**: EmailCapture component has proper loading/success/error states
4. **SEO**: Comprehensive metadata in layout.tsx for search engines and social sharing
