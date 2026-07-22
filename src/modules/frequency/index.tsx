import { ModuleLayout } from '@/components/module/ModuleLayout'
import { Equation } from '@/components/math/Equation'
import { useGameStore } from '@/store/gameStore'
import { getFrequencies } from './frequencyAI'
import { moduleRegistry } from '@/modules/registry'
import { cn } from '@/lib/utils'

const mod = moduleRegistry.find((m) => m.slug === 'frequency')!

const CODE = `// Frequency Analysis — maximum-likelihood baseline
// Counts empirical move frequencies, plays counter to mode

function getFrequencyMove(history: Move[]): Move {
  if (!history.length) return randomMove()

  const counts = [0, 0, 0, 0]        // index 1,2,3 used
  history.forEach(m => counts[m]++)

  const predicted = counts.indexOf(  // most frequent move
    Math.max(...counts.slice(1)), 1
  ) as Move

  return COUNTER[predicted]           // play its counter
}

// Estimator: p̂_i = n_i / T
// Counter: argmax_i p̂_i -> play the move that beats it`

const LABELS = ['Rock', 'Paper', 'Scissors']
const COLORS = ['var(--dl)', 'var(--gt)', 'var(--rl)']

function Visualization() {
  const { userHistory } = useGameStore()
  const hist = userHistory()
  const freqs = getFrequencies(hist)
  const maxFreq = Math.max(...freqs, 0.001)
  const predicted = freqs.indexOf(maxFreq)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-2xs text-text-dim tracking-widest uppercase">
          Move Frequencies
        </p>
        <span className="font-mono text-2xs text-text-dim">
          {hist.length} rounds
        </span>
      </div>

      <div className="space-y-3">
        {freqs.map((f, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-text">{LABELS[i]}</span>
                {i === predicted && hist.length > 0 && (
                  <span className="font-mono text-2xs text-amber">predicted</span>
                )}
              </div>
              <span className="font-mono text-xs tabular-nums text-text-muted">
                {(f * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-5 bg-surface border border-border overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${f * 100}%`,
                  background: COLORS[i],
                  opacity: i === predicted ? 1 : 0.4,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {hist.length > 0 && (
        <div className="border border-border bg-surface p-3 font-mono text-xs space-y-1">
          <div className="text-text-dim">Prediction</div>
          <div className="text-text">
            Most frequent: <span style={{ color: COLORS[predicted] }}>{LABELS[predicted]}</span>
          </div>
          <div className="text-text-muted">
            AI plays: {LABELS[([1, 2, 0] as const)[predicted]]}
          </div>
        </div>
      )}

      {hist.length === 0 && (
        <p className="font-mono text-2xs text-text-dim text-center py-8">
          Play some rounds to see frequency data
        </p>
      )}
    </div>
  )
}

function Theory() {
  return (
    <div className="space-y-5 text-sm text-text-muted leading-relaxed">
      <p>
        The frequency estimator builds the empirical marginal distribution over your moves:
      </p>
      <div className="border-l-2 border-st pl-4">
        <Equation block tex="\hat{p}_i = \frac{n_i}{T}, \quad i \in \{\text{R, P, S}\}" />
      </div>
      <p>
        The AI plays the counter to <Equation tex="\arg\max_i \hat{p}_i" />. By the Law
        of Large Numbers, <Equation tex="\hat{p}_i \to p_i" /> as <Equation tex="T \to \infty" />,
        so this converges to the optimal counter-strategy against a stationary opponent.
      </p>
      <p>
        This is the weakest of the exploitative strategies — it ignores sequential structure
        entirely. A first-order Markov model strictly dominates it whenever{' '}
        <Equation tex="I(X_t; X_{t+1}) > 0" /> (mutual information between consecutive moves is positive).
      </p>
    </div>
  )
}

export default function FrequencyModule() {
  return (
    <ModuleLayout
      module={mod}
      theory={<Theory />}
      visualization={<Visualization />}
      code={CODE}
    />
  )
}
