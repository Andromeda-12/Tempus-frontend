import { ReactNode } from 'react'
import clsx from 'clsx'
import * as PopoverPrimitive from '@radix-ui/react-popover'

interface PropsProps {
  className?: string
  children: ReactNode
  trigger: ReactNode
  withArrow?: boolean
  sideOffset?: number
  onOpenChange?: (open: boolean) => void
}

export const Popover = ({
  className,
  children,
  trigger,
  withArrow,
  sideOffset,
  onOpenChange
}: PropsProps) => {
  return (
    <div className='relative'>
      <PopoverPrimitive.Root onOpenChange={onOpenChange}>
        <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>

        <PopoverPrimitive.Content
          align='start'
          className={clsx(
            'rounded-lg overflow-hidden shadow-lg shadow-background-dark/20 dark:shadow-background-dark',
            'bg-white dark:bg-neutral',
            className
          )}
          sideOffset={sideOffset}
        >
          {withArrow && (
            // text-white dark:text-gray-800
            <PopoverPrimitive.Arrow className='fill-current' />
          )}

          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    </div>
  )
}
