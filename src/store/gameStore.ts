import { create } from 'zustand'
import type { Move } from '@/lib/utils'

export interface Round {
  userMove: Move
  aiMove: Move
  result: 'win' | 'loss' | 'draw'
}

interface GameState {
  rounds: Round[]
  score: number
  activeModuleSlug: string
  patternLength: number

  addRound: (round: Round) => void
  setActiveModule: (slug: string) => void
  setPatternLength: (n: number) => void
  reset: () => void

  // derived helpers
  userHistory: () => Move[]
  aiHistory: () => Move[]
  pattern: () => Move[]
}

export const useGameStore = create<GameState>((set, get) => ({
  rounds: [],
  score: 0,
  activeModuleSlug: 'lstm',
  patternLength: 10,

  addRound: (round) =>
    set((s) => ({
      rounds: [...s.rounds, round],
      score:
        s.score +
        (round.result === 'win' ? 1 : round.result === 'loss' ? -1 : 0),
    })),

  setActiveModule: (slug) => set({ activeModuleSlug: slug }),
  setPatternLength: (n) => set({ patternLength: n }),
  reset: () => set({ rounds: [], score: 0 }),

  userHistory: () => get().rounds.map((r) => r.userMove),
  aiHistory: () => get().rounds.map((r) => r.aiMove),
  pattern: () => {
    const hist = get().rounds.map((r) => r.userMove)
    const len = get().patternLength
    if (hist.length >= len) return hist.slice(-len)
    // pad front with random moves if not enough history
    const pad: Move[] = Array.from({ length: len - hist.length }, () =>
      ((Math.floor(Math.random() * 3) + 1) as Move)
    )
    return [...pad, ...hist]
  },
}))
