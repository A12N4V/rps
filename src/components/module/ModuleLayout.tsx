import { useNavigate } from 'react-router-dom'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CategoryBadge, StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GameBoard } from '@/components/game/GameBoard'
import { useGameStore } from '@/store/gameStore'
import type { ModuleDef } from '@/modules/registry'
import type { ReactNode } from 'react'

interface ModuleLayoutProps {
  module: ModuleDef
  theory: ReactNode
  visualization: ReactNode
  code: string
}

export function ModuleLayout({ module: mod, theory, visualization, code }: ModuleLayoutProps) {
  const navigate = useNavigate()
  const { setActiveModule } = useGameStore()

  function handlePlayTab() {
    setActiveModule(mod.slug)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      {/* breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-2xs text-text-dim">
        <button onClick={() => navigate('/')} className="hover:text-text transition-colors">
          Observatory
        </button>
        <span>/</span>
        <span className="text-text">{mod.name}</span>
      </div>

      {/* header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <CategoryBadge category={mod.category} />
          <StatusBadge live={mod.live} />
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight text-text">
          {mod.name}
        </h1>
        <p className="text-sm text-text-muted max-w-2xl leading-relaxed">{mod.description}</p>
      </div>

      {/* tabs */}
      <Tabs defaultValue="theory">
        <TabsList>
          <TabsTrigger value="theory">Theory</TabsTrigger>
          <TabsTrigger value="viz">Visualization</TabsTrigger>
          <TabsTrigger value="demo" onClick={handlePlayTab}>Demo</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="theory" className="pt-6">
          <div className="prose-custom space-y-5 max-w-3xl">
            {theory}
          </div>
        </TabsContent>

        <TabsContent value="viz" className="pt-6">
          <div className="border border-border bg-surface p-4 min-h-[400px]">
            {visualization}
          </div>
        </TabsContent>

        <TabsContent value="demo" className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-2xs text-text-dim tracking-widest uppercase mb-4">
                Live Game — {mod.name} AI
              </p>
              <GameBoard />
            </div>
            <div className="border-l border-border pl-8">
              <p className="font-mono text-2xs text-text-dim tracking-widest uppercase mb-4">
                About This AI
              </p>
              <div className="space-y-3 text-sm text-text-muted leading-relaxed">
                {theory}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="pt-6">
          <div className="border border-border bg-surface overflow-x-auto">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <span className="font-mono text-2xs text-text-dim tracking-widest uppercase">
                {mod.slug}.ts
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigator.clipboard.writeText(code)}
              >
                Copy
              </Button>
            </div>
            <pre className="p-4 text-xs font-mono text-text-muted leading-relaxed overflow-x-auto">
              <code>{code}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
