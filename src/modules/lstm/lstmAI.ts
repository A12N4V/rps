import type { Move } from '@/lib/utils'
import { COUNTER, randomMove } from '@/lib/utils'

export function getLSTMMove(pattern: Move[]): Move {
  if (!window.brain?.recurrent?.LSTMTimeStep) {
    console.warn('Brain.js not loaded, falling back to random')
    return randomMove()
  }
  if (pattern.length < 2) return randomMove()

  try {
    const net = new window.brain.recurrent.LSTMTimeStep()
    net.train([pattern as number[]], { iterations: 200, log: false, errorThresh: 0.05 })
    const raw = net.run(pattern as number[])
    const rounded = Math.max(1, Math.min(3, Math.round(raw))) as Move
    return COUNTER[rounded]
  } catch {
    return randomMove()
  }
}
