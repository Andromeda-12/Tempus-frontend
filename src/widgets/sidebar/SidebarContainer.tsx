import { ReactNode } from 'react'
import clsx from 'clsx'

export const SidebarContainer = ({
  children,
  open,
  className
}: {
  children: ReactNode
  open: boolean
  className: string
}) => (
  <aside
    className={clsx(open ? 'w-64' : 'w-16', 'duration-300 h-full', className)}
    aria-label='Sidebar'
  >
    <div className='h-full flex flex-col overflow-y-auto overflow-hidden pt-16 md:py-4 px-2 bg-gray-50 shadow-xl dark:bg-neutral md:rounded-tr-3xl'>
      {children}
    </div>
  </aside>
)
