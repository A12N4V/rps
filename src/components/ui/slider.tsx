import * as RadixSlider from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

interface SliderProps extends RadixSlider.SliderProps {
  label?: string
  valueDisplay?: string
  className?: string
}

export function Slider({ label, valueDisplay, className, ...props }: SliderProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {(label || valueDisplay) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="font-mono text-2xs text-text-dim tracking-widest uppercase">
              {label}
            </span>
          )}
          {valueDisplay && (
            <span className="font-mono text-2xs text-accent tabular-nums">
              {valueDisplay}
            </span>
          )}
        </div>
      )}
      <RadixSlider.Root
        className="relative flex items-center select-none touch-none w-full h-4"
        {...props}
      >
        <RadixSlider.Track className="bg-border relative grow h-px">
          <RadixSlider.Range className="absolute bg-accent h-full" />
        </RadixSlider.Track>
        <RadixSlider.Thumb
          className="block w-3 h-3 bg-accent border border-accent2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          aria-label={label}
        />
      </RadixSlider.Root>
    </div>
  )
}
