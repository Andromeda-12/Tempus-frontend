import { ReactNode, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { Sidebar } from '@/widgets/sidebar'
import { HamburgerButton } from '@/shared/ui'

interface SidebarLayout {
  children: ReactNode
}

export const SidebarLayout = ({ children }: SidebarLayout) => {
  let defaultOpened = localStorage.getItem('isSidebarOpen') === 'true'
  const [open, setOpen] = useState(defaultOpened)

  const ref = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    localStorage.setItem('isSidebarOpen', `${!open}`)
    setOpen(!open)
  }

  useEffect(() => {
    if (localStorage.getItem('isSidebarOpen') === 'true') return setOpen(true)
    setOpen(false)

    const test = (e: TouchEvent) => {
      if (ref.current) !ref.current.contains(e.target as Node) && setOpen(false)
    }

    document.addEventListener('touchstart', test)
    return () => window.removeEventListener('touchstart', test)
  }, [])
  // flex flex-col md:flex-row
  return (
    <div className='h-full'>
      <div
        className={clsx(
          'z-40 fixed h-full',
          open ? 'w-64' : 'w-16',
          'duration-300'
        )}
        ref={ref}
      >
        <div className='fixed flex px-3 items-center md:hidden z-20 h-16 dark:bg-neutral w-full'>
          <HamburgerButton open={open} onClick={handleToggle} />
        </div>
        <Sidebar
          className={clsx(open ? 'w-64' : 'hidden md:block w-16')}
          open={open}
          onToggle={handleToggle}
        />
      </div>

      <div
        className={clsx(
          'z-0 w-full h-full duration-300 flex flex-1',
          open ? 'md:pl-64' : 'md:pl-16'
        )}
      >
        <div className='md:mt-0 py-5 px-3 pt-20 md:py-0 md:px-5 mx-auto flex-1'>
          {children}
        </div>
      </div>
    </div>
  )
}
