import { createEffect, createEvent, createStore, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import {
  ApiError,
  AuthService,
  ForgetPasswordDto,
  RecoveryPasswordDto
} from '@/shared/api'
import { recoveryPasswordRoute } from '@/shared/routing'

const sendEmailForChangePasswordFx = createEffect<
  ForgetPasswordDto,
  void,
  ApiError
>(async (forgetPasswordDto) =>
  AuthService.authControllerForgetPassword(forgetPasswordDto)
)
const recoveryPasswordFx = createEffect<
  {
    token: string
    recoveryPasswordDto: RecoveryPasswordDto
  },
  void,
  ApiError
>(async ({ token, recoveryPasswordDto }) => {
  await AuthService.authControllerRecoveryPassword(token, recoveryPasswordDto)
})

export const sendEmail = createEvent<ForgetPasswordDto>()
export const $isEmailSending = sendEmailForChangePasswordFx.pending
export const $isEmailSended = createStore(false).on(
  sendEmailForChangePasswordFx.doneData,
  () => true
)

export const recoveryPassword = createEvent<RecoveryPasswordDto>()
export const $isPasswordSending = recoveryPasswordFx.pending
export const $isPasswordChanged = createStore(false).on(
  recoveryPasswordFx.done,
  () => true
)

sample({
  clock: sendEmail,
  target: sendEmailForChangePasswordFx
})

sample({
  clock: sendEmailForChangePasswordFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Send email error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})

sample({
  clock: recoveryPassword,
  source: recoveryPasswordRoute.$query,
  fn: (query, recoveryPasswordDto) => ({
    token: query.token,
    recoveryPasswordDto
  }),
  target: recoveryPasswordFx
})

sample({
  clock: recoveryPasswordFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Change password error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})
