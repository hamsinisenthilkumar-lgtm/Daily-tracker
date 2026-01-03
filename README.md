# Quest Tracker

A gamified, ADHD-friendly weight-loss tracker that works like an RPG game. Built for mobile-first use with PWA support.

## Features

- **Daily Quest System**: Complete any 3 of 6 quests to "win the day"
- **XP & Levels**: Earn XP for completed days, level up every 3kg lost
- **Streak Tracking**: Visual calendar with green/yellow/red day tracking
- **Forgiveness Built-In**: Yellow days give half XP but don't break streaks
- **Low Energy Mode**: Adjusted quest targets for tough days
- **Editable Rewards**: Customize daily and level-up rewards
- **Dark, Cozy UI**: Game-like interface with progress animations
- **PWA Support**: Install as an app on Android/iOS
- **Offline First**: Works without internet using LocalStorage

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

### Deploy to Netlify

1. Create a Netlify account at https://netlify.com
2. Install Netlify CLI:

```bash
npm install -g netlify-cli
```

3. Build and deploy:

```bash
npm run build
netlify deploy --prod --dir=dist
```

Or use drag-and-drop:

1. Build the project: `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder into the upload area

### Deploy to Vercel

1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI:

```bash
npm install -g vercel
```

3. Deploy:

```bash
vercel --prod
```

Or use GitHub integration:

1. Push code to GitHub
2. Import repository in Vercel dashboard
3. Vercel will auto-build and deploy

### Deploy to GitHub Pages

1. Update `vite.config.js` to set base path:

```js
export default defineConfig({
  plugins: [react()],
  base: '/tracker/', // Replace with your repo name
})
```

2. Build and deploy:

```bash
npm run build
npx gh-pages -d dist
```

## Installing as a Mobile App (Android)

1. Open the deployed site in Chrome on Android
2. Tap the menu (⋮) in the top-right
3. Select "Add to Home Screen"
4. Name the app and tap "Add"
5. The app will appear on your home screen like a native app

## Customizing Icons

The app uses placeholder icon references. To add custom icons:

1. Create two PNG icons:
   - `public/icon-192.png` (192x192 pixels)
   - `public/icon-512.png` (512x512 pixels)

2. Use a tool like [RealFaviconGenerator](https://realfavicongenerator.net/) to generate proper PWA icons

## How It Works

### ADHD-Friendly Design

- **Progress > Perfection**: Yellow days count as wins
- **Rotation > Routine**: Multiple quest options prevent boredom
- **Rewards > Willpower**: External motivation system
- **Forgiveness > Guilt**: No punishment for red days

### Game Loop

1. Open app each morning to see today's quests
2. Check off quests throughout the day
3. Mark day as Green (3+ quests), Yellow (some progress), or Red (rest day)
4. Earn XP and maintain streaks
5. Level up every 3kg to unlock rewards

### Data Storage

All data is stored in browser LocalStorage:
- No login required
- No server needed
- Private by default
- Backup by exporting browser data

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **LocalStorage** - Data persistence
- **Service Worker** - PWA offline support

## Project Structure

```
tracker/
├── public/
│   ├── manifest.json       # PWA manifest
│   └── sw.js              # Service worker
├── src/
│   ├── components/        # React components
│   │   ├── TodayScreen.jsx
│   │   ├── CalendarView.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── RewardsManager.jsx
│   │   └── LevelUpModal.jsx
│   ├── utils/
│   │   └── storage.js     # LocalStorage utilities
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Future Enhancements (Optional)

- Weight tracking graphs
- Export/import data
- Customizable quest list
- Push notifications (requires server)
- Themes/skins

## Support

For issues or questions, check the code comments or modify as needed. This is your app - customize it freely!

## License

Free to use and modify for personal use.
