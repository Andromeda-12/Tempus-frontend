import { Root as CheckboxRoot, Indicator } from '@radix-ui/react-checkbox'
import { Label } from '@radix-ui/react-label'
import clsx from 'clsx'
import React from 'react'

const CheckIcon = ({ className }: { className: string }) => (
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

interface CheckboxProps {
  className?: string
  name?: string
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange?: () => void
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, name, label, checked, disabled, onChange, ...rest }, ref) => {
    return (
      <div className={clsx('flex', className)}>
        <CheckboxRoot
          {...rest}
          id={name}
          onCheckedChange={onChange}
          checked={checked}
          disabled={disabled}
          className={clsx(
            'flex h-5 w-5 items-center justify-center rounded',
            'border-2',
            'focus:outline-none focus-visible:ring ring-primary dark:ring-secondary ring-offset-2 dark:ring-offset-neutral focus-visible:ring-opacity-75',
            'disabled:radix-state-checked:bg-primary/50 disabled:cursor-not-allowed'
          )}
        >
          <Indicator>
            <CheckIcon className='h-4 w-4 self-center text-slate-800 dark:text-white' />
          </Indicator>
        </CheckboxRoot>

        {label && (
          <Label htmlFor={name} className='ml-3 cursor-pointer text-sm'>
            {label}
          </Label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
