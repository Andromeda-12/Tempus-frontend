import { createEvent, restore, sample } from 'effector'
import { notificationModel } from '@/features/notification'
import { projectModel } from '@/entities/project'
import { ProjectDto } from '@/shared/api'
import { createModal } from '@/shared/lib'

export const projectDeletionConfirme = createEvent()
export const setCurrentProject = createEvent<ProjectDto>()
const deleteProject = createEvent()

export const confirmModal = createModal()

export const $currentProject = restore(setCurrentProject, null).reset(
  confirmModal.closeModal
)

sample({
  clock: projectDeletionConfirme,
  target: deleteProject
})

sample({
  clock: deleteProject,
  source: $currentProject,
  filter: Boolean,
  fn: (currentProject) => currentProject.id,
  target: projectModel.removeProject
})

sample({
  clock: projectModel.removeProjectFx.failData,
  fn: (error) =>
    notificationModel.createNotificationBody({
      type: 'error',
      title: 'Delete project error',
      message: error.body.message
    }),
  target: notificationModel.createNotification
})

sample({
  clock: projectModel.removeProjectFx.finally,
  target: confirmModal.closeModal
})
