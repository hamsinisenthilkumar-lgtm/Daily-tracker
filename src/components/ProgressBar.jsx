export default function ProgressBar({ current, max }) {
  const percentage = (current / max) * 100

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1 text-xs text-gray-400">
        <span>XP</span>
        <span>{current} / {max}</span>
      </div>
      <div className="w-full bg-game-bg rounded-full h-4 overflow-hidden border border-game-accent/30">
        <div
          className="bg-gradient-to-r from-game-accent via-purple-500 to-xp-green h-full transition-all duration-500 flex items-center justify-end px-2"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 15 && (
            <span className="text-white text-xs font-bold drop-shadow">
              {Math.floor(percentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
