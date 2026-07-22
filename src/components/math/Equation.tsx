import { useEffect, useRef } from 'react'
import katex from 'katex'
import { cn } from '@/lib/utils'

interface EquationProps {
  tex: string
  block?: boolean
  className?: string
}

export function Equation({ tex, block = false, className }: EquationProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    katex.render(tex, ref.current, {
      displayMode: block,
      throwOnError: false,
      strict: false,
    })
  }, [tex, block])

  if (block) {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn('my-4 overflow-x-auto text-center', className)}
      />
    )
  }

  return <span ref={ref} className={cn('inline', className)} />
}

interface EquationBlockProps {
  lines: Array<{ tex: string; label?: string }>
  className?: string
}

export function EquationBlock({ lines, className }: EquationBlockProps) {
  return (
    <div className={cn('space-y-2 py-2', className)}>
      {lines.map((line, i) => (
        <div key={i} className="flex items-baseline gap-4">
          <Equation tex={line.tex} block />
          {line.label && (
            <span className="font-mono text-2xs text-text-dim whitespace-nowrap shrink-0">
              {line.label}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
