import { sample } from 'effector'
import { workspaceModel } from '@/entities/workspace'
import { notificationModel } from '@/features/notification'

sample({
  clock: workspaceModel.createWorkspaceFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Create workspace error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})
