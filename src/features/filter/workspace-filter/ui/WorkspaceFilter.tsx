import { Filter, FilterItem, Icon } from '@/shared/ui'
import { useUnit } from 'effector-react'
import { $currentFilter, ownFilter, othersFilter } from '../model'
import { useState } from 'react'
import clsx from 'clsx'

export const WorkspaceFilter = ({ className }) => {
  const currentFilter = useUnit($currentFilter)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Filter
      onOpenChange={setIsOpen}
      className={clsx(className, 'z-50 w-44')}
      trigger={
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
      }
    >
      <OwnFilter />
      <OthersFilter />
    </Filter>
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
