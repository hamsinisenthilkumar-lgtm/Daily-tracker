import { useState, useEffect } from 'react'
import TodayScreen from './components/TodayScreen'
import ProgressBar from './components/ProgressBar'
import CalendarView from './components/CalendarView'
import LevelUpModal from './components/LevelUpModal'
import RewardsManager from './components/RewardsManager'
import ProgressTracker from './components/ProgressTracker'
import MoodJournal from './components/MoodJournal'
import DataExport from './components/DataExport'
import { getUserData, saveUserData, getTodayLog, saveTodayLog, calculateDayXP, calculateStreak, XP_PER_LEVEL } from './utils/storage'

function App() {
  const [userData, setUserData] = useState(getUserData())
  const [todayLog, setTodayLog] = useState(getTodayLog())
  const [currentView, setCurrentView] = useState('today') // 'today' | 'calendar' | 'progress' | 'journal' | 'rewards' | 'export'
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [streak, setStreak] = useState(0)

  // Load streak on mount
  useEffect(() => {
    setStreak(calculateStreak())
  }, [])

  // Handle quest completion toggle
  const toggleQuest = (questId) => {
    const completed = todayLog.completed.includes(questId)
      ? todayLog.completed.filter(id => id !== questId)
      : [...todayLog.completed, questId]

    const updated = { ...todayLog, completed }
    setTodayLog(updated)
    saveTodayLog(updated)
  }

  // Handle day status change (Green/Yellow/Red)
  const markDay = (status) => {
    const xpGain = calculateDayXP(status)
    const newXP = userData.currentXP + xpGain
    const levelsGained = Math.floor(newXP / XP_PER_LEVEL) - Math.floor(userData.currentXP / XP_PER_LEVEL)

    // Update today's log with timestamp
    const updated = {
      ...todayLog,
      status,
      markedAt: new Date().toLocaleString()
    }
    setTodayLog(updated)
    saveTodayLog(updated)

    // Update user data
    const newUserData = {
      ...userData,
      currentXP: newXP,
      currentLevel: userData.currentLevel + levelsGained,
      totalLevels: userData.totalLevels + levelsGained,
    }
    setUserData(newUserData)
    saveUserData(newUserData)

    // Show level up if applicable
    if (levelsGained > 0) {
      setShowLevelUp(true)
    }

    // Recalculate streak
    setStreak(calculateStreak())
  }

  // Handle low energy mode toggle
  const toggleLowEnergy = () => {
    const updated = { ...todayLog, lowEnergyMode: !todayLog.lowEnergyMode }
    setTodayLog(updated)
    saveTodayLog(updated)
  }

  // Handle cheat day toggle
  const toggleCheatDay = () => {
    const updated = { ...todayLog, isCheatDay: !todayLog.isCheatDay }
    setTodayLog(updated)
    saveTodayLog(updated)
  }

  // Handle mood update
  const updateMood = (mood) => {
    const updated = { ...todayLog, mood }
    setTodayLog(updated)
    saveTodayLog(updated)
  }

  // Handle journal update
  const updateJournal = (journal) => {
    const updated = { ...todayLog, journal }
    setTodayLog(updated)
    saveTodayLog(updated)
  }

  return (
    <div className="min-h-screen bg-game-bg text-gray-100 pb-20">
      {/* Header with XP bar */}
      <div className="sticky top-0 bg-game-panel border-b border-game-accent/20 shadow-lg z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-game-gold">⚔️ Quest Tracker</h1>
            <div className="text-right">
              <div className="text-sm text-gray-400">Level {userData.currentLevel}</div>
              <div className="text-xs text-game-gold">{streak} day streak 🔥</div>
            </div>
          </div>
          <ProgressBar
            current={userData.currentXP % XP_PER_LEVEL}
            max={XP_PER_LEVEL}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Navigation */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => setCurrentView('today')}
            className={`py-3 px-2 rounded-lg font-semibold text-xs transition-colors ${
              currentView === 'today'
                ? 'bg-game-accent text-white'
                : 'bg-game-panel text-gray-400 hover:bg-game-panel/80'
            }`}
          >
            📋 Today
          </button>
          <button
            onClick={() => setCurrentView('calendar')}
            className={`py-3 px-2 rounded-lg font-semibold text-xs transition-colors ${
              currentView === 'calendar'
                ? 'bg-game-accent text-white'
                : 'bg-game-panel text-gray-400 hover:bg-game-panel/80'
            }`}
          >
            📅 Calendar
          </button>
          <button
            onClick={() => setCurrentView('progress')}
            className={`py-3 px-2 rounded-lg font-semibold text-xs transition-colors ${
              currentView === 'progress'
                ? 'bg-game-accent text-white'
                : 'bg-game-panel text-gray-400 hover:bg-game-panel/80'
            }`}
          >
            📊 Progress
          </button>
          <button
            onClick={() => setCurrentView('journal')}
            className={`py-3 px-2 rounded-lg font-semibold text-xs transition-colors ${
              currentView === 'journal'
                ? 'bg-game-accent text-white'
                : 'bg-game-panel text-gray-400 hover:bg-game-panel/80'
            }`}
          >
            📝 Journal
          </button>
          <button
            onClick={() => setCurrentView('rewards')}
            className={`py-3 px-2 rounded-lg font-semibold text-xs transition-colors ${
              currentView === 'rewards'
                ? 'bg-game-accent text-white'
                : 'bg-game-panel text-gray-400 hover:bg-game-panel/80'
            }`}
          >
            🎁 Rewards
          </button>
          <button
            onClick={() => setCurrentView('export')}
            className={`py-3 px-2 rounded-lg font-semibold text-xs transition-colors ${
              currentView === 'export'
                ? 'bg-game-accent text-white'
                : 'bg-game-panel text-gray-400 hover:bg-game-panel/80'
            }`}
          >
            💾 Export
          </button>
        </div>

        {/* View content */}
        {currentView === 'today' && (
          <TodayScreen
            todayLog={todayLog}
            onToggleQuest={toggleQuest}
            onMarkDay={markDay}
            onToggleLowEnergy={toggleLowEnergy}
            onToggleCheatDay={toggleCheatDay}
          />
        )}

        {currentView === 'calendar' && (
          <CalendarView />
        )}

        {currentView === 'progress' && (
          <ProgressTracker />
        )}

        {currentView === 'journal' && (
          <MoodJournal
            todayLog={todayLog}
            onUpdateMood={updateMood}
            onUpdateJournal={updateJournal}
          />
        )}

        {currentView === 'rewards' && (
          <RewardsManager />
        )}

        {currentView === 'export' && (
          <DataExport />
        )}
      </div>

      {/* Level up modal */}
      {showLevelUp && (
        <LevelUpModal
          level={userData.currentLevel}
          onClose={() => setShowLevelUp(false)}
        />
      )}
    </div>
  )
}

export default App
