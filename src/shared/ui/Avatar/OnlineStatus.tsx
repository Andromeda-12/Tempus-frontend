import clsx from 'clsx'

interface OnlineStatusProps {
  className?: string
  variant: 'circle' | 'rounded'
  size?: 'sm' | 'base' | 'lg' | 'xl' | 'full'
}

export const OnlineStatus = ({
  className,
  variant = 'circle',
  size = 'base'
}: OnlineStatusProps) => (
  <div
    className={clsx(
      'absolute bottom-0 right-0',
      onlineStatusSize[size],
      {
        ['circle']: circleVariantPosition[size],
        ['rounded']: ''
      }[variant],
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

const onlineStatusSize = {
  sm: 'h-1.5 w-1.5',
  base: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
  xl: 'h-3 w-3',
  full: 'h-9 w-9'
}

const circleVariantPosition = {
  sm: '-translate-y-[1px] -translate-x-[1px]',
  base: '-translate-y-[1px] -translate-x-[1px]',
  lg: '-translate-y-[1px] -translate-x-[2px]',
  xl: '-translate-y-[1px] -translate-x-[2px]',
  full: '-translate-y-2 -translate-x-5'
}
