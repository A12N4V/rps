import type { Move } from '@/lib/utils'
import { COUNTER, randomMove } from '@/lib/utils'

// Dirichlet-Multinomial with uniform prior (alpha = 1, 1, 1)
export function getBayesianMove(history: Move[]): Move {
  const alpha = [0, 1, 1, 1] // prior counts (index 1-3)
  history.forEach((m) => alpha[m]++)

  const total = alpha[1] + alpha[2] + alpha[3]
  const probs = [0, alpha[1] / total, alpha[2] / total, alpha[3] / total]

  let best: Move = 1
  for (let m = 2; m <= 3; m++) {
    if (probs[m] > probs[best]) best = m as Move
  }
  return COUNTER[best]
}

export function getPosterior(history: Move[]): [number, number, number] {
  const alpha = [1, 1, 1, 1] // index 0 unused
  history.forEach((m) => alpha[m]++)
  const total = alpha[1] + alpha[2] + alpha[3]
  return [alpha[1] / total, alpha[2] / total, alpha[3] / total]
}
