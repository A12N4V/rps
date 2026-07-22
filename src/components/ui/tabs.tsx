import * as RadixTabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

export const Tabs = RadixTabs.Root

export function TabsList({ className, ...props }: RadixTabs.TabsListProps) {
  return (
    <RadixTabs.List
      className={cn(
        'flex border-b border-border gap-0',
        className
      )}
      {...props}
    />
  )
}

export function TabsTrigger({ className, ...props }: RadixTabs.TabsTriggerProps) {
  return (
    <RadixTabs.Trigger
      className={cn(
        'font-mono text-2xs tracking-widest uppercase px-4 py-2.5 text-text-dim',
        'border-b-2 border-transparent -mb-px',
        'transition-colors hover:text-text-muted',
        'data-[state=active]:text-accent data-[state=active]:border-accent',
        'focus-visible:outline-none',
        className
      )}
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }: RadixTabs.TabsContentProps) {
  return (
    <RadixTabs.Content
      className={cn('focus-visible:outline-none', className)}
      {...props}
    />
  )
}
