import { useState, useEffect } from 'react'
import { shouldShowEndOfDayReminder, requestNotificationPermission } from '../utils/reminders'

export default function ReminderBanner({ todayLog }) {
  const [showReminder, setShowReminder] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  useEffect(() => {
    // Check if we should show reminder
    const checkReminder = () => {
      const shouldShow = shouldShowEndOfDayReminder() && !todayLog.status
      setShowReminder(shouldShow)
    }

    checkReminder()
    // Check every 30 minutes
    const interval = setInterval(checkReminder, 30 * 60 * 1000)

    // Check notification permission
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted')
    }

    return () => clearInterval(interval)
  }, [todayLog.status])

  const enableNotifications = async () => {
    const granted = await requestNotificationPermission()
    setNotificationsEnabled(granted)
  }

  if (!showReminder) return null

  return (
    <div className="mb-6 bg-gradient-to-r from-game-accent to-purple-600 rounded-lg p-4 border-2 border-game-gold/50">
      <div className="flex items-start gap-3">
        <span className="text-2xl">⏰</span>
        <div className="flex-1">
          <h3 className="font-bold mb-1">End of Day Reminder</h3>
          <p className="text-sm text-gray-100 mb-3">
            Don&apos;t forget to mark how your day went! Did you win today?
          </p>
          {!notificationsEnabled && (
            <button
              onClick={enableNotifications}
              className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors"
            >
              Enable Notifications 🔔
            </button>
          )}
        </div>
        <button
          onClick={() => setShowReminder(false)}
          className="text-white/70 hover:text-white font-bold"
        >
          ×
        </button>
      </div>
    </div>
  )
}
