import { ReactNode } from 'react'
import clsx from 'clsx'

export const WorkspacePopover = ({ actions }: { actions: ReactNode }) => {
  return (
    <div
      className={clsx(
        'rounded-lg flex overflow-hidden shadow-lg shadow-background-dark/20 dark:shadow-background-dark',
        'bg-white dark:bg-neutral',
        'absolute -bottom-11 right-0 z-50 w-32'
      )}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      {actions}
    </div>
  )
}
