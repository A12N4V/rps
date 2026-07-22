interface BrainLSTMOptions {
  iterations?: number
  log?: boolean
  errorThresh?: number
  learningRate?: number
}

interface BrainLSTMTimeStep {
  train(data: number[][], options?: BrainLSTMOptions): void
  run(input: number[]): number
  toJSON(): unknown
}

declare global {
  interface Window {
    brain: {
      recurrent: {
        LSTMTimeStep: new () => BrainLSTMTimeStep
        GRUTimeStep: new () => BrainLSTMTimeStep
      }
    }
  }
}

export {}
