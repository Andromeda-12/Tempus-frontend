import { ReactNode, Suspense } from 'react'
import { ThemeSwitcher } from '@/features/theme-switcher'

interface AuthLayoutProps {
  children: ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className='h-screen flex flex-col py-4 px-3 md:px-6'>
    <div className='flex justify-end'>
      <ThemeSwitcher />
    </div>

    <div className='h-full w-11/12 lg:w-10/12 xl:w-8/12 mx-auto flex justify-center lg:justify-between items-center'>
      <div className='max-w-sm hidden lg:block'>
        <h1 className='text-7xl font-bold mb-10 relative -left-3'>Tempus</h1>

        <div className='text-3xl text-gray-500'>
          Tempus nihil aliud est quam numerus motus secundum prioribus et
          posterioribus...*
        </div>
      </div>

      {children}

      <div className='text-sm absolute left-2 bottom-2 text-gray-500 mt-5'>
        *Time is nothing but the number of movements according to previous and
        subsequent...
      </div>
    </div>
  </div>
)
