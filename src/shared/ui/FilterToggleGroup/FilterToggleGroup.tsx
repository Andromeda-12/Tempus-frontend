import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { FilterItem } from './FilterItem'

type FilterLabels = { [key: string]: string }

interface FilterToggleGroupProps {
  currentValue: string | null
  values: string[]
  labels?: FilterLabels
  onValueChange: (value: string) => void
}

export const FilterToggleGroup = ({
  currentValue,
  values,
  labels,
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
          <FilterItem
            value={getFilterLabel(labels, value)}
            checked={currentValue === value}
          />
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}

const getFilterLabel = (labels: FilterLabels | undefined, value: string) =>
  labels ? labels[value] : value
