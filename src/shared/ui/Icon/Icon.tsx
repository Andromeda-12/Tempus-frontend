import clsx from 'clsx'

interface IconProps {
  name: string
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  xs: 'w-5 h-5',
  sm: 'w-5 h-5',
  base: 'w-6 h-6',
  lg: 'w-7 h-7',
  xl: 'w-8 h-8'
}

export const Icon = ({
  name,
  size = 'base',
  className,
  ...props
}: IconProps) => {
  const fileName = 'iconsSprite.svg'

  return (
    <svg
      focusable='false'
      aria-hidden={true}
      className={clsx(
        'select-none fill-current inline-block text-inherit',
        sizeMap[size],
        className
      )}
      {...props}
    >
      <use xlinkHref={`/${fileName}#${name}`} />
    </svg>
  )
}
