import { useState } from 'react'
import { useUnit } from 'effector-react'
import clsx from 'clsx'
import { FilterToggleGroup, Icon, Popover } from '@/shared/ui'
import { FilterValue, values, completeTaskFilter } from '../model'

interface CompleteTaskFilterProps {
  className?: string
}

export const CompleteTaskFilter = ({ className }: CompleteTaskFilterProps) => {
  const currentFilter = useUnit(completeTaskFilter.currentValue)
  const changeValue = useUnit(completeTaskFilter.changeValue)

  const [isOpen, setIsOpen] = useState(false)

  const hanldeFilterChanged = (value: string) =>
    changeValue(value as FilterValue)

  return (
    <Popover
      onOpenChange={setIsOpen}
      sideOffset={8}
      className={clsx(className, 'z-50 w-44 -right-10')}
      trigger={<FilterTrigger isOpen={isOpen} />}
    >
      <FilterToggleGroup
        currentValue={currentFilter}
        onValueChange={hanldeFilterChanged}
        values={values}
      />
    </Popover>
  )
}

const FilterTrigger = ({ isOpen }: { isOpen: boolean }) => {
  const currentFilter = useUnit(completeTaskFilter.currentValue)

  const label = currentFilter === null ? 'all' : currentFilter

  return (
    <div className='flex items-center space-x-3 text-sm'>
      <div className='select-none'>Complete filter:</div>
      <div className='select-none cursor-pointer flex items-center text-color-light/60 dark:text-color-dark/50'>
        {label}
        <Icon
          className={clsx(
            'ml-1 relative top-[1px] duration-100',
            isOpen && '-rotate-180'
          )}
          size='xs'
          name='chevronDown'
        />
      </div>
    </div>
  )
}
