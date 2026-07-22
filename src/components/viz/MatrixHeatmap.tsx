import { cn } from '@/lib/utils'

interface MatrixHeatmapProps {
  matrix: number[][]   // e.g. 3x3, values 0-1
  rowLabels: string[]
  colLabels: string[]
  title?: string
  colorVar?: string    // CSS var name for the tint color
}

export function MatrixHeatmap({
  matrix,
  rowLabels,
  colLabels,
  title,
  colorVar = '--accent',
}: MatrixHeatmapProps) {
  const max = Math.max(...matrix.flat(), 0.0001)

  return (
    <div className="space-y-3">
      {title && (
        <p className="font-mono text-2xs text-text-dim tracking-widest uppercase">{title}</p>
      )}
      <div
        className="grid gap-px bg-border border border-border"
        style={{
          gridTemplateColumns: `auto repeat(${colLabels.length}, 1fr)`,
        }}
      >
        {/* corner */}
        <div className="bg-surface p-2" />

        {/* column headers */}
        {colLabels.map((c) => (
          <div
            key={c}
            className="bg-surface p-2 font-mono text-2xs text-text-dim text-center tracking-widest uppercase"
          >
            {c}
          </div>
        ))}

        {/* rows */}
        {matrix.map((row, ri) => (
          <>
            <div
              key={`r-${ri}`}
              className="bg-surface p-2 font-mono text-2xs text-text-dim flex items-center tracking-widest uppercase"
            >
              {rowLabels[ri]}
            </div>
            {row.map((val, ci) => {
              const intensity = val / max
              return (
                <div
                  key={`${ri}-${ci}`}
                  className="bg-surface p-3 flex items-center justify-center transition-all"
                  style={{
                    background: `color-mix(in srgb, var(${colorVar}) ${Math.round(intensity * 60)}%, var(--surface))`,
                  }}
                >
                  <span
                    className={cn(
                      'font-mono text-xs tabular-nums',
                      intensity > 0.5 ? 'text-text' : 'text-text-muted'
                    )}
                  >
                    {(val * 100).toFixed(0)}%
                  </span>
                </div>
              )
            })}
          </>
        ))}
      </div>
    </div>
  )
}
