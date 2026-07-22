import { cn, CAT_COLORS, CAT_LABELS } from '@/lib/utils'

interface BadgeProps {
  category: string
  className?: string
}

export function CategoryBadge({ category, className }: BadgeProps) {
  const color = CAT_COLORS[category] ?? 'var(--text-3)'
  const label = CAT_LABELS[category] ?? category
  return (
    <span
      className={cn('inline-block font-mono text-2xs tracking-widest uppercase px-1.5 py-0.5 border', className)}
      style={{
        color,
        borderColor: color,
        background: color + '14',
      }}
    >
      {label}
    </span>
  )
}

interface StatusBadgeProps {
  live?: boolean
  className?: string
}

export function StatusBadge({ live, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-block font-mono text-2xs tracking-widest uppercase px-1.5 py-0.5 border',
        live
          ? 'text-rl border-rl'
          : 'text-text-dim border-border',
        className
      )}
      style={live ? { background: 'rgba(61,191,160,0.08)' } : {}}
    >
      {live ? 'Live' : 'Soon'}
    </span>
  )
}
