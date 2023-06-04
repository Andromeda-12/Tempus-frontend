import clsx from 'clsx'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

interface AvatarFallbackProps {
  fallback: string
  variant: 'circle' | 'rounded'
  size: 'sm' | 'base' | 'lg' | 'xl' | 'full'
}

export const AvatarFallback = ({
  fallback,
  variant,
  size
}: AvatarFallbackProps) => {
  return (
    <AvatarPrimitive.Fallback
      className={clsx(
        'flex absolute h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700',
        {
          ['circle']: 'rounded-full',
          ['rounded']: 'rounded'
        }[variant]
      )}
      delayMs={100}
    >
      <span
        className={clsx(
          'font-medium uppercase text-gray-700 dark:text-gray-400 select-none',
          fallbackSize[size]
        )}
      >
        {fallback}
      </span>
    </AvatarPrimitive.Fallback>
  )
}

const fallbackSize = {
  sm: 'text-xs',
  base: 'text-sm',
  lg: 'text-base',
  xl: 'text-7xl',
  full: 'text-8xl'
}
