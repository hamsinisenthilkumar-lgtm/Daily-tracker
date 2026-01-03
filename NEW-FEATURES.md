# New Features Added - Journal, Mood & Data Export

## 1. 📝 Daily Journaling

**New "Journal" Tab** - Write daily reflections and thoughts.

### Features:
- **Free-form text area** - Write as much as you want
- **Auto-save** - Click "Save Entry" to store
- **Character counter** - Track entry length
- **Journaling tips** - Built-in prompts and suggestions

### How to Use:
1. Go to **📝 Journal** tab
2. Write about your day, feelings, wins, challenges
3. Click "Save Entry"
4. Entries are stored with each day's log

### What to Write:
- How the day went
- Wins (even tiny ones)
- Challenges faced
- Energy levels
- Plans for tomorrow
- Gratitude notes
- Patterns you notice

---

## 2. 😊 Mood Tracking

**Track your mood daily** with 5 emotion levels.

### Mood Options:
- 😄 **Great** - Excellent day, high energy
- 🙂 **Good** - Positive day, feeling well
- 😐 **Okay** - Neutral, getting through it
- 😔 **Bad** - Struggling, low mood
- 😢 **Terrible** - Very difficult day

### How to Use:
1. Go to **📝 Journal** tab
2. Click the emoji that matches your mood
3. Selected mood highlights with gold ring
4. Mood is saved instantly

### Why Track Mood:
- See patterns over time
- Correlate mood with quest completion
- Identify triggers (good and bad)
- Track mental health alongside physical goals
- Exported to CSV for analysis

---

## 3. 💾 Data Export (Excel Compatible)

**New "Export" Tab** - Download all your data in CSV format.

### What You Can Export:

#### Complete Daily Log
**Includes:**
- Date
- Day Status (Green/Yellow/Red)
- XP Earned
- Number of quests completed
- Quest details (which ones)
- Low Energy Mode status
- Cheat Day status
- **Mood** (new!)
- **Journal Entry** (new!)
- **Time Marked** (new!)

#### User Profile & Stats
**Includes:**
- Current Level
- Total Levels Gained
- Current XP
- Start Weight
- Current Weight
- Target Weight
- Weight Lost
- Export Date

#### Summary Statistics
**Includes:**
- Total Days Tracked
- Green Days (Wins)
- Yellow Days (Partial)
- Red Days (Rest)
- Win Rate %
- Total XP Earned
- Most Completed Quest

### How to Export:
1. Go to **💾 Export** tab
2. Choose which export you want
3. Click "Download" button
4. File downloads as `.csv`
5. Open in Excel, Google Sheets, or Numbers

### File Format:
- **CSV** (Comma Separated Values)
- Opens in any spreadsheet software
- UTF-8 with BOM for Excel compatibility
- Dates formatted as YYYY-MM-DD
- Quotes escaped properly for journal text

### Why Export:
- **Backup** your data (browser storage can be cleared)
- **Analyze** patterns in spreadsheets
- **Share** with coach, therapist, or accountability partner
- **Track** long-term trends
- **Archive** your journey

---

## 4. 🔍 Where Is Your Data Stored?

### Storage Location:
**Browser LocalStorage** - All data stays on your device

### Technical Details:
- **Location:** `localStorage` in your browser
- **Keys:**
  - `quest_tracker_user` - Profile, XP, levels, weight
  - `quest_tracker_logs` - All daily entries
  - `quest_tracker_rewards` - Custom rewards

### How to Access:
1. Open browser DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Local Storage**
4. Select your site URL
5. See all stored data as JSON

### Privacy:
✅ **100% Private** - Never sent to any server
✅ **No Cloud** - Stays on your device only
✅ **No Login** - No accounts, no tracking
✅ **Offline** - Works without internet

### Important Notes:
⚠️ **Clearing browser data deletes everything**
⚠️ **Export regularly** to back up your progress
⚠️ **Private browsing** doesn't save data
⚠️ **Different browsers** have separate storage

---

## 5. Enhanced Calendar View

**Click any day** to see complete details including:
- ✅ Quest completion status
- 😊 **Mood for that day** (new!)
- 📝 **Journal entry** (new!)
- ⏰ **Time when day was marked** (new!)
- 🔋 Active modes (Low Energy, Cheat Day)

---

## Navigation Update

**Changed to 3x2 grid** (6 tabs):
- 📋 Today
- 📅 Calendar
- 📊 Progress
- 📝 **Journal** (NEW)
- 🎁 Rewards
- 💾 **Export** (NEW)

---

## Data Structure Example

When you export, your CSV will look like this:

```csv
Date,Day Status,XP Earned,Quests Completed,Quest Details,Low Energy Mode,Cheat Day,Mood,Journal Entry,Time Marked
2026-01-03,GREEN,100,4,Walk 10000 steps; Workout or stretching; Hit water target; Sleep before 11 PM,NO,NO,good,"Great workout today! Felt energized.",1/3/2026 10:30 PM
2026-01-02,YELLOW,50,2,Walk 5000 steps; Follow meal timing,YES,NO,okay,"Low energy but kept going.",1/2/2026 11:15 PM
2026-01-01,RED,0,0,None,NO,YES,bad,"Rest day needed.",1/1/2026 9:00 PM
```

Opens perfectly in Excel with all data intact!

---

## How to Use New Features Together

### Daily Workflow:
1. **Morning:** Check Today tab, see quests
2. **Throughout day:** Complete quests
3. **Evening:**
   - Go to Journal tab
   - Select mood
   - Write journal entry
   - Return to Today tab
   - Mark day status

### Weekly:
- Review Calendar to see mood patterns
- Export data to track trends
- Adjust approach based on patterns

### Monthly:
- Export Complete Daily Log
- Analyze in spreadsheet
- Look for correlations:
  - Mood vs quest completion
  - Low energy days patterns
  - Journal themes
  - Win streaks

---

## Use Cases

### For Self-Analysis:
- "When am I most successful?"
- "What affects my mood?"
- "Do low energy days cluster?"
- "What helps me win?"

### For Sharing:
- Show therapist mood patterns
- Share progress with coach
- Accountability partner check-ins
- Doctor appointments (weight tracking)

### For Motivation:
- Read old journal entries
- See how far you've come
- Remember tough days you survived
- Track non-scale victories

---

## Tips

### Journaling Tips:
- Write freely, no judgment
- Note small wins
- Be honest about struggles
- Track energy patterns
- Plan tomorrow based on today

### Mood Tracking Tips:
- Track at same time daily (evening is best)
- Don't overthink it - gut feeling
- Track even on bad days (data is valuable)
- Look for weekly/monthly patterns

### Export Tips:
- Export weekly as backup
- Keep CSV files organized by date
- Use Excel to create charts
- Filter by mood to find patterns
- Sort by XP to see best days

---

## Privacy & Security

✅ All data stored locally
✅ No server uploads
✅ No user accounts
✅ No tracking
✅ No analytics
✅ 100% private

Your journal entries, mood data, and quest logs never leave your device unless you manually export and share them.

---

## Next Steps

1. **Start tracking mood** - Go to Journal tab, select today's mood
2. **Write first entry** - Quick note about today
3. **Export backup** - Go to Export tab, download Complete Daily Log
4. **Review calendar** - Click past days to see new mood/journal display

All existing data is preserved. New fields (mood, journal, timestamp) will appear for today forward.
