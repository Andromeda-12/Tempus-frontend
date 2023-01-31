import clsx from 'clsx'
import { useEffect, useState } from 'react'

interface SpinnerProps {
  className?: string
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  accent?: boolean
}

const sizeMap = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-4 h-4',
  base: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-16 h-16 border-4'
}

export const Spinner = ({ className, accent, size = 'base' }: SpinnerProps) => {
  const [isBreadSpinner, setIsBreadSpinner] = useState(false)

  useEffect(() => {
    const random = Math.random() < 0.05
    setIsBreadSpinner(random)
  }, [])

  if (isBreadSpinner)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src='bread.jpg'
        alt='s'
        className='rounded-full object-cover h-44 w-44 animate-spin'
      />
    )

  return (
    <div
      className={clsx(
        'inline-block border-2 border-gray-600 border-l-gray-200 border-t-gray-200 animate-spin rounded-full',
        sizeMap[size],
        accent && '!border-l-accent !border-t-accent border-accent/50',
        className
      )}
      role='status'
    >
      <span className='sr-only'>Loading...</span>
    </div>
  )
}
