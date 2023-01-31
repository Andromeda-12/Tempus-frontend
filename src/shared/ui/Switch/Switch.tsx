import { ReactNode } from 'react'
import {
  Root as SwitchRoot,
  Thumb as SwitchThumb
} from '@radix-ui/react-switch'
import clsx from 'clsx'

interface LabelProps {
  children: ReactNode
  className?: string
  htmlFor?: string
}

import { Label } from '@radix-ui/react-label'

// const Label = ({ children, className, htmlFor }: LabelProps) => (
//   <label htmlFor={htmlFor} className={clsx('', className)}>
//     {children}
//   </label>
// )

interface SwitchProps {
  name?: string
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange?: () => void
}

export const Switch = ({
  name,
  label,
  checked,
  disabled,
  onChange
}: SwitchProps) => {
  return (
    <div className='flex items-center'>
      <SwitchRoot
        id={name}
        disabled={disabled}
        checked={checked}
        onCheckedChange={onChange}
        className={clsx(
          'group',
          'radix-state-checked:bg-primary/80',
          'radix-state-unchecked:bg-gray-200 dark:radix-state-unchecked:bg-gray-700',
          'relative inline-flex h-[24px] w-[44px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
          'focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:ring-opacity-75',
          'disabled:radix-state-checked:bg-primary/50 disabled:cursor-not-allowed'
        )}
      >
        <SwitchThumb
          className={clsx(
            'group-radix-state-checked:translate-x-5',
            'group-radix-state-unchecked:translate-x-0',
            'pointer-events-none inline-block h-[19px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
            'radix-disabled:bg-white/60'
          )}
        />
      </SwitchRoot>

      {label && <Label htmlFor={name} className='ml-3 cursor-pointer'>{label}</Label>}
    </div>
  )
}

// {checked ? (
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       fill='none'
//       viewBox='0 0 24 24'
//       strokeWidth={1.5}
//       stroke='currentColor'
//       className='w-4 h-4 text-black mt-[2px] ml-[1px]'
//     >
//       <path
//         d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
//         strokeLinecap='round'
//         strokeLinejoin='round'
//       />
//     </svg>
//   ) : (
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       fill='none'
//       viewBox='0 0 24 24'
//       strokeWidth={1.5}
//       stroke='currentColor'
//       className='w-4 h-4 text-black mt-[2px] ml-[1px]'
//     >
//       <path
//         d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
//         strokeLinecap='round'
//         strokeLinejoin='round'
//       />
//     </svg>
//   )}
