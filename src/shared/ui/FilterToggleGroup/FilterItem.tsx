import React from 'react'
import clsx from 'clsx'
import { Checkbox } from '../Checkbox'

interface FilterItemProps {
  checked: boolean
  value: string
  onClick?: () => void
}

export const FilterItem = React.forwardRef<HTMLDivElement, FilterItemProps>(
  ({ value, checked, onClick }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'flex items-center py-3 px-4 space-x-3 cursor-pointer select-none',
          'hover:bg-secondary dark:hover:bg-primary-hover'
        )}
        onClick={onClick}
      >
        <Checkbox checked={checked} />
        <span className='w-full cursor-pointer text-sm'>{value}</span>
      </div>
    )
  }
)

FilterItem.displayName = 'FilterItem'
