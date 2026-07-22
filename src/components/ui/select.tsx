import * as RadixSelect from '@radix-ui/react-select'
import { cn } from '@/lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onValueChange: (v: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
}

export function Select({ value, onValueChange, options, placeholder, className }: SelectProps) {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger
        className={cn(
          'inline-flex items-center justify-between gap-2',
          'border border-border bg-surface px-3 py-1.5',
          'font-mono text-xs text-text-muted hover:text-text hover:border-b2',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
          'transition-colors min-w-[160px]',
          className
        )}
      >
        <RadixSelect.Value placeholder={placeholder ?? 'Select...'} />
        <RadixSelect.Icon className="text-text-dim text-xs">▾</RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className="bg-surface border border-border z-50 min-w-[160px] shadow-lg"
          position="popper"
          sideOffset={2}
        >
          <RadixSelect.Viewport>
            {options.map((opt) => (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  'font-mono text-xs text-text-muted px-3 py-2 cursor-pointer',
                  'data-[highlighted]:bg-bg-3 data-[highlighted]:text-text',
                  'data-[state=checked]:text-accent',
                  'focus-visible:outline-none select-none'
                )}
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
