import { useState } from 'react'
import { DEFAULT_QUESTS } from '../utils/storage'
import ReminderBanner from './ReminderBanner'
import DailySchedule from './DailySchedule'

export default function TodayScreen({ todayLog, onToggleQuest, onMarkDay, onToggleLowEnergy, onToggleCheatDay }) {
  const [view, setView] = useState('quests') // 'quests' | 'schedule'
  const completedCount = todayLog.completed.length
  const requiredCount = 3
  const canWinDay = completedCount >= requiredCount

  return (
    <div className="space-y-6">
      {/* End of day reminder */}
      <ReminderBanner todayLog={todayLog} />

      {/* View tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setView('quests')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            view === 'quests'
              ? 'bg-gradient-to-r from-game-accent to-purple-600 text-white shadow-lg'
              : 'bg-game-panel text-gray-400'
          }`}
        >
          ✅ Quick Quests
        </button>
        <button
          onClick={() => setView('schedule')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
            view === 'schedule'
              ? 'bg-gradient-to-r from-game-accent to-purple-600 text-white shadow-lg'
              : 'bg-game-panel text-gray-400'
          }`}
        >
          📅 Full Schedule
        </button>
      </div>

      {view === 'quests' ? (
        <>
          {/* Today's Focus Header */}
          <div className="bg-game-panel rounded-lg p-6 border-2 border-game-accent/30 animate-fadeIn">
            <h2 className="text-2xl font-bold mb-2">📋 Today&apos;s Focus</h2>
            <p className="text-gray-400 mb-4">
              Complete <span className="text-game-gold font-bold">any 3 quests</span> to win the day
            </p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 bg-game-bg rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-game-accent to-xp-green h-full transition-all duration-500"
                  style={{ width: `${Math.min((completedCount / requiredCount) * 100, 100)}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-game-gold">
                {completedCount}/{requiredCount}
              </span>
            </div>

            {/* Mode toggles */}
            <div className="flex gap-2">
              <button
                onClick={onToggleLowEnergy}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  todayLog.lowEnergyMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-game-bg text-gray-400 hover:bg-game-bg/80'
                }`}
              >
                {todayLog.lowEnergyMode ? '🔋 Low Energy Mode ON' : 'Low Energy Mode'}
              </button>
              <button
                onClick={onToggleCheatDay}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  todayLog.isCheatDay
                    ? 'bg-purple-600 text-white'
                    : 'bg-game-bg text-gray-400 hover:bg-game-bg/80'
                }`}
              >
                {todayLog.isCheatDay ? '🍕 Cheat Day' : 'Cheat Day'}
              </button>
            </div>
          </div>

          {/* Quest List */}
          <div className="space-y-3">
            {DEFAULT_QUESTS.map((quest, index) => {
              const isCompleted = todayLog.completed.includes(quest.id)
              const label = todayLog.lowEnergyMode && quest.lowEnergyLabel
                ? quest.lowEnergyLabel
                : quest.label

              return (
                <button
                  key={quest.id}
                  onClick={() => onToggleQuest(quest.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    isCompleted
                      ? 'bg-xp-green/20 border-xp-green text-white'
                      : 'bg-game-panel border-game-panel hover:border-game-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-xp-green border-xp-green'
                        : 'border-gray-500'
                    }`}>
                      {isCompleted && <span className="text-white text-sm">✓</span>}
                    </div>
                    <span className="flex-1 font-medium">{label}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Day completion buttons */}
          {!todayLog.status && (
            <div className="bg-game-panel rounded-lg p-6 border-2 border-game-accent/30 animate-fadeIn">
              <h3 className="text-lg font-bold mb-4">📊 How did today go?</h3>
              <div className="space-y-2">
                <button
                  onClick={() => onMarkDay('green')}
                  disabled={!canWinDay}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-colors ${
                    canWinDay
                      ? 'bg-quest-green hover:bg-quest-green/80'
                      : 'bg-gray-700 cursor-not-allowed opacity-50'
                  }`}
                >
                  🟢 Win Day (Full XP)
                </button>
                <button
                  onClick={() => onMarkDay('yellow')}
                  className="w-full py-4 px-6 rounded-lg font-bold text-white bg-quest-yellow hover:bg-quest-yellow/80 transition-colors"
                >
                  🟡 Partial (Half XP)
                </button>
                <button
                  onClick={() => onMarkDay('red')}
                  className="w-full py-4 px-6 rounded-lg font-bold text-white bg-quest-red hover:bg-quest-red/80 transition-colors"
                >
                  🔴 Rest Day (No XP)
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">
                Yellow days don&apos;t break streaks! 💛
              </p>
            </div>
          )}

          {/* Already marked */}
          {todayLog.status && (
            <div className="bg-game-panel rounded-lg p-6 border-2 border-game-accent/30 text-center">
              <div className="text-6xl mb-4">
                {todayLog.status === 'green' && '🎉'}
                {todayLog.status === 'yellow' && '💛'}
                {todayLog.status === 'red' && '🛌'}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {todayLog.status === 'green' && 'Quest Complete!'}
                {todayLog.status === 'yellow' && 'Partial Progress'}
                {todayLog.status === 'red' && 'Rest Day'}
              </h3>
              <p className="text-gray-400">
                {todayLog.status === 'green' && '+100 XP earned! See you tomorrow, hero.'}
                {todayLog.status === 'yellow' && '+50 XP earned. Tomorrow is a new day!'}
                {todayLog.status === 'red' && 'Rest is part of the journey. Come back tomorrow!'}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="animate-fadeIn">
          <DailySchedule todayLog={todayLog} />
        </div>
      )}
    </div>
  )
}
