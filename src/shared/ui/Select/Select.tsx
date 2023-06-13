import clsx from 'clsx'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Button } from '../Button'
import { Icon } from '../Icon'

interface SelectProps {
  values: string[]
  value?: string
  placeholder?: string
  className?: string
  onValueChange: (value: string) => void
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={3}
    stroke='currentColor'
    className={clsx('', className)}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M4.5 12.75l6 6 9-13.5'
    />
  </svg>
)

export const Select = ({
  values,
  value,
  placeholder,
  className,
  onValueChange
}: SelectProps) => {
  return (
    <SelectPrimitive.Root
      defaultValue={value}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectPrimitive.Trigger asChild>
        <Button
          className={clsx(
            'border py-1 px-4 text-sm text-color-light dark:text-color-dark hover:bg-secondary dark:hover:bg-neutral',
            className
          )}
          dense
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className='ml-2'>
            <Icon name='chevronDown' size='xs' />
          </SelectPrimitive.Icon>
        </Button>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Content>
        <SelectPrimitive.ScrollUpButton className='flex items-center justify-center text-gray-700 dark:text-gray-300'>
          <Icon name='chevronDown' className='rotate-180' />
        </SelectPrimitive.ScrollUpButton>

        <SelectPrimitive.Viewport className='bg-white dark:bg-neutral p-2 rounded-lg shadow-lg'>
          <SelectPrimitive.Group>
            {values.map((f, i) => (
              <SelectPrimitive.Item
                disabled={f === 'Grapes'}
                key={`${f}-${i}`}
                value={f}
                className={clsx(
                  'relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 font-medium focus:bg-accent',
                  'radix-disabled:opacity-50',
                  'focus:outline-none select-none'
                )}
              >
                <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className='absolute left-2 inline-flex items-center'>
                  <CheckIcon className='h-4 w-4 self-center text-slate-800 dark:text-white' />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>

        <SelectPrimitive.ScrollDownButton className='flex items-center justify-center text-gray-700 dark:text-gray-300'>
          <Icon name='chevronDown' />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}
