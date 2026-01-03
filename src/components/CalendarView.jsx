import { useState } from 'react'
import { getDailyLogs, getTodayKey, DEFAULT_QUESTS } from '../utils/storage'

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const logs = getDailyLogs()
  const todayKey = getTodayKey()

  // Get calendar grid for current month
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPadding = firstDay.getDay()
    const daysInMonth = lastDay.getDate()

    const days = []

    // Padding for days before month starts
    for (let i = 0; i < startPadding; i++) {
      days.push(null)
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const log = logs[dateKey]
      days.push({
        day,
        dateKey,
        status: log?.status || null,
        completed: log?.completed || [],
        lowEnergyMode: log?.lowEnergyMode || false,
        isCheatDay: log?.isCheatDay || false,
        mood: log?.mood || null,
        journal: log?.journal || '',
        markedAt: log?.markedAt || null,
      })
    }

    return days
  }

  const days = getCalendarDays()
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleDayClick = (dayData) => {
    if (dayData.status || dayData.completed.length > 0) {
      setSelectedDate(dayData)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-game-panel rounded-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-game-bg rounded-lg transition-colors"
          >
            ←
          </button>
          <h2 className="text-xl font-bold">{monthName}</h2>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-game-bg rounded-lg transition-colors"
          >
            →
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs text-gray-500 font-semibold">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((dayData, index) => {
            if (!dayData) {
              return <div key={`empty-${index}`} />
            }

            const { day, status, dateKey, completed } = dayData
            const isToday = dateKey === todayKey

            const bgColor = status === 'green'
              ? 'bg-quest-green'
              : status === 'yellow'
              ? 'bg-quest-yellow'
              : status === 'red'
              ? 'bg-quest-red'
              : 'bg-game-bg'

            return (
              <div
                key={dateKey}
                onClick={() => handleDayClick(dayData)}
                className={`aspect-square rounded-lg ${bgColor} flex flex-col items-center justify-center font-semibold transition-all hover:opacity-80 cursor-pointer relative ${
                  isToday ? 'ring-4 ring-game-gold ring-offset-2 ring-offset-game-panel' : ''
                }`}
              >
                <span className={status ? 'text-white' : 'text-gray-500'}>{day}</span>
                {isToday && (
                  <div className="absolute -top-1 -right-1">
                    <span className="text-xs">📍</span>
                  </div>
                )}
                {completed.length > 0 && (
                  <div className="absolute -bottom-1 flex gap-0.5">
                    {completed.slice(0, 3).map((_, i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-white/70" />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-quest-green" />
            <span className="text-gray-400">Win</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-quest-yellow" />
            <span className="text-gray-400">Partial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-quest-red" />
            <span className="text-gray-400">Rest</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📍</span>
            <span className="text-gray-400">Today</span>
          </div>
        </div>
      </div>

      {/* Achievement details for selected date */}
      {selectedDate && (
        <div className="bg-game-panel rounded-lg p-6 border-2 border-game-accent/30 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">
              {selectedDate.dateKey === todayKey ? '📍 Today' : selectedDate.dateKey}
            </h3>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Status badge */}
          <div className="mb-4">
            {selectedDate.status === 'green' && (
              <div className="inline-flex items-center gap-2 bg-quest-green/20 border border-quest-green text-quest-green px-4 py-2 rounded-lg">
                <span className="text-2xl">🎉</span>
                <span className="font-bold">Quest Complete! +100 XP</span>
              </div>
            )}
            {selectedDate.status === 'yellow' && (
              <div className="inline-flex items-center gap-2 bg-quest-yellow/20 border border-quest-yellow text-quest-yellow px-4 py-2 rounded-lg">
                <span className="text-2xl">💛</span>
                <span className="font-bold">Partial Progress +50 XP</span>
              </div>
            )}
            {selectedDate.status === 'red' && (
              <div className="inline-flex items-center gap-2 bg-quest-red/20 border border-quest-red text-quest-red px-4 py-2 rounded-lg">
                <span className="text-2xl">🛌</span>
                <span className="font-bold">Rest Day</span>
              </div>
            )}
          </div>

          {/* Completed quests */}
          {selectedDate.completed.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">
                Completed Quests ({selectedDate.completed.length})
              </h4>
              <div className="space-y-2">
                {selectedDate.completed.map((questId) => {
                  const quest = DEFAULT_QUESTS.find(q => q.id === questId)
                  return (
                    <div
                      key={questId}
                      className="flex items-center gap-2 bg-xp-green/20 border border-xp-green/30 px-3 py-2 rounded-lg"
                    >
                      <span className="text-xp-green">✓</span>
                      <span className="text-sm">
                        {selectedDate.lowEnergyMode && quest.lowEnergyLabel
                          ? quest.lowEnergyLabel
                          : quest.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Modes active */}
          {(selectedDate.lowEnergyMode || selectedDate.isCheatDay) && (
            <div className="mt-4 flex gap-2">
              {selectedDate.lowEnergyMode && (
                <div className="text-xs bg-blue-600/20 border border-blue-600 text-blue-400 px-3 py-1 rounded">
                  🔋 Low Energy Mode
                </div>
              )}
              {selectedDate.isCheatDay && (
                <div className="text-xs bg-purple-600/20 border border-purple-600 text-purple-400 px-3 py-1 rounded">
                  🍕 Cheat Day
                </div>
              )}
            </div>
          )}

          {/* Mood */}
          {selectedDate.mood && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Mood</h4>
              <div className="bg-game-bg rounded-lg px-4 py-3">
                <span className="text-2xl mr-2">
                  {selectedDate.mood === 'great' && '😄'}
                  {selectedDate.mood === 'good' && '🙂'}
                  {selectedDate.mood === 'okay' && '😐'}
                  {selectedDate.mood === 'bad' && '😔'}
                  {selectedDate.mood === 'terrible' && '😢'}
                </span>
                <span className="capitalize">{selectedDate.mood}</span>
              </div>
            </div>
          )}

          {/* Journal Entry */}
          {selectedDate.journal && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Journal Entry</h4>
              <div className="bg-game-bg rounded-lg px-4 py-3 text-sm text-gray-300">
                {selectedDate.journal}
              </div>
            </div>
          )}

          {/* Timestamp */}
          {selectedDate.markedAt && (
            <div className="mt-4 text-xs text-gray-500 text-center">
              Marked at: {selectedDate.markedAt}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
