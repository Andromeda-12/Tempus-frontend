import clsx from 'clsx'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

const avatarSizes = {
  sm: 'h-6 w-6',
  base: 'h-8 w-8',
  lg: 'h-10 w-10',
  xl: 'h-12 w-12',
  full: 'h-56 w-56'
}

const fallbackSize = {
  sm: 'text-xs',
  base: 'text-sm',
  lg: 'text-base',
  xl: 'text-xl',
  full: 'text-8xl'
}

const onlineStatusSize = {
  sm: 'h-1.5 w-1.5',
  base: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
  xl: 'h-3 w-3',
  full: 'h-9 w-9'
}

const circleVariantOnlineStatusSize = {
  sm: '-translate-y-[1px] -translate-x-[1px]',
  base: '-translate-y-[1px] -translate-x-[1px]',
  lg: '-translate-y-[1px] -translate-x-[2px]',
  xl: '-translate-y-[1px] -translate-x-[2px]',
  full: '-translate-y-2 -translate-x-5'
}

interface AvatarProps {
  className?: string
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'full'
  src?: string
  variant?: 'circle' | 'rounded'
  isOnline?: boolean
  fallback?: string
  fallbackDelay?: number
}

export const Avatar = ({
  className,
  src,
  variant = 'circle',
  size = 'base',
  fallback = 'AF',
  fallbackDelay,
  isOnline
}: AvatarProps) => {
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
      <AvatarPrimitive.Image
        src={src}
        alt='Avatar'
        className={clsx(
          'h-full w-full object-cover',
          {
            ['circle']: 'rounded-full',
            ['rounded']: 'rounded'
          }[variant]
        )}
      />

      {isOnline && (
        <OnlineStatus
          size={size}
          className={clsx(
            {
              ['circle']: circleVariantOnlineStatusSize[size],
              ['rounded']: ''
            }[variant]
          )}
        />
      )}

      <AvatarPrimitive.Fallback
        className={clsx(
          'flex h-full w-full items-center justify-center bg-gray-200/60 dark:bg-gray-700',
          {
            ['circle']: 'rounded-full',
            ['rounded']: 'rounded'
          }[variant]
        )}
        delayMs={100}
      >
        <span
          className={clsx(
            'font-medium uppercase text-gray-700 dark:text-gray-400',
            fallbackSize[size]
          )}
        >
          {fallback}
        </span>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}

interface OnlineStatusProps {
  className?: string
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'full'
}

const OnlineStatus = ({ className, size = 'base' }: OnlineStatusProps) => (
  <div
    className={clsx(
      'absolute bottom-0 right-0',
      onlineStatusSize[size],
      className
    )}
  >
    <span
      className={clsx(
        'block rounded-full bg-green-400',
        onlineStatusSize[size]
      )}
    />
  </div>
)
