import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-mono tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-40',
          {
            'bg-accent text-white hover:bg-accent2 border border-accent':
              variant === 'default',
            'border border-border text-text-muted hover:border-b2 hover:text-text bg-transparent':
              variant === 'outline',
            'text-text-muted hover:text-text hover:bg-bg-3 bg-transparent border-0':
              variant === 'ghost',
          },
          {
            'text-2xs px-2.5 py-1': size === 'sm',
            'text-xs px-4 py-2': size === 'md',
            'text-sm px-6 py-2.5': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
