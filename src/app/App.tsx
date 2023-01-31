import { RouterProvider } from 'atomic-router-react'
import { useGate } from 'effector-react'
import { LoaderLayout } from '@/widgets/layouts'
import { NotificationHub } from '@/features/notification'
import { AuthGuard } from '@/features/auth/auth-guard'
import { appGate } from '@/shared/routing'
import { router, RoutesView } from './routing'
import './index.css'

export const App = () => {
  useGate(appGate)

  return (
    <RouterProvider router={router}>
      <LoaderLayout>
        <AuthGuard router={router}>
          <RoutesView />
          <NotificationHub />
        </AuthGuard>
      </LoaderLayout>
    </RouterProvider>
  )
}
