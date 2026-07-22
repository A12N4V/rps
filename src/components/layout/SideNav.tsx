import { NavLink, useLocation } from 'react-router-dom'
import { cn, CAT_COLORS } from '@/lib/utils'
import { moduleRegistry } from '@/modules/registry'

const CATEGORIES = ['dl', 'gt', 'rl', 'pr', 'st', 'ps'] as const
const CAT_LABELS: Record<string, string> = {
  dl: 'Deep Learning',
  gt: 'Game Theory',
  rl: 'Reinforcement L.',
  pr: 'Probabilistic',
  st: 'Statistics',
  ps: 'Psychology',
}

export function SideNav() {
  const location = useLocation()

  return (
    <nav className="h-screen sticky top-0 flex flex-col overflow-y-auto border-r border-border bg-bg-2 w-52 shrink-0">
      {/* brand */}
      <NavLink
        to="/"
        className="font-mono text-base font-bold tracking-tight text-text px-5 py-5 border-b border-border hover:text-accent transition-colors"
      >
        RPS<span className="text-accent"> //</span> Lab
      </NavLink>

      {/* observatory link */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(
            'font-mono text-2xs tracking-widest uppercase px-5 py-3 text-text-dim hover:text-text-muted transition-colors',
            location.pathname === '/' && 'text-accent'
          )
        }
        end
      >
        Observatory
      </NavLink>

      <div className="h-px bg-border mx-5 mb-1" />

      {/* modules by category */}
      {CATEGORIES.map((cat) => {
        const mods = moduleRegistry.filter((m) => m.category === cat)
        if (!mods.length) return null
        return (
          <div key={cat} className="mb-1">
            <div
              className="font-mono text-2xs tracking-widest uppercase px-5 py-1.5"
              style={{ color: CAT_COLORS[cat] }}
            >
              {CAT_LABELS[cat]}
            </div>
            {mods.map((mod) => (
              <NavLink
                key={mod.slug}
                to={`/module/${mod.slug}`}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-5 py-1.5 font-mono text-2xs text-text-dim hover:text-text-muted transition-colors',
                    isActive && 'text-text'
                  )
                }
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: mod.live ? CAT_COLORS[cat] : 'var(--border-2)' }}
                />
                {mod.name}
              </NavLink>
            ))}
          </div>
        )
      })}
    </nav>
  )
}
