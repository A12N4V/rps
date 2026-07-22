import type { Move } from '@/lib/utils'
import { COUNTER, randomMove } from '@/lib/utils'

export function getFrequencyMove(history: Move[]): Move {
  if (history.length === 0) return randomMove()
  const counts = [0, 0, 0, 0]
  history.forEach((m) => counts[m]++)
  let best: Move = 1
  for (let m = 2; m <= 3; m++) {
    if (counts[m] > counts[best]) best = m as Move
  }
  return COUNTER[best]
}

export function getFrequencies(history: Move[]): [number, number, number] {
  const n = history.length || 1
  const counts = [0, 0, 0, 0]
  history.forEach((m) => counts[m]++)
  return [counts[1] / n, counts[2] / n, counts[3] / n]
}
