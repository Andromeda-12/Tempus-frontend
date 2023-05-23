import clsx from 'clsx'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import { FilterToggleGroup, Icon, Popover } from '@/shared/ui'
import { FilterValue, values, taskFilter } from '../model'

interface ProjectFilterProps {
  className?: string
}

export const TaskFilter = ({ className }: ProjectFilterProps) => {
  const currentFilter = useUnit(taskFilter.currentValue)
  const changeValue = useUnit(taskFilter.changeValue)

  const [isOpen, setIsOpen] = useState(false)

  const hanldeFilterChanged = (value: string) => {
    if (values.includes(value as FilterValue)) changeValue(value as FilterValue)
    else changeValue('all')
  }

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
  const currentFilter = useUnit(taskFilter.currentValue)

  const label = currentFilter === null ? 'none' : currentFilter

  return (
    <div className='flex items-center space-x-3 text-sm'>
      <div className='select-none'>Filter:</div>
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
