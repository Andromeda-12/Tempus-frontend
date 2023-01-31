import { createEvent, sample } from 'effector'
import { redirect } from 'atomic-router'
import { authGuard } from '@/features/auth/auth-guard'
import { notificationModel } from '@/features/notification'
import { viewerModel } from '@/entities/viewer'
import { CreateUserDto } from '@/shared/api'
import { workspacesRoute } from '@/shared/routing'

export const signUp = createEvent<CreateUserDto>()

export const $isLoading = viewerModel.signUpFx.pending

sample({
  clock: signUp,
  target: viewerModel.signUpFx
})

sample({
  clock: viewerModel.signUpFx.doneData,
  target: [
    viewerModel.setViewer,
    authGuard.setAuthToLSFx,
    redirect({
      route: workspacesRoute
    })
  ]
})

sample({
  clock: viewerModel.signUpFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Sign up error',
      message: error.message
    }),
  target: notificationModel.createNotification
})
