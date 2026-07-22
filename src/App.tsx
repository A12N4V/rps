import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PageShell } from '@/components/layout/PageShell'
import Observatory from '@/pages/Observatory'

const ModulePage = lazy(() => import('@/pages/ModulePage'))

function Loading() {
  return (
    <div className="flex items-center justify-center h-64 font-mono text-2xs text-text-dim tracking-widest uppercase">
      Loading module...
    </div>
  )
}

export default function App() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<Observatory />} />
        <Route
          path="/module/:slug"
          element={
            <Suspense fallback={<Loading />}>
              <ModulePage />
            </Suspense>
          }
        />
      </Routes>
    </PageShell>
  )
}
