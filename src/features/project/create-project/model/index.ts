import { createEvent, restore, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { projectModel } from '@/entities/project'
import { createModal } from '@/shared/lib'
import { WorkspaceDto } from '@/shared/api'

export const setCurrentWorkspace = createEvent<WorkspaceDto | null>()
const resetCurrentWorkspace = createEvent()
export const createProject = projectModel.createProject

export const createProjectModal = createModal()

export const $currentWorkspace = restore<WorkspaceDto | null>(
  setCurrentWorkspace,
  null
).reset(resetCurrentWorkspace)

sample({
  clock: setCurrentWorkspace,
  target: $currentWorkspace
})

sample({
  clock: createProjectModal.closeModal,
  target: resetCurrentWorkspace
})

sample({
  clock: projectModel.createProjectFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Create project error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})
