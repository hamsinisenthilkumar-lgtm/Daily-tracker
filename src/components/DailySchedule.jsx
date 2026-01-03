import { useState, useEffect } from 'react'
import { getThemeForWeek, getTodayInterest } from '../utils/themes'

export default function DailySchedule({ todayLog }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const weekTheme = getThemeForWeek()
  const todayInterest = getTodayInterest()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000) // Update every minute
    return () => clearInterval(timer)
  }, [])

  const currentHour = currentTime.getHours()

  const schedule = [
    {
      time: '6:00 - 9:00 AM',
      title: '🌅 Morning Win Window',
      tasks: [
        'Wake up & hydrate (1 glass water)',
        'Stretch or light movement (5 min)',
        'Plan today\'s 3 quests',
      ],
      active: currentHour >= 6 && currentHour < 9,
      icon: '☀️',
    },
    {
      time: '9:00 AM - 12:00 PM',
      title: '⚡ Peak Energy Block',
      tasks: [
        'Main workout OR long walk',
        'Hit half of daily steps',
        'Healthy breakfast + almonds',
      ],
      active: currentHour >= 9 && currentHour < 12,
      icon: '💪',
    },
    {
      time: '12:00 - 2:00 PM',
      title: '🍽 Midday Refuel',
      tasks: [
        'Nutritious lunch (no junk)',
        'Water checkpoint',
        'Short post-meal walk (10 min)',
      ],
      active: currentHour >= 12 && currentHour < 14,
      icon: '🥗',
    },
    {
      time: '2:00 - 6:00 PM',
      title: `${weekTheme.icon} ${weekTheme.name}`,
      tasks: [
        todayLog.lowEnergyMode ? 'Gentle movement (5k steps)' : 'Complete remaining steps',
        weekTheme.activities[0],
        weekTheme.activities[1],
      ],
      active: currentHour >= 14 && currentHour < 18,
      icon: weekTheme.icon,
      gradient: weekTheme.color,
    },
    {
      time: '6:00 - 8:00 PM',
      title: '🌙 Wind Down',
      tasks: [
        'Light dinner before 7 PM',
        'Evening walk if needed',
        'No screens (read instead)',
      ],
      active: currentHour >= 18 && currentHour < 20,
      icon: '🌆',
    },
    {
      time: '8:00 - 10:00 PM',
      title: `${todayInterest.icon} ${todayInterest.name}`,
      tasks: todayInterest.activities,
      active: currentHour >= 20 && currentHour < 22,
      icon: todayInterest.icon,
      special: true,
    },
    {
      time: '10:00 - 11:00 PM',
      title: '😴 Pre-Sleep Ritual',
      tasks: [
        'Mark today\'s quests if not done',
        'Skincare routine',
        'In bed before 11 PM',
      ],
      active: currentHour >= 22 || currentHour < 6,
      icon: '🛌',
    },
  ]

  return (
    <div className="space-y-4">
      {/* Current theme banner */}
      <div className={`bg-gradient-to-r ${weekTheme.color} rounded-lg p-4 text-white`}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{weekTheme.icon}</span>
          <div>
            <h3 className="font-bold text-lg">{weekTheme.name}</h3>
            <p className="text-sm opacity-90">{weekTheme.description}</p>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="space-y-3">
        {schedule.map((block, index) => (
          <div
            key={index}
            className={`rounded-lg p-4 transition-all ${
              block.active
                ? block.gradient
                  ? `bg-gradient-to-r ${block.gradient} text-white ring-2 ring-game-gold`
                  : 'bg-game-accent text-white ring-2 ring-game-gold'
                : 'bg-game-panel border border-game-accent/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{block.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold">{block.title}</h4>
                  {block.active && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">
                      NOW
                    </span>
                  )}
                </div>
                <p className={`text-xs ${block.active ? 'opacity-90' : 'text-gray-400'}`}>
                  {block.time}
                </p>
              </div>
            </div>

            <ul className="space-y-1">
              {block.tasks.map((task, i) => (
                <li
                  key={i}
                  className={`text-sm flex items-start gap-2 ${
                    block.active ? 'opacity-100' : 'text-gray-400'
                  }`}
                >
                  <span className={block.active ? '' : 'opacity-50'}>•</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>

            {block.special && !todayLog.status && (
              <div className="mt-3 bg-white/10 rounded p-2 text-xs">
                💡 Complete your daily reward time after marking today as GREEN
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
