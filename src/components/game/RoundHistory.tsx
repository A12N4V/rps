import type { Round } from '@/store/gameStore'
import { cn } from '@/lib/utils'

const MOVE_ABBR = { 1: 'R', 2: 'P', 3: 'S' } as const

interface RoundHistoryProps {
  rounds: Round[]
  maxVisible?: number
}

export function RoundHistory({ rounds, maxVisible = 8 }: RoundHistoryProps) {
  const visible = rounds.slice(-maxVisible).reverse()

  if (!visible.length) {
    return (
      <p className="font-mono text-2xs text-text-dim text-center py-4">
        No rounds played yet
      </p>
    )
  }

  return (
    <div className="space-y-px">
      {visible.map((r, i) => (
        <div
          key={i}
          className={cn(
            'flex items-center justify-between px-3 py-1.5 font-mono text-xs border-l-2',
            r.result === 'win'  && 'border-rl text-text-muted',
            r.result === 'loss' && 'border-st text-text-muted',
            r.result === 'draw' && 'border-border text-text-dim'
          )}
        >
          <span className="text-2xs tracking-widest uppercase text-text-dim w-6">
            {visible.length - i}
          </span>
          <span className="text-text">{MOVE_ABBR[r.userMove]}</span>
          <span className="text-text-dim">vs</span>
          <span className="text-text">{MOVE_ABBR[r.aiMove]}</span>
          <span
            className={cn(
              'text-2xs tracking-widest uppercase w-8 text-right',
              r.result === 'win'  && 'text-rl',
              r.result === 'loss' && 'text-st',
              r.result === 'draw' && 'text-text-dim'
            )}
          >
            {r.result}
          </span>
        </div>
      ))}
    </div>
  )
}
