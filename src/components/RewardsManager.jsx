import { useState } from 'react'
import { getRewards, saveRewards } from '../utils/storage'

export default function RewardsManager() {
  const [rewards, setRewards] = useState(getRewards())
  const [editingDaily, setEditingDaily] = useState(false)
  const [editingLevel, setEditingLevel] = useState(false)
  const [newDailyReward, setNewDailyReward] = useState('')
  const [newLevelReward, setNewLevelReward] = useState('')

  const addDailyReward = () => {
    if (!newDailyReward.trim()) return
    const updated = {
      ...rewards,
      daily: [...rewards.daily, newDailyReward.trim()]
    }
    setRewards(updated)
    saveRewards(updated)
    setNewDailyReward('')
  }

  const removeDailyReward = (index) => {
    const updated = {
      ...rewards,
      daily: rewards.daily.filter((_, i) => i !== index)
    }
    setRewards(updated)
    saveRewards(updated)
  }

  const addLevelReward = () => {
    if (!newLevelReward.trim()) return
    const updated = {
      ...rewards,
      level: [...rewards.level, newLevelReward.trim()]
    }
    setRewards(updated)
    saveRewards(updated)
    setNewLevelReward('')
  }

  const removeLevelReward = (index) => {
    const updated = {
      ...rewards,
      level: rewards.level.filter((_, i) => i !== index)
    }
    setRewards(updated)
    saveRewards(updated)
  }

  return (
    <div className="space-y-6">
      {/* Daily Rewards */}
      <div className="bg-game-panel rounded-lg p-6 border-2 border-game-accent/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">🎁 Daily Rewards</h2>
          <button
            onClick={() => setEditingDaily(!editingDaily)}
            className="text-sm px-4 py-2 bg-game-accent rounded-lg hover:bg-game-accent/80 transition-colors"
          >
            {editingDaily ? 'Done' : 'Edit'}
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Choose one of these after completing a green day:
        </p>

        <div className="space-y-2 mb-4">
          {rewards.daily.map((reward, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-game-bg p-3 rounded-lg"
            >
              <span className="flex-1">{reward}</span>
              {editingDaily && (
                <button
                  onClick={() => removeDailyReward(index)}
                  className="text-quest-red hover:text-red-400 font-bold"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {editingDaily && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newDailyReward}
              onChange={(e) => setNewDailyReward(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addDailyReward()}
              placeholder="Add new daily reward..."
              className="flex-1 bg-game-bg border border-game-accent/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-game-accent"
            />
            <button
              onClick={addDailyReward}
              className="px-6 py-2 bg-xp-green rounded-lg hover:bg-xp-green/80 transition-colors font-semibold"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Level Rewards */}
      <div className="bg-game-panel rounded-lg p-6 border-2 border-game-gold/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">🏆 Level-Up Rewards</h2>
          <button
            onClick={() => setEditingLevel(!editingLevel)}
            className="text-sm px-4 py-2 bg-game-gold text-game-bg rounded-lg hover:bg-game-gold/80 transition-colors font-semibold"
          >
            {editingLevel ? 'Done' : 'Edit'}
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Earned every time you level up (lose 3kg):
        </p>

        <div className="space-y-2 mb-4">
          {rewards.level.map((reward, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-game-bg p-3 rounded-lg"
            >
              <span className="flex-1">{reward}</span>
              {editingLevel && (
                <button
                  onClick={() => removeLevelReward(index)}
                  className="text-quest-red hover:text-red-400 font-bold"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {editingLevel && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newLevelReward}
              onChange={(e) => setNewLevelReward(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addLevelReward()}
              placeholder="Add new level reward..."
              className="flex-1 bg-game-bg border border-game-gold/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-game-gold"
            />
            <button
              onClick={addLevelReward}
              className="px-6 py-2 bg-game-gold text-game-bg rounded-lg hover:bg-game-gold/80 transition-colors font-semibold"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Info box */}
      <div className="bg-game-bg rounded-lg p-4 border border-game-accent/20">
        <p className="text-sm text-gray-400 text-center">
          💡 Customize these rewards to match what motivates YOU. They&apos;re your fuel!
        </p>
      </div>
    </div>
  )
}
