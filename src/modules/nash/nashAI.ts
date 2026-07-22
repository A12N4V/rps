import type { Move } from '@/lib/utils'
import { randomMove } from '@/lib/utils'

// Nash Equilibrium strategy: play uniformly at random.
// This is the unique Nash Equilibrium of RPS — unexploitable
// but also unable to exploit any human bias.
export function getNashMove(): Move {
  return randomMove()
}

export function computeExpectedValue(oppDist: [number, number, number]): number[] {
  // payoff matrix A[my_move][opp_move]: +1 win, -1 loss, 0 draw
  const A = [
    [0, -1, 1],
    [1, 0, -1],
    [-1, 1, 0],
  ]
  return A.map((row) =>
    row.reduce((sum, val, j) => sum + val * oppDist[j], 0)
  )
}
