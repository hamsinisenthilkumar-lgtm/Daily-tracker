# Complete Data Tracking Guide

## Quick Answer: Where Is My Data?

**Your data is stored in your browser's LocalStorage.**

Location: Open DevTools (F12) → Application → Local Storage → `http://localhost:5173`

**ALL data stays on your device. Nothing is sent to any server.**

---

## What Gets Tracked

### Daily Logs
Every day you use the app, it tracks:

| Field | What It Tracks | Where You Set It |
|-------|---------------|------------------|
| **Date** | Automatically recorded | System |
| **Quests Completed** | Which quests you checked off | Today tab |
| **Quest Count** | How many completed (0-6) | Today tab |
| **Day Status** | Green/Yellow/Red | Today tab - Mark day buttons |
| **XP Earned** | 100 (green), 50 (yellow), 0 (red) | Automatic |
| **Low Energy Mode** | ON/OFF | Today tab toggle |
| **Cheat Day** | ON/OFF | Today tab toggle |
| **Mood** | 😄😊😐😔😢 | Journal tab |
| **Journal Entry** | Your written text | Journal tab |
| **Time Marked** | When you marked the day | Automatic when you mark day |

### User Profile
Tracks your overall progress:

| Field | What It Tracks | Where You Set It |
|-------|---------------|------------------|
| **Current Level** | Your level (1, 2, 3...) | Automatic (gains from XP) |
| **Total Levels** | Lifetime levels gained | Automatic |
| **Current XP** | XP progress to next level | Automatic |
| **Start Weight** | Starting weight in kg | Progress tab |
| **Current Weight** | Current weight in kg | Progress tab |
| **Target Weight** | Goal weight in kg | Progress tab |

### Rewards
Your customized reward lists:

| Field | Default |
|-------|---------|
| **Daily Rewards** | Anime, Games, Reading, Art, Music |
| **Level Rewards** | Skincare, Clothes, Experiences, etc. |

---

## How to Export Your Data

### Step 1: Go to Export Tab
Click **💾 Export** in the navigation

### Step 2: Choose Export Type

**Option 1: Complete Daily Log**
- Best for: Complete history analysis
- Includes: Everything tracked daily
- Format: One row per day
- Columns: Date, Status, XP, Quests, Mood, Journal, Time

**Option 2: User Profile**
- Best for: Current stats snapshot
- Includes: Levels, XP, weights
- Format: Key-value pairs

**Option 3: Summary Statistics**
- Best for: Quick overview
- Includes: Total days, win rate, totals
- Format: Metrics summary

### Step 3: Click Download Button
File downloads as `.csv` format

### Step 4: Open in Excel/Sheets
- Double-click file to open
- OR: Open Excel → File → Open → Select CSV
- All data appears in columns

---

## Example: Exported Daily Log

```
Date       | Day Status | XP  | Quests | Mood  | Journal                    | Time Marked
-----------|------------|-----|--------|-------|----------------------------|------------------
2026-01-03 | GREEN      | 100 | 4      | good  | Great workout today!       | 1/3/2026 10:30 PM
2026-01-02 | YELLOW     | 50  | 2      | okay  | Low energy but kept going  | 1/2/2026 11:15 PM
2026-01-01 | RED        | 0   | 0      | bad   | Rest day needed            | 1/1/2026 9:00 PM
```

**Opens perfectly in Excel with dates, formulas, and filtering!**

---

## How to Use Excel With Your Data

### Sort by Mood
1. Open exported CSV
2. Select all data
3. Data → Sort → Sort by "Mood"
4. See all your "bad" days grouped together
5. Read journal entries to find patterns

### Calculate Win Rate
1. Count Green days: `=COUNTIF(B:B,"GREEN")`
2. Count Total days: `=COUNTA(B:B)-1` (minus header)
3. Win rate: `=Green/Total*100`

### Find Patterns
- Filter by Low Energy Mode = YES
- See if mood correlates with energy
- Check quest completion on those days

### Create Charts
1. Select Date and XP columns
2. Insert → Line Chart
3. Visualize XP gains over time

### Analyze Mood Trends
1. Assign numbers: Great=5, Good=4, Okay=3, Bad=2, Terrible=1
2. Create line chart
3. See mood trajectory

---

## Backup Strategy

### Why Backup?
Browser LocalStorage can be cleared by:
- Clearing browser history/cache
- Browser updates
- Switching browsers
- Private/Incognito mode
- Computer crashes

### Recommended Schedule:

**Weekly** (Minimum):
- Export Complete Daily Log
- Save as: `quest-tracker-YYYY-MM-DD.csv`

**Monthly** (Recommended):
- Export all three files
- Create folder: `Backups/January-2026/`
- Store all CSV files

**After Major Milestones**:
- Level ups
- Weight goals reached
- Streak records
- Any important day

### Where to Store Backups:
- ✅ Google Drive
- ✅ Dropbox
- ✅ OneDrive
- ✅ External hard drive
- ✅ USB stick
- ✅ Email to yourself

---

## Privacy & Security

### What's Private:
✅ **Journal entries** - Never leave your device
✅ **Mood data** - Stored locally only
✅ **Weight data** - No cloud sync
✅ **Quest history** - 100% private
✅ **Personal notes** - Only you can see

### What's Shared:
❌ Nothing. Zero. Nada.

### No Tracking:
- No Google Analytics
- No Facebook Pixel
- No user accounts
- No email collection
- No IP logging
- No cookies
- No telemetry

### Open DevTools to Verify:
1. Press F12
2. Go to Network tab
3. Use the app
4. See: **ZERO network requests** (except initial page load)

---

## Accessing Raw Data (Advanced)

### Browser Console Method:
1. Press F12 (DevTools)
2. Go to **Console** tab
3. Type: `localStorage.getItem('quest_tracker_logs')`
4. Press Enter
5. See all your data as JSON

### Copy All Data:
```javascript
// Copy this into console
const data = {
  user: JSON.parse(localStorage.getItem('quest_tracker_user')),
  logs: JSON.parse(localStorage.getItem('quest_tracker_logs')),
  rewards: JSON.parse(localStorage.getItem('quest_tracker_rewards'))
}
console.log(JSON.stringify(data, null, 2))
```

Right-click output → Copy object
Paste into text file for manual backup

---

## Restoring Data

### If You Lose Data:

**From CSV Export:**
Unfortunately, CSV exports can't be directly re-imported (feature not built).
Use exports for analysis and backup reference only.

**From Raw JSON Backup:**
1. Open DevTools console
2. Paste:
```javascript
localStorage.setItem('quest_tracker_user', 'YOUR_USER_JSON_HERE')
localStorage.setItem('quest_tracker_logs', 'YOUR_LOGS_JSON_HERE')
```
3. Refresh page

**Prevention is Best:**
Export weekly. Keep multiple backups.

---

## FAQ

**Q: Can I access data on different devices?**
A: No. LocalStorage is per-browser, per-device. Each device has separate data.

**Q: What if I switch browsers?**
A: Data won't transfer. Export from old browser, use as reference.

**Q: Does private browsing save data?**
A: No. Private mode doesn't persist LocalStorage.

**Q: Can I edit the CSV and re-import?**
A: No re-import feature. CSV is for analysis only.

**Q: How much data can I store?**
A: LocalStorage limit is 5-10MB. You can track for years without hitting limit.

**Q: Will data survive browser updates?**
A: Usually yes, unless you clear data or reinstall browser.

---

## Summary

✅ **Data Location:** Browser LocalStorage
✅ **Privacy:** 100% local, never uploaded
✅ **Export Format:** CSV (Excel-compatible)
✅ **Backup:** Export weekly, store safely
✅ **Access:** DevTools → Application → Local Storage

**Your data is yours. Private. Secure. Under your control.**
