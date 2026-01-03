// LocalStorage persistence layer
// Handles all data operations with safe defaults

const STORAGE_KEYS = {
  USER_DATA: 'quest_tracker_user',
  DAILY_LOGS: 'quest_tracker_logs',
  REWARDS: 'quest_tracker_rewards',
};

// Default quest list
export const DEFAULT_QUESTS = [
  { id: 'steps', label: 'Walk 10,000 steps', lowEnergyLabel: 'Walk 5,000 steps', type: 'steps' },
  { id: 'workout', label: 'Workout or stretching', type: 'activity' },
  { id: 'meals', label: 'Follow meal timing (no junk)', type: 'nutrition' },
  { id: 'snacks', label: 'Almonds + fruit', type: 'nutrition' },
  { id: 'water', label: 'Hit water target', type: 'hydration' },
  { id: 'sleep', label: 'Sleep before 11 PM', type: 'sleep' },
];

// Default rewards
export const DEFAULT_REWARDS = {
  daily: [
    'Anime episode',
    'Game session',
    'Read novel/comic',
    'Art/paper crafts',
    'Music/alone time',
  ],
  level: [
    'Self-care (skin/hair)',
    'New clothes',
    'Experience/outing',
    'Anime/book purchase',
    'New game',
  ],
};

// Get user data (XP, level, etc.)
export const getUserData = () => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return data ? JSON.parse(data) : {
    currentXP: 0,
    currentLevel: 1,
    totalLevels: 0,
    currentWeight: null,
    startWeight: null,
    targetWeight: null,
  };
};

// Save user data
export const saveUserData = (data) => {
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
};

// Get daily logs (all historical data)
export const getDailyLogs = () => {
  const logs = localStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
  return logs ? JSON.parse(logs) : {};
};

// Save daily logs
export const saveDailyLogs = (logs) => {
  localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(logs));
};

// Get today's log
export const getTodayLog = () => {
  const today = getTodayKey();
  const logs = getDailyLogs();
  return logs[today] || {
    date: today,
    completed: [],
    status: null, // null | 'green' | 'yellow' | 'red'
    lowEnergyMode: false,
    isCheatDay: false,
    mood: null, // null | 'great' | 'good' | 'okay' | 'bad' | 'terrible'
    journal: '', // Daily journal entry
    markedAt: null, // Timestamp when day was marked
  };
};

// Save today's log
export const saveTodayLog = (log) => {
  const today = getTodayKey();
  const logs = getDailyLogs();
  logs[today] = { ...log, date: today };
  saveDailyLogs(logs);
};

// Get rewards
export const getRewards = () => {
  const rewards = localStorage.getItem(STORAGE_KEYS.REWARDS);
  return rewards ? JSON.parse(rewards) : DEFAULT_REWARDS;
};

// Save rewards
export const saveRewards = (rewards) => {
  localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(rewards));
};

// Helper: get today's date key (YYYY-MM-DD)
export const getTodayKey = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

// Helper: calculate streak
export const calculateStreak = () => {
  const logs = getDailyLogs();
  const sortedDates = Object.keys(logs).sort().reverse();

  let streak = 0;
  const today = getTodayKey();
  let checkDate = new Date();

  // Start from today or yesterday
  for (let i = 0; i < sortedDates.length; i++) {
    const dateKey = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;

    const log = logs[dateKey];
    if (!log) break;

    // Green or yellow continues streak
    if (log.status === 'green' || log.status === 'yellow') {
      streak++;
    } else if (log.status === 'red') {
      break;
    }

    checkDate.setDate(checkDate.getDate() - 1);
  }

  return streak;
};

// Helper: calculate XP for a day
export const calculateDayXP = (status) => {
  if (status === 'green') return 100;
  if (status === 'yellow') return 50;
  return 0;
};

// XP needed per level (3kg = 1 level)
export const XP_PER_LEVEL = 1000;
