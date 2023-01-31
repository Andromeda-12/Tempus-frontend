import { useEffect, useState } from 'react'
import { Root as ProgressRoot, Indicator } from '@radix-ui/react-progress'
import clsx from 'clsx'

interface ProgressProps {
  className?: string
  value?: number
  color?: string
  rounded?: boolean
  indicatorColor?: string
}

export const Progress = ({
  className,
  value = 0,
  color,
  rounded = true,
  indicatorColor
}: ProgressProps) => {
  const [progress, setProgress] = useState(value)

  useEffect(() => {
    if (value < 0 || value > 100) return
    setProgress(value)
  }, [value])

  return (
    <ProgressRoot
      value={progress}
      className={clsx(
        'h-3 w-full overflow-hidden',
        !color ? 'bg-slate-200 dark:bg-gray-600' : color,
        rounded && 'rounded-full',
        className
      )}
    >
      <Indicator
        style={{ width: `${progress}%` }}
        className={clsx(
          'h-full duration-300 ease-in-out ',
          !indicatorColor ? 'bg-primary dark:bg-primary' : indicatorColor
        )}
      />
    </ProgressRoot>
  )
}
