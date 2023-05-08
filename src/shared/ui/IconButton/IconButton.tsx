import clsx from 'clsx'
import { ReactNode } from 'react'
import { Icon, Spinner } from '@/shared/ui'
import styles from './iconButton.module.css'
import React from 'react'

type sizes = 'xs' | 'sm' | 'base' | 'lg' | 'xl'

interface ButtonProps {
  children?: ReactNode
  className?: string
  variant?: 'contained' | 'outline' | 'text'
  shape?: 'square' | 'rounded'
  size?: sizes,
  iconSize?: sizes,
  accent?: boolean
  icon?: string
  withGlow?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'contained',
      size = 'base',
      iconSize,
      accent = false,
      shape = 'square',
      icon,
      withGlow,
      loading,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled || loading}
        className={clsx(
          styles['btn-icon'],
          accent && styles['btn-icon-accent'],
          styles[`btn-icon-${variant}`],
          styles[`btn-icon-${size}`],
          withGlow && styles['btn-icon-glow'],
          disabled && styles['btn-icon-disabled'],
          shape === 'rounded' && styles['btn-icon-rounded'],
          className
        )}
        {...props}
      >
        {loading && <Spinner size={spinnerSizes[size] as sizes} />}

        {!loading && icon && <Icon size={iconSize || size} name={icon} />}

        {children}
      </button>
    )
  }
)

const spinnerSizes = {
  xs: 'xs',
  sm: 'sm',
  base: 'sm',
  lg: 'lg',
  xl: 'lg'
}

IconButton.displayName = 'IconButton'
