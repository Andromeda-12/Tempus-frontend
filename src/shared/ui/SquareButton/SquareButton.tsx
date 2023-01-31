import clsx from 'clsx'
import { ReactNode } from 'react'
import { Icon, Spinner } from '@/shared/ui'
import styles from './squareButton.module.css'
import React from 'react'

type sizes = 'xs' | 'sm' | 'base' | 'lg' | 'xl'

interface ButtonProps {
  children?: ReactNode
  className?: string
  variant?: 'contained' | 'outline' | 'text'
  size?: sizes
  accent?: boolean
  icon?: string
  withGlow?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const SquareButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'contained',
      size = 'base',
      accent = false,
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
        onClick={onClick}
        disabled={disabled || loading}
        className={clsx(
          styles['btn-square'],
          accent && styles['btn-square-accent'],
          styles[`btn-square-${variant}`],
          styles[`btn-square-${size}`],
          withGlow && styles['btn-square-glow'],
          disabled && styles['btn-square-disabled'],
          className
        )}
      >
        {loading && (
          <Spinner className={clsx('')} size={spinnerSizes[size] as sizes} />
        )}

        {!loading && icon && (
          <Icon className={clsx(className)} size={size} name={icon} />
        )}

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

SquareButton.displayName = 'SquareButton'
