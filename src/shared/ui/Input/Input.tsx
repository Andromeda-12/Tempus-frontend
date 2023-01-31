import React from 'react'
import { OutlinedInput } from './OutlinedInput'
import { StandardInput } from './StandardInput'
import { InputProps as BaseInputProps, UnstyledInput } from './UnstyledInput'

export interface InputProps extends BaseInputProps {
  variant?: 'outline' | 'standard' | 'unstyled'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant, ...rest }, ref) => {
    if (variant === 'standard') return <StandardInput {...rest} />
    if (variant === 'unstyled') return <UnstyledInput {...rest} />

    return <OutlinedInput ref={ref} {...rest} />
  }
)

Input.displayName = 'Input'
