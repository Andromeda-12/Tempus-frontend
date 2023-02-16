import { createEvent, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { viewerModel } from '@/entities/viewer'
import { UpdateUserDto } from '@/shared/api'

export const updateViewer = createEvent<UpdateUserDto>()

sample({
  clock: updateViewer,
  target: viewerModel.updateViewerFx
})

sample({
  clock: viewerModel.updateViewerFx.doneData,
  target: viewerModel.setViewer
})

sample({
  clock: viewerModel.updateViewerFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Update user info error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})
