import { ReactNode, useEffect, useState } from 'react'
import { Spinner } from '@/shared/ui'
import { useUnit } from 'effector-react'
import { authGuard } from '@/features/auth/auth-guard'

interface LoaderLayoutProps {
  children: ReactNode
}

export const LoaderLayout = ({ children }: LoaderLayoutProps) => {
  const isAuthFromLS = useUnit(authGuard.$isAuthFromLS)
  const isAuthenticated = useUnit(authGuard.$isAuthenticated)

  if (isAuthFromLS === false || isAuthenticated) return <>{children}</>

  return (
    <div className='h-screen flex justify-center items-center'>
      <Spinner className='h-20 w-20 !border-4' />
    </div>
  )
}
