import { createEffect, createEvent, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { ApiError, ChangeUserPasswordDto, UserService } from '@/shared/api'
import { createModal } from '@/shared/lib'

const changePasswordFx = createEffect<ChangeUserPasswordDto, void, ApiError>(
  async (changeUserPasswordDto: ChangeUserPasswordDto) =>
    UserService.userControllerChangePassword(changeUserPasswordDto)
)

export const changePassword = createEvent<ChangeUserPasswordDto>()
export const $isPending = changePasswordFx.pending

export const changePasswordModal = createModal()

sample({
  clock: changePassword,
  target: changePasswordFx
})

sample({
  clock: changePasswordFx.doneData,
  fn: () =>
    notificationModel.createNotificationBody({
      type: 'success',
      title: 'Change password success',
      message: 'Password has been changed successfully'
    }),
  target: notificationModel.createNotification
})

sample({
  clock: changePasswordFx.done,
  target: changePasswordModal.closeModal
})

sample({
  clock: changePasswordFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Change password error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})

createModal()
