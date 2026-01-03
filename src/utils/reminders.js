// Reminder and notification utilities

// Request notification permission
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

// Show notification
export const showNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      ...options,
    })
    return notification
  }
}

// Check if end of day reminder should be shown
export const shouldShowEndOfDayReminder = () => {
  const now = new Date()
  const hour = now.getHours()

  // Show reminder between 8 PM and 11 PM
  return hour >= 20 && hour < 23
}

// Schedule end-of-day reminder
export const scheduleEndOfDayReminder = (onRemind) => {
  const checkTime = () => {
    if (shouldShowEndOfDayReminder()) {
      const logs = JSON.parse(localStorage.getItem('quest_tracker_logs') || '{}')
      const today = new Date().toISOString().split('T')[0]
      const todayLog = logs[today]

      // Only remind if day hasn't been marked
      if (!todayLog || !todayLog.status) {
        onRemind()
        showNotification('Quest Tracker Reminder', {
          body: 'Did you win today? Mark your quests before bed!',
          tag: 'end-of-day',
        })
      }
    }
  }

  // Check every 30 minutes
  const interval = setInterval(checkTime, 30 * 60 * 1000)

  // Check immediately
  checkTime()

  return () => clearInterval(interval)
}

// Get motivational message based on streak
export const getMotivationalMessage = (streak) => {
  if (streak === 0) {
    return "Let's start a new streak! 🌟"
  }
  if (streak === 1) {
    return "Great start! Keep it going! 💪"
  }
  if (streak < 7) {
    return `${streak} days strong! Don't break the chain! 🔥`
  }
  if (streak < 14) {
    return `${streak} day streak! You're on fire! 🔥`
  }
  if (streak < 30) {
    return `${streak} days! You're a legend! ⭐`
  }
  return `${streak} day streak! Absolutely crushing it! 👑`
}
