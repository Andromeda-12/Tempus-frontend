import { useState } from 'react'
import { useUnit } from 'effector-react'
import clsx from 'clsx'
import { Filter, FilterItem, Icon } from '@/shared/ui'
import { $currentFilter, ownFilter, othersFilter } from '../model'

interface WorkspaceFilterProps {
  className?: string
}

export const WorkspaceFilter = ({ className }: WorkspaceFilterProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Filter
      className={clsx(className, 'z-50 w-44')}
      trigger={<FilterTrigger isOpen={isOpen} />}
      onOpenChange={setIsOpen}
    >
      <OwnFilter />
      <OthersFilter />
    </Filter>
  )
}

const FilterTrigger = ({ isOpen }: { isOpen: boolean }) => {
  const currentFilter = useUnit($currentFilter)

  return (
    <div className='flex space-x-3 text-sm'>
      <div className='select-none'>Filter:</div>
      <div className='select-none cursor-pointer flex items-center text-color-light/60 dark:text-color-dark/50'>
        {currentFilter === null && 'none'}
        {currentFilter}
        <Icon
          className={clsx(
            'ml-1 w-3.5 h-3.5 duration-100',
            isOpen && '-rotate-180'
          )}
          name='chevronDown'
        />
      </div>
    </div>
  )
}

const OwnFilter = () => {
  const { value, checked, toggle } = useUnit({
    value: ownFilter.value,
    checked: ownFilter.checked,
    toggle: ownFilter.toggle
  })

  return (
    <FilterItem value={value as string} checked={checked} onClick={toggle} />
  )
}

const OthersFilter = () => {
  const { value, checked, toggle } = useUnit({
    value: othersFilter.value,
    checked: othersFilter.checked,
    toggle: othersFilter.toggle
  })

  return (
    <FilterItem value={value as string} checked={checked} onClick={toggle} />
  )
}
