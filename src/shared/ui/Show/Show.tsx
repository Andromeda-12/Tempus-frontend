import { ReactNode } from 'react'

interface ShowProps {
  children: ReactNode
  when: boolean
  fallback?: ReactNode
}

export const Show = ({ children, when, fallback }: ShowProps) => {
  return <>{when ? children : fallback || null}</>
}
