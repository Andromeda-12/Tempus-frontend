import React from 'react'
import { InputProps, Input } from './Input'
import clsx from 'clsx'

interface FormControlProps extends InputProps {
  label?: string
  helperText?: string
}

export const FormControl = React.forwardRef<HTMLInputElement, FormControlProps>(
  ({ label, helperText, ...rest }, ref) => {
    return (
      <div className={clsx('flex flex-col w-full')}>
        {label && (
          <label
            htmlFor={rest.name}
            className={clsx(
              'px-1 pb-2 pt-1 text-sm w-fit text-color-light/80 dark:text-color-dark/80',
              rest.error && 'text-error'
            )}
          >
            {label}
          </label>
        )}

        <Input ref={ref} variant={rest.variant} {...rest} id={rest.name} />

        {helperText && (
          <span
            className={clsx(
              'py-1 text-sm break-words',
              rest.variant === 'outline' && 'px-1',
              rest.error
                ? 'text-error'
                : 'text-color-light/60 dark:text-color-dark/60'
            )}
          >
            {helperText || ' '}
          </span>
        )}
      </div>
    )
  }
)

FormControl.displayName = 'FormControl'
