import { useState } from 'react'
import { getUserData, saveUserData } from '../utils/storage'

// Default milestone rewards (editable)
const DEFAULT_MILESTONES = [
  { level: 1, weight: -3, reward: 'New skincare / haircare', unlocked: false },
  { level: 2, weight: -6, reward: 'New outfit', unlocked: false },
  { level: 3, weight: -9, reward: 'Shoes / bag', unlocked: false },
  { level: 4, weight: -12, reward: 'Salon day', unlocked: false },
  { level: 5, weight: -15, reward: 'Short trip / experience', unlocked: false },
  { level: 6, weight: -18, reward: 'Big art or tech reward', unlocked: false },
  { level: 7, weight: -21, reward: 'Full wardrobe refresh', unlocked: false },
  { level: 8, weight: -24, reward: 'Photoshoot / makeover', unlocked: false },
  { level: 9, weight: -27, reward: 'Dream reward', unlocked: false },
  { level: 10, weight: -30, reward: 'Identity shift unlocked 🎯', unlocked: false },
]

export default function ProgressTracker() {
  const userData = getUserData()
  const [showWeightInput, setShowWeightInput] = useState(false)
  const [startWeight, setStartWeight] = useState(userData.startWeight || '')
  const [currentWeight, setCurrentWeight] = useState(userData.currentWeight || '')
  const [targetWeight, setTargetWeight] = useState(userData.targetWeight || '')

  const saveWeights = () => {
    const updated = {
      ...userData,
      startWeight: parseFloat(startWeight) || null,
      currentWeight: parseFloat(currentWeight) || null,
      targetWeight: parseFloat(targetWeight) || null,
    }
    saveUserData(updated)
    setShowWeightInput(false)
  }

  const weightLost = userData.startWeight && userData.currentWeight
    ? userData.startWeight - userData.currentWeight
    : 0

  const percentComplete = userData.startWeight && userData.targetWeight
    ? ((userData.startWeight - userData.currentWeight) / (userData.startWeight - userData.targetWeight)) * 100
    : 0

  // Calculate which milestones are unlocked
  const milestonesWithStatus = DEFAULT_MILESTONES.map(milestone => ({
    ...milestone,
    unlocked: Math.abs(weightLost) >= Math.abs(milestone.weight),
    current: userData.currentLevel >= milestone.level,
  }))

  const nextMilestone = milestonesWithStatus.find(m => !m.unlocked)

  return (
    <div className="space-y-6">
      {/* Weight tracking card */}
      <div className="bg-gradient-to-br from-game-panel to-game-accent/20 rounded-lg p-6 border-2 border-game-gold/30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">⚖️ Weight Progress</h2>
          <button
            onClick={() => setShowWeightInput(!showWeightInput)}
            className="text-sm px-4 py-2 bg-game-accent rounded-lg hover:bg-game-accent/80"
          >
            {showWeightInput ? 'Cancel' : 'Update'}
          </button>
        </div>

        {showWeightInput ? (
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Starting Weight (kg)</label>
              <input
                type="number"
                value={startWeight}
                onChange={(e) => setStartWeight(e.target.value)}
                className="w-full bg-game-bg border border-game-accent/30 rounded-lg px-4 py-2 text-white"
                placeholder="e.g., 85"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Current Weight (kg)</label>
              <input
                type="number"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                className="w-full bg-game-bg border border-game-accent/30 rounded-lg px-4 py-2 text-white"
                placeholder="e.g., 82"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Target Weight (kg)</label>
              <input
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="w-full bg-game-bg border border-game-accent/30 rounded-lg px-4 py-2 text-white"
                placeholder="e.g., 55"
              />
            </div>
            <button
              onClick={saveWeights}
              className="w-full bg-xp-green hover:bg-xp-green/80 text-white font-semibold py-3 rounded-lg"
            >
              Save Progress
            </button>
          </div>
        ) : (
          <div>
            {userData.startWeight ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-game-bg rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Start</div>
                    <div className="text-xl font-bold">{userData.startWeight} kg</div>
                  </div>
                  <div className="bg-game-bg rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Current</div>
                    <div className="text-xl font-bold text-game-gold">{userData.currentWeight} kg</div>
                  </div>
                  <div className="bg-game-bg rounded-lg p-3">
                    <div className="text-xs text-gray-400 mb-1">Target</div>
                    <div className="text-xl font-bold">{userData.targetWeight} kg</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Lost: {weightLost.toFixed(1)} kg</span>
                    <span className="text-sm text-game-gold">{percentComplete.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-game-bg rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-game-gold to-xp-green h-full transition-all duration-500"
                      style={{ width: `${Math.min(percentComplete, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">
                Click "Update" to start tracking your weight journey
              </p>
            )}
          </div>
        )}
      </div>

      {/* Next milestone */}
      {nextMilestone && (
        <div className="bg-game-panel rounded-lg p-6 border-2 border-game-accent/30">
          <h3 className="text-lg font-bold mb-2">🎯 Next Milestone</h3>
          <div className="flex items-center gap-4">
            <div className="text-4xl">🏆</div>
            <div className="flex-1">
              <div className="text-sm text-gray-400">Level {nextMilestone.level}</div>
              <div className="font-bold text-game-gold">{nextMilestone.weight} kg</div>
              <div className="text-sm">{nextMilestone.reward}</div>
            </div>
          </div>
          {userData.startWeight && (
            <div className="mt-3 text-sm text-gray-400">
              {(Math.abs(nextMilestone.weight) - Math.abs(weightLost)).toFixed(1)} kg to go!
            </div>
          )}
        </div>
      )}

      {/* Milestone roadmap */}
      <div className="bg-game-panel rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">🗺️ Milestone Roadmap</h3>
        <div className="space-y-3">
          {milestonesWithStatus.map((milestone) => (
            <div
              key={milestone.level}
              className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all ${
                milestone.unlocked
                  ? 'bg-game-gold/20 border-game-gold'
                  : milestone.current
                  ? 'bg-game-accent/20 border-game-accent'
                  : 'bg-game-bg border-game-bg'
              }`}
            >
              <div className="text-2xl">
                {milestone.unlocked ? '✅' : milestone.current ? '🎯' : '🔒'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">Level {milestone.level}</span>
                  <span className={`text-sm ${milestone.unlocked ? 'text-game-gold' : 'text-gray-400'}`}>
                    ({milestone.weight} kg)
                  </span>
                </div>
                <div className={milestone.unlocked ? 'text-white' : 'text-gray-400'}>
                  {milestone.reward}
                </div>
                {milestone.unlocked && (
                  <div className="mt-2 text-xs bg-game-gold/20 text-game-gold inline-block px-3 py-1 rounded">
                    Reward Unlocked! 🎉
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational stats */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <h3 className="text-lg font-bold mb-3">💪 Your Journey</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold">{userData.currentLevel}</div>
            <div className="text-sm opacity-90">Current Level</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{userData.totalLevels || 0}</div>
            <div className="text-sm opacity-90">Total Level Ups</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{weightLost.toFixed(1)} kg</div>
            <div className="text-sm opacity-90">Weight Lost</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{milestonesWithStatus.filter(m => m.unlocked).length}/10</div>
            <div className="text-sm opacity-90">Milestones</div>
          </div>
        </div>
      </div>
    </div>
  )
}
