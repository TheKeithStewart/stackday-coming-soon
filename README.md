# StackDay Coming Soon Page

A clean, professional coming soon page for StackDay - the ADHD-friendly time-blocking app that warns you before you overcommit.

## 🚀 Quick Deploy to Vercel (5 minutes)

### Option 1: Deploy with Vercel CLI

```bash
# 1. Install dependencies
npm install

# 2. Install Vercel CLI (if not already installed)
npm i -g vercel

# 3. Deploy
vercel

# Follow the prompts - it's that easy!
```

### Option 2: Deploy via GitHub

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Import your GitHub repository
5. Click "Deploy"
6. Your site will be live at `your-project.vercel.app`

### Option 3: Deploy with Git

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build

# 3. Push to GitHub
git init
git add .
git commit -m "Initial commit - StackDay coming soon page"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main

# 4. Connect to Vercel via dashboard
```

## 📧 Email Collection Setup

The current implementation stores emails in memory (for quick demo). To persist emails, choose one:

### Option A: Supabase (Recommended)

1. Create a Supabase project at [supabase.com](https://supabase.com)

2. Create a `waitlist` table:
```sql
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'coming-soon',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

3. Add environment variables to Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
SUPABASE_SERVICE_KEY=your-service-key
```

4. Uncomment the Supabase code in `/app/api/waitlist/route.ts`

### Option B: ConvertKit / Mailchimp

Replace the API route with your email service's API:

```typescript
// app/api/waitlist/route.ts
const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    api_key: process.env.CONVERTKIT_API_KEY,
    email: email,
  }),
});
```

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts` to modify the color scheme:

```typescript
colors: {
  blue: {
    500: '#3b82f6', // Your primary color
    600: '#2563eb', // Your primary hover
  },
}
```

### Update Content

All content is in `/app/page.tsx`. Key sections:
- Hero headline
- Problem section
- Solution features
- Social proof testimonials
- Final CTA

### Add Analytics

1. Install Vercel Analytics:
```bash
npm install @vercel/analytics
```

2. Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
stackday-coming-soon/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts      # Email collection API
│   ├── layout.tsx            # Layout with metadata
│   ├── page.tsx              # Main landing page
│   └── globals.css           # Global styles
├── components/
│   └── EmailCapture.tsx      # Email form component
├── public/
│   └── (add favicon.ico and og-image.png here)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🖼️ Adding Images

1. Create an Open Graph image (1200x630px) with your tagline
2. Save as `public/og-image.png`
3. Add a favicon at `public/favicon.ico`

You can use [Canva](https://www.canva.com) or [Figma](https://www.figma.com) to create these quickly.

## 📊 Tracking Success

After deployment, monitor:
- Email signups (check your database/email service)
- Page views (Vercel Analytics)
- Conversion rate (signups / visitors)
- Traffic sources (where visitors come from)

## 🚦 Launch Checklist

- [ ] Deploy to Vercel
- [ ] Set up custom domain (stackday.app)
- [ ] Connect email collection service
- [ ] Add favicon and OG image
- [ ] Test on mobile devices
- [ ] Share on social media
- [ ] Post in relevant communities

## 💡 Next Steps

Once your coming soon page is live:

1. Share it everywhere:
   - Twitter/X
   - Reddit (r/ADHD, r/productivity)
   - LinkedIn
   - Personal network

2. Start content marketing:
   - Write blog posts about ADHD and time management
   - Create social media content
   - Build in public

3. Iterate based on feedback:
   - A/B test headlines
   - Try different value propositions
   - Add testimonials as you get them

## 🆘 Need Help?

- Vercel deployment issues: [vercel.com/docs](https://vercel.com/docs)
- Next.js questions: [nextjs.org/docs](https://nextjs.org/docs)
- Email Keith: keith@stackday.app

---

**Built with Next.js 14, TypeScript, and Tailwind CSS**

Good luck with your launch! 🚀
