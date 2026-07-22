import { useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import { MoveSelector, MoveDisplay } from './MoveSelector'
import { RoundHistory } from './RoundHistory'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { moduleRegistry } from '@/modules/registry'
import type { Move } from '@/lib/utils'
import { beats, randomMove } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function GameBoard() {
  const { rounds, score, addRound, setActiveModule, activeModuleSlug, userHistory, pattern } =
    useGameStore()
  const [selected, setSelected] = useState<Move>(1)
  const [lastAI, setLastAI] = useState<Move | null>(null)
  const [lastUser, setLastUser] = useState<Move | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [lastResult, setLastResult] = useState<'win' | 'loss' | 'draw' | null>(null)

  const liveModules = moduleRegistry
    .filter((m) => m.live)
    .map((m) => ({ value: m.slug, label: m.name }))

  const activeModule = moduleRegistry.find((m) => m.slug === activeModuleSlug)

  async function play() {
    if (isPlaying) return
    setIsPlaying(true)

    const hist = userHistory()
    const pat = pattern()
    let aiMove: Move = 1

    try {
      aiMove = activeModule?.getMove(hist, pat) ?? randomMove()
    } catch {
      aiMove = randomMove()
    }

    const userMove = selected
    const result = userMove === aiMove ? 'draw' : beats(userMove, aiMove) ? 'win' : 'loss'

    setLastUser(userMove)
    setLastAI(aiMove)
    setLastResult(result)
    addRound({ userMove, aiMove, result })
    setIsPlaying(false)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* score + strategy selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-2xs text-text-dim tracking-widest uppercase">Strategy</span>
          <Select
            value={activeModuleSlug}
            onValueChange={setActiveModule}
            options={liveModules}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-2xs text-text-dim tracking-widest uppercase">Score</span>
          <span
            className={cn(
              'font-mono text-2xl font-bold tabular-nums transition-colors',
              score > 0 && 'text-rl',
              score < 0 && 'text-st',
              score === 0 && 'text-text-muted'
            )}
          >
            {score > 0 ? `+${score}` : score}
          </span>
        </div>
      </div>

      {/* move displays */}
      <div className="flex items-center justify-between gap-4">
        <MoveDisplay move={lastUser} label="You" />

        <div className="flex flex-col items-center gap-1">
          {lastResult && (
            <span
              className={cn(
                'font-mono text-xs tracking-widest uppercase font-bold',
                lastResult === 'win'  && 'text-rl',
                lastResult === 'loss' && 'text-st',
                lastResult === 'draw' && 'text-text-dim'
              )}
            >
              {lastResult}
            </span>
          )}
          <span className="text-text-dim font-mono text-lg">vs</span>
          <span className="font-mono text-2xs text-text-dim">
            {rounds.length} rounds
          </span>
        </div>

        <MoveDisplay move={lastAI} label="AI" />
      </div>

      {/* move selector */}
      <div>
        <p className="font-mono text-2xs text-text-dim tracking-widest uppercase mb-2">
          Your Move
        </p>
        <MoveSelector value={selected} onChange={setSelected} disabled={isPlaying} />
      </div>

      {/* play button */}
      <Button size="lg" onClick={play} disabled={isPlaying}>
        {isPlaying ? 'Thinking...' : 'Play'}
      </Button>

      {/* history */}
      <div>
        <p className="font-mono text-2xs text-text-dim tracking-widest uppercase mb-2">
          Recent Rounds
        </p>
        <RoundHistory rounds={rounds} />
      </div>
    </div>
  )
}
