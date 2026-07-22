import type { Move } from '@/lib/utils'
import { COUNTER, randomMove } from '@/lib/utils'

export function getMarkovMove(history: Move[], order = 1): Move {
  if (history.length < order + 1) return randomMove()

  const counts: Record<string, number[]> = {}
  for (let i = order; i < history.length; i++) {
    const key = history.slice(i - order, i).join(',')
    if (!counts[key]) counts[key] = [0, 0, 0, 0]
    counts[key][history[i]]++
  }

  const key = history.slice(-order).join(',')
  const row = counts[key]
  if (!row || row.slice(1).every((v) => v === 0)) return randomMove()

  // pick most likely next move
  let best: Move = 1
  let bestCount = -1
  for (let m = 1; m <= 3; m++) {
    if (row[m] > bestCount) {
      bestCount = row[m]
      best = m as Move
    }
  }
  return COUNTER[best]
}

export function buildTransitionMatrix(history: Move[], order = 1): number[][] {
  const raw = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]

  if (history.length < order + 1 || order !== 1) return raw.map((r) => r.map(() => 0))

  for (let i = 1; i < history.length; i++) {
    const from = history[i - 1] - 1  // 0-indexed
    const to = history[i] - 1
    raw[from][to]++
  }

  // normalize rows to probabilities
  return raw.map((row) => {
    const total = row.reduce((a, b) => a + b, 0)
    return total === 0 ? [0, 0, 0] : row.map((v) => v / total)
  })
}
