# ✊✋✌️ Rock · Paper · Scissors — An AI Concepts Laboratory

<div align="center">

```
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║    ✊  →  beats  →  ✌️   →  beats  →  ✋  →  beats  →  ✊ ║
    ║                                                           ║
    ║      Three moves. Infinite AI to learn from it.          ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
```

![Game](https://img.shields.io/badge/Game-Rock%20Paper%20Scissors-brightgreen?style=for-the-badge&logo=gamepad)
![Neural Network](https://img.shields.io/badge/AI-LSTM%20%7C%20RL%20%7C%20Game%20Theory-blue?style=for-the-badge&logo=brain)
![Language](https://img.shields.io/badge/Stack-JavaScript%20%7C%20Brain.js-yellow?style=for-the-badge&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)

**A living laboratory where the simplest 3-move game becomes a window into the full breadth of AI, mathematics, and cognitive science.**

</div>

---

## 🎯 Abstract

Rock Paper Scissors (RPS) occupies a paradoxical position in game theory: it is trivially simple to describe yet provably impossible to *solve* with a pure deterministic strategy. This makes it an ideal petri dish for AI concepts — every technique that attempts to *beat* a human opponent must grapple with uncertainty, temporal patterns, psychological bias, and adversarial dynamics.

This project uses an interactive RPS game as a **demonstrable substrate** for teaching and visualizing AI concepts that span:

- **Sequence modeling** (LSTM, GRU, Markov Chains)
- **Reinforcement learning** (Q-Learning, Multi-Armed Bandits)
- **Game theory** (Nash Equilibria, Minimax, Zero-Sum Games)
- **Probabilistic reasoning** (Bayesian inference, Thompson Sampling)
- **Cognitive science** (Gambler's Fallacy, Recency Bias)
- **Mathematical theorems** (Law of Large Numbers, Von Neumann's Minimax Theorem)

The current implementation deploys an **LSTM neural network** (via Brain.js) as the AI opponent. This README serves as a complete map of every AI concept that RPS can demonstrate — a curriculum unto itself.

---

## 📐 The Game as a Mathematical Object

Before exploring AI, it helps to see RPS with mathematical clarity.

### The Payoff Matrix

```
                    ┌──────────────────────────────────────┐
                    │           AI's Move                  │
                    │   Rock (R)   Paper (P)  Scissors (S) │
         ┌──────────┼─────────────┬───────────┬────────────┤
Human's  │  Rock    │    0 , 0    │  -1 , +1  │  +1 , -1  │
Move     │  Paper   │  +1 , -1   │    0 , 0  │  -1 , +1  │
         │ Scissors │  -1 , +1   │  +1 , -1  │    0 , 0  │
         └──────────┴─────────────┴───────────┴────────────┘
                    (Human payoff, AI payoff)
```

**Key property:** For every entry, payoffs sum to zero. This is the canonical **zero-sum game**.

### The Cyclic Dominance Graph

```
         ✊ Rock
        ↗       ↘
    beats         loses to
      ↑               ↓
    ✌️ Scissors ← ✋ Paper
         beats
```

This three-node directed cycle has no "dominant strategy" — no single move beats all others. This is the mathematical reason why pure strategies fail and probabilistic/adaptive strategies are necessary.

---

## 🗂️ Master Index of AI Concepts Demonstrable in RPS

| # | Concept | Category | Difficulty |
|---|---------|----------|------------|
| 1 | [LSTM Neural Networks](#1--lstm-long-short-term-memory) | Deep Learning | ⭐⭐⭐ |
| 2 | [Markov Chains](#2--markov-chains) | Probabilistic | ⭐⭐ |
| 3 | [Nash Equilibrium](#3--nash-equilibrium--game-theory) | Game Theory | ⭐⭐ |
| 4 | [Q-Learning](#4--q-learning--reinforcement-learning) | RL | ⭐⭐⭐ |
| 5 | [Multi-Armed Bandits](#5--multi-armed-bandits) | RL | ⭐⭐ |
| 6 | [Bayesian Inference](#6--bayesian-inference) | Probabilistic | ⭐⭐⭐ |
| 7 | [Minimax Algorithm](#7--minimax-algorithm) | Game Theory | ⭐⭐ |
| 8 | [Frequency Analysis](#8--frequency-analysis--transition-matrices) | Statistics | ⭐ |
| 9 | [Gambler's Fallacy & Cognitive Bias](#9--cognitive-biases--human-psychology) | Psychology | ⭐⭐ |
| 10 | [Von Neumann's Minimax Theorem](#10--von-neumanns-minimax-theorem) | Math | ⭐⭐⭐ |
| 11 | [Law of Large Numbers](#11--law-of-large-numbers--central-limit-theorem) | Statistics | ⭐ |
| 12 | [Hidden Markov Models](#12--hidden-markov-models-hmm) | Probabilistic | ⭐⭐⭐ |
| 13 | [Monte Carlo Methods](#13--monte-carlo-methods) | Simulation | ⭐⭐ |
| 14 | [Entropy & Information Theory](#14--entropy--information-theory) | Math | ⭐⭐ |
| 15 | [Ensemble Methods](#15--ensemble-methods) | ML | ⭐⭐ |
| 16 | [Thompson Sampling](#16--thompson-sampling) | RL / Bayesian | ⭐⭐⭐ |
| 17 | [Transformer Attention](#17--transformer--attention-mechanisms) | Deep Learning | ⭐⭐⭐⭐ |
| 18 | [Folk Theorem (Repeated Games)](#18--folk-theorem--repeated-games) | Game Theory | ⭐⭐⭐ |
| 19 | [GRU Networks](#19--gru-gated-recurrent-unit) | Deep Learning | ⭐⭐⭐ |
| 20 | [Policy Gradient](#20--policy-gradient-methods) | RL | ⭐⭐⭐⭐ |

---

## 🧠 Deep Dives

---

### 1 · LSTM (Long Short-Term Memory)

> **Current implementation** — the live AI opponent in this game.

LSTMs are recurrent neural networks designed to learn **long-range dependencies in sequences**. In RPS, the sequence is your history of moves. The LSTM attempts to detect patterns — e.g., "after losing twice the player often switches to Rock."

#### Architecture Diagram

```
              ┌──────────────────────────────────────────────────────┐
              │                   LSTM Unit                          │
              │                                                      │
  x_t ───────┼──┬──────────────────────────────────────────────┐    │
  (move)      │  │  ┌──────────┐   ┌──────────┐   ┌─────────┐  │    │
              │  └─►│ Forget   │   │  Input   │   │ Output  │  │    │
  h_{t-1} ───┼──┬──►│  Gate   │   │   Gate   │   │  Gate   │  │    │
  (prev out)  │  │  │   f_t   │   │   i_t    │   │   o_t   │  │    │
              │  │  └────┬─────┘   └────┬─────┘   └────┬────┘  │    │
              │  │       │ σ            │ σ·tanh        │ σ     │    │
              │  │       ▼             ▼               │       │    │
  C_{t-1} ───┼──┼──►  [×]──────────►[+]──────C_t      │       │    │
  (cell)      │  │    discard      add new    │         │       │    │
              │  │                            ▼         │       │    │
              │  │                         tanh(C_t)   │       │    │
              │  │                            │◄────────┘       │    │
              │  │                            ▼                 │    │
              │  └────────────────────────►  [×]                │    │
              │                              │                  │    │
              │                           h_t (output)         │    │
              └──────────────────────────────────────────────────┘
                                              │
                                         ŷ_t (predicted next move)
```

#### Equations

```
f_t = σ(W_f · [h_{t-1}, x_t] + b_f)           ← Forget Gate
i_t = σ(W_i · [h_{t-1}, x_t] + b_i)           ← Input Gate
C̃_t = tanh(W_C · [h_{t-1}, x_t] + b_C)        ← Candidate Values
C_t = f_t ⊙ C_{t-1} + i_t ⊙ C̃_t              ← Cell State Update
o_t = σ(W_o · [h_{t-1}, x_t] + b_o)           ← Output Gate
h_t = o_t ⊙ tanh(C_t)                          ← Hidden State Output
```

**Why it works in RPS:** If you habitually play `R → P → S → R → P → S`, the LSTM's cell state learns this periodicity and the forget gate retains this cycle information across many timesteps.

---

### 2 · Markov Chains

A **Markov Chain** models a sequence where the next state depends only on the current state (the "Markov property").

#### State Transition Diagram

```
              p(P|R)=0.4
         ┌─────────────────┐
         │                 ▼
    ┌────┴────┐         ┌───────┐
    │  Rock   │◄───────►│ Paper │
    └────┬────┘ p(R|P)  └───┬───┘
         │      =0.2        │
         │ p(S|R)=0.4       │ p(S|P)=0.5
         ▼                  ▼
    ┌──────────┐←──────────►│
    │ Scissors │  p(P|S)    │
    └──────────┘  =0.3      │
         ▲                  │
         └──────────────────┘
              p(R|S)=0.2
```

#### Transition Matrix

```
         From:   Rock   Paper  Scissors
         Rock   [0.2    0.4    0.4  ]
    To:  Paper  [0.4    0.2    0.3  ]
         Scissors[0.4   0.5    0.2  ]
```

**RPS application:** Track the empirical transition matrix from your opponent's history. If `P(Paper | Rock) = 0.7` from their history, play Scissors when they just played Rock.

**Higher-order Markov Models** extend this to `P(next | last n moves)` — the `n=10` LSTM window in this game is a learned approximation of a high-order Markov model.

---

### 3 · Nash Equilibrium & Game Theory

> **The most fundamental theorem in RPS.**

A **Nash Equilibrium** is a strategy profile where no player can unilaterally improve their expected payoff by switching strategies.

#### The Unique Nash Equilibrium of RPS

```
       Play each move with probability 1/3

       P(Rock) = P(Paper) = P(Scissors) = 1/3

       Expected payoff = 0  (the game is "fair")
```

**Proof sketch:** If you play Rock with probability > 1/3, your opponent can exploit you by always playing Paper. The only unexploitable strategy is perfect randomization.

#### Deviation Payoff Analysis

```
    Opponent plays 1/3, 1/3, 1/3:

    Your EV (Rock)     = 1/3·(0) + 1/3·(-1) + 1/3·(1) = 0
    Your EV (Paper)    = 1/3·(1) + 1/3·(0)  + 1/3·(-1) = 0
    Your EV (Scissors) = 1/3·(-1) + 1/3·(1) + 1/3·(0) = 0

    → No deviation is profitable. This IS the Nash Equilibrium.
```

**The paradox for AI:** Any deterministic AI strategy can be beaten. The only *game-theoretically optimal* AI is a random number generator. Yet humans are NOT random — they exhibit biases the AI can exploit. This tension between optimality and exploitation is the heart of the project.

---

### 4 · Q-Learning & Reinforcement Learning

**Q-Learning** learns a value function `Q(state, action)` — the expected cumulative reward of taking action `a` in state `s`.

#### State-Action Space in RPS

```
    State:  Last N moves of opponent (e.g., [R, R, P, S, R])
    Actions: {Rock, Paper, Scissors}
    Reward: +1 (win), 0 (draw), -1 (loss)

    Q-Table Update:
    Q(s, a) ← Q(s, a) + α · [r + γ · max_a' Q(s', a') - Q(s, a)]
                              └──── Bellman Equation ──────┘

    where:
      α = learning rate (e.g., 0.1)
      γ = discount factor (e.g., 0.9)
      r = immediate reward
      s' = next state
```

#### RL Loop in RPS

```
    ┌──────────────────────────────────────────────────────────┐
    │                                                          │
    │  ┌─────────┐   state s    ┌──────────┐   action a      │
    │  │         │─────────────►│  Agent   │────────────────► │
    │  │ Environ │   (history)  │ (Q-table │  (AI move)      │
    │  │  -ment  │◄─────────────│  or NN)  │                 │
    │  │  (game) │  reward r    └──────────┘                 │
    │  └─────────┘  next state s'                             │
    │                                                          │
    └──────────────────────────────────────────────────────────┘
```

**Key insight:** After thousands of games, the Q-values encode the exploitation of specific human behavioral patterns as learned policy.

---

### 5 · Multi-Armed Bandits

The **Multi-Armed Bandit** problem asks: given K options (arms) with unknown reward distributions, how do you maximize total reward over time by balancing **exploration** (trying new options) and **exploitation** (using the best known option)?

#### RPS as a Bandit Problem

```
    Arms:       [Rock,      Paper,     Scissors]
    Rewards:    estimated win rates for each move

    ┌──────────────────────────────────────────────────┐
    │  UCB1 Strategy:                                  │
    │                                                  │
    │  score(a) = Q̂(a) + C · √(ln t / n(a))          │
    │                     └── exploration bonus ──┘   │
    │                                                  │
    │  where:                                          │
    │    Q̂(a) = empirical win rate of move a          │
    │    t    = total rounds played                    │
    │    n(a) = times move a was chosen                │
    │    C    = exploration constant                   │
    └──────────────────────────────────────────────────┘
```

**Why it's limited:** Standard bandits ignore temporal structure — they treat every round as independent. This is why sequence models (LSTM, Markov) outperform bandits in RPS when the opponent has patterns.

---

### 6 · Bayesian Inference

**Bayesian inference** updates beliefs (prior → posterior) as evidence accumulates.

#### Dirichlet-Multinomial Model for RPS

```
    Prior:  Dir(α_R, α_P, α_S)  — initial belief about opponent's tendencies
             e.g., Dir(1, 1, 1) = "no idea" (uniform)

    Likelihood: each observed move updates the Dirichlet counts

    After observing [R, R, P, S, R]:
      α_R += 3  →  α_R = 4
      α_P += 1  →  α_P = 2
      α_S += 1  →  α_S = 2

    Posterior: Dir(4, 2, 2)

    Expected move probabilities:
      P(Rock)     = 4/8 = 0.50
      P(Paper)    = 2/8 = 0.25
      P(Scissors) = 2/8 = 0.25

    → AI plays Paper (beats Rock most likely)
```

#### Belief Update Visualization

```
    Round 0:     ████████████████████  (equal 33% each)
                 R          P          S

    Round 5:     ████████████████████████████  R (dominant)
                 █████████████  P
                 █████████████  S

    Round 10:    → AI confidently plays Paper
```

---

### 7 · Minimax Algorithm

**Minimax** is the adversarial search algorithm: the AI maximizes its outcome assuming the human will minimize AI's gain (and vice versa).

#### Game Tree (2-level lookahead)

```
                           ┌────────────┐
                           │  AI's Turn │ (MAX node)
                           └─────┬──────┘
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
                  AI:R         AI:P         AI:S
              ┌────┴────┐  ┌────┴────┐  ┌────┴────┐
              │ MIN node│  │ MIN node│  │ MIN node│
              └────┬────┘  └────┬────┘  └────┬────┘
           H:R H:P H:S    H:R H:P H:S   H:R H:P H:S
           0  -1  +1      +1   0  -1    -1  +1   0

    MAX picks: best of [min(0,-1,+1), min(+1,0,-1), min(-1,+1,0)]
             = best of [-1, -1, -1] = -1  (all equally bad!)

    → In a zero-sum game with perfect knowledge, minimax gives EV=0
      confirming the Nash Equilibrium result.
```

**The twist:** Minimax is deterministic and thus exploitable. Randomized minimax (mixed strategies) resolves this.

---

### 8 · Frequency Analysis & Transition Matrices

The simplest exploitable AI: count moves, find the most frequent one, play its counter.

#### Live Frequency Tracker

```
    After 20 rounds:
    Rock     ████████████░░░░  12/20 = 60%  ← exploit with Paper!
    Paper    █████░░░░░░░░░░░   5/20 = 25%
    Scissors ███░░░░░░░░░░░░░   3/20 = 15%

    First-Order Transition Matrix (empirical):
          → R    → P    → S
    R  [ 0.50   0.25   0.25 ]
    P  [ 0.20   0.40   0.40 ]
    S  [ 0.67   0.17   0.17 ]

    Observation: After Rock, opponent plays Rock again 50% of the time.
    AI: When opponent just played Rock → play Paper.
```

---

### 9 · Cognitive Biases & Human Psychology

Humans are not random. Several well-documented cognitive biases create exploitable patterns in RPS:

#### The Gambler's Fallacy

```
    Belief: "I've played Rock three times, I'm 'due' to play something else."

    Reality: Each throw is independent. But humans ACT as if it isn't.

    Exploitation: After 3 consecutive same moves, bet they'll switch.
                  → Track "streak length" as an AI feature.
```

#### Win-Stay, Lose-Shift (WSLS) Strategy

```
    Human behavioral tendency documented in psychology research:

    After WIN  → tend to REPEAT the winning move
    After LOSS → tend to CHANGE to a different move
    After DRAW → tend to SHIFT (slight tendency)

    WSLS Exploitation Table:
    ┌──────────────────────────────────────────────────────┐
    │ Prev Result │ Prev Human Move │ Predicted Next Move  │
    ├─────────────┼─────────────────┼──────────────────────┤
    │    WIN      │     Rock        │     Rock (again)     │
    │    WIN      │     Paper       │     Paper (again)    │
    │    WIN      │     Scissors    │     Scissors (again) │
    │    LOSS     │     Rock        │     Paper or Scissors│
    │    LOSS     │     Paper       │     Rock or Scissors │
    └──────────────────────────────────────────────────────┘
```

#### Recency Bias

```
    Humans over-weight recent outcomes vs. historical patterns.
    A player who just lost to Scissors will irrationally avoid Paper.

    Modeled as: P(move | history) with exponential decay weights
    w_t = λ^(T - t),  λ ∈ (0, 1)

    More recent moves → higher weight in prediction.
```

---

### 10 · Von Neumann's Minimax Theorem

> **The foundational theorem of game theory (1928)**

**Theorem:** In any finite, two-player, zero-sum game, there exists a mixed strategy for each player such that:

```
    max_{x} min_{y} x^T A y  =  min_{y} max_{x} x^T A y  =  v

    where:
      A = payoff matrix
      x = player 1's mixed strategy (probability vector)
      y = player 2's mixed strategy (probability vector)
      v = value of the game
```

**For RPS:**

```
    A = [  0  -1  +1 ]
        [ +1   0  -1 ]
        [ -1  +1   0 ]

    Optimal: x* = y* = (1/3, 1/3, 1/3)
    Value: v = 0

    This means: no strategy can guarantee positive expected payoff
    against an optimal opponent. The game is "fair" at equilibrium.
```

This theorem is the mathematical bedrock of AI decision-making under adversarial uncertainty, and directly motivates why pure deterministic AI in RPS is always beatable.

---

### 11 · Law of Large Numbers & Central Limit Theorem

#### Law of Large Numbers

```
    The empirical win rate of any fixed strategy converges to its
    true expected win rate as games → ∞

    For Nash strategy (random 1/3 each):
      Win rate → 1/3
      Loss rate → 1/3
      Draw rate → 1/3

    Simulation (n=10,000 games):
    ┌────────────────────────────────────────────────────────┐
    │ n=10:    win%  ████████████████████████  55% (noisy)  │
    │ n=100:   win%  ████████████████  38%     (converging) │
    │ n=1000:  win%  █████████████  33.8%      (near true)  │
    │ n=10000: win%  █████████████  33.3%      (converged)  │
    └────────────────────────────────────────────────────────┘
```

#### Central Limit Theorem

```
    Win count W_n after n games:

    (W_n / n - 1/3) · √n  →  N(0, σ²)  as n → ∞

    σ² = (1/3)(1 - 1/3) = 2/9

    95% confidence interval for win rate after 100 games:
    1/3 ± 1.96 · √(2/9 / 100)  =  0.333 ± 0.093
```

**Teaching moment:** This tells us how many games we need to be *statistically confident* that an AI is genuinely skilled vs. just lucky.

---

### 12 · Hidden Markov Models (HMM)

An HMM models a system with **hidden states** (unobservable) that generate observable outputs. In RPS:

```
    Hidden States: Player's "mood" or "strategy mode"
                   e.g., {Aggressive, Defensive, Random, Cycling}

    Observable:    Actual move sequence [R, P, S, R, R, P, ...]

    ┌──────────────────────────────────────────────────────────┐
    │                                                          │
    │  Hidden:  Aggressive ──→ Cycling ──→ Random             │
    │               │              │          │                │
    │               ▼              ▼          ▼                │
    │  Observed:    R              P          S                │
    │                                                          │
    │  Goal: Infer hidden state → predict next observable      │
    │  Algorithm: Viterbi (most likely state sequence)         │
    │             Baum-Welch (EM for learning transitions)     │
    └──────────────────────────────────────────────────────────┘
```

**Why HMMs beat simple Markov chains in RPS:** People don't follow a single strategy — they shift between strategies. HMMs model these *regime changes* explicitly.

---

### 13 · Monte Carlo Methods

**Monte Carlo** methods estimate quantities through random sampling and simulation.

#### Monte Carlo Win Rate Estimation

```
    Question: "What is my win rate if I always play Paper?"

    Simulation:
      1. Sample opponent's moves from empirical distribution
      2. Play Paper every round
      3. Count wins / total rounds

    Repeat 10,000 times → stable estimate with confidence interval

    Converges by the Strong Law of Large Numbers.
```

#### Monte Carlo Tree Search (MCTS) in RPS

```
    Phase 1: SELECTION
      Start from root, traverse tree by UCB1 score

    Phase 2: EXPANSION
      Add new game state (move sequence)

    Phase 3: SIMULATION
      Random playout from this state

    Phase 4: BACKPROPAGATION
      Update win counts up the tree

    ┌─────────────────────────────────────────────────────────┐
    │  Root (current state)                                   │
    │  ├── Play Rock  [W:5/V:8]  ← UCB: 0.62+bonus = 0.89   │
    │  ├── Play Paper [W:3/V:4]  ← UCB: 0.75+bonus = 1.12 ✓ │
    │  └── Play Scissors [W:1/V:2] ← UCB: 0.5+bonus = 1.43  │
    └─────────────────────────────────────────────────────────┘
    (Note: in 1-ply RPS, MCTS reduces to frequency analysis)
```

---

### 14 · Entropy & Information Theory

**Entropy** measures uncertainty (or randomness) in a distribution.

```
    Shannon Entropy:  H(X) = -Σ p(x) log₂ p(x)

    Perfect random player:
    H = -(1/3)log₂(1/3) × 3 = log₂(3) ≈ 1.585 bits  (maximum)

    Biased player (R:0.6, P:0.3, S:0.1):
    H = -(0.6·log₂0.6 + 0.3·log₂0.3 + 0.1·log₂0.1)
      = -(−0.442 + −0.521 + −0.332)
      ≈ 1.295 bits  (lower → more predictable → more exploitable)

    ┌────────────────────────────────────────────────────────┐
    │  Entropy as Exploitability Meter:                      │
    │                                                        │
    │  H = 1.585 ████████████████████  Max entropy (random) │
    │  H = 1.295 ████████████████      Moderate bias        │
    │  H = 0.918 ████████████          Heavy bias           │
    │  H = 0.000 ▌                     Always plays Rock    │
    │                                                        │
    │  Lower entropy = easier to beat                        │
    └────────────────────────────────────────────────────────┘
```

**Mutual Information** between consecutive moves `I(X_t; X_{t+1})` measures how much knowing one move tells you about the next — a direct measure of how well a Markov model will work.

---

### 15 · Ensemble Methods

No single AI strategy dominates. **Ensemble methods** combine multiple weak learners.

```
    Ensemble Architecture for RPS AI:

    ┌──────────────────────────────────────────────────────────┐
    │                   Ensemble AI                            │
    │                                                          │
    │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
    │  │  Markov  │  │  LSTM    │  │ Frequency│  │  WSLS  │  │
    │  │  Chain   │  │ Network  │  │ Analysis │  │ Model  │  │
    │  └─────┬────┘  └─────┬────┘  └─────┬────┘  └───┬────┘  │
    │        │Paper        │Rock          │Paper       │Rock   │
    │        └─────────────┴──────────────┴────────────┘       │
    │                      │                                   │
    │              ┌───────▼────────┐                          │
    │              │ Voting / Blend │                          │
    │              │  (weighted by  │                          │
    │              │  recent perf.) │                          │
    │              └───────┬────────┘                          │
    │                      │ → Paper (majority)                │
    └──────────────────────────────────────────────────────────┘
```

**Meta-learning angle:** Each sub-model votes, weighted by its recent accuracy. The ensemble adapts which model to trust based on which is currently best at predicting this particular opponent.

---

### 16 · Thompson Sampling

**Thompson Sampling** is a Bayesian approach to the exploration-exploitation problem. Maintain a Beta distribution for each action's win probability; sample from each and pick the action whose sample is highest.

```
    For each move a ∈ {Rock, Paper, Scissors}:
      α_a = wins with move a + 1
      β_a = losses with move a + 1

    θ_a ~ Beta(α_a, β_a)  ← sample

    Play move with highest θ_a

    ┌──────────────────────────────────────────────────────────┐
    │  After 20 games:                                         │
    │                                                          │
    │  Rock:     Beta(8, 4)   sample → 0.65                   │
    │  Paper:    Beta(3, 9)   sample → 0.22                   │
    │  Scissors: Beta(5, 7)   sample → 0.41                   │
    │                                                          │
    │  → Play Rock (highest sample)                            │
    │                                                          │
    │  As n → ∞: samples concentrate near true win rate       │
    │  → Asymptotically optimal exploration                    │
    └──────────────────────────────────────────────────────────┘
```

---

### 17 · Transformer & Attention Mechanisms

Modern deep learning uses **attention** to weight the importance of each past move when making predictions — instead of LSTM's sequential bottleneck.

#### Self-Attention on Move History

```
    Move sequence: [R, P, R, R, S, P, R, P, S, ?]
    Position:       1  2  3  4  5  6  7  8  9  10

    Attention weights for predicting position 10:
    (which past moves matter most?)

    Pos 1 (R): 0.03  ░
    Pos 2 (P): 0.05  ░░
    Pos 3 (R): 0.04  ░
    Pos 4 (R): 0.15  ████
    Pos 5 (S): 0.08  ██
    Pos 6 (P): 0.12  ███
    Pos 7 (R): 0.25  ████████    ← most recent Rock is informative
    Pos 8 (P): 0.18  █████
    Pos 9 (S): 0.10  ███

    Weighted sum → context vector → predict next move
```

**Equation:**

```
    Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V

    Q = query (position 10)
    K = keys  (all past positions)
    V = values (move embeddings)
    d_k = key dimension (scaling factor)
```

---

### 18 · Folk Theorem (Repeated Games)

The **Folk Theorem** from game theory states: in a **repeated game** with sufficient discount factor, any payoff vector that Pareto-dominates the minimax payoff can be sustained as a Nash Equilibrium.

#### Implication for RPS

```
    In a one-shot game:
      Only Nash strategy: (1/3, 1/3, 1/3)

    In a repeated game (infinite horizon, δ close to 1):
      Cooperative strategies become sustainable:
      - "I'll play predictably if you do too"
      - Tit-for-Tat adaptations
      - Punishment/reward signaling across rounds

    ┌──────────────────────────────────────────────────────────┐
    │  Folk Theorem in practice:                               │
    │                                                          │
    │  If both players care about future rounds:               │
    │    → History of play becomes a "communication channel"   │
    │    → Patterns can be used to signal strategies           │
    │    → Deviation from implicit "agreement" is punished     │
    │                                                          │
    │  Discount factor δ = (probability game continues next    │
    │                       round) or time preference          │
    └──────────────────────────────────────────────────────────┘
```

---

### 19 · GRU (Gated Recurrent Unit)

The **GRU** is a simplified version of the LSTM with two gates instead of three, making it faster to train while retaining most of the sequence modeling power.

#### GRU vs LSTM Comparison

```
    LSTM:                           GRU:
    ┌─────────────────────┐         ┌─────────────────────┐
    │  Forget Gate  (f_t) │         │  Reset Gate   (r_t) │
    │  Input Gate   (i_t) │   vs    │  Update Gate  (z_t) │
    │  Output Gate  (o_t) │         │  (no output gate)   │
    │  Cell State   (C_t) │         │  (no separate cell) │
    │  Hidden State (h_t) │         │  Hidden State (h_t) │
    └─────────────────────┘         └─────────────────────┘

    GRU Equations:
    z_t = σ(W_z · [h_{t-1}, x_t])         ← Update gate
    r_t = σ(W_r · [h_{t-1}, x_t])         ← Reset gate
    h̃_t = tanh(W · [r_t ⊙ h_{t-1}, x_t]) ← Candidate
    h_t = (1 - z_t) ⊙ h_{t-1} + z_t ⊙ h̃_t ← New hidden state
```

**In RPS:** GRU trains ~33% faster than LSTM with similar prediction accuracy on short sequences (≤20 moves), making it practical for real-time in-browser use.

---

### 20 · Policy Gradient Methods

**Policy gradient** methods directly optimize the probability of actions that led to positive outcomes — no value function needed.

#### REINFORCE in RPS

```
    Policy: π_θ(a | s) = P(AI plays a | history s; params θ)
            (parameterized by a neural network)

    Objective: J(θ) = E[Σ r_t]  (expected cumulative reward)

    Gradient: ∇_θ J(θ) = E[Σ ∇_θ log π_θ(a_t|s_t) · G_t]
              where G_t = cumulative future reward from step t

    Update:  θ ← θ + α · ∇_θ J(θ)

    ┌──────────────────────────────────────────────────────────┐
    │  Intuition: "Reinforce" winning moves                    │
    │                                                          │
    │  Played Paper → Won (+1)  → Increase P(Paper | state)   │
    │  Played Rock  → Lost (-1) → Decrease P(Rock | state)    │
    │  Played Paper → Draw (0)  → Small decrease (baseline)   │
    └──────────────────────────────────────────────────────────┘
```

---

## 🏗️ Current Implementation

### System Architecture

```
    ┌─────────────────────────────────────────────────────────────┐
    │                     Browser (Client)                        │
    │                                                             │
    │  ┌─────────────┐    ┌──────────────┐    ┌──────────────┐   │
    │  │  index.html  │    │   styles.css  │    │   main.js    │   │
    │  │  (Structure) │    │  (Animations) │    │  (Logic +    │   │
    │  └─────────────┘    └──────────────┘    │   LSTM AI)   │   │
    │                                          └──────┬───────┘   │
    │                                                 │           │
    │  ┌──────────────────────────────────────────────▼─────────┐ │
    │  │                  External Libraries                     │ │
    │  │  ┌──────────────┐           ┌──────────────────────┐   │ │
    │  │  │  Brain.js    │           │     Vis.js Network   │   │ │
    │  │  │  (LSTM impl) │           │  (NN Visualization)  │   │ │
    │  │  └──────────────┘           └──────────────────────┘   │ │
    │  └─────────────────────────────────────────────────────────┘ │
    └─────────────────────────────────────────────────────────────┘
```

### AI Decision Pipeline

```
    User Clicks Play
          │
          ▼
    ┌─────────────────┐
    │  Get User Move  │  (from UI state)
    └────────┬────────┘
             │
             ▼
    ┌─────────────────────────────────┐
    │  Pattern Buffer (last 10 moves) │
    │  [1, 2, 3, 1, 1, 2, 3, 2, 1, ?]│
    └────────┬────────────────────────┘
             │
             ▼
    ┌──────────────────────────────────────┐
    │  LSTMTimeStep.train([pattern],        │
    │      { iterations: 200 })            │
    └────────┬─────────────────────────────┘
             │
             ▼
    ┌────────────────────────────┐
    │  net.run(pattern)          │
    │  → predicted move (1-3)    │
    └────────┬───────────────────┘
             │
             ▼
    ┌──────────────────────────────────────┐
    │  Counter-move lookup:                │
    │  predicted=Rock(1)     → play Paper  │
    │  predicted=Paper(2)    → play Scissors│
    │  predicted=Scissors(3) → play Rock   │
    └────────┬─────────────────────────────┘
             │
             ▼
    ┌────────────────────────┐
    │  Resolve & Score Round │
    └────────────────────────┘
```

---

## 📦 Installation & Running

### Prerequisites
- Python 3.x (for local HTTP server)
- Modern web browser (Chrome 88+, Firefox 85+, Safari 14+)

### Setup

```bash
git clone https://github.com/a12n4v/rps.git
cd rps
python3 -m http.server 8000
# → Open http://localhost:8000
```

---

## 🎮 How to Play

```
    ┌────────────────────────────────────────────────────────────┐
    │  1. CLICK your hand (left side) to cycle: ✊ → ✋ → ✌️   │
    │  2. CLICK "Play" to submit your move                       │
    │  3. WATCH the AI reveal its counter-move                   │
    │  4. TRACK your score (+ win, − loss, = draw)               │
    │  5. CLICK 🧠 to see the live LSTM network diagram          │
    │  6. CLICK 🌙/☀️ to toggle dark/light mode                 │
    └────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Project Structure

```
rps/
├── index.html        ← Game UI and layout
├── main.js           ← Game logic, LSTM AI, visualization
├── styles.css        ← Themes, animations, responsive layout
├── tablecloth.jpg    ← Background texture (optional)
├── game.png          ← Screenshot
└── README.md         ← This document
```

---

## 🔬 Educational Use Cases

| Audience | What to Demonstrate |
|----------|-------------------|
| ML Students | LSTM architecture, sequence prediction, training loops |
| Game Theory Students | Nash equilibrium, zero-sum games, minimax theorem |
| Statistics Students | LLN, CLT, Bayesian updating |
| Psychology Students | Cognitive biases, WSLS behavior, gambler's fallacy |
| CS Students | State machines, decision trees, search algorithms |
| General Public | Why "random" is optimal — and why humans can't be |

---

## 🚀 Potential Extensions

- [ ] **Markov Chain AI** — switchable opponent strategy
- [ ] **Bayesian opponent** — live Dirichlet belief visualization
- [ ] **RL agent** — Q-table displayed as heat map
- [ ] **Entropy meter** — show exploitability score in real time
- [ ] **Ensemble AI** — weighted vote across 4+ strategies
- [ ] **Multi-player mode** — model Folk Theorem dynamics
- [ ] **GRU comparison** — benchmark LSTM vs GRU accuracy live
- [ ] **Cognitive bias detector** — identify if you exhibit WSLS, gambler's fallacy, etc.

---

## 📚 Further Reading

- Von Neumann & Morgenstern — *Theory of Games and Economic Behavior* (1944)
- Hochreiter & Schmidhuber — *Long Short-Term Memory* (1997)
- Sutton & Barto — *Reinforcement Learning: An Introduction*
- Shannon — *A Mathematical Theory of Communication* (1948)
- Aumann — *Repeated Games* (Nobel Lecture, 2005)

---

## 📝 License

MIT — free to use, modify, and distribute.

---

<div align="center">

```
         ✊  ✋  ✌️
    Three moves.
    One game.
    Every idea in AI.
```

**Built to show that the simplest systems reveal the deepest principles.**

</div>
