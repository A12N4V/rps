import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      className="text-text-dim"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? 'light' : 'dark'}
    </Button>
  )
}
