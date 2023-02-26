import { PropsWithClassName } from '@/shared/lib'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import clsx from 'clsx'

export interface TabTriggerProps extends PropsWithClassName {
  value: string
  title: string
}

export const Trigger = ({ className, value, title }: TabTriggerProps) => {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={clsx(
        'group duration-150',
        'first:rounded-tl-xl last:rounded-tr-xl',
        'border-b border-gray-300 dark:border-gray-600',
        'radix-state-active:border-b-gray-700 dark:radix-state-active:border-b-gray-100',
        'outline-none',
        'px-6 py-2.5',
        className
      )}
    >
      <span
        className={clsx(
          'text-sm font-medium',
          'text-gray-700 dark:text-gray-100'
        )}
      >
        {title}
      </span>
    </TabsPrimitive.Trigger>
  )
}
