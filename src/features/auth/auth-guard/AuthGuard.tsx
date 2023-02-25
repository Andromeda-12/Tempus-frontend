import { ReactNode } from 'react'
import { authGuard } from '@/features/auth/auth-guard'
import { goToDashboard, goToSignIn } from '@/features/auth/auth-guard/model'
import { useUnit } from 'effector-react'
import { Store } from 'effector'

export const AuthGuard = ({
  children,
  router
}: {
  children: ReactNode
  router: { $path: Store<string> }
}) => {
  const isAuthenticated = useUnit(authGuard.$isAuthenticated)
  const goToDashboardFn = useUnit(goToDashboard)
  const goToSignInFn = useUnit(goToSignIn)

  const route = useUnit(router.$path)

  const publicRoutes = ['/signin', '/signup', '/forget-password', '/recovery-password']

  if (isAuthenticated && publicRoutes.includes(route)) goToDashboardFn()
  if (!isAuthenticated && !publicRoutes.includes(route)) goToSignInFn()

  return <>{children}</>
}
