import { cn } from '@/lib/utils'
import type { Move } from '@/lib/utils'

const MOVE_LABELS: Record<Move, string> = { 1: 'Rock', 2: 'Paper', 3: 'Scissors' }
const MOVE_IMGS: Record<Move, string> = {
  1: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Rock-paper-scissors_%28rock%29.png',
  2: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Rock-paper-scissors_%28paper%29.png',
  3: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Rock-paper-scissors_%28scissors%29.png',
}

interface MoveSelectorProps {
  value: Move
  onChange: (m: Move) => void
  disabled?: boolean
}

export function MoveSelector({ value, onChange, disabled }: MoveSelectorProps) {
  const moves: Move[] = [1, 2, 3]
  return (
    <div className="flex gap-2">
      {moves.map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          disabled={disabled}
          className={cn(
            'flex flex-col items-center gap-1.5 px-3 py-3 border transition-all',
            'font-mono text-2xs tracking-widest uppercase',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            value === m
              ? 'border-accent text-accent bg-[var(--indigo-dim)]'
              : 'border-border text-text-dim hover:border-b2 hover:text-text-muted'
          )}
        >
          <img
            src={MOVE_IMGS[m]}
            alt={MOVE_LABELS[m]}
            className="w-10 h-10 object-contain"
            style={{ filter: value === m ? 'none' : 'grayscale(60%) opacity(0.7)' }}
          />
          {MOVE_LABELS[m]}
        </button>
      ))}
    </div>
  )
}

interface MoveDisplayProps {
  move: Move | null
  label: string
}

export function MoveDisplay({ move, label }: MoveDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="border border-border w-20 h-20 flex items-center justify-center bg-surface">
        {move ? (
          <img
            src={MOVE_IMGS[move]}
            alt={MOVE_LABELS[move]}
            className="w-14 h-14 object-contain"
          />
        ) : (
          <span className="text-text-dim font-mono text-lg">?</span>
        )}
      </div>
      <span className="font-mono text-2xs text-text-dim tracking-widest uppercase">{label}</span>
      {move && (
        <span className="font-mono text-xs text-text">{MOVE_LABELS[move]}</span>
      )}
    </div>
  )
}
