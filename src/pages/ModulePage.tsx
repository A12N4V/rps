import { lazy, Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { moduleRegistry } from '@/modules/registry'

const moduleComponents: Record<string, React.LazyExoticComponent<() => JSX.Element>> = {
  lstm: lazy(() => import('@/modules/lstm')),
  markov: lazy(() => import('@/modules/markov')),
  frequency: lazy(() => import('@/modules/frequency')),
  nash: lazy(() => import('@/modules/nash')),
  bayesian: lazy(() => import('@/modules/bayesian')),
}

function Loading() {
  return (
    <div className="flex items-center justify-center h-64 font-mono text-2xs text-text-dim tracking-widest uppercase">
      Loading...
    </div>
  )
}

export default function ModulePage() {
  const { slug } = useParams<{ slug: string }>()
  const mod = moduleRegistry.find((m) => m.slug === slug)

  if (!mod) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-4">
        <p className="font-mono text-text-dim">Module not found: {slug}</p>
        <Link to="/" className="font-mono text-xs text-accent hover:underline">
          Back to Observatory
        </Link>
      </div>
    )
  }

  if (!mod.live) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-4">
        <p className="font-mono text-sm text-text">{mod.name}</p>
        <p className="font-mono text-xs text-text-dim">This module is not yet implemented.</p>
        <Link to="/" className="font-mono text-xs text-accent hover:underline">
          Back to Observatory
        </Link>
      </div>
    )
  }

  const Component = moduleComponents[slug!]

  if (!Component) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <p className="font-mono text-xs text-text-dim">Component not registered for {slug}.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  )
}
