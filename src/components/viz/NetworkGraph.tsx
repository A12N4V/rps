import { useEffect, useRef } from 'react'
import { Network, DataSet } from 'vis-network/standalone'

interface NetworkGraphProps {
  pattern: number[]
  height?: number
}

const GATE_COLORS = {
  input: { bg: '#5C6CF7', border: '#3D4BD4' },
  gate:  { bg: '#3DBFA0', border: '#2A9E84' },
  state: { bg: '#A06CF7', border: '#8040D4' },
  output:{ bg: '#E8A03A', border: '#C47820' },
}

export function LSTMNetworkGraph({ pattern, height = 340 }: NetworkGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const netRef = useRef<Network | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const nodes = new DataSet([
      { id: 'x_t',    label: 'x_t',    group: 'input', x: -220, y: 0   },
      { id: 'h_prev', label: 'h_{t-1}',group: 'input', x: -220, y: 90  },
      { id: 'c_prev', label: 'C_{t-1}',group: 'input', x: -220, y: 180 },

      { id: 'f', label: 'f_t\nForget', group: 'gate',  x: -40, y: -20 },
      { id: 'i', label: 'i_t\nInput',  group: 'gate',  x: -40, y: 80  },
      { id: 'c_tilde', label: 'C̃_t\nCandidate', group: 'gate', x: -40, y: 180 },
      { id: 'o', label: 'o_t\nOutput', group: 'gate',  x: -40, y: 280 },

      { id: 'C_t', label: 'C_t\nCell',   group: 'state', x: 130, y: 80  },
      { id: 'h_t', label: 'h_t\nHidden', group: 'state', x: 130, y: 200 },

      { id: 'y_t',  label: 'ŷ_t',  group: 'output', x: 280, y: 140 },
    ])

    const edges = new DataSet([
      { from: 'x_t',    to: 'f', color: { color: GATE_COLORS.input.bg } },
      { from: 'x_t',    to: 'i', color: { color: GATE_COLORS.input.bg } },
      { from: 'x_t',    to: 'c_tilde', color: { color: GATE_COLORS.input.bg } },
      { from: 'x_t',    to: 'o', color: { color: GATE_COLORS.input.bg } },
      { from: 'h_prev', to: 'f', color: { color: GATE_COLORS.state.bg } },
      { from: 'h_prev', to: 'i', color: { color: GATE_COLORS.state.bg } },
      { from: 'h_prev', to: 'c_tilde', color: { color: GATE_COLORS.state.bg } },
      { from: 'h_prev', to: 'o', color: { color: GATE_COLORS.state.bg } },
      { from: 'c_prev', to: 'C_t', label: '×f_t', color: { color: '#555572' } },
      { from: 'f',       to: 'C_t', color: { color: GATE_COLORS.gate.bg } },
      { from: 'i',       to: 'C_t', color: { color: GATE_COLORS.gate.bg } },
      { from: 'c_tilde', to: 'C_t', color: { color: GATE_COLORS.gate.bg } },
      { from: 'C_t',    to: 'h_t', label: 'tanh', color: { color: GATE_COLORS.state.bg } },
      { from: 'o',      to: 'h_t', color: { color: GATE_COLORS.gate.bg } },
      { from: 'h_t',   to: 'y_t', color: { color: GATE_COLORS.output.bg } },
    ])

    const options = {
      nodes: {
        shape: 'ellipse',
        size: 28,
        font: { color: '#E8E7F0', size: 11, multi: true },
        borderWidth: 2,
        shadow: false,
      },
      edges: {
        arrows: { to: { enabled: true, scaleFactor: 0.6 } },
        width: 2,
        font: { color: '#8B8BA8', size: 10 },
        smooth: { type: 'curvedCW', roundness: 0.2 } as any,
      },
      groups: {
        input:  { color: { background: GATE_COLORS.input.bg,  border: GATE_COLORS.input.border  } },
        gate:   { color: { background: GATE_COLORS.gate.bg,   border: GATE_COLORS.gate.border   } },
        state:  { color: { background: GATE_COLORS.state.bg,  border: GATE_COLORS.state.border  } },
        output: { color: { background: GATE_COLORS.output.bg, border: GATE_COLORS.output.border } },
      },
      physics: { enabled: false },
      interaction: { hover: true, dragNodes: false, dragView: true, zoomView: true },
      layout: { improvedLayout: false },
    }

    netRef.current = new Network(containerRef.current, { nodes, edges }, options)

    return () => {
      netRef.current?.destroy()
      netRef.current = null
    }
  }, [])

  return (
    <div className="relative w-full" style={{ height }}>
      <div ref={containerRef} className="w-full h-full" />
      {/* legend */}
      <div className="absolute bottom-3 right-3 bg-surface border border-border p-2.5 space-y-1.5">
        {Object.entries({ Input: 'input', Gate: 'gate', State: 'state', Output: 'output' }).map(
          ([label, key]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: GATE_COLORS[key as keyof typeof GATE_COLORS].bg }}
              />
              <span className="font-mono text-2xs text-text-dim">{label}</span>
            </div>
          )
        )}
        {pattern.length > 0 && (
          <div className="pt-1 border-t border-border font-mono text-2xs text-text-dim">
            pattern: [{pattern.join(',')}]
          </div>
        )}
      </div>
    </div>
  )
}
