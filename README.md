# Garden Planner 2026 - Clarksville, TN

A mobile-first garden planning app with interactive bed layouts, planting tracker, succession calendar, and bucket management.

## Deploy to Netlify

### Option 1: Drag & Drop (Easiest)
1. Go to https://app.netlify.com/drop
2. Drag this entire folder onto the page
3. Wait — Netlify will build and deploy automatically
4. You'll get a URL like `https://your-site-name.netlify.app`

### Option 2: GitHub + Netlify
1. Push this folder to a GitHub repository
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repo
5. Build settings are already configured in netlify.toml
6. Click "Deploy"

### Option 3: Netlify CLI
```bash
npm install
npm run build
npx netlify-cli deploy --prod --dir=dist
```

## Add to Phone Home Screen
Once deployed, open the URL on your phone and:
- **iPhone**: Tap Share → "Add to Home Screen"
- **Android**: Tap menu → "Add to Home Screen"

## Features
- 📋 Dashboard with progress tracking
- 🌱 Interactive bed maps (tap for details)
- 🪣 Bucket tracker with growth stages
- 📅 Succession planting calendar
- 💾 All data saves automatically in your browser
