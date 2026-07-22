import type { ReactNode } from 'react'
import { SideNav } from './SideNav'
import { ThemeToggle } from './ThemeToggle'

interface PageShellProps {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex min-h-screen bg-bg">
      {/* sidebar — hidden on mobile */}
      <div className="hidden lg:flex">
        <SideNav />
      </div>

      {/* main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* top bar */}
        <header className="flex items-center justify-end px-6 py-3 border-b border-border bg-bg-2 sticky top-0 z-40">
          <ThemeToggle />
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
