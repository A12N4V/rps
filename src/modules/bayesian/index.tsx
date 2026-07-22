import { ModuleLayout } from '@/components/module/ModuleLayout'
import { Equation } from '@/components/math/Equation'
import { useGameStore } from '@/store/gameStore'
import { getPosterior } from './bayesianAI'
import { moduleRegistry } from '@/modules/registry'

const mod = moduleRegistry.find((m) => m.slug === 'bayesian')!

const CODE = `// Dirichlet-Multinomial Bayesian inference
// Prior: Dir(1, 1, 1)  — uniform belief
// Posterior: Dir(alpha + n)  — updated by observed counts
// Decision: counter to MAP estimate

function getBayesianMove(history: Move[]): Move {
  const alpha = [0, 1, 1, 1]         // Dirichlet prior α_i = 1
  history.forEach(m => alpha[m]++)   // posterior update

  const total = alpha[1] + alpha[2] + alpha[3]
  const probs = alpha.map(a => a / total)  // posterior mean

  const predicted = probs.indexOf(   // MAP estimate
    Math.max(...probs.slice(1)), 1
  ) as Move

  return COUNTER[predicted]
}

// Conjugacy: Dir(α) + Categorical observations -> Dir(α + n)
// Posterior predictive: p̂_i = (α_i + n_i) / (Σα_j + T)`

const LABELS = ['Rock', 'Paper', 'Scissors']
const COLORS = ['var(--dl)', 'var(--gt)', 'var(--rl)']

function Visualization() {
  const { userHistory } = useGameStore()
  const hist = userHistory()
  const posterior = getPosterior(hist)
  const maxP = Math.max(...posterior)
  const predictedIdx = posterior.indexOf(maxP)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-2xs text-text-dim tracking-widest uppercase">
          Dirichlet Posterior Belief
        </p>
        <span className="font-mono text-2xs text-text-dim">
          {hist.length} observations
        </span>
      </div>

      {/* posterior bars */}
      <div className="space-y-3">
        {posterior.map((p, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-text">{LABELS[i]}</span>
                {i === predictedIdx && (
                  <span className="font-mono text-2xs text-amber">MAP estimate</span>
                )}
              </div>
              <span className="font-mono text-xs tabular-nums text-text-muted">
                {(p * 100).toFixed(1)}%
              </span>
            </div>
            <div className="h-5 bg-surface border border-border overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${p * 100}%`,
                  background: COLORS[i],
                  opacity: i === predictedIdx ? 1 : 0.35,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* alpha counts */}
      <div className="border border-border bg-surface p-3 font-mono text-xs space-y-1">
        <div className="text-text-dim mb-2">Posterior parameters Dir(α)</div>
        {LABELS.map((l, i) => {
          const n = hist.filter((m) => m === i + 1).length
          return (
            <div key={l} className="flex justify-between text-text-muted">
              <span>α_{l[0]} = 1 + {n} =</span>
              <span style={{ color: COLORS[i] }}>{1 + n}</span>
            </div>
          )
        })}
        <div className="pt-1 border-t border-border text-text-dim">
          Total: {hist.length + 3}
        </div>
      </div>

      <div className="border border-border bg-surface p-3 font-mono text-xs">
        <div className="text-text-dim mb-1">Decision</div>
        {hist.length > 0 ? (
          <>
            <div className="text-text">
              Predicted: <span style={{ color: COLORS[predictedIdx] }}>{LABELS[predictedIdx]}</span>
              {' '}({(maxP * 100).toFixed(1)}%)
            </div>
            <div className="text-text-muted">
              AI plays: {LABELS[([1, 2, 0] as const)[predictedIdx]]}
            </div>
          </>
        ) : (
          <div className="text-text-dim">Uniform prior — play some rounds</div>
        )}
      </div>
    </div>
  )
}

function Theory() {
  return (
    <div className="space-y-5 text-sm text-text-muted leading-relaxed">
      <p>
        The Dirichlet-Multinomial is the conjugate Bayesian model for categorical data.
        Prior belief over the opponent's move distribution:
      </p>
      <div className="border-l-2 border-pr pl-4">
        <Equation block tex="\theta \sim \text{Dir}(\alpha_R, \alpha_P, \alpha_S)" />
      </div>
      <p>
        After observing <Equation tex="n_R, n_P, n_S" /> moves, the posterior is:
      </p>
      <div className="border-l-2 border-pr pl-4">
        <Equation block tex="\theta \mid x_{1:T} \sim \text{Dir}(\alpha_R + n_R,\; \alpha_P + n_P,\; \alpha_S + n_S)" />
      </div>
      <p>
        The posterior predictive probability is simply:
      </p>
      <div className="border-l-2 border-pr pl-4">
        <Equation block tex="\hat{p}_i = \frac{\alpha_i + n_i}{\sum_j \alpha_j + T}" />
      </div>
      <p>
        With uniform prior <Equation tex="\alpha = (1,1,1)" />, this is Laplace smoothing —
        identical to frequency analysis after many rounds but regularized against overfitting
        early when data is scarce.
      </p>
    </div>
  )
}

export default function BayesianModule() {
  return (
    <ModuleLayout
      module={mod}
      theory={<Theory />}
      visualization={<Visualization />}
      code={CODE}
    />
  )
}
