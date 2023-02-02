import clsx from 'clsx'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  withHover?: boolean
}

export const Card = ({ children, className, withHover }: CardProps) => {
  return (
    <div
      className={clsx(
        'bg-white text-black dark:text-white dark:bg-neutral shadow-md rounded-xl dark:border-gray-700 overflow-hidden',
        {
          'cursor-pointer hover:scale-102 hover:z-10 duration-150': withHover
        },
        className
      )}
    >
      {children}
    </div>
  )
}
