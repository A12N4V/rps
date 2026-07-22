import { ModuleLayout } from '@/components/module/ModuleLayout'
import { Equation } from '@/components/math/Equation'
import { LSTMNetworkGraph } from '@/components/viz/NetworkGraph'
import { useGameStore } from '@/store/gameStore'
import { moduleRegistry } from '@/modules/registry'

const mod = moduleRegistry.find((m) => m.slug === 'lstm')!

const CODE = `// LSTM Time-Step prediction (Brain.js)
// Input: last 10 user moves encoded as [1,2,3]
// Output: counter-move to predicted next move

function getLSTMMove(pattern: number[]): Move {
  const net = new brain.recurrent.LSTMTimeStep()

  // Train on the move sequence
  net.train([pattern], { iterations: 200, log: false })

  // Predict next move
  const raw = net.run(pattern)                    // float in [1,3]
  const predicted = Math.max(1, Math.min(3, Math.round(raw)))

  // Play the counter-move
  const counter = { 1: 2, 2: 3, 3: 1 }
  return counter[predicted]
}

// Gate equations (computed internally by Brain.js):
// f_t = σ(W_f · [h_{t-1}, x_t] + b_f)   Forget gate
// i_t = σ(W_i · [h_{t-1}, x_t] + b_i)   Input gate
// C̃_t = tanh(W_C · [h_{t-1}, x_t] + b_C) Candidate
// C_t = f_t ⊙ C_{t-1} + i_t ⊙ C̃_t      Cell state
// o_t = σ(W_o · [h_{t-1}, x_t] + b_o)   Output gate
// h_t = o_t ⊙ tanh(C_t)                  Hidden state`

function Theory() {
  return (
    <div className="space-y-5 text-sm text-text-muted leading-relaxed">
      <p>
        An LSTM processes your move history as a sequence, maintaining a cell state{' '}
        <Equation tex="C_t" /> that acts as long-term memory across timesteps. Three
        gates control information flow:
      </p>
      <div className="border-l-2 border-accent pl-4 space-y-2">
        <Equation block tex="f_t = \sigma(W_f \cdot [h_{t-1}, x_t] + b_f) \quad \text{(Forget Gate)}" />
        <Equation block tex="i_t = \sigma(W_i \cdot [h_{t-1}, x_t] + b_i) \quad \text{(Input Gate)}" />
        <Equation block tex="\tilde{C}_t = \tanh(W_C \cdot [h_{t-1}, x_t] + b_C) \quad \text{(Candidate)}" />
        <Equation block tex="C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t \quad \text{(Cell Update)}" />
        <Equation block tex="o_t = \sigma(W_o \cdot [h_{t-1}, x_t] + b_o) \quad \text{(Output Gate)}" />
        <Equation block tex="h_t = o_t \odot \tanh(C_t) \quad \text{(Hidden State)}" />
      </div>
      <p>
        The network is retrained on your last 10 moves before each round. If you play{' '}
        <Equation tex="R \to P \to S \to R \to \ldots" /> cyclically, the LSTM's cell
        state encodes this period and the forget gate retains it across timesteps.
      </p>
      <p>
        The AI then plays the counter to the predicted <Equation tex="\hat{y}_t" />:{' '}
        <Equation tex="\text{Rock} \to \text{Paper},\; \text{Paper} \to \text{Scissors},\; \text{Scissors} \to \text{Rock}" />.
      </p>
    </div>
  )
}

function Visualization() {
  const { pattern } = useGameStore()
  const pat = pattern()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-2xs text-text-dim tracking-widest uppercase">
          LSTM Architecture
        </p>
        <span className="font-mono text-2xs text-text-dim">
          Pattern length: {pat.length}
        </span>
      </div>
      <LSTMNetworkGraph pattern={pat} height={360} />
    </div>
  )
}

export default function LSTMModule() {
  return (
    <ModuleLayout
      module={mod}
      theory={<Theory />}
      visualization={<Visualization />}
      code={CODE}
    />
  )
}
