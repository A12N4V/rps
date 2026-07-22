import { useNavigate } from 'react-router-dom'
import { CategoryBadge, StatusBadge } from '@/components/ui/badge'
import { cn, CAT_COLORS } from '@/lib/utils'
import type { ModuleDef } from '@/modules/registry'

interface ModuleCardProps {
  module: ModuleDef
}

export function ModuleCard({ module: mod }: ModuleCardProps) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/module/${mod.slug}`)}
      disabled={!mod.live}
      className={cn(
        'text-left border border-border bg-surface p-4 transition-colors flex flex-col gap-3',
        mod.live
          ? 'hover:border-b2 hover:bg-bg-3 cursor-pointer'
          : 'opacity-50 cursor-not-allowed'
      )}
    >
      {/* header */}
      <div className="flex items-start justify-between gap-2">
        <div
          className="w-1 self-stretch shrink-0"
          style={{ background: CAT_COLORS[mod.category] }}
        />
        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs font-bold text-text tracking-tight leading-tight">
            {mod.name}
          </p>
        </div>
        <StatusBadge live={mod.live} className="shrink-0" />
      </div>

      {/* description */}
      <p className="text-xs text-text-dim leading-relaxed line-clamp-2">{mod.description}</p>

      {/* footer */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <CategoryBadge category={mod.category} />
        <span className="font-mono text-2xs text-text-dim">{mod.vizType}</span>
      </div>
    </button>
  )
}
