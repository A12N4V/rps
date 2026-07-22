import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MOVES = { 1: 'Rock', 2: 'Paper', 3: 'Scissors' } as const
export type Move = 1 | 2 | 3

export const COUNTER: Record<Move, Move> = { 1: 2, 2: 3, 3: 1 }

export function beats(a: Move, b: Move): boolean {
  return COUNTER[b] === a
}

export function randomMove(): Move {
  return (Math.floor(Math.random() * 3) + 1) as Move
}

export const CAT_COLORS: Record<string, string> = {
  dl: 'var(--dl)',
  gt: 'var(--gt)',
  rl: 'var(--rl)',
  pr: 'var(--pr)',
  st: 'var(--st)',
  ps: 'var(--ps)',
}

export const CAT_LABELS: Record<string, string> = {
  dl: 'Deep Learning',
  gt: 'Game Theory',
  rl: 'Reinforcement L.',
  pr: 'Probabilistic',
  st: 'Statistics',
  ps: 'Psychology',
}
