import { ThemeSwitcher } from '@/features/theme-switcher'
import { ReactNode } from 'react'

interface CenteredLayoutProps {
  children: ReactNode
}

export const CenteredLayout = ({ children }: CenteredLayoutProps) => (
  <div className='h-screen flex flex-col py-4 px-3 md:px-6'>
    <div className='flex justify-end'>
      <ThemeSwitcher />
    </div>

    <div className='h-full w-11/12 lg:w-10/12 xl:w-8/12 mx-auto flex justify-center items-center'>
      {children}
    </div>
  </div>
)
