# Quick Start Guide

Get your Quest Tracker running in 3 minutes!

## Step 1: Install & Run (30 seconds)

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Step 2: Test the App (1 minute)

1. Click some quests to mark them complete
2. Toggle "Low Energy Mode" to see adjusted quest text
3. Complete 3 quests and click "🟢 Win Day"
4. Watch your XP bar fill up!
5. Switch to "Calendar" tab to see your win marked
6. Check the "Rewards" tab to customize your rewards

## Step 3: Deploy Online (2 minutes)

### Easiest: Netlify Drop

```bash
npm run build
```

Then drag the `dist` folder to https://app.netlify.com/drop

### Or use Vercel

```bash
npm install -g vercel
vercel --prod
```

## Step 4: Install on Phone

1. Open your deployed site in Chrome (Android) or Safari (iOS)
2. Android: Menu (⋮) → "Add to Home Screen"
3. iOS: Share button → "Add to Home Screen"
4. Done! Use it like a native app

## Customization

### Add Your Own Icons

See `ICON-GUIDE.md` for instructions on creating app icons.

### Customize Quests

Edit `src/utils/storage.js` and modify the `DEFAULT_QUESTS` array.

### Change Colors

Edit `tailwind.config.js` to adjust the color scheme.

### Modify XP/Level Settings

In `src/utils/storage.js`, adjust:
- `XP_PER_LEVEL` - How much XP needed per level (default: 1000)
- `calculateDayXP()` - How much XP for green/yellow/red days

## Troubleshooting

**App won't install on phone?**
- Make sure you're using HTTPS (required for PWA)
- Check that `manifest.json` and icons are accessible

**Data not saving?**
- Check browser LocalStorage isn't disabled
- Try a different browser

**Can't see notifications?**
- Click "Enable Notifications" in the reminder banner
- Check browser notification settings

## What's Next?

Just use it daily! The app is designed to:
- Give you clear daily focus (no guessing what to do)
- Reward progress (not perfection)
- Forgive bad days (yellow days keep your streak)
- Make you feel like you're playing a game (because you are!)

Remember: **3 quests = win**. That's it. Keep it simple.
