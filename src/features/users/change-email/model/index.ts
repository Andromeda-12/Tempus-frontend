import { createEffect, createEvent, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { viewerModel } from '@/entities/viewer'
import { ApiError, UserService } from '@/shared/api'
import { createModal } from '@/shared/lib'

const sendChangeEmailMailFx = createEffect<string, void, ApiError>()

export const sendChangeEmailMail = createEvent()

export const $isPending = sendChangeEmailMailFx.pending

export const confirmModal = createModal()

sample({
  clock: sendChangeEmailMail,
  source: viewerModel.$viewer,
  filter: Boolean,
  fn: (viewer) => viewer.email,
  target: sendChangeEmailMailFx
})

sample({
  clock: sendChangeEmailMailFx.done,
  fn: () =>
    notificationModel.createNotificationBody({
      type: 'success',
      title: 'Change email',
      message: 'We sent an email to your current email'
    }),
  target: notificationModel.createNotification
})

sample({
  clock: sendChangeEmailMailFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Change email error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})

sample({
  clock: sendChangeEmailMailFx.finally,
  target: confirmModal.closeModal
})
