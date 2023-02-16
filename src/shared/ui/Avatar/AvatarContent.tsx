import clsx from 'clsx'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { OnlineStatus } from './OnlineStatus'
import { AvatarFallback } from './AvatarFallback'

interface AvatarContentProps {
  src?: string
  variant: 'circle' | 'rounded'
  size: 'sm' | 'base' | 'lg' | 'xl' | 'full'
  fallback: string
  fallbackDelay?: number
  isOnline?: boolean
}

export const AvatarContent = ({
  src,
  variant,
  size,
  fallback,
  fallbackDelay,
  isOnline
}: AvatarContentProps) => {
  return (
    <>
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

      {isOnline && <OnlineStatus size={size} variant={variant} />}

      <AvatarFallback fallback={fallback} variant={variant} size={size} />
    </>
  )
}
