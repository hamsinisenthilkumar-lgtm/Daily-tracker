import { useEffect, useState } from 'react'

export default function LevelUpModal({ level, onClose }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setShow(true), 100)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-gradient-to-br from-game-panel to-game-accent/30 rounded-2xl p-8 max-w-md w-full border-4 border-game-gold shadow-2xl transform transition-all duration-500 ${
          show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Celebration content */}
        <div className="text-center">
          <div className="text-8xl mb-4">🎉</div>
          <h2 className="text-4xl font-bold text-game-gold mb-2">LEVEL UP!</h2>
          <div className="text-6xl font-black text-white mb-4">
            Level {level}
          </div>
          <p className="text-xl text-gray-300 mb-6">
            You&apos;ve reached a new milestone!
          </p>
          <p className="text-lg text-game-gold mb-8">
            🏆 Check your rewards! 🏆
          </p>
          <button
            onClick={onClose}
            className="bg-game-gold text-game-bg px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors"
          >
            Continue Quest
          </button>
        </div>
      </div>
    </div>
  )
}
