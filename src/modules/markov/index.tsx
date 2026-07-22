import { useState } from 'react'
import { ModuleLayout } from '@/components/module/ModuleLayout'
import { Equation } from '@/components/math/Equation'
import { MatrixHeatmap } from '@/components/viz/MatrixHeatmap'
import { Slider } from '@/components/ui/slider'
import { useGameStore } from '@/store/gameStore'
import { buildTransitionMatrix } from './markovAI'
import { moduleRegistry } from '@/modules/registry'

const mod = moduleRegistry.find((m) => m.slug === 'markov')!

const CODE = `// First-order Markov Chain predictor
// Builds empirical transition matrix T[from][to]
// and plays counter to most likely next move

function getMarkovMove(history: Move[], order = 1): Move {
  const counts: Record<string, number[]> = {}

  for (let i = order; i < history.length; i++) {
    const key = history.slice(i - order, i).join(',')
    if (!counts[key]) counts[key] = [0, 0, 0, 0]
    counts[key][history[i]]++
  }

  const key = history.slice(-order).join(',')
  const row = counts[key]
  if (!row) return randomMove()

  const predicted = row.indexOf(Math.max(...row.slice(1)), 1) as Move
  return COUNTER[predicted]  // play the counter
}

// Markov Property: P(X_t | X_{t-1}, ..., X_1) = P(X_t | X_{t-1})
// T_hat[i][j] = count(X_{t-1}=i, X_t=j) / count(X_{t-1}=i)`

function Theory() {
  return (
    <div className="space-y-5 text-sm text-text-muted leading-relaxed">
      <p>
        A Markov Chain models the move sequence under the Markov property: the next move
        depends only on the last <Equation tex="n" /> moves.
      </p>
      <div className="border-l-2 border-pr pl-4">
        <Equation
          block
          tex="P(x_t \mid x_{t-1}, \ldots, x_1) = P(x_t \mid x_{t-1})"
        />
      </div>
      <p>
        The empirical transition matrix <Equation tex="\hat{T}" /> is built from your history:
      </p>
      <div className="border-l-2 border-pr pl-4">
        <Equation
          block
          tex="\hat{T}_{ij} = \frac{\text{count}(x_{t-1}=i,\; x_t=j)}{\text{count}(x_{t-1}=i)}"
        />
      </div>
      <p>
        The AI looks up the row for your last move, finds the column with the highest
        probability, and plays its counter. Higher-order models condition on the last{' '}
        <Equation tex="n" /> moves, trading data efficiency for more detailed patterns.
      </p>
    </div>
  )
}

function Visualization() {
  const [order, setOrder] = useState(1)
  const { userHistory } = useGameStore()
  const hist = userHistory()
  const matrix = buildTransitionMatrix(hist, order)

  const labels = ['Rock', 'Paper', 'Scissors']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-2xs text-text-dim tracking-widest uppercase">
          Empirical Transition Matrix
        </p>
        <span className="font-mono text-2xs text-text-dim">
          {hist.length} rounds observed
        </span>
      </div>

      <MatrixHeatmap
        matrix={matrix}
        rowLabels={labels.map((l) => `From ${l}`)}
        colLabels={labels}
        title="P(next move | current move)"
        colorVar="--pr"
      />

      <div className="pt-2">
        <Slider
          label="Markov Order"
          valueDisplay={`n = ${order}`}
          min={1}
          max={3}
          step={1}
          value={[order]}
          onValueChange={([v]) => setOrder(v)}
        />
        <p className="font-mono text-2xs text-text-dim mt-2">
          Order {order}: conditions on last {order} move{order > 1 ? 's' : ''}.
          {hist.length < order + 2 && ' Play more rounds to build statistics.'}
        </p>
      </div>
    </div>
  )
}

export default function MarkovModule() {
  return (
    <ModuleLayout
      module={mod}
      theory={<Theory />}
      visualization={<Visualization />}
      code={CODE}
    />
  )
}
