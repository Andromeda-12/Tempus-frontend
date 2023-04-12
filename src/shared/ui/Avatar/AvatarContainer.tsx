import { ReactNode } from 'react'
import clsx from 'clsx'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

interface AvatarContainerProps {
  className?: string
  children: ReactNode
  variant?: 'circle' | 'rounded'
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'full'
}

export const AvatarContainer = ({
  className,
  children,
  size = 'base',
  variant = 'circle'
}: AvatarContainerProps) => {
  return (
    <AvatarPrimitive.Root
      className={clsx(
        'relative inline-flex',
        {
          ['circle']: 'rounded-full',
          ['rounded']: 'rounded'
        }[variant],
        avatarSizes[size],
        className
      )}
    >
      {children}
    </AvatarPrimitive.Root>
  )
}

const avatarSizes = {
  sm: 'h-6 w-6',
  base: 'h-8 w-8',
  lg: 'h-32 w-32',
  xl: 'h-40 w-40',
  full: 'h-56 w-56'
}
