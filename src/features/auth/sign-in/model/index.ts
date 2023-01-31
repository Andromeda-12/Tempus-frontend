import { createEvent, sample } from 'effector'
import { authGuard } from '@/features/auth/auth-guard'
import { notificationModel } from '@/features/notification'
import { viewerModel } from '@/entities/viewer'
import { AuthUserDto } from '@/shared/api'
import { workspacesRoute } from '@/shared/routing'
import { redirect } from 'atomic-router'

export const redirectToDashboard = createEvent()
export const signIn = createEvent<AuthUserDto>()
export const $isLoading = viewerModel.signInFx.pending

sample({
  clock: signIn,
  target: viewerModel.signInFx
})

sample({
  clock: viewerModel.signInFx.doneData,
  target: [
    viewerModel.setViewer,
    authGuard.setAuthToLSFx,
    redirect({
      route: workspacesRoute
    })
  ]
})

sample({
  clock: viewerModel.signInFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Sign in error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})

sample({
  clock: viewerModel.signInFx.doneData,
  target: redirectToDashboard
})

redirect({
  clock: redirectToDashboard,
  route: workspacesRoute
})
