import { useState } from 'react'

const MOODS = [
  { id: 'great', emoji: '😄', label: 'Great', color: 'bg-green-600' },
  { id: 'good', emoji: '🙂', label: 'Good', color: 'bg-blue-600' },
  { id: 'okay', emoji: '😐', label: 'Okay', color: 'bg-yellow-600' },
  { id: 'bad', emoji: '😔', label: 'Bad', color: 'bg-orange-600' },
  { id: 'terrible', emoji: '😢', label: 'Terrible', color: 'bg-red-600' },
]

export default function MoodJournal({ todayLog, onUpdateMood, onUpdateJournal }) {
  const [journalText, setJournalText] = useState(todayLog.journal || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleJournalSave = () => {
    setIsSaving(true)
    onUpdateJournal(journalText)
    setTimeout(() => setIsSaving(false), 500)
  }

  return (
    <div className="space-y-6">
      {/* Mood Tracker */}
      <div className="bg-game-panel rounded-lg p-6 border-2 border-game-accent/30">
        <h3 className="text-lg font-bold mb-4">😊 How are you feeling today?</h3>
        <div className="grid grid-cols-5 gap-2">
          {MOODS.map((mood) => (
            <button
              key={mood.id}
              onClick={() => onUpdateMood(mood.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                todayLog.mood === mood.id
                  ? `${mood.color} text-white ring-2 ring-game-gold`
                  : 'bg-game-bg text-gray-400 hover:bg-game-bg/80'
              }`}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </button>
          ))}
        </div>
        {todayLog.mood && (
          <div className="mt-3 text-sm text-gray-400 text-center">
            Mood tracked: {MOODS.find(m => m.id === todayLog.mood)?.emoji} {MOODS.find(m => m.id === todayLog.mood)?.label}
          </div>
        )}
      </div>

      {/* Journal Entry */}
      <div className="bg-game-panel rounded-lg p-6 border-2 border-game-accent/30">
        <h3 className="text-lg font-bold mb-4">📝 Daily Journal</h3>
        <p className="text-sm text-gray-400 mb-3">
          Write about your day, thoughts, wins, challenges, or anything on your mind.
        </p>
        <textarea
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="What happened today? How did you feel? What are you grateful for?"
          className="w-full h-40 bg-game-bg border border-game-accent/30 rounded-lg px-4 py-3 text-white resize-none focus:outline-none focus:border-game-accent"
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-500">
            {journalText.length} characters
          </span>
          <button
            onClick={handleJournalSave}
            disabled={journalText === todayLog.journal}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              journalText === todayLog.journal
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-game-accent hover:bg-game-accent/80 text-white'
            }`}
          >
            {isSaving ? 'Saved ✓' : 'Save Entry'}
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-game-bg rounded-lg p-4 border border-game-accent/20">
        <h4 className="text-sm font-semibold mb-2">💡 Journaling Tips</h4>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• Write freely - no judgment, no rules</li>
          <li>• Note wins, even tiny ones</li>
          <li>• Track patterns in mood and energy</li>
          <li>• Use it to plan tomorrow</li>
          <li>• Be honest about struggles</li>
        </ul>
      </div>
    </div>
  )
}
