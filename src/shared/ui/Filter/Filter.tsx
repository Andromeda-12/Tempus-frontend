import { ReactNode } from 'react'
import clsx from 'clsx'
import { Popover } from '../Popover'

interface FilterProps {
  className?: string
  children: ReactNode
  trigger: ReactNode
  onOpenChange?: (open: boolean) => void
}

export const Filter = ({
  className,
  children,
  trigger,
  onOpenChange
}: FilterProps) => {
  return (
    <Popover
      trigger={trigger}
      sideOffset={8}
      className={clsx('-right-10', className)}
      onOpenChange={onOpenChange}
    >
      {children}
    </Popover>
  )
}
