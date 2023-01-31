import { createEvent, createStore, sample } from 'effector'
import { viewerModel } from '@/entities/viewer'
import { notificationModel } from '@/features/notification'
// import { AuthUserDto } from '@/shared/api'

export const redirect = createEvent()
export const sendEmail = createEvent<AuthUserDto>()
export const $isLoading = viewerModel.changePasswordFx.pending
export const $isEmailSenden = createStore(false)

export const changePassword = createEvent<{}>()

sample({
  clock: sendEmail,
  target: viewerModel.sendEmailForChangePassword
})

sample({
  clock: viewerModel.sendEmailForChangePassword.done,
  fn: () => true,
  target: $isEmailSenden
})

sample({
  clock: changePassword,
  target: viewerModel.changePasswordFx
})

sample({
  clock: viewerModel.changePasswordFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Send email error',
      message: error.message
    }),
  target: notificationModel.createNotification
})

sample({
  clock: viewerModel.changePasswordFx.doneData,
  target: redirect
})
