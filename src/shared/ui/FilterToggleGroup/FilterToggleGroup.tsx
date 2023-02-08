import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { FilterItem } from './FilterItem'

interface FilterToggleGroupProps {
  currentValue: string | null
  values: string[]
  onValueChange: (value: string) => void
}

export const FilterToggleGroup = ({
  currentValue,
  values,
  onValueChange
}: FilterToggleGroupProps) => {
  return (
    <ToggleGroupPrimitive.Root
      value={currentValue || ''}
      type='single'
      className='flex flex-col'
      onValueChange={onValueChange}
    >
      {values.map((value) => (
        <ToggleGroupPrimitive.Item
          key={`group-item-${value}`}
          asChild
          value={value}
        >
          <FilterItem value={value} checked={currentValue === value} />
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}
