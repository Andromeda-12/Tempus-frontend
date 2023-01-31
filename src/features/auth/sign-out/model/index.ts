import { createEvent, sample } from 'effector'
import { authGuard } from '@/features/auth/auth-guard'
import { notificationModel } from '@/features/notification'
import { viewerModel } from '@/entities/viewer'

export const signOut = createEvent()

sample({
  clock: signOut,
  target: viewerModel.signOut
})

sample({
  clock: viewerModel.signOut.doneData,
  target: [viewerModel.signOutViewer, authGuard.removeAuthFromLSFx]
})

sample({
  clock: viewerModel.signOut.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Sign out error',
      message: error.message
    }),
  target: notificationModel.createNotification
})
