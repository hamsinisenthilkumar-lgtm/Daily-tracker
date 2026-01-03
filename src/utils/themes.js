// Daily theme rotation system to prevent boredom

export const WEEKLY_THEMES = [
  {
    id: 'music',
    name: 'Music Week',
    icon: '🎧',
    color: 'from-purple-600 to-pink-600',
    description: 'Walk with music playlists',
    activities: [
      'Create new workout playlist',
      'Discover new artists',
      'Walk to album releases',
    ],
  },
  {
    id: 'podcast',
    name: 'Podcast Week',
    icon: '🎙',
    color: 'from-blue-600 to-cyan-600',
    description: 'Learn while you move',
    activities: [
      'True crime podcasts',
      'Educational content',
      'Comedy shows',
    ],
  },
  {
    id: 'anime',
    name: 'Anime OST Week',
    icon: '🎌',
    color: 'from-red-600 to-orange-600',
    description: 'Soundtrack-powered walks',
    activities: [
      'Anime opening marathons',
      'Epic OST collections',
      'Character theme focus',
    ],
  },
  {
    id: 'silent',
    name: 'Silent Reset Week',
    icon: '🧠',
    color: 'from-green-600 to-teal-600',
    description: 'Mindful movement',
    activities: [
      'Nature sounds only',
      'Meditation walks',
      'Quiet reflection',
    ],
  },
  {
    id: 'challenge',
    name: 'Challenge Week',
    icon: '🎮',
    color: 'from-yellow-600 to-amber-600',
    description: 'Gamify your steps',
    activities: [
      'Step count competitions',
      'Speed challenges',
      'Distance goals',
    ],
  },
  {
    id: 'audiobook',
    name: 'Story Week',
    icon: '📚',
    color: 'from-indigo-600 to-purple-600',
    description: 'Get lost in stories',
    activities: [
      'Audiobook marathons',
      'Novel narrations',
      'Fantasy worlds',
    ],
  },
  {
    id: 'social',
    name: 'Social Week',
    icon: '👥',
    color: 'from-pink-600 to-rose-600',
    description: 'Walk with others',
    activities: [
      'Walking dates',
      'Phone call walks',
      'Group activities',
    ],
  },
]

// Get theme for current week
export const getThemeForWeek = () => {
  const weekNumber = getWeekNumber(new Date())
  const themeIndex = weekNumber % WEEKLY_THEMES.length
  return WEEKLY_THEMES[themeIndex]
}

// Get week number of the year
function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

// Daily interest rotation (changes each day)
export const DAILY_INTERESTS = [
  { id: 'art', name: 'Art & Crafts', icon: '🎨', activities: ['Sketching', 'Origami', 'Coloring'] },
  { id: 'reading', name: 'Reading Time', icon: '📖', activities: ['Manga', 'Novel', 'Comics'] },
  { id: 'gaming', name: 'Gaming Session', icon: '🎮', activities: ['Story games', 'Puzzle games', 'Casual play'] },
  { id: 'music', name: 'Music Discovery', icon: '🎵', activities: ['New artists', 'Playlists', 'Live sessions'] },
  { id: 'learning', name: 'Learn Something', icon: '🧠', activities: ['Tutorial', 'Course', 'Skill practice'] },
  { id: 'self-care', name: 'Self-Care Hour', icon: '💆', activities: ['Skincare', 'Hair care', 'Relaxation'] },
  { id: 'creative', name: 'Creative Project', icon: '✨', activities: ['Writing', 'Digital art', 'DIY'] },
]

// Get interest for today
export const getTodayInterest = () => {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
  const interestIndex = dayOfYear % DAILY_INTERESTS.length
  return DAILY_INTERESTS[interestIndex]
}
