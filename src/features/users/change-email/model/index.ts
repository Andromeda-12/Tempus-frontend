import { createEffect, createEvent, createStore, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { ApiError, UserService } from '@/shared/api'
import { createModal } from '@/shared/lib'

const sendChangeEmailLetterFx = createEffect<
  {
    email: string
  },
  void,
  ApiError
>(
  async ({ email }) =>
    await UserService.userControllerChangeMail({
      email
    })
)

export const sendChangeEmailLetter = createEvent<{
  email: string
}>()

export const letterSentMessageModal = createModal()

export const $isPending = sendChangeEmailLetterFx.pending
export const $isLetterSent = createStore(false)
  .on(sendChangeEmailLetterFx.done, () => true)
  .reset(letterSentMessageModal.closeModal)

sample({
  clock: sendChangeEmailLetter,
  target: sendChangeEmailLetterFx
})

sample({
  clock: sendChangeEmailLetterFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Change email error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})
