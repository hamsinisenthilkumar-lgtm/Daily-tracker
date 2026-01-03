// Data export utilities

import { getDailyLogs, getUserData, DEFAULT_QUESTS } from './storage'

// Export all data to CSV format (opens in Excel)
export const exportToCSV = () => {
  const logs = getDailyLogs()
  const userData = getUserData()

  // CSV Header
  const headers = [
    'Date',
    'Day Status',
    'XP Earned',
    'Quests Completed',
    'Quest Details',
    'Low Energy Mode',
    'Cheat Day',
    'Mood',
    'Journal Entry',
    'Time Marked'
  ]

  // Convert logs to CSV rows
  const rows = Object.keys(logs)
    .sort()
    .reverse() // Most recent first
    .map(dateKey => {
      const log = logs[dateKey]

      // Get quest details
      const completedQuests = log.completed?.map(questId => {
        const quest = DEFAULT_QUESTS.find(q => q.id === questId)
        return quest ? quest.label : questId
      }).join('; ') || 'None'

      // Calculate XP
      const xp = log.status === 'green' ? 100 : log.status === 'yellow' ? 50 : 0

      return [
        dateKey,
        log.status ? log.status.toUpperCase() : 'NOT MARKED',
        xp,
        log.completed?.length || 0,
        completedQuests,
        log.lowEnergyMode ? 'YES' : 'NO',
        log.isCheatDay ? 'YES' : 'NO',
        log.mood || 'Not tracked',
        log.journal ? `"${log.journal.replace(/"/g, '""')}"` : '', // Escape quotes
        log.markedAt || ''
      ]
    })

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  // Add BOM for Excel UTF-8 support
  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })

  // Download file
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  const timestamp = new Date().toISOString().split('T')[0]

  link.setAttribute('href', url)
  link.setAttribute('download', `quest-tracker-data-${timestamp}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Export user profile data
export const exportUserProfile = () => {
  const userData = getUserData()

  const profile = {
    'Current Level': userData.currentLevel,
    'Total Levels Gained': userData.totalLevels,
    'Current XP': userData.currentXP,
    'Start Weight (kg)': userData.startWeight || 'Not set',
    'Current Weight (kg)': userData.currentWeight || 'Not set',
    'Target Weight (kg)': userData.targetWeight || 'Not set',
    'Weight Lost (kg)': userData.startWeight && userData.currentWeight
      ? (userData.startWeight - userData.currentWeight).toFixed(1)
      : 'N/A',
    'Export Date': new Date().toLocaleString()
  }

  const csvContent = Object.entries(profile)
    .map(([key, value]) => `${key},${value}`)
    .join('\n')

  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })

  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  const timestamp = new Date().toISOString().split('T')[0]

  link.setAttribute('href', url)
  link.setAttribute('download', `quest-tracker-profile-${timestamp}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Export summary statistics
export const exportSummaryStats = () => {
  const logs = getDailyLogs()
  const allLogs = Object.values(logs)

  const greenDays = allLogs.filter(l => l.status === 'green').length
  const yellowDays = allLogs.filter(l => l.status === 'yellow').length
  const redDays = allLogs.filter(l => l.status === 'red').length
  const totalDays = greenDays + yellowDays + redDays
  const winRate = totalDays > 0 ? ((greenDays / totalDays) * 100).toFixed(1) : 0

  // Quest completion stats
  const questStats = {}
  allLogs.forEach(log => {
    log.completed?.forEach(questId => {
      questStats[questId] = (questStats[questId] || 0) + 1
    })
  })

  const stats = {
    'Total Days Tracked': totalDays,
    'Green Days (Wins)': greenDays,
    'Yellow Days (Partial)': yellowDays,
    'Red Days (Rest)': redDays,
    'Win Rate (%)': winRate,
    'Total XP Earned': (greenDays * 100) + (yellowDays * 50),
    'Most Completed Quest': getMostCompletedQuest(questStats),
    'Export Date': new Date().toLocaleString()
  }

  const csvContent = 'Metric,Value\n' + Object.entries(stats)
    .map(([key, value]) => `${key},${value}`)
    .join('\n')

  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })

  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  const timestamp = new Date().toISOString().split('T')[0]

  link.setAttribute('href', url)
  link.setAttribute('download', `quest-tracker-summary-${timestamp}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function getMostCompletedQuest(questStats) {
  const entries = Object.entries(questStats)
  if (entries.length === 0) return 'None'

  const [questId, count] = entries.reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  )

  const quest = DEFAULT_QUESTS.find(q => q.id === questId)
  return quest ? `${quest.label} (${count} times)` : questId
}
