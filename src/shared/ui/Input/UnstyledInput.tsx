import React, { ReactNode, useState } from 'react'
import clsx from 'clsx'
import { Icon } from '../Icon'
import styles from './input.module.css'

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'> {
  size?: 'sm' | 'xl' | 'base' | 'xs' | 'lg'
  placeholder?: string
  className?: string
  type?: 'text' | 'password'
  passwordIconStyle?: string
  containerStyles?: string
  inputStyles?: string
  startIconStyles?: string
  iconWrapperStyles?: string
  endIconStyles?: string
  startIconName?: string
  endIconName?: string
  error?: boolean
  ref?: React.ForwardedRef<HTMLInputElement>
}

export const UnstyledInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      size = 'base',
      placeholder,
      className,
      passwordIconStyle,
      containerStyles,
      inputStyles,
      startIconName,
      startIconStyles,
      iconWrapperStyles,
      endIconStyles,
      endIconName,
      error,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div
        tabIndex={0}
        className={clsx(
          styles['input-wrapper'],
          error && styles.error,
          containerStyles,
          className
        )}
      >
        {startIconName && (
          <IconWrapper
            position='start'
            disabled={rest.disabled || false}
            error={error || false}
            startIconStyles={startIconStyles}
            iconWrapperStyles={iconWrapperStyles}
          >
            <Icon size={size} name={startIconName} />
          </IconWrapper>
        )}

        <input
          {...rest}
          ref={ref}
          className={clsx(
            styles.input,
            styles[sizes[size]],
            error && styles.error,
            inputStyles
          )}
          tabIndex={-1}
          type={type === 'password' && !showPassword ? 'password' : 'text'}
          placeholder={placeholder}
        />

        {endIconName && type !== 'password' && (
          <IconWrapper
            position='end'
            disabled={rest.disabled || false}
            error={error || false}
            endIconStyles={endIconStyles}
            iconWrapperStyles={iconWrapperStyles}
          >
            <Icon size={size} name={endIconName} />
          </IconWrapper>
        )}

        {type === 'password' && (
          <IconWrapper
            position='end'
            disabled={rest.disabled || false}
            error={error || false}
            endIconStyles={endIconStyles}
            iconWrapperStyles={iconWrapperStyles}
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon
              size={size}
              name={showPassword ? 'eye' : 'eye-slash'}
              className={clsx(passwordIconStyle, 'cursor-pointer')}
            />
          </IconWrapper>
        )}
      </div>
    )
  }
)

UnstyledInput.displayName = 'UnstyledInput'

interface IconWrapperProps {
  children: ReactNode
  error: boolean
  disabled: boolean
  position: 'start' | 'end'
  startIconStyles?: string
  endIconStyles?: string
  iconWrapperStyles?: string
  onClick?: () => void
}

const IconWrapper = ({
  children,
  error,
  disabled,
  position,
  startIconStyles,
  endIconStyles,
  iconWrapperStyles,
  onClick
}: IconWrapperProps) => (
  <div
    className={clsx(
      styles['input-icon'],
      position === 'start' && startIconStyles,
      position === 'end' && endIconStyles,
      disabled && styles['input-icon-disabled'],
      error && styles.error,
      iconWrapperStyles
    )}
    onClick={onClick}
  >
    {children}
  </div>
)

const sizes = {
  xs: 'input-xs',
  sm: 'input-sm',
  base: '',
  lg: 'input-lg',
  xl: 'input-xl'
}
