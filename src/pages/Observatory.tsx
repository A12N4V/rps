import { Link } from 'react-router-dom'
import { GameBoard } from '@/components/game/GameBoard'
import { ModuleCard } from '@/components/module/ModuleCard'
import { moduleRegistry } from '@/modules/registry'

export default function Observatory() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-16">
      {/* Hero */}
      <section className="space-y-4">
        <div className="space-y-1">
          <p className="font-mono text-2xs text-text-dim tracking-widest uppercase">
            AI Concepts Laboratory
          </p>
          <h1 className="font-mono text-3xl font-bold text-text">RPS</h1>
          <p className="text-sm text-text-muted max-w-xl">
            Rock Paper Scissors as an interactive platform for demonstrating 20 AI, game theory,
            and statistical concepts. Select a module below, then play to see the algorithm adapt
            in real time.
          </p>
        </div>
      </section>

      {/* Game board */}
      <section>
        <GameBoard />
      </section>

      {/* Module grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <p className="font-mono text-2xs text-text-dim tracking-widest uppercase">
            AI Modules
          </p>
          <span className="font-mono text-2xs text-text-dim">
            {moduleRegistry.filter((m) => m.live).length} live / {moduleRegistry.length} total
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {moduleRegistry.map((mod) =>
            mod.live ? (
              <Link key={mod.slug} to={`/module/${mod.slug}`} className="block">
                <ModuleCard module={mod} />
              </Link>
            ) : (
              <ModuleCard key={mod.slug} module={mod} />
            )
          )}
        </div>
      </section>
    </div>
  )
}
