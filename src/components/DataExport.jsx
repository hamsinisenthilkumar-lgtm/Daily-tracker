import { exportToCSV, exportUserProfile, exportSummaryStats } from '../utils/export'

export default function DataExport() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-game-panel rounded-lg p-6 border-2 border-game-accent/30">
        <h2 className="text-xl font-bold mb-2">📊 Export Your Data</h2>
        <p className="text-sm text-gray-400">
          Download your tracking data in Excel-compatible CSV format. All files can be opened in Excel, Google Sheets, or any spreadsheet software.
        </p>
      </div>

      {/* Export Options */}
      <div className="space-y-4">
        {/* Complete Daily Log */}
        <div className="bg-game-panel rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">📋</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">Complete Daily Log</h3>
              <p className="text-sm text-gray-400 mb-4">
                All your daily entries with date, status, quests completed, mood, journal entries, and timestamps.
              </p>
              <div className="text-xs text-gray-500 mb-3">
                Includes: Date • Day Status • XP Earned • Quests Completed • Quest Details • Low Energy Mode • Cheat Day • Mood • Journal Entry • Time Marked
              </div>
              <button
                onClick={exportToCSV}
                className="bg-game-accent hover:bg-game-accent/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Download Daily Log CSV
              </button>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="bg-game-panel rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">👤</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">User Profile & Stats</h3>
              <p className="text-sm text-gray-400 mb-4">
                Your current level, XP, weight tracking data, and overall progress.
              </p>
              <div className="text-xs text-gray-500 mb-3">
                Includes: Current Level • Total Levels Gained • Current XP • Weight Data • Export Date
              </div>
              <button
                onClick={exportUserProfile}
                className="bg-game-accent hover:bg-game-accent/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Download Profile CSV
              </button>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="bg-game-panel rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">📈</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-1">Summary Statistics</h3>
              <p className="text-sm text-gray-400 mb-4">
                Overview of your performance: total days, win rate, most completed quests, and total XP.
              </p>
              <div className="text-xs text-gray-500 mb-3">
                Includes: Total Days • Green/Yellow/Red Days • Win Rate • Total XP • Most Completed Quest
              </div>
              <button
                onClick={exportSummaryStats}
                className="bg-game-accent hover:bg-game-accent/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Download Summary CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Location Info */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-6 border border-blue-600/30">
        <h3 className="text-lg font-bold mb-3">🔒 Where Is Your Data?</h3>
        <div className="space-y-2 text-sm">
          <p className="text-gray-300">
            <strong>Storage Location:</strong> All data is stored in your browser's LocalStorage
          </p>
          <p className="text-gray-300">
            <strong>Privacy:</strong> Your data never leaves your device - no servers, no cloud, 100% private
          </p>
          <p className="text-gray-300">
            <strong>Access:</strong> Open browser DevTools → Application tab → Local Storage → {window.location.origin}
          </p>
          <p className="text-gray-300">
            <strong>Backup:</strong> Export CSV files regularly to prevent data loss if browser cache is cleared
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-game-bg rounded-lg p-4 border border-game-accent/20">
        <h4 className="text-sm font-semibold mb-2">📖 How to Use Exports</h4>
        <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
          <li>Click any "Download" button above</li>
          <li>File will download as .csv format</li>
          <li>Open with Excel, Google Sheets, or Numbers</li>
          <li>All dates, times, and text will be properly formatted</li>
          <li>Sort, filter, and analyze your data as needed</li>
        </ol>
      </div>
    </div>
  )
}
