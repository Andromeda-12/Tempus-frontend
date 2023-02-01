import { Checkbox } from '../Checkbox'

interface FilterItemProps {
  checked: boolean
  value: string
  onClick: () => void
}

export const FilterItem = ({ checked, value, onClick }: FilterItemProps) => {
  return (
    <div
      className='flex items-center hover:bg-secondary dark:hover:bg-primary-hover py-3 cursor-pointer px-4 space-x-3'
      onClick={onClick}
    >
      <Checkbox checked={checked} />
      <span className='w-full cursor-pointer text-sm'>{value}</span>
    </div>
  )
}
