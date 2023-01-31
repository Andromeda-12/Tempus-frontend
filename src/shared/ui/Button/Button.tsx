import React from 'react'
import clsx from 'clsx'
import { Icon, Spinner } from '@/shared/ui'
import styles from './button.module.css'

export interface ButtonProps
  extends Omit<React.ComponentProps<'button'>, 'size'> {
  variant?: 'contained' | 'outline' | 'text'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  dense?: boolean
  accent?: boolean
  startIcon?: string
  endIcon?: string
  withGlow?: boolean
  loading?: boolean
  disabled?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'contained',
      size = 'base',
      accent = false,
      dense,
      startIcon,
      endIcon,
      withGlow,
      loading,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        disabled={disabled || loading}
        className={clsx(
          styles.btn,
          accent && styles['btn-accent'],
          styles[`btn-${variant}`],
          styles[sizes[size]],
          dense && styles.dense,
          withGlow && styles['btn-glow'],
          disabled && styles['btn-disabled'],
          className
        )}
      >
        {loading && (
          <Spinner
            className={clsx('mr-2')}
            // accent={accent}
            size={spinnerSizes[size] as 'xs' | 'sm' | 'base' | 'lg' | 'xl'}
          />
        )}

        {startIcon && (
          <Icon
            className={clsx(startIconStyles[size])}
            size={size}
            name={startIcon}
          />
        )}

        {children}

        {endIcon && (
          <Icon
            className={clsx(endIconStyles[size])}
            size={size}
            name={endIcon}
          />
        )}
      </button>
    )
  }
)

const sizes = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  base: '',
  lg: 'btn-lg',
  xl: 'btn-xl'
}

const spinnerSizes = {
  xs: 'xs',
  sm: 'sm',
  base: 'sm',
  lg: 'lg',
  xl: 'lg'
}

const startIconStyles = {
  xs: 'mr-1',
  sm: 'mr-1.5',
  base: 'mr-2',
  lg: 'mr-2',
  xl: 'mr-3'
}

const endIconStyles = {
  xs: 'ml-1',
  sm: 'ml-1.5',
  base: 'ml-2',
  lg: 'ml-2',
  xl: 'ml-3'
}

Button.displayName = 'Button'
