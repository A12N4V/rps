import type { Move } from '@/lib/utils'
import { randomMove } from '@/lib/utils'
import { getLSTMMove } from './lstm/lstmAI'
import { getMarkovMove } from './markov/markovAI'
import { getFrequencyMove } from './frequency/frequencyAI'
import { getNashMove } from './nash/nashAI'
import { getBayesianMove } from './bayesian/bayesianAI'

export interface ModuleDef {
  slug: string
  name: string
  category: 'dl' | 'gt' | 'rl' | 'pr' | 'st' | 'ps'
  description: string
  vizType: string
  live: boolean
  getMove: (history: Move[], pattern: Move[]) => Move
}

export const moduleRegistry: ModuleDef[] = [
  // ── Deep Learning ─────────────────────────────────────────────
  {
    slug: 'lstm',
    name: 'LSTM',
    category: 'dl',
    description: 'Long Short-Term Memory network trained on your move history. Learns long-range sequential dependencies through gated cell state.',
    vizType: 'Network Graph',
    live: true,
    getMove: (_, pat) => getLSTMMove(pat),
  },
  {
    slug: 'gru',
    name: 'GRU',
    category: 'dl',
    description: 'Gated Recurrent Unit — a streamlined alternative to LSTM using two gates instead of three. Trains faster on short sequences.',
    vizType: 'Network Graph',
    live: false,
    getMove: randomMove,
  },
  {
    slug: 'transformer',
    name: 'Transformer Attention',
    category: 'dl',
    description: 'Scaled dot-product attention over the move history. Each position attends to all others to build a context vector for prediction.',
    vizType: 'Attention Grid',
    live: false,
    getMove: randomMove,
  },

  // ── Game Theory ────────────────────────────────────────────────
  {
    slug: 'nash',
    name: 'Nash Equilibrium',
    category: 'gt',
    description: 'The unique Nash Equilibrium of RPS: play each move with probability 1/3. Unexploitable but also unable to exploit human bias.',
    vizType: 'Payoff Matrix',
    live: true,
    getMove: getNashMove,
  },
  {
    slug: 'minimax',
    name: 'Minimax',
    category: 'gt',
    description: 'Adversarial tree search assuming the opponent minimizes your payoff. Reduces to Nash for single-step RPS but generalizes to lookahead.',
    vizType: 'Game Tree',
    live: false,
    getMove: randomMove,
  },
  {
    slug: 'von-neumann',
    name: 'Von Neumann Theorem',
    category: 'gt',
    description: 'Interactive demonstration of the 1928 minimax theorem: max_x min_y x^T A y = min_y max_x x^T A y = v.',
    vizType: 'Simplex',
    live: false,
    getMove: randomMove,
  },
  {
    slug: 'folk-theorem',
    name: 'Folk Theorem',
    category: 'gt',
    description: 'In repeated games with high discount factor, any Pareto-dominant payoff can be sustained. Shows how patterns become signaling channels.',
    vizType: 'Feasibility Region',
    live: false,
    getMove: randomMove,
  },

  // ── Reinforcement Learning ─────────────────────────────────────
  {
    slug: 'qlearning',
    name: 'Q-Learning',
    category: 'rl',
    description: 'Model-free RL learning Q(s,a) via Bellman updates. State is the last 3 moves (27 states), visualized as an animated Q-table heatmap.',
    vizType: 'Q-Table Heatmap',
    live: false,
    getMove: randomMove,
  },
  {
    slug: 'policy-gradient',
    name: 'Policy Gradient',
    category: 'rl',
    description: 'REINFORCE algorithm directly optimizing policy π_θ(a|s). Gradient shifts probability mass toward winning moves after each round.',
    vizType: 'Policy Bars',
    live: false,
    getMove: randomMove,
  },
  {
    slug: 'bandits',
    name: 'Multi-Armed Bandits',
    category: 'rl',
    description: 'UCB1 bandit treating each move as an arm. Balances exploration vs exploitation via confidence bounds on empirical win rates.',
    vizType: 'Arm Distributions',
    live: false,
    getMove: randomMove,
  },
  {
    slug: 'thompson',
    name: 'Thompson Sampling',
    category: 'rl',
    description: 'Bayesian bandit maintaining Beta(α,β) posteriors per move. Samples from each and plays the move with the highest draw.',
    vizType: 'Beta Distributions',
    live: false,
    getMove: randomMove,
  },

  // ── Probabilistic ──────────────────────────────────────────────
  {
    slug: 'markov',
    name: 'Markov Chain',
    category: 'pr',
    description: 'Empirical transition matrix P(next|last n moves). Exploits sequential dependencies missed by pure frequency counting.',
    vizType: 'Transition Heatmap',
    live: true,
    getMove: (hist) => getMarkovMove(hist, 1),
  },
  {
    slug: 'hmm',
    name: 'Hidden Markov Model',
    category: 'pr',
    description: 'Models unobservable player strategy modes (Cycling, Aggressive, Random) that emit observable moves. Viterbi decoding infers latent states.',
    vizType: 'Trellis Diagram',
    live: false,
    getMove: randomMove,
  },
  {
    slug: 'bayesian',
    name: 'Bayesian Inference',
    category: 'pr',
    description: 'Dirichlet-Multinomial model with conjugate prior. Posterior Dir(α+n) updated each round. Plays counter to the MAP estimate.',
    vizType: 'Simplex Belief',
    live: true,
    getMove: getBayesianMove,
  },

  // ── Statistics ────────────────────────────────────────────────
  {
    slug: 'frequency',
    name: 'Frequency Analysis',
    category: 'st',
    description: 'Maximum-likelihood baseline: count moves, play the counter to the most frequent. The simplest viable exploitative strategy.',
    vizType: 'Frequency Bars',
    live: true,
    getMove: getFrequencyMove,
  },
  {
    slug: 'entropy',
    name: 'Entropy',
    category: 'st',
    description: 'H(X) = -Σ p_i log₂ p_i measures exploitability. Maximum 1.585 bits at Nash; any bias lowers H and creates exploitable structure.',
    vizType: 'Entropy Gauge',
    live: false,
    getMove: randomMove,
  },
  {
    slug: 'lln-clt',
    name: 'LLN + CLT',
    category: 'st',
    description: 'Win rate converges to its true mean (LLN) with a normal confidence interval (CLT). Quantifies when an AI\'s edge is statistically significant.',
    vizType: 'Convergence Plot',
    live: false,
    getMove: randomMove,
  },
  {
    slug: 'monte-carlo',
    name: 'Monte Carlo',
    category: 'st',
    description: 'Simulate N games from the empirical opponent model to estimate win distributions. Variance collapses as N increases by LLN.',
    vizType: 'Histogram',
    live: false,
    getMove: randomMove,
  },

  // ── Psychology ────────────────────────────────────────────────
  {
    slug: 'cognitive-bias',
    name: 'Cognitive Biases',
    category: 'ps',
    description: 'Detects Win-Stay/Lose-Shift tendency, Gambler\'s Fallacy (streak switching), and Recency Bias in your play history. Exploits detected patterns.',
    vizType: 'Bias Radar',
    live: false,
    getMove: randomMove,
  },

  // ── Ensemble ──────────────────────────────────────────────────
  {
    slug: 'ensemble',
    name: 'Ensemble',
    category: 'dl',
    description: 'Weighted vote across all active AI modules, with weights updated by recent per-model accuracy. A form of online meta-learning.',
    vizType: 'Vote Panel',
    live: false,
    getMove: randomMove,
  },
]
