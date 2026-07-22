import { useState } from 'react'
import { ModuleLayout } from '@/components/module/ModuleLayout'
import { Equation } from '@/components/math/Equation'
import { Slider } from '@/components/ui/slider'
import { computeExpectedValue } from './nashAI'
import { moduleRegistry } from '@/modules/registry'
import { cn } from '@/lib/utils'

const mod = moduleRegistry.find((m) => m.slug === 'nash')!

const CODE = `// Nash Equilibrium strategy: pure random
// The UNIQUE Nash Equilibrium of RPS is uniform mixing.
// Any deterministic deviation is exploitable.

function getNashMove(): Move {
  return Math.ceil(Math.random() * 3) as Move
}

// Proof: if p_R > 1/3, opponent plays Paper -> EV < 0
// Only σ* = (1/3, 1/3, 1/3) leaves opponent indifferent:
// EV(Rock)     = (1/3)(0) + (1/3)(-1) + (1/3)(+1) = 0
// EV(Paper)    = (1/3)(+1) + (1/3)(0) + (1/3)(-1) = 0
// EV(Scissors) = (1/3)(-1) + (1/3)(+1) + (1/3)(0) = 0`

const MOVES = ['Rock', 'Paper', 'Scissors']

function Visualization() {
  const [dist, setDist] = useState<[number, number, number]>([1 / 3, 1 / 3, 1 / 3])

  function updateDist(idx: number, val: number) {
    const next = [...dist] as [number, number, number]
    next[idx] = val
    // keep sum = 1 by adjusting the remaining two proportionally
    const rem = 1 - val
    const others = [0, 1, 2].filter((i) => i !== idx)
    const sumOthers = next[others[0]] + next[others[1]]
    if (sumOthers > 0) {
      next[others[0]] = (next[others[0]] / sumOthers) * rem
      next[others[1]] = (next[others[1]] / sumOthers) * rem
    } else {
      next[others[0]] = rem / 2
      next[others[1]] = rem / 2
    }
    setDist(next)
  }

  const ev = computeExpectedValue(dist)
  const isNash = dist.every((p) => Math.abs(p - 1 / 3) < 0.02)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-2xs text-text-dim tracking-widest uppercase">
          Opponent Mixed Strategy
        </p>
        <span
          className={cn(
            'font-mono text-2xs tracking-widest uppercase',
            isNash ? 'text-rl' : 'text-amber'
          )}
        >
          {isNash ? 'Nash Equilibrium' : 'Exploitable'}
        </span>
      </div>

      {/* sliders */}
      <div className="space-y-4">
        {MOVES.map((move, i) => (
          <Slider
            key={move}
            label={move}
            valueDisplay={`${(dist[i] * 100).toFixed(0)}%`}
            min={0}
            max={1}
            step={0.01}
            value={[dist[i]]}
            onValueChange={([v]) => updateDist(i, v)}
          />
        ))}
      </div>

      {/* payoff matrix */}
      <div className="space-y-3">
        <p className="font-mono text-2xs text-text-dim tracking-widest uppercase">
          Payoff Matrix A (your perspective)
        </p>
        <div className="grid gap-px bg-border border border-border"
          style={{ gridTemplateColumns: 'auto 1fr 1fr 1fr' }}>
          <div className="bg-surface p-2 font-mono text-2xs text-text-dim" />
          {MOVES.map((m) => (
            <div key={m} className="bg-surface p-2 font-mono text-2xs text-text-dim text-center">
              Opp: {m[0]}
            </div>
          ))}
          {MOVES.map((myMove, ri) => (
            <>
              <div key={`r${ri}`} className="bg-surface p-2 font-mono text-2xs text-text-dim flex items-center">
                My: {myMove[0]}
              </div>
              {[0, -1, 1].map((_, ci) => {
                const payoffs = [[0,-1,1],[1,0,-1],[-1,1,0]]
                const v = payoffs[ri][ci]
                return (
                  <div
                    key={`${ri}-${ci}`}
                    className="bg-surface p-3 text-center font-mono text-sm font-bold"
                    style={{ color: v > 0 ? 'var(--rl)' : v < 0 ? 'var(--st)' : 'var(--text-3)' }}
                  >
                    {v > 0 ? `+${v}` : v}
                  </div>
                )
              })}
            </>
          ))}
        </div>
      </div>

      {/* expected values */}
      <div className="border border-border bg-surface p-4 space-y-2">
        <p className="font-mono text-2xs text-text-dim tracking-widest uppercase mb-3">
          Expected Value Given Opponent Distribution
        </p>
        {MOVES.map((move, i) => (
          <div key={move} className="flex items-center justify-between">
            <span className="font-mono text-xs text-text-muted">EV(Play {move})</span>
            <span
              className={cn(
                'font-mono text-xs tabular-nums font-bold',
                ev[i] > 0.01 ? 'text-rl' : ev[i] < -0.01 ? 'text-st' : 'text-text-dim'
              )}
            >
              {ev[i] > 0 ? '+' : ''}{ev[i].toFixed(3)}
            </span>
          </div>
        ))}
        <div className="border-t border-border pt-2 font-mono text-2xs text-text-dim">
          {isNash
            ? 'All EVs = 0. No move is profitable to deviate to.'
            : `Best play: ${MOVES[ev.indexOf(Math.max(...ev))]} (EV ${Math.max(...ev).toFixed(3)})`}
        </div>
      </div>
    </div>
  )
}

function Theory() {
  return (
    <div className="space-y-5 text-sm text-text-muted leading-relaxed">
      <p>
        A Nash Equilibrium is a strategy profile where no player can improve their expected
        payoff by unilateral deviation. For RPS, the unique Nash Equilibrium is:
      </p>
      <div className="border-l-2 border-gt pl-4">
        <Equation block tex="\sigma^* = \tau^* = \left(\tfrac{1}{3},\, \tfrac{1}{3},\, \tfrac{1}{3}\right)" />
      </div>
      <p>
        At equilibrium, every move has expected value zero against the Nash opponent:
      </p>
      <div className="border-l-2 border-gt pl-4 space-y-1">
        <Equation block tex="\mathbb{E}[\text{Rock}] = \tfrac{1}{3}(0) + \tfrac{1}{3}(-1) + \tfrac{1}{3}(+1) = 0" />
        <Equation block tex="\mathbb{E}[\text{Paper}] = \tfrac{1}{3}(+1) + \tfrac{1}{3}(0) + \tfrac{1}{3}(-1) = 0" />
      </div>
      <p>
        Use the sliders above to deviate from 1/3 each and observe how expected values
        become positive for your optimal counter — you have become exploitable.
      </p>
    </div>
  )
}

export default function NashModule() {
  return (
    <ModuleLayout
      module={mod}
      theory={<Theory />}
      visualization={<Visualization />}
      code={CODE}
    />
  )
}
